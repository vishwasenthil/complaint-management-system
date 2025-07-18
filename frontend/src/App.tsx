import React, { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import SubmitForm from './SubmitForm.tsx';
import AdminDashboard from './AdminDashboard.tsx';
import './App.css';
import './index.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/submit" replace/>} />
        <Route path="/submit" element={<SubmitForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
