// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VerifyUrl from '../components/VerifyUrl';

// Routes
import Home from '../containers/Home';
import Menu from '../containers/Menu';
import SignInPhone from '../containers/SignInPhone';

function Index() {
  return (
    <Routes>
      <Route path="*" element={<VerifyUrl />} />
      <Route path="/:id/signin/phone" element={<SignInPhone />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/:id/menu" element={<Menu />} />
    </Routes>
  );
}
export default Index;
