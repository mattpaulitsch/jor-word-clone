import React from "react";
import { range } from '../../utils.js';
import { NUM_OF_GUESS_CHARS } from '../../constants.js';
import { checkGuess } from '../../game-helpers.js'

function Guess({ guess }) {
  return (
    <p className="guess">
       {range(0, NUM_OF_GUESS_CHARS).map((col) => {
          const content = guess ? guess[col].letter : '';
          const guessClass = guess ? guess[col].status : '';
          return <span className={`cell ${guessClass}`} key={col}>{content}</span>;
       })}
    </p>
  );
}

export default Guess;
