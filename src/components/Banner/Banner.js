import React from "react";

function Banner({ answer, gameWon, numberOfGuesses, restart }) {
  const bannerClass = gameWon ? 'happy' : 'sad';
  let bannerContent;

  console.log('')
  if (gameWon) {
    bannerContent =
      <div className={`${bannerClass} banner`}>
        <p>
          <strong>Congratulations!</strong> Got it in
          {' '}<strong>{numberOfGuesses} {numberOfGuesses > 1 ? 'guesses' : 'guess'}</strong>.
        </p>
        <button onClick={restart}>Restart</button>
      </div>
  } else if (gameWon === false) {
    return (
      bannerContent =
        <div className={`${bannerClass} banner`}>
          <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
          <button onClick={restart}>Restart</button>
        </div>
    );
  }

  return (
    <>
      {bannerContent}
    < />
  );
}

export default Banner;
