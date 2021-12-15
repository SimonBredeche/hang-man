import React, {useContext} from 'react'
import {ThemeContext} from './Theme.js'
import '../componentsStyle/DarkModeButton.css'

export default function DarkModeToggle(){
    const {toggleTheme, theme} = useContext(ThemeContext)
    return (
        <div className={theme ? "blackBackGround" : "whiteBackGround"}>
            <label onInput={toggleTheme} className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
            {theme ? "🌙": "☀️"}
        </div>
    )
}