import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput';
import Guesses from '../Guesses';
import Banner from '../Banner';
import Keyboard from '../Keyboard';
import { NUM_OF_GUESSES_ALLOWED, KEYBOARD_LINES } from '../../constants.js';

// Pick a random word on every pageload.
// const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

function Game() {
  const [previousGuesses, setPreviousGuesses] = React.useState([])
  const [gameWon, setGameWon] = React.useState(undefined);
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [keyboardCharacters, setKeyboardCharacters] = React.useState(initializeKeyboardCharacters());

  console.info({ answer });

  function initializeKeyboardCharacters() {
    const characters = new Map();

    KEYBOARD_LINES.forEach((line) => {
      line.forEach((character) => {
        characters.set(character, 'unused')
      })
    })

    return characters;
  }

  function updateKeyBoardCharacters(guess) {
    const nextCharacters = new Map(keyboardCharacters);

    for (var i = 0; i < guess.length; i++) {
      let currentChar = guess.charAt(i);
      let currentState = nextCharacters.get(currentChar);

      // only update misplaced and unused characters
      if (currentState === 'unused' || currentState === 'misplaced') {
        // check if char is correctly positioned
        if (answer.charAt(i) === currentChar) {
          nextCharacters.set(currentChar, 'correct');
        } else {
          // check if char is misplaced
          if(answer.includes(currentChar)) {
            // char is not correct but is part of answer => therefore misplaced
            nextCharacters.set(currentChar, 'misplaced');
          } else {
            // char is neither correct nor misplaced => therefore incorrect
            nextCharacters.set(currentChar, 'incorrect');
          }
        }
      }
    }

    setKeyboardCharacters(nextCharacters);
  }

  function restartGame() {
    setPreviousGuesses([]);
    setGameWon(undefined);

    setAnswer(sample(WORDS));
    setKeyboardCharacters(initializeKeyboardCharacters());
    // To make debugging easier, we'll log the solution in the console.
    console.info({ answer });
  }

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
    updateKeyBoardCharacters(guess);

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
      <GuessInput handleSubmitGuess={handleSubmitGuess} status={gameWon} />
      <Keyboard characters={keyboardCharacters} />
      <Banner style={gameWon ? undefined : {display: 'none'}}
            answer={answer}
            gameWon={gameWon}
            numberOfGuesses={previousGuesses.length}
            restart={restartGame}
      />
    </>
  );
}

export default Game;
