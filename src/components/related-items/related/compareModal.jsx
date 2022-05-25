import React, { useEffect, useState, useSyncExternalStore } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa'
import { useGlobalContext } from '../../../context/GlobalStore';

function compareModal ({value}) {
  const { productId } = useGlobalContext();
  console.log('hello');
  console.log('COMPARE MODAL VALUE: ', value)
  let relatedData = []; // related product values
  let currentData = []; // current displayed product values
  const [relatedInfo, setRelatedInfo] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  let valueData = []; // both product values
  const [resultData, setResultData] = useState([]);

  async function getRelatedProductInfo() {
    let result = await axios.get(`/products/${value}`)
    for (var i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value === null) {
        continue
      } else {
        relatedData.push(result.data[0].features[i].value)
      }
    }
    setRelatedInfo(relatedData);
    for (var i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value === null) {
        continue
      } else {
      valueData.push(result.data[0].features[i].value)
      }
    }
  }

  async function getCurrentProductInfo() {
    let result = await axios.get(`/products/${productId}`)
    for (var i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value === null) {
        continue
      } else {
      currentData.push(result.data[0].features[i].value)
      }
    }
    setCurrentInfo(currentData);
    for (var i = 0; i < result.data[0].features.length; i++) {
      if (result.data[0].features[i].value === null) {
        continue
      } else {
      if (resultData.indexOf(result.data[0].features[i].value) < 0)
      valueData.push(result.data[0].features[i].value)
      }
    }
  }

  async function callBothFunctions() {
    await getRelatedProductInfo();
    await getCurrentProductInfo();
    setResultData(valueData);
  }

  function checkIfRelatedHasCharacteristics(theCharacteristicToCheckFor){
    let index = relatedInfo.indexOf(theCharacteristicToCheckFor)
    console.log('CHARACTERISTIC: ', theCharacteristicToCheckFor)
    console.log('RELATED INFO: ', relatedInfo);
    console.log('INDEX', index);

    if(index > -1){
      return true;
    }
    else{
      return false;
    }
  }

  function currentProductCharacteristics(theCharacteristicToCheckFor){
    let index = currentInfo.indexOf(theCharacteristicToCheckFor)
    console.log('INDEX', index);

    if(index > -1){
      return true;
    }
    else{
      return false;
    }
  }

  useEffect(() => {
    // getRelatedProductInfo()
    // getCurrentProductInfo()
    // setResultData(valueData);
    callBothFunctions();
  }, []);





  return (
   <table className="table-component">
     <thead>
       <tr>
         <th>Related Product</th>
         <th>Characteristic</th>
         <th>Current Product</th>
       </tr>
     </thead>
    <tbody className="table-body">
     {
       resultData.map((characteristic, index) => {
         console.log('MAPPED : ', characteristic);
         return (
        <tr className="table-row" key={index}>
          <td>{checkIfRelatedHasCharacteristics(characteristic) ? <FaCheck /> : ''}</td>
          <td>{characteristic}</td>
          <td>{currentProductCharacteristics(characteristic) ? <FaCheck /> : ''}</td>
        </tr>
         )
       })
      }
      </tbody>
    </table>

  )
}

export default compareModal;