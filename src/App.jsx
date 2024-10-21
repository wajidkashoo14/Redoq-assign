import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Form = lazy(() => import("./pages/Form"));
const ReusableImage = lazy(() => import("./pages/Image"));
const Table = lazy(() => import("./pages/Table"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/image-upload" element={<ReusableImage />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
