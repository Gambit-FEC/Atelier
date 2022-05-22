import React from 'react';

function Answer({ answer }) {
  console.log(answer, 'answer in Answer element');

  // display info for question only eg body, helpfulness, etc
  // also, only display 4 questions unless button is clicked to display more
  // map answers info for this particular question into a div for answers
  return (
    <span>
      <div>
        <span>Answer:</span>
        <span>{answer.body}</span>
      </div>
    </span>
  );
}

export default Answer;
