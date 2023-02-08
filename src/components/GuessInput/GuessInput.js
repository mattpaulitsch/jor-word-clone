import React from "react";

function GuessInput({ handleSubmitGuess }) {
  const [guess, setGuess] = React.useState('');
  const [displayInput, setDisplayInput] = React.useState(true);

  function submitGuess(event) {
    event.preventDefault();

    const finished = handleSubmitGuess(guess.toUpperCase());
    if (finished) {
      setDisplayInput(false);
    }
    
    // clear input field
    setGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={submitGuess}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input required
               disabled={!displayInput}
               // style={displayInput ? undefined : {display: 'none'}}
               id="guess-input"
               type="text"
               value={guess}
               onChange={event => setGuess(event.target.value)}
               minLength="5"
               maxLength="5"
               className="guess-input-field"
         />
    </form>
  );
}

export default GuessInput;
