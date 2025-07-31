import { useState } from 'react'
import { languages } from './languages'
import { clsx } from "clsx"
import './App.css'

function App() {

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState("react");

  console.log(guessedLetters);

  // Turn currentWord into an array, then map to create elements.

  const languageElems = languages.map(language => {
      return (
        <span key={language.name} className="language" style={{backgroundColor: language.backgroundColor, color: language.color}}>{language.name}</span>
      )
  })

  const letterElements = currentWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return <span key={index} className="word-letter">{letter.toUpperCase()}</span>
        } else {
            return <span key={index} className="word-letter"> </span>
        }
      }
    )

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.split("").includes(letter);
    const isWrong = isGuessed && !currentWord.split("").includes(letter);
    return (<button key={letter} onClick={() => addGuess(letter)} className={clsx("keyboard-letter", {"guess-correct": isCorrect, "guess-wrong": isWrong})}>{letter.toUpperCase()}</button>)
  })

  function addGuess(letter) {
    setGuessedLetters(prevGuesses => {
      return (prevGuesses.includes(letter) ? prevGuesses : [...prevGuesses, letter])
    })
  }

  return (
    <main>
      <header>
        <h1 className="title">Assembly: Endgame</h1>
        <p className="instructions">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="status">
        <h2>You win!</h2>
        <h3>Well done! 🎉</h3>
      </section>
      <section className="language-container">
        {languageElems}
      </section>
      <section className="word-container">
        {letterElements}
      </section>
      <section className="keyboard-container">
        {keyboardElements}
      </section>
      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
