import React from "react";
import { KEYBOARD_LINES } from '../../constants.js';

function Keyboard({ characters }) {
  return (
    <div className="keyboard">
      {KEYBOARD_LINES.map((line, idx) => (
        <p className="keyboard-lane" key={idx}>
          {line.map((character) => (
            <span key={character} className={`keyboard-cell ${characters.get(character)}`}>{character}</span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default Keyboard;
