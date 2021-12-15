import React, {useContext} from 'react'
import {ThemeContext} from './Theme.js'

export default function DarkModeToggle(){
    const {toggleDarkMode, DarkMode} = useContext(ThemeContext)
    return (
        <div
        onClick={toggleDarkMode} 
        >
        {DarkMode ? "Dark": "Light"}
        </div>
    )
}