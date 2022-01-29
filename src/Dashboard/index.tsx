import { useState } from 'react'
import ScoreCalculator from '../services/ScoreCalculator'
import PinsList from './PinsList'
import Results from './Results'

export default function Dashboard() {
  const defaultBarsCount = 10
  const frames = Array(11).fill(0).map((_, i) => i).slice(1)

  const [progressState, setProgressState] = useState<'initial' | 'started' | 'finished'>('initial')

  const [currentPinsCount, setCurrentPinsCount] = useState(0 as number)
  const [currentBallsCount, setCurrentBallsCount] = useState(defaultBarsCount as number)

  const [scores, setScores] = useState([] as number[])
  const [rolls, setRolls] = useState([] as number[])
  const [attempt, setAttempt] = useState(1 as number)

  const calculateScore = (newRolls:any) => {
    const calculator = new ScoreCalculator()
    const scoresArray = calculator.calculate(newRolls)
    setScores(scoresArray)
  }

  const addRoll = () => {
    const newRolls = rolls.concat([currentPinsCount])
    setRolls(newRolls)
    calculateScore(newRolls)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    const isSecondAttempt = attempt === 2
    const isStrike = currentPinsCount === 10

    addRoll()
    // finish game without strike or spare
    if (!isStrike && (scores.length === 10) && isSecondAttempt) return setProgressState('finished')

    // go to next frame if second attempt or strike
    if ((isStrike || isSecondAttempt) && !(scores.length > 10)) {
      setAttempt(1)
      return setCurrentBallsCount(defaultBarsCount)
    }

    // If finished with strike allow 2 attempts
    if (scores.length >= 10) {
      const wasStrike = attempt === 3 && rolls[rolls.length - 3] === 10
      if (wasStrike) return setProgressState('finished')
    }

    setCurrentBallsCount(currentBallsCount - currentPinsCount)
    setAttempt(attempt + 1)
  }

  return (
    <div className='container'>
      <h1>Bowling game</h1>
      {
        progressState === 'finished' &&
        <div>Congratulations! You finished the game!</div>
      }
      {  progressState === 'initial' &&
        <button className='btn btn-success' onClick={() => setProgressState('started')}>Start the game</button>
      }
      { progressState === 'started' &&
        <div>
          <form onSubmit={onSubmit}>
            <div className='row justify-content-md-center'>
              <div className='col col-2'>
                <label htmlFor="current-pins">The number of pins knocked down</label>
                <input min="1" max="10" className='form-control' type='number' id='current-pins' onChange={(e) => setCurrentPinsCount(+e.target.value)}></input>
              </div>
            </div>
            <button className='btn btn-primary mt-2'>Roll the ball!</button>
          </form>

          <PinsList currentBallsCount={currentBallsCount}/>
        </div>
      }
      { progressState !== 'initial' && <Results scores={scores} frames={frames} /> }
    </div>
  )
}
