import React, { useState, useContext, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { ReactComponent as Expand } from '../assets/expand.svg';
import { Course, Group, GroupType } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMemo } from 'react';
import { dayMapping } from '../constants';
import { axiosInstance } from '../utils/axiosInstance';
import { SyncLoader } from 'react-spinners';

const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StatisticBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20000;
  font-size: 0.65vw;
  line-height: normal;
  border-radius: 2px;
  width: 200px;
  height: 200px;
  margin: 5px;
  padding: 5px 5px 0 5px;
  text-align: center;
  background-color: #ffe485;
  box-shadow: 3px 3px 5px 0px rgba(189, 189, 189, 1);
`;

const StatisticNumber = styled.p`
  font-size: 52px;
  margin-top: 40px;
  margin-bottom: 0px;
`;

const StatisticText = styled.p`
  font-size: 18px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const Statistics = () => {
  const [createdGroupsNumber, setCreatedGroupsNumber] = useState('');
  const [fullGroupsNumber, setFullGroupsNumber] = useState('');
  const [registeredStudentsNumber, setRegisteredStudentsNumber] = useState('');
  const [notRegisteredStudentsNumber, setNotRegisteredStudentsNumber] = useState('');
  const [acceptedStudentsNumber, setAcceptedStudentsNumber] = useState('');
  const [partlyAcceptedStudentsNumber, setPartlyAcceptedStudentsNumber] = useState('');
  const [loaded, setLoaded] = useState(false);

  const getCreatedGroupsNumber = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/groups/created`);
      setCreatedGroupsNumber(data.ammount);
    } catch (e) {
      console.log(e);
    }
  };

  const getFullGroupsNumber = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/groups/full`);
      setFullGroupsNumber(data.ammount);
    } catch (e) {
      console.log(e);
    }
  };

  const getRegisteredStudentsNumber = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/groups/full`);
      setRegisteredStudentsNumber(data.ammount);
    } catch (e) {
      console.log(e);
    }
  };

  const getNotRegisteredStudentsNumber = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/groups/full`);
      setNotRegisteredStudentsNumber(data.ammount);
    } catch (e) {
      console.log(e);
    }
  };

  const getAcceptedStudentsNumber = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/groups/full`);
      setAcceptedStudentsNumber(data.ammount);
    } catch (e) {
      console.log(e);
    }
  };

  const getPartlyAcceptedStudentsNumber = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/groups/full`);
      setPartlyAcceptedStudentsNumber(data.ammount);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    Promise.all([
      getCreatedGroupsNumber(),
      getFullGroupsNumber(),
      getRegisteredStudentsNumber(),
      getNotRegisteredStudentsNumber(),
      getAcceptedStudentsNumber(),
      getPartlyAcceptedStudentsNumber(),
    ]).then(()=>{setLoaded(true);});

    
  }, []);

  return <StatisticsWrapper>{loaded === false ? <SyncLoader />:<><Row>
    <StatisticBox>
      <StatisticNumber>{createdGroupsNumber}</StatisticNumber>
      <StatisticText>Utworzonych grup</StatisticText>
    </StatisticBox>
    <StatisticBox>
      {' '}
      <StatisticNumber>{registeredStudentsNumber}</StatisticNumber>
      <StatisticText>Zapisanych studentów do grup</StatisticText>
    </StatisticBox>
    <StatisticBox>
      {' '}
      <StatisticNumber>{notRegisteredStudentsNumber}</StatisticNumber>
      <StatisticText>Studentów niezapisanych do żadnej grupy</StatisticText>
    </StatisticBox>
  </Row>
    <Row>
      <StatisticBox>
        {' '}
        <StatisticNumber>{acceptedStudentsNumber}</StatisticNumber>
        <StatisticText>Studentów z zaakceptowanym planem</StatisticText>
      </StatisticBox>
      <StatisticBox>
        {' '}
        <StatisticNumber>{partlyAcceptedStudentsNumber}</StatisticNumber>
        <StatisticText>Studentów bez zaakceptowanego pełengo planu</StatisticText>
      </StatisticBox>
      <StatisticBox>
        {' '}
        <StatisticNumber>{fullGroupsNumber}</StatisticNumber>
        <StatisticText>Grup z zajętymi wszystkimi miejscami</StatisticText>
      </StatisticBox>
    </Row></>}
  </StatisticsWrapper>;
};
