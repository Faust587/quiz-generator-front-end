import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {SignUpPage} from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
