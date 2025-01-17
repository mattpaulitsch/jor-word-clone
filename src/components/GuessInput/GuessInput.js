import React from "react";

function GuessInput({ handleSubmitGuess, status }) {
  const [guess, setGuess] = React.useState('');

  function submitGuess(event) {
    event.preventDefault();

    handleSubmitGuess(guess.toUpperCase());
    
    // clear input field
    setGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={submitGuess}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input required
               disabled={status !== undefined}
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
