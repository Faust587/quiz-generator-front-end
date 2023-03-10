import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUpPage } from './pages/AuthPages/SignUpPage'
import { MainPage } from './pages/MainPage/MainPage'
import { SignInPage } from './pages/AuthPages/SignInPage'
import { GeneratorPage } from './pages/GeneratorPage/GeneratorPage'
import { RootPage } from './pages/RootPage/RootPage'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import { QuizPage } from './pages/QuizPage/QuizPage'
import { QuizLayout } from "./layouts/QuizLayout";

function App () {
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
          path="/quiz"
          element={<QuizLayout><QuizPage/></QuizLayout>}
        />
        <Route
          path="/error"
          element={<ErrorPage/>}
        />
        <Route
          path="*"
          element={<h1>404</h1>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
