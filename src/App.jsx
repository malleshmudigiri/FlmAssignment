import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompaniesPage from "./Pages/CompaniesPage";
import CompanyDetails from "./Pages/CompanyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompaniesPage />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
