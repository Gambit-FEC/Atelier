import React from 'react';
import AnswerHelpfulness from './answer-helpfulness';
import AnswerReport from './answer-report';

function Answer({ answer }) {
  return (
    <span>
      <div>
        <span>Answer:</span>
        <span>
          <AnswerHelpfulness />
        </span>
        <span>{answer.body}</span>
        <AnswerReport />
      </div>
    </span>
  );
}

export default Answer;
