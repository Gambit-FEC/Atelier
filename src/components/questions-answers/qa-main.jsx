import React from 'react';
import {useContext} from 'react';
import {useId} from // file

import ListQA from './qa-main.jsx';
import AnswerForm from './answer-form.jsx';
import QuestionForm from './question-form.jsx';


function QuestionsAnswersMain() {
  const [productId, useProductId] = useId();

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

export default QuestionsAnswersMain;

// pass in id and maybe set id into the context