import { useState } from 'react'
import { languages } from './languages'
import { clsx } from "clsx"
import './App.css'

function App() {

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState("react");

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount === (languages.length - 1)
  const isGameOver = isGameLost || isGameWon;

  // Turn currentWord into an array, then map to create elements.

  function renderGameStatus() {
    if (!isGameOver) {
      return null;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <h3>Well done! 🎉</h3>
        </>
      )
    } else {
      return (
        <>
          <h2>Game Over!</h2>
          <h3>You lose! Better start learning Assembly! 😭</h3>
        </>
      )
    }
  }

  const languageElems = languages.map((language, index) => {
      return (
        <span key={language.name} 
              className={clsx("language", {lost: (index < wrongGuessCount)})} 
              style={{backgroundColor: language.backgroundColor, color: language.color}}>{language.name}</span>
      )
  })

  const letterElements = currentWord.split('').map((letter, index) => {
            return <span key={index} className="word-letter">{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
      })

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
      <section className={clsx("status", {"game-won": isGameWon, "game-lost":isGameLost})}>
          {renderGameStatus()}
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
      {isGameOver? <button className="new-game">New Game</button> : null}
    </main>
  )
}

export default App
