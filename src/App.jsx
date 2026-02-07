import {useEffect, useState} from 'react'
import './App.css'
import { Howl } from 'howler';
import pop_sound from "./assets/universfield-morse-code-131798.mp3";
import explosion_sound from "./assets/explosion.mp3";
import cold_mess from "./assets/cold_mess.mp3"
import confetti from "canvas-confetti"

function App() {
    const [start, setStart] = useState(false)
    const [count, setCount] = useState(true)
    const [explosion, setExplosion] = useState(false)
    const [text, setText] = useState("")
    const [saidYes, setSaidYes] = useState(false)
    const [textToWrite, setTextToWrite] = useState("WWill you be my Valentine?!")
    const [toggleDialog, setToggleDialog] = useState(false)
    const pop = new Howl({ src: [pop_sound] });
    const blast = new Howl({ src: [explosion_sound] });
    const cold = new Howl({ src: [cold_mess] });

    // const { width, height } = useWindowSize()

    useEffect(() => {
        if (!start) return;

        setText("")

        const timeout = setTimeout(() => {

            let i = 0;

            pop.play();

            const interval = setInterval(() => {
                if (i < textToWrite.length - 1) {
                    setText(prev => prev + textToWrite[i]);
                    setCount(prev => !prev);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100);

        }, 1000);

        return () => clearTimeout(timeout);
    }, [start, textToWrite]);


    return (
        <div>
            <div>
                {count?
                    <img style={{zIndex:100,width:toggleDialog?"175px":"300px", top:"40%", left:toggleDialog?"26%":"50%", position:"absolute", transform: "translate(-50%,-50%)", transition: "all 0.3s ease-in-out"}} src="/cat_pop1.png" alt="pop cat"/>
                    :
                    <img style={{zIndex:100,width:"175px", top:"40%", left:"26", position:"absolute", transform: "translate(-50%,-50%)"}} src="/cat_pop2.png" alt="pop cat"/>}

                <img
                    style={{
                        height: "200px",
                        width: "600px",
                        position: "absolute",
                        top:"35%", left:"50%", transform: "translate(-40%,-20%)",
                        opacity: toggleDialog?1:0,
                        transition: "opacity 2s ease, transform 0.6s ease",
                        zIndex: 99
                    }}
                    src="/dialog_box.png"/>

                <div style={{
                    position: "absolute",
                    top:"40%", left:"52%", transform: "translate(-40%,-20%)",
                    fontSize: "1.5em",
                    zIndex:100
                }}>{text}</div>

                {!toggleDialog?<div
                    onClick={()=>{
                        setToggleDialog(!toggleDialog)
                        setStart(!start)
                    }}
                    style={{
                        position: "absolute",
                        top:"70%",
                        left: "50%",
                        transform: "translate(-60%, -50%)",
                        border: "1px solid black",
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}>Say Hello!</div>:""}

                {!saidYes?<div
                    onClick={()=>{
                        setTextToWrite("LLessgoooooo!!!")
                        setSaidYes(true)
                        blast.play()
                        cold.play()
                        confetti({particleCount: 150})
                    }}
                    style={{
                        padding: "10px 20px",
                        border: "black solid 1px",
                        color: "black",
                        position: "absolute",
                        top:"60%",
                        left: "42.5%",
                        transform: "translate(-60%, -50%)",
                        fontSize: "1.5em",
                        cursor: "pointer",
                        opacity: toggleDialog?1:0,
                        transition: "opacity 15s ease, transform 0.6s ease",
                    }}>
                    YESSS!!
                </div>:""}

                {!explosion?<div
                    onClick={()=>{
                        blast.play()
                        setExplosion(true)
                    }}
                    style={{
                        padding: "10px 20px",
                        border: "black solid 1px",
                        position: "absolute",
                        top:"60%",
                        left: "57.5%",
                        transform: "translate(-60%, -50%)",
                        fontSize: "1.5em",
                        cursor: "pointer",
                        width: "100px",
                        display: "flex",
                        justifyContent: "center",
                        opacity: toggleDialog?1:0,
                        transition: "opacity 15s ease, transform 0.6s ease",
                    }}>
                    no
                </div>:<img style={{
                    position: 'absolute',
                    width: "200px",
                    top:"60%",
                    left: "57.5%",
                    transform: "translate(-60%, -50%)",
                }} src="/explosion.png"/>}
                {saidYes?<img
                    style={{
                        position:"absolute",
                        left: "7.5%",
                        width: "650px"
                    }}
                    src="/explosion.png"/>:""}
                {saidYes?<img
                    style={{
                        position:"absolute",
                        left: "55%",
                        width: "650px"
                    }}
                    src="/explosion.png"/>:""}
                {saidYes?<img
                    style={{
                        position:"absolute",
                        top:"25%",
                        left:"75%"
                    }}
                    src="/catheart.png"/>:""}
            </div>
        </div>
    )
}

export default App
