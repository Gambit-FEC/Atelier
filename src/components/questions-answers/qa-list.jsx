import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalStore';
import { API_KEY, API_URL } from './config';

function ListQA() {
  // gets data for questions from api
  // gets data for answers from api
  // organizes data into QA tiles and passes data into a QA-Tile component for each tile
  const { productId } = useGlobalContext();
  console.log(productId);

  axios.get(`${API_URL}qa/questions`, { params: { product_id: productId }, headers: { Authorization: API_KEY } })
    .then((res) => {
      console.log(res.data, 'res.data');
    })
    .catch((err) => {
      alert(err);
    });
}

export default ListQA;
