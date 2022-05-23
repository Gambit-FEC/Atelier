import React, { useState } from 'react';

function QuestionHelpfulness({ question }) {
  const [clicked, setClicked] = useState(false);
  // const [question, setQuestion]

  const handleClick = (e) => {
    e.preventDefault();
    if (clicked === false) {
      setClicked(true);
      // question.question_helpfulness += 1;
      // modify helpfulness rating of question including
      // sending a patch request?
    }
  };

  return (
    <button type="button" onClick={handleClick}>Helpfulness</button>
  );
}

export default QuestionHelpfulness;
