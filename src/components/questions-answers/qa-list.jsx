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

  const getData = () => {
    axios.get(`${API_URL}qa/questions`, { params: { product_id: productId }, headers: { Authorization: API_KEY } })
      .then((res) => {
        // console.log(res.data, 'res.data');
        // console.log(res.data.results, 'res.data.results');
        // setQuestions(res.data.results); // set new value of questions
        setQuestions(res.data.results);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => { // when component mounts get the data
    getData();
  }, []);

  console.log(questions, 'questions');

  return (
    <div>{questions.map((question) => <Question question={question} />)}</div>
  );
}

export default ListQA;
