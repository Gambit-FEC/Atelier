import React, { useState } from 'react';

function AnswerHelpfulness({ answer }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (clicked === false) {
      setClicked(true);
      // answer.helpfulness += 1;
      // modify helpfulness rating of answer including
      // sending a patch request?
    }
  };

  return (
    <button type="button" onClick={handleClick}>Helpfulness</button>
  );
}

export default AnswerHelpfulness;
