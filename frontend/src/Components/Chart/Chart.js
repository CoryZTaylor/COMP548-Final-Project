import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

const toLabelFormat = (date) => dateFormat(date);

function Chart() {
    const { incomes, expenses } = useGlobalContext();
  
    // Create a set of all dates from incomes and expenses
    const allDatesSet = new Set([
      ...incomes.map((inc) => toLabelFormat(inc.date)),
      ...expenses.map((exp) => toLabelFormat(exp.date)),
    ]);
  
    // Sort and convert to array
    const allDatesArray = Array.from(allDatesSet).sort();
  
    // For each date, calculate sum of incomes and expenses
    const incomeData = allDatesArray.map((date) => {
      return incomes
        .filter((inc) => toLabelFormat(inc.date) === date)
        .reduce((sum, inc) => sum + inc.amount, null);
    });
  
    const expenseData = allDatesArray.map((date) => {
      return expenses
        .filter((exp) => toLabelFormat(exp.date) === date)
        .reduce((sum, exp) => sum + exp.amount, null);
    });
  
    const data = {
      labels: allDatesArray,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "green",
          tension: 0.2,
          spanGaps: true
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "red",
          tension: 0.2,
          spanGaps: true
        },
      ],
    };
  
    return (
      <ChartStyled>
        <Line data={data} />
      </ChartStyled>
    );
  }  

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
`;

export default Chart