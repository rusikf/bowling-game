export default function PinsList({ currentBallsCount }: any) {
  const placeholder = 'https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/64x64/plain/bowling_pin.png'
  return (
    <div className='mt-5'>
      {
        [...Array(currentBallsCount)].map(frame => {
          return <img src={placeholder} />
        })
      }
    </div>
  )
}
