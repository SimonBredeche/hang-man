import React, { useState } from "react";
import '../componentsStyle/Icon.css'
import '../componentsStyle/Player.css'
export function PlayerScore(props){
    return(
        <div className="PlayerCss">
            <img key={props.src} src={props.src} className="IconCss"></img>
            <p key={props.name}>Name : {props.name}</p>
            <p key={props.score}>Score : {props.score}</p>
        </div>
    )
}