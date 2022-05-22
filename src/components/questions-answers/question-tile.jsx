import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from './config';
import Answer from './answer-tile';

function Question({ question }) {
  const [answers, setAnswers] = useState([]);
  const [a, setA] = useState([]);
  const [expandClicked, setExpandClicked] = useState(false);
  // console.log(expandClicked, 'expandClicked ... should be false?');

  const getData = () => {
    axios.get(`${API_URL}qa/questions/${question.question_id}/answers`, { headers: { Authorization: API_KEY } })
      .then((res) => {
        const sortedAnswers = res.data.results.sort((x, y) => x.helpfulness + y.helpfulness);
        // console.log(sortedAnswers, 'sortedAnswers');
        setAnswers(sortedAnswers);
        return sortedAnswers;
      })
      .then((data) => {
        // console.log(data, 'data');
        const slicedAnswers = data.slice(0, 2);
        console.log(slicedAnswers);
        setA(slicedAnswers);
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

  // console.log(question, 'question in TileQA');
  // console.log(answers, 'answers in TileQA');
  // console.log(a, 'a in TileQA');

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
      </div>
      <div>
        <span>A</span>
        {a.map((ans) => <Answer key={ans.answer_id} answer={ans} />)}
        <button type="button" onClick={handleExpandAnswers}>Expand Answers</button>
      </div>
    </span>
  );
}

export default Question;
