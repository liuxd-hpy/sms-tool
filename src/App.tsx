import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Templates from "@/pages/Templates";

export default function App() {
  return (
    <Router basename="/sms-tool">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
}
