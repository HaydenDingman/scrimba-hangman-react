import { useState } from 'react'
import { languages } from './languages'
import './App.css'

function App() {
  
  const languageElems = languages.map(language => {
      return (
        <div className="language" style={{backgroundColor: language.backgroundColor, color: language.color}}>{language.name}</div>
      )
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
    </main>
  )
}

export default App
