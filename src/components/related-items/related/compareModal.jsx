import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useGlobalContext } from '../../../context/GlobalStore';

function compareModal({ value }) {
  const { productId } = useGlobalContext();
  const relatedData = [];
  const currentData = [];
  const valueData = [];
  const [relatedInfo, setRelatedInfo] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [relatedName, setRelatedName] = useState('');

  async function getRelatedProductInfo() {
    const result = await axios.get(`/products/${value}`);
    setRelatedName(result.data[0].name);
    for (let i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value !== null) {
        relatedData.push(result.data[0].features[i].value);
      }
    }
    setRelatedInfo(relatedData);
    for (let i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value !== null) {
        valueData.push(result.data[0].features[i].value);
      }
    }
  }

  async function getCurrentProductInfo() {
    const result = await axios.get(`/products/${productId}`);
    setCurrentName(result.data[0].name);
    for (let i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value !== null) {
        currentData.push(result.data[0].features[i].value);
      }
    }
    setCurrentInfo(currentData);
    for (let i = 0; i < result.data[0].features.length; i++) {
      if (resultData.indexOf(result.data[0].features[i].value) < 0) {
        if (result.data[0].features[i].value !== null) {
          valueData.push(result.data[0].features[i].value);
        }
      }
    }
  }

  async function callBothFunctions() {
    await getRelatedProductInfo();
    await getCurrentProductInfo();
    setResultData(valueData);
  }

  function checkIfRelatedHasCharacteristics(theCharacteristicToCheckFor) {
    const index = relatedInfo.indexOf(theCharacteristicToCheckFor);

    if (index > -1) {
      return true;
    }
    return false;
  }

  function currentProductCharacteristics(theCharacteristicToCheckFor) {
    const index = currentInfo.indexOf(theCharacteristicToCheckFor);

    if (index > -1) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    callBothFunctions();
  }, []);

  return (
    <StyledTable className="table-component">
      <thead>
        <tr>
          <th>{relatedName}</th>
          <th>Characteristic</th>
          <th>{currentName}</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {
          resultData.map((characteristic, index) => (
            <tr className="table-row" key={index}>
              <td>{checkIfRelatedHasCharacteristics(characteristic) ? <FaCheck /> : ''}</td>
              <td>{characteristic}</td>
              <td>{currentProductCharacteristics(characteristic) ? <FaCheck /> : ''}</td>
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  );
}

export default compareModal;

const StyledTable = styled.table`
width: 100%;
border: 4px solic black;
border-collapse: collapse;
th,
td {
  border 2px solid black;
  border-collapse: collapse;
}
th,
td,
tr {
  padding: 10px;
}
th {
  text-align: center;
}
`;
