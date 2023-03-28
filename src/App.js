import './App.css';
import { CCard, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { useState, useEffect } from 'react';
import Lottery from './Lottery';
import WinnerList from './WinnerList';
import readyURL from './assets/ready.mp3';
import getPrizeURL from './assets/getPrize.mp3';
function App() {
  const [prizeModal, setPrizeModal] = useState(false);
  const [prizeList, setPrizeList] = useState([
    {name:"米奇大布偶", winner:0, id:0},
    {name:"美樂蒂西瓜布偶", winner:0, id:1},
    {name:"GODIVA即溶可可粉禮盒", winner:0, id:2},
    {name:"JACK DANNIES NO.7威士忌", winner:0, id:3},
    {name:"約翰走路典藏禮盒", winner:0, id:4},
    {name:"MixerBox藍芽音響", winner:0, id:5},
  ]);
  const [prize, setPrize] = useState(prizeList[0]);
  const [start, setStart] = useState(false);
  const [ticket, setTicket] = useState(0);
  const [winners, setWinners] = useState([]);
  const timeout= async (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }
  const choosePrize = (idx) => {
    setPrize(prizeList[idx]);
  }
  const startLottery = async() => {
    setPrizeModal(false);
    setStart(true);
  }
useEffect(() => {
  if(!start) return;
  setTicket(0);
  new Audio(readyURL).play()
  let ms;
  do{
    const d = new Date();
    ms = d.getMilliseconds()%504+1;
  }while(ms in [...winners.map(w=>w.winner)])
  timeout(2200).then(() => {
    let prizeListCopy = [...prizeList];
    prizeListCopy[prize.id].winner = ms;
    setPrizeList((prev)=> {
      console.log("list=",prizeListCopy)
      return prizeListCopy;
    });
    setTicket(ms);
    setStart(false);
  })
}, [start]);

useEffect(() => {
  if(!ticket) return;
  new Audio(getPrizeURL).play();
  setWinners((prev)=> {
    console.log("popo=",prev.map(w=>w.prize))
    if(prev.map(w=>w.prize).includes(prize.name)){
      return prev.map(w=>{
        if(w.prize===prize.name) return {prize:prize.name, winner:ticket}
        return w;
      })
    }else{
      return [...prev, {prize:prize.name, winner:ticket}]
    }
  });
}, [ticket]);
useEffect(() => {
  if(!prizeModal) return;
  setPrizeList(prizeList)
}, [prizeModal]);
  return (
    <div className="App">
      <CModal size="lg" visible={prizeModal} onDismiss={() => setPrizeModal(false)} alignment="center">
        <CModalHeader closeButton>
          <CModalTitle style={{fontSize:"30px"}}>選擇要抽的獎品</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {prizeList.map((item) => {
            return (<div key={item.id} className='my-2'>
                <button className={prize?prize.id===item.id?"btn btn-info":item.winner?"btn btn-danger":"btn btn-success":"btn btn-success"+" prizes"} style={{fontSize:"30px"}} onClick={()=>choosePrize(item.id)}>{item.name}</button>
              </div>
            )
          })}
        </CModalBody>
        <CModalFooter>
          <button className='btn btn-warning' style={{fontSize:"30px"}} onClick={startLottery}>開始抽獎</button>
        </CModalFooter>
      </CModal>
      <CRow className='d-flex w-100'>
          <div className='col-3'></div>
          <div className='col-6 d-flex justify-content-center align-items-center flex-column'>
            {!start&&<button className='btn btn-primary choose-btn d-flex' style={{fontSize:"60px"}} onClick={()=>{setPrizeModal(true)}}>選獎品</button>}
            {start && <Lottery/>}
            {ticket!==0 && <>
              <div className='my-4 border-info rounded-circle lottery-ball d-flex justify-content-center align-items-center' style={{backgroundColor:"#32b1fd", height:"450px", width:"450px", color:"white"}}>
                <h1 style={{fontSize:"100px"}}>{ticket}</h1>
              </div>
              <CCard className='bg-pink'>
                <h1 className='p-3 prize-name' style={{fontSize:"60px"}}>{prize.name}</h1>
              </CCard>
                </>
            }
          </div>
          <div className='col-3'>
            {!start && <WinnerList winners={winners}/>}
          </div>
      </CRow>
    </div>
  );
}

export default App;
