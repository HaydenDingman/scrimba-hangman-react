import { useState } from 'react'
import { languages } from './languages'
import './App.css'

function App() {
  
  const languageElems = languages.map(language => {
      return (
        <span key={language.name} className="language" style={{backgroundColor: language.backgroundColor, color: language.color}}>{language.name}</span>
      )
  })

  const [currentWord, setCurrentWord] = useState("react");

  // Turn currentWord into an array, then map to create elements.
  const letterElements = currentWord.split('').map((letter, index) => {
    return (<span key={index} className="letter">{letter.toUpperCase()}</span>)
  })

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
    </main>
  )
}

export default App
