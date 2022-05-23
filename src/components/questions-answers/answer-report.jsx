import React, { useState } from 'react';

function AnswerReport({ answer }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (clicked === false) {
      setClicked(true);
      answer.helpfulness += 1;
      // modify helpfulness rating of answer including
      // sending a patch request?
    }
  };

  return (
    <div>
      {clicked ? null : <button type="button" onClick={handleClick}>Report Answer</button>}
      {clicked ? <p>This answer has been reported</p> : null}
    </div>
  );
}

export default AnswerReport;
