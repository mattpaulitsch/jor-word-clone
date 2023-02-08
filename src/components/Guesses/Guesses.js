import React from "react";
import Guess from '../Guess';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants.js';
import { range } from '../../utils.js';
import { checkGuess } from '../../game-helpers.js'

function Guesses({ previousGuesses, answer }) {
  return (
    <>
      {range(0, NUM_OF_GUESSES_ALLOWED).map((row) => {
        let currentGuess = {guess: '', key: row}

        if(previousGuesses[row]) {
          currentGuess = previousGuesses[row];
        }

        return (
          <Guess key={currentGuess.key} guess={checkGuess(currentGuess.guess, answer)} />
        );
      })}
    < />
  );
}

export default Guesses;
