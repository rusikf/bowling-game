export default class ScoreCalculator {
  calculate(rolls: number[]) {
    const scores = []

    let i = 0

    // Each cycle - new frame
    // 3 cases: is Strike, isSpare or usual case

    while(i < rolls.length) {
      const nextRoll = rolls[i + 1] || 0
      const isStrike = rolls[i] === 10
      const isSpare = !isStrike && (rolls[i+1] && (rolls[i] + rolls[i+1] === 10))

      if (isStrike) {
        const newScore = 10 + nextRoll + (rolls[i + 2] || 0)
        scores.push(newScore)
        i += 1
        continue
      }

      if (isSpare) {
        const newScore = 10 + (rolls[i+2] || 0)
        scores.push(newScore)
        i += 2
        continue
      }

      scores.push(rolls[i] + nextRoll)
      i += 2
    }

    return scores
  }
}
