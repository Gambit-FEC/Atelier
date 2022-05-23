import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from './config';
import Answer from './answer-tile';
import QuestionHelpfulness from './question-helpfulness';

function Question({ question }) {
  const [answers, setAnswers] = useState([]);
  const [a, setA] = useState([]);
  const [expandClicked, setExpandClicked] = useState(false);

  const getData = () => {
    axios.get(`${API_URL}qa/questions/${question.question_id}/answers`, { headers: { Authorization: API_KEY } })
      .then((res) => {
        const sortedAnswers = res.data.results.sort((x, y) => x.helpfulness + y.helpfulness);
        const slicedAnswers = sortedAnswers.slice(0, 2);
        setA(slicedAnswers);
        setAnswers(sortedAnswers);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  useEffect(() => { // when component mounts get the data
    getData();
  }, []);

  useEffect(() => {
    if (answers && expandClicked) {
      setA(answers);
    } else if (answers) {
      setA(answers.slice(0, 2));
    }
  }, [expandClicked]);

  const handleExpandAnswers = (e) => {
    e.preventDefault();
    if (!expandClicked) {
      setExpandClicked(true);
    } else if (expandClicked) {
      setExpandClicked(false);
    }
  };

  return (
    <span>
      <div>
        <span>Q</span>
        <span>{question.question_body}</span>
        <span>{question.asker_name}</span>
        <span>{question.question_helpfulness}</span>
        <QuestionHelpfulness question={question} />
      </div>
      <div>
        <span>A</span>
        {a.map((ans) => <Answer key={ans.answer_id} answer={ans} />)}
        <button type="button" onClick={handleExpandAnswers}>See More Answers</button>
      </div>
    </span>
  );
}

export default Question;
