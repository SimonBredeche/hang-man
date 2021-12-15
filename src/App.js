import logo from './logo.svg';
import './App.css';
import React from "react";
import { CreateButton } from './components/Button.js';
import { TextComp } from './components/TextLabel.js';
import { CreateInput } from './components/Input.js';
import { BasicModal } from './components/Modal.js';
import { PlayerScore } from './components/Player.js';


function App() {
  const [wordId, setWordId] = React.useState("");
  const [word, setWord] = React.useState("");
  const [gessedWord, setGessedWord] = React.useState("");
  const [input, setInput] = React.useState("");
  const [started,setIsStarted] = React.useState(false);
  const [user,setAllUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState("");
  const [oppenModal, setOppendModal] = React.useState(false);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZéèê";
  const BUTTONS = letters.split('');
  const getRandomWord = async () => {
    fetch('https://animalfinderapi.herokuapp.com/word')
    .then(function(response){ return response.json(); })
    .then(function(result) {
        const items = result.data;
        console.log(word)
        setWord(items.word);
        setWordId(items.id);
        setGessedWord(getGessedWord(items.word));
        getAllLocalPlayerInfo();
        setInput("");
    })
    
  };

  const checkUser = async () => {
    fetch(`https://animalfinderapi.herokuapp.com/user/${input}`)
    .then(function(response){ return response.json(); })
    .then(function(result) {
        if(result.data != null){
          setOppendModal(true);
        }
        else{
          setCurrentUser(input)
          getRandomWord();
        }
        

    })
    
  };

  function getAllLocalPlayerInfo(){
    fetch(`https://animalfinderapi.herokuapp.com/score`)
    .then(function(response){ return response.json(); })
    .then(function(result) {
      result.data.forEach(element => {
        user.push(element);
      });
      setIsStarted(true);
    })

  }

  function yes(){
    setOppendModal(false);
    setCurrentUser(input);
    getRandomWord();
  }
  function no(){
    setOppendModal(false);
  }

  function saveGame(isWin){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: wordId,
        isWin: isWin,
        username: currentUser,
        word: word
      })
    };
    fetch('https://animalfinderapi.herokuapp.com/game', requestOptions)
    .then(function(response){ return response.json(); })
    .then(function(result) { console.log(result)})
  }

  
  function getGessedWord(str){
    console.log(str.length);
    console.log(str);
    let response = "";
    for(let i = 0; i < str.length; i++){
      response += "_";
    }
    return response;
  }

  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
  }
  
  function compareWords(str){
    let tmp = gessedWord;
    for(let i = 0; i < word.length; i++){
      if(str.toUpperCase() == word[i].toUpperCase()){
        tmp = setCharAt(tmp,i,word[i]);
      }
    }
    if(tmp == word){
      saveGame(true);
      console.log("win ! ")
    }
    setGessedWord(tmp);
  }

  function loginForm(){
    return(
      <div className="loginForm">
        <CreateInput fieldName="Insert user name" input={input} onInput={e => setInput(e.target.value)}/>
        <CreateButton text="New Game" onClick={checkUser}/>
        <BasicModal show={oppenModal} yes={yes} no={no}/>
      </div>
    )
  }

  function gameBoard(){
    return(
      <div className="gameBoard">
        <div className="App">
          <TextComp text={gessedWord}/>
          {BUTTONS.map((btn) => {
            return <CreateButton text={btn} key={btn} onClick={function(){compareWords(btn)}}/>
          })}
        </div>
        <div className="App">
          <h2>Leader board</h2>
          {user.map((el, index) => {
            return <PlayerScore src={el.avatar} name={el.username} score={el.score}/>
          })}
        </div>
      </div>
    )
  }
  return (
    <div >
    {started ? gameBoard() : loginForm()}
    </div>
  );
}

export default App;
