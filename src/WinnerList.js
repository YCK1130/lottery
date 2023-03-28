import React from 'react'
import { CCard } from '@coreui/react'

const WinnerList = ({winners}) => {
  console.log("winners=",winners)
  return (
    (winners.length!==0&&<CCard className='bg-white winner-list p-3'>
        {winners.map(w=>{
            return <h4 className=''>{w.prize}: {w.winner} <hr/></h4>
        })}
    </CCard>)
  )
}

export default WinnerList