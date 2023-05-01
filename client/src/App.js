import logo from './logo.svg';
import mic from './mic.webp';
import { useState } from 'react';
import './App.css';

const App = () => {

  const [input, setInput] = useState({
    userInput: ""
  });

  const setVal = (e) => {
    const {name, value} = e.target;
    console.log(e.target.value);
    setInput(()=> {
      return {
        ...input,
        [name] : value
      }
    })
  }

  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  const speak = () => {
    // console.log("Speaking");
    recognition.start();
    recognition.onresult = function(event) {
      let input = event.results[0][0].transcript;
      document.getElementById("input").value = input;
    }
  }


  const submit = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    let input = document.getElementById("input").value;
 
    let result = document.getElementById("result");

    const data = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input
      })
    });
    console.log("Submited");
    const res = await data.json();
    console.log(res);

    result.innerText = res.answer;
  }

  

  return (
    <div className="App">
       <h1>My Chat-GPT</h1>
       <form>
        <input type="text" id="input" onChange={ setVal } placeholder="Enter text or use voice command" />
        <button type="button" onClick= { speak } className="mic-btn"><img src={mic} alt={'mic'} className="mic" /> </button>
        <br />
        <button type="submit" onClick={ submit } className="btn">Submit</button>
       </form>
       <textarea id="result" placeholder="Search results..." />
    </div>
  );
}

export default App;
