import React from 'react';
// import {useContext} from 'react';
import { useId } from '../../context/GlobalStore';

// import ListQA from './qa-list';
// import AnswerForm from './answer-form';
// import QuestionForm from './question-form';

function QuestionsAnswers() {
  const [productId] = useId();

  return (
    <div>
      <div>The product id is: </div>
      <div>{productId}</div>
    </div>
  );
}

export default QuestionsAnswers;

/*
  { productId ? <QA-List/> : null}
  { productId ? <QuestionForm/> : null}
  { productId ? <AnswerForm/> : null}
*/