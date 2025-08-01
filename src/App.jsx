import { useState } from 'react'
import { languages } from './languages'
import { clsx } from "clsx"
import { getFarewellText } from './utils'
import './App.css'

function App() {

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState("react");

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount === (languages.length - 1)
  const isGameOver = isGameLost || isGameWon;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Turn currentWord into an array, then map to create elements.

  function renderGameStatus() {
    if (!isGameOver) {
        if (isLastGuessIncorrect) {
            return (<h2>{getFarewellText(languages[wrongGuessCount - 1].name)}</h2>)
        } else {
          return null
        }
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <h3>Well done! 🎉</h3>
        </>
      )
    } 
    else {
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
    return (<button 
              key={letter} 
              onClick={() => addGuess(letter)} 
              className={clsx("keyboard-letter", {"guess-correct": isCorrect, "guess-wrong": isWrong})}
              disabled={isGameOver || guessedLetters.includes(letter)}
              aria-disabled={isGameOver || guessedLetters.includes(letter)}
              aria-label={`Letter: ${letter}`}>
                {letter.toUpperCase()}
            </button>)
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
      <section aria-live="polite" role="status" className={clsx("status", {"game-won": isGameWon, "game-lost":isGameLost, "incorrect": isLastGuessIncorrect && !isGameLost })}>
          {renderGameStatus()}
      </section>
      <section className="language-container">
        {languageElems}
      </section>
      <section className="word-container">
        {letterElements}
      </section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>Current word: {currentWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "Blank").join(" ")}</p>
      </section>
      <section className="keyboard-container">
        {keyboardElements}
      </section>
      {isGameOver? <button className="new-game">New Game</button> : null}
    </main>
  )
}

export default App
