import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalStore';
import { API_KEY, API_URL } from './config';
import Question from './question-tile';

function ListQA() {
  const { productId } = useGlobalContext();
  const [questions, setQuestions] = useState([]);
  const [q, setQ] = useState([]);
  const [expandClicked, setExpandClicked] = useState(false);

  const getData = () => {
    axios.get(`${API_URL}qa/questions`, { params: { product_id: productId }, headers: { Authorization: API_KEY } })
      .then((res) => {
        const qs = res.data.results.sort((a, b) => a.question_helpfulness + b.question_helpfulness);
        const slicedQs = qs.slice(0, 4);
        setQ(slicedQs);
        setQuestions(qs);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => { // when component mounts get the data
    getData();
  }, []);

  useEffect(() => { // when expand is clicked expand or contract view
    if (questions && expandClicked) {
      setQ(questions);
    } else if (questions) {
      const slicedQs = questions.slice(0, 4);
      setQ(slicedQs);
    }
  }, [expandClicked]);

  const handleExpandQuestions = (e) => {
    e.preventDefault();
    if (questions && expandClicked) {
      setExpandClicked(true);
    } else if (questions) {
      setExpandClicked(false);
    }
  };

  return (
    <div>
      <div>{q.map((question) => <Question key={question.question_id} question={question} />)}</div>
      {questions.length > 4 ? <button type="button" onClick={handleExpandQuestions}>More Answered Questions</button> : null }
    </div>
  );
}

export default ListQA;
