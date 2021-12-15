import React, { useState } from "react";
import '../componentsStyle/Button.css'

export function CreateButton(props){
    return (
        <button className="buttoncss" onClick={props.onClick}>
        {props.text}
        </button>
    )
}