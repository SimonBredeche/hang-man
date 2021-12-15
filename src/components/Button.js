import React, { useState } from "react";

export function CreateButton(props){
    return (
        <button className="buttoncss" onClick={props.onClick}>
        {props.text}
        </button>
    )
}