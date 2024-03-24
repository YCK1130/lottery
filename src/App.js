import "./App.css";
import {
    CCard,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
} from "@coreui/react";
import { useState, useEffect } from "react";
import Lottery from "./Lottery";
import WinnerList from "./WinnerList";
import readyURL from "./assets/ready.mp3";
import getPrizeURL from "./assets/getPrize.mp3";

const awardList = [
    { name: "臺大電機鑰匙圈\n+\n手目耳Ｘ淘氣小農 - 方便茶包", winner: 0, number: 10 },
    { name: "【秀泰影城】雙人電影兌換券", winner: 0, number: 2 },
    { name: "【小米】智慧氣炸鍋 3.5L", winner: 0, number: 1 },
    { name: "【MSI 微星】Optix G271CQR 曲面電競螢幕", winner: 0, number: 1 },
].map((item, idx) => {
    item.id = idx;
    return item;
});

const colorList = [
    "#00ffcf",
    "#201b17",
    "#3f372c",
    "#2cffd9",
    "#81f7ee",
    "#00dee6",
    "#00d3ec",
    "#06caf1",
    "#22bff7",
    "#32b1fd",
    "#a2d6fe",
];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
console.log("awardList=", awardList);
function App() {
    const [prizeModal, setPrizeModal] = useState(false);
    const [prizeList, setPrizeList] = useState(awardList);
    const [prize, setPrize] = useState(prizeList[0]);
    const [start, setStart] = useState(false);
    const [ticket, setTicket] = useState(0);
    const [winners, setWinners] = useState([]);
    const timeout = async (delay) => {
        return new Promise((res) => setTimeout(res, delay));
    };

    const chooseWinner = (WinnerList, number, noDuplicate) => {
        let winners = [];
        for (let i = 0; i < number; i++) {
            let winner;
            do {
                const d = new Date();
                winner = getRandomInt(d.getMilliseconds() % 1e5) % 360;
            } while (noDuplicate && (winners.includes(winner) || WinnerList.includes(winner)));
            winners.push(winner);
        }
        return winners;
    };
    const choosePrize = (idx) => {
        setPrize(prizeList[idx]);
    };
    const startLottery = async () => {
        setPrizeModal(false);
        setStart(true);
    };
    useEffect(() => {
        if (!start) return;
        setTicket(0);
        new Audio(readyURL).play();

        const new_winner = chooseWinner(winners, prize.number, true);
        timeout(2200).then(() => {
            let prizeListCopy = [...prizeList];
            prizeListCopy[prize.id].winner = new_winner;
            setPrizeList((prev) => {
                console.log("list=", prizeListCopy);
                return prizeListCopy;
            });
            setTicket(new_winner);
            setStart(false);
        });
    }, [start]);

    useEffect(() => {
        if (!ticket) return;
        new Audio(getPrizeURL).play();
        setWinners((prev) => {
            console.log(
                "popo=",
                prev.map((w) => w.prize)
            );
            if (prev.map((w) => w.prize).includes(prize.name)) {
                return prev.map((w) => {
                    if (w.prize === prize.name) return { prize: prize.name, winner: ticket };
                    return w;
                });
            } else {
                return [...prev, { prize: prize.name, winner: ticket }];
            }
        });
    }, [ticket]);
    useEffect(() => {
        if (!prizeModal) return;
        setPrizeList(prizeList);
    }, [prizeModal]);
    return (
        <div className="App">
            <CModal
                size="lg"
                visible={prizeModal}
                onDismiss={() => setPrizeModal(false)}
                alignment="center"
            >
                <CModalHeader closeButton>
                    <CModalTitle style={{ fontSize: "30px" }}>選擇要抽的獎品</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {prizeList.map((item) => {
                        return (
                            <div key={item.id} className="my-2">
                                <button
                                    className={
                                        "w-100 text-center " +
                                        (prize
                                            ? prize.id === item.id
                                                ? "btn btn-select"
                                                : item.winner
                                                ? "btn btn-done"
                                                : "btn mybutton"
                                            : "btn mybutton " + " prizes")
                                    }
                                    style={{ fontSize: "30px" }}
                                    onClick={() => choosePrize(item.id)}
                                >
                                    {item.name.split("\n").map((word, idx) => (
                                        <div
                                            className="p-1 prize-name w-100 text-center"
                                            style={{ fontSize: "20px" }}
                                        >
                                            {word}
                                        </div>
                                    ))}
                                </button>
                            </div>
                        );
                    })}
                </CModalBody>
                <CModalFooter>
                    <button
                        className="btn btn-warning"
                        style={{ fontSize: "30px" }}
                        onClick={startLottery}
                    >
                        開始抽獎
                    </button>
                </CModalFooter>
            </CModal>
            <CRow className="d-flex w-100 h-100 p-3">
                <div className="col-3"></div>
                <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                    {!start && (
                        <button
                            className="btn choose-btn d-flex mybutton"
                            style={{ fontSize: "60px" }}
                            onClick={() => {
                                setPrizeModal(true);
                            }}
                        >
                            選獎品
                        </button>
                    )}
                    {start && <Lottery />}
                    {ticket !== 0 && (
                        <>
                            <div
                                className="flex-row"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    width: "90%",
                                    height: "70%",
                                    justifyContent: "space-evenly",
                                    padding: "20px",
                                }}
                            >
                                {ticket.map((item, idx) => (
                                    <div
                                        className="lottery-ball d-flex justify-content-center align-items-center"
                                        style={{
                                            backgroundColor:
                                                colorList[
                                                    (idx +
                                                        (new Date().getMilliseconds() %
                                                            colorList.length) *
                                                            2) %
                                                        colorList.length
                                                ],
                                            height: `max(8vmax, min(${
                                                550 / ticket.length
                                            }px, 200px))`,
                                            width: `max(8vmax, min(${
                                                550 / ticket.length
                                            }px, 200px))`,
                                            padding: "20px",
                                            margin: "10px",
                                            borderRadius: "50%",
                                            color: "white",
                                            textAlign: "center",
                                        }}
                                    >
                                        <h1
                                            style={{
                                                fontSize: `max(35px,min(${
                                                    70 / ticket.length
                                                }px,50px))`,
                                            }}
                                        >
                                            {item}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                            <CCard className="bg-pink">
                                {prize.name.split("\n").map((item, idx) => (
                                    <h1
                                        className="p-3 prize-name text-center"
                                        style={{ fontSize: "30px" }}
                                    >
                                        {item}
                                    </h1>
                                ))}
                            </CCard>
                        </>
                    )}
                </div>
                <div className="col-3">{!start && <WinnerList winners={winners} />}</div>
            </CRow>
        </div>
    );
}

export default App;
