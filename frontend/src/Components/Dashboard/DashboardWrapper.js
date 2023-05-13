// Components/DashboardWrapper.js
import React, { useState } from 'react';
import { MainLayout } from '../../styles/Layouts';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';

const DashboardWrapper = () => {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </>
  );
};

export default DashboardWrapper;
