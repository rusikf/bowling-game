const sumArray = (array: any) => array.reduce((a:number,b:number) => a + b, 0)

export default function Results({ scores, frames }:any) {

  return (
    <div className='mt-5'>
    <h5>Game Score: { sumArray(scores) }</h5>
    <div className='row justify-content-md-center'>
      <div className='col col-6'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Frame</th>
              {
                frames.map((number:number) => {
                  return <>
                    <th scope="col">{ number }</th>
                  </>
                })
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frame Score</td>
              { scores.map((frameScore: number) => <td>{frameScore}</td>) }
            </tr>
            <tr>
              <td>Total Score</td>
              { scores.map((score: number, index: number) => <td>{sumArray(scores.slice(0, index + 1))}</td>) }
            </tr>
          </tbody>
        </table>
    </div>
    </div>
  </div>
  )
}