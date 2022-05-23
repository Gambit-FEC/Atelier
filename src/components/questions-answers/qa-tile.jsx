import React from 'react';

function TileQA({ question }) {
  // renders each QA tile
  // track report button and other metrics here
  // also need to get data for answers for this question
  console.log(question, 'question in TileQA');

  return (
    <span>
      <span>Q</span>
      <span>{question.question_body}</span>
      <span>{question.asker_name}</span>
      <span>{question.question_helpfulness}</span>
    </span>
  );
}

export default TileQA;
