import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignUpPage} from "./pages/AuthPages/SignUpPage";
import {MainPage} from "./pages/MainPage/MainPage";
import {SignInPage} from "./pages/AuthPages/SignInPage";
import {GeneratorPage} from "./pages/GeneratorPage/GeneratorPage";
import {RootPage} from "./pages/RootPage/RootPage";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {QuizPage} from "./pages/QuizPage/QuizPage";

function App() {

  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RootPage/>}
        />
        <Route
          path="/sign-up"
          element={<SignUpPage/>}
        />
        <Route
          path="/sign-in"
          element={<SignInPage/>}
        />
        <Route
          path="/main-page"
          element={<MainPage/>}
        />
        <Route
          path="/quiz-generator/:id"
          element={<GeneratorPage/>}
        />
        <Route
          path="/quiz/:code"
          element={<QuizPage/>}
        />
        <Route
          path="/error"
          element={<ErrorPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
