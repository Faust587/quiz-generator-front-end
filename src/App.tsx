import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/AuthPages/SignUpPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { SignInPage } from "./pages/AuthPages/SignInPage";

function App() {

  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-up"
          element={ <SignUpPage /> }
        />
        <Route
          path="/sign-in"
          element={ <SignInPage /> }
        />
        <Route
          path="/main-page"
          element={ <MainPage /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
