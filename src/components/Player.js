import React, { useState } from "react";
import '../componentsStyle/Icon.css'
import '../componentsStyle/Player.css'
export function PlayerScore(props){
    return(
        <div className="PlayerCss">
            <img src={props.src} className="IconCss"></img>
            <p>Name : {props.name}</p>
            <p>Score : {props.score}</p>
        </div>
    )
}