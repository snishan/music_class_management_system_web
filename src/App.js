import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NoPage from "./pages/NoPage";
import LogingPage from "./pages/LoginPage/login";
import Dashboard from "./pages/Dashboard/dashboard";
import Layout from "./components/Layout/Layout";
import Studenets from "./pages/Students/Students";
import Teachers from "./pages/Teachers/Teachers";
import Classes from "./pages/Classess/Classes";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route key={"login"} path="/" element={<LogingPage />}/>
        <Route key={"portal"} path="/portal" element={<Layout />} >
          <Route key={"dashboard"} path="/portal/dashboard" element={<Dashboard />} />
          <Route key={"student"}  path="/portal/student" element={<Studenets />} />
          <Route key={"teacher"}  path="/portal/teacher" element={<Teachers />} />
          <Route key={"class"}  path="/portal/classes" element={<Classes />} />
      </Route>
      <Route path="*" element={<NoPage />} />
      
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}



