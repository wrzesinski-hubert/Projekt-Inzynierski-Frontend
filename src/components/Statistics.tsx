import React, { useState, useContext } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { ReactComponent as Expand } from '../assets/expand.svg';
import { Course, Group, GroupType } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMemo } from 'react';
import { dayMapping } from '../constants';

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
background-color:white;
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;
  padding:2px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
`;

const StatisticNumber = styled.p`
  font-size: 52px;
  margin-top: 40px;
  margin-bottom:0px;
`;

const StatisticText = styled.p`
  font-size: 18px;
  text-align:center;
  align-items:center;
  justify-content:center;
`;

export const Statistics = () => {
  return (
    <StatisticsWrapper>
      <Row>
        <StatisticBox>
          <StatisticNumber>65</StatisticNumber>
          <StatisticText>Utworzonych grup</StatisticText>
        </StatisticBox>
        <StatisticBox>
          {' '}
          <StatisticNumber>280</StatisticNumber>
          <StatisticText>Zapisanych studentów do grup</StatisticText>
        </StatisticBox>
        <StatisticBox>
          {' '}
          <StatisticNumber>24</StatisticNumber>
          <StatisticText>Studentów niezapisanych do żadnej grupy</StatisticText>
        </StatisticBox>
      </Row>
      <Row>
        <StatisticBox>
          {' '}
          <StatisticNumber>150</StatisticNumber>
          <StatisticText>Studentów z zaakceptowanym planem</StatisticText>
        </StatisticBox>
        <StatisticBox>
          {' '}
          <StatisticNumber>130</StatisticNumber>
          <StatisticText>Studentów bez zaakceptowanego pełengo planu</StatisticText>
        </StatisticBox>
        <StatisticBox>
          {' '}
          <StatisticNumber>0</StatisticNumber>
          <StatisticText>Zamkniętych grup</StatisticText>
        </StatisticBox>
      </Row>
    </StatisticsWrapper>
  );
};
