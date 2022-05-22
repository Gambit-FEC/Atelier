import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from './config';
import Answer from './answer-tile';

function Question({ question }) {
  const [answers, setAnswers] = useState([]);

  const getData = () => {
    axios.get(`${API_URL}qa/questions/${question.question_id}/answers`, { headers: { Authorization: API_KEY } })
      .then((res) => {
        setAnswers(res.data.results);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => { // when component mounts get the data
    getData();
  }, []);

  console.log(question, 'question in TileQA');
  console.log(answers, 'answers in TileQA');

  // display info for question only eg body, helpfulness, etc
  // also, only display 4 questions unless button is clicked to display more
  // map answers info for this particular question into a div for answers
  return (
    <span>
      <div>
        <span>Q</span>
        <span>{question.question_body}</span>
        <span>{question.asker_name}</span>
        <span>{question.question_helpfulness}</span>
      </div>
      <div>
        <span>A</span>
        {answers.map((answer) => (<Answer answer={answer} />))}
      </div>
    </span>
  );
}

export default Question;
