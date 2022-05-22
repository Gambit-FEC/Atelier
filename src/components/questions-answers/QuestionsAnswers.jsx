import React from 'react';
// import {useContext} from 'react';
// import { useId } from '../../context/GlobalStore';

import ListQA from './question-list';
// import AnswerForm from './answer-form';
// import QuestionForm from './question-form';

function QuestionsAnswers() {
  // const [productId] = useId();

  return (
    <div>
      <ListQA />
      {/* <QuestionForm />
      <AnswerForm /> */}
    </div>
  );
}

export default QuestionsAnswers;

/*
  { productId ? <QA-List/> : null}
  { productId ? <QuestionForm/> : null}
  { productId ? <AnswerForm/> : null}
*/