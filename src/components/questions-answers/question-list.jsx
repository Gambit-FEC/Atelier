import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalStore';
import { API_KEY, API_URL } from './config';
import Question from './question-tile';

function ListQA() {
  // gets data for questions from api
  // gets data for answers from api
  // organizes data into QA tiles and passes data into a QA-Tile component for each tile
  const { productId } = useGlobalContext();
  const [questions, setQuestions] = useState([]);
  const [q, setQ] = useState([]);
  const [expandClicked, setExpandClicked] = useState(false);

  const getData = () => {
    axios.get(`${API_URL}qa/questions`, { params: { product_id: productId }, headers: { Authorization: API_KEY } })
      .then((res) => {
        const qs = res.data.results;
        const sortedQs = qs.sort((a, b) => a.question_helpfulness + b.question_helpfulness);
        setQuestions(sortedQs);
        return sortedQs;
      })
      .then((data) => {
        // console.log(data, 'data in question list');
        const slicedQs = data.slice(0, 4);
        setQ(slicedQs);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => { // when component mounts get the data
    getData();
  }, []);

  useEffect(() => {
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

  // console.log(questions, 'questions');
  // console.log(q, 'q in question list');

  return (
    <div>
      <div>{q.map((question) => <Question key={question.question_id} question={question} />)}</div>
      <button type="button" onClick={handleExpandQuestions}>Expand Questions</button>
    </div>
  );
}

export default ListQA;
