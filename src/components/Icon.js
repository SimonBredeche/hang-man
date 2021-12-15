import React, { useState } from "react";
import '../componentsStyle/Icon.css'

export function Icon(props){
    return (
        <img className="IconCss" id="imageChange" src={props.url} onClick={props.onClick}></img>
    )
}