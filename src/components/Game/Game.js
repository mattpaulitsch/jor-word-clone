import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput';
import Guesses from '../Guesses';
import Banner from '../Banner';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants.js';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [previousGuesses, setPreviousGuesses] = React.useState([])
  const [gameWon, setGameWon] = React.useState(undefined);

  function handleSubmitGuess(guess) {
    const nextPreviousGuesses =
      [
        ...previousGuesses,
        {
          guess: guess.toUpperCase(),
          key: crypto.randomUUID()
        }
      ]
    setPreviousGuesses(nextPreviousGuesses);

    const nextWon = (guess === answer);
    const game_end = (nextWon || nextPreviousGuesses.length === NUM_OF_GUESSES_ALLOWED);

    if (game_end) {
      setGameWon(nextWon);
    }

    return  game_end;
  }

  return (
    <>
      <Guesses previousGuesses={previousGuesses} answer={answer} />
      <GuessInput handleSubmitGuess={handleSubmitGuess} />
      <Banner style={gameWon ? undefined : {display: 'none'}}
            answer={answer}
            gameWon={gameWon}
            numberOfGuesses={previousGuesses.length}/>
    </>
  );
}

export default Game;
