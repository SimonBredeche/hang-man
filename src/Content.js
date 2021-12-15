import React, { useContext } from "react";
import './App.css';
import { CreateButton } from './components/Button.js';
import { TextComp } from './components/TextLabel.js';
import { CreateInput } from './components/Input.js';
import { BasicModal } from './components/Modal.js';
import { PlayerScore } from './components/Player.js';
import { Icon } from './components/Icon.js';
import { ThemeContext } from './components/Theme';


function Content() {
  const {theme} = useContext(ThemeContext) 
  const [life, setLife] = React.useState(1);
  const [end, setEnd] = React.useState(false);
  const [started, setIsStarted] = React.useState(false);
  const [wordId, setWordId] = React.useState("");
  const [word, setWord] = React.useState("");
  const [gessedWord, setGessedWord] = React.useState("");
  const [input, setInput] = React.useState("");
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
      setAllUsers([])
      result.data.forEach(element => {
        setAllUsers(oldArray => [...oldArray, element]);
      });
      console.log(user);
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

  function retry(){
    setLife(1);
    setEnd(false)
    getRandomWord();
  }

  function formatResponse(arr){
    let response = "";
    for(let i = 0; i < arr.length; i++){
      response += ` ${arr[i]} `
    }
    return response;
  }
  
  function compareWords(str){
    let tmp = gessedWord;
    let found = false;
    for(let i = 0; i < word.length; i++){
      if(str.toUpperCase() == word[i].toUpperCase()){
        tmp = setCharAt(tmp,i,word[i]);
        found = true;
      }
    }
    if(!found){
      setLife(life + 1);
      if(life+1 == 8){
        setEnd(true);
        saveGame(false);
      }
    }
    if(tmp == word){
      setEnd(true);
      saveGame(true);
    }
    setGessedWord(tmp);
  }

  function loginForm(){
    return(
      <div className="App">
        <CreateInput fieldName="Insert user name" input={input} onInput={e => setInput(e.target.value)}/>
        <CreateButton text="New Game" onClick={checkUser}/>
        <BasicModal show={oppenModal} yes={yes} no={no}/>
      </div>
    )
  }

  function gameBoard(){
    return(
      <div className="gameBoard">
        <div className="App" key="game">
          <h2 className="h2">Logged as user : {currentUser}</h2>
          <Icon url={`./images/${life}.png`}/>
          {
            end ? 
              <div>
                {life == 8 ? <p>Game OVER ! </p>: <p>You win !</p>}
                <h2>The word was : {word}</h2>
                <CreateButton text="Retry" onClick={retry}/>
              </div>
            :
            <div>
            <TextComp text={formatResponse(gessedWord.split(''))}/>
              {BUTTONS.map((btn) => {
                return <CreateButton text={btn} key={btn} onClick={function(){compareWords(btn)}}/>
              })}
            </div>
          }
        </div>
        <div className="App" key="leaderBoard">
          <h2>Leader board</h2>
          {user.map((el, index) => {
            return <PlayerScore src={el.avatar} key={el.username} name={el.username} score={el.score} player={el}/>
          })}
        </div>
      </div>
    )
  }
  return (
    <div className={theme ? 'App-dark':'App-light'}>
        {started ? gameBoard() : loginForm()}
    </div>
  );
} 

export default Content;
