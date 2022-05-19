import React from 'react';
import {useContext} from 'react';
// also need to import a context store for the app specifically! which others are working on ...

import ListQA from './qa-main.jsx';
import AnswerForm from './answer-form.jsx';
import QuestionForm from './question-form.jsx';

function QuestionsAnswers() {
  const productId = useContext(IDContext);
  return (
    <div>
      <div>The product id is: </div>
      <div>{productId}</div>
      { productId ? <QA-List/> : null}
      { productId ? <QuestionForm/> : null}
      { productId ? <AnswerForm/> : null}
    </div>
  );
};

export default QuestionsAnswers;

// pass in id and maybe set id into the context