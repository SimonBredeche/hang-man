import React, { useState } from "react";

export function CreateInput(props){
    return (
        <div className="formInput">
            <label htmlFor="name">{props.fieldName}</label>
            <input type="text" id="name" value={props.input} onInput={props.onInput}></input>
        </div>
    )
}