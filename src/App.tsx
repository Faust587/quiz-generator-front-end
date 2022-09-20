import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
