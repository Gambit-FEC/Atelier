import React from 'react';
// import {useContext} from 'react';
import { useId } from '../../context/GlobalStore';

// import ListQA from './qa-list';
// import AnswerForm from './answer-form';
// import QuestionForm from './question-form';

function QuestionsAnswersMain() {
<<<<<<< HEAD
  const [productId, useProductId] = useId();
=======
  const [productId] = useId();
>>>>>>> master

  return (
    <div>
      <div>The product id is: </div>
      <div>{productId}</div>
    </div>
  );
};

export default QuestionsAnswersMain;

/*
  { productId ? <QA-List/> : null}
  { productId ? <QuestionForm/> : null}
  { productId ? <AnswerForm/> : null}
*/