import React, { useState } from "react";
import '../componentsStyle/Icon.css'
import '../componentsStyle/Player.css'
import { Chart } from "./Stats";
export function PlayerScore(props){
    const [end, setEnd] = React.useState(false);
    function handleClick(){
        setEnd(!end);
    }
    let win = 0;
    let loose = 0;
    props.player.party.forEach(element => {
        if(element.isWin){
            win++;
        }
        else{
            loose++;
        }
    });
    console.log();
    return(
        <div className="PlayerCss">
            <img src={props.src} className="IconCss" onClick={handleClick} ></img>
            <p>Name : {props.name}</p>
            <p>Score : {props.score}</p>
            <Chart show={end} close={handleClick} win={win} loose={loose}/>
        </div>
    )
}