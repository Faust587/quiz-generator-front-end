import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/AuthPages/SignUpPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { SignInPage } from "./pages/AuthPages/SignInPage";
import { GeneratorPage } from "./pages/GeneratorPage/GeneratorPage";

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
        <Route
          path="/quiz-generator"
          element={ <GeneratorPage /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
