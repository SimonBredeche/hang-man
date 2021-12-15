import logo from './logo.svg';
import './App.css';
import React, { useContext } from "react";
import ThemeContextProvider, { ThemeContext } from './components/Theme';
import DarkModeToggle from './components/DarkModeButton';
import Content from './Content';

function App() {
  
  
  return (
    
    <ThemeContextProvider>
        <DarkModeToggle />
        <Content />
    </ThemeContextProvider>
    
  );
} 

export default App;
