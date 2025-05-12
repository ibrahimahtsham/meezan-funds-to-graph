import { Navigate, Route, Routes } from "react-router-dom";
import GraphPage from "../pages/GraphPage";
import InvestmentsTracker from "../pages/InvestmentsTracker";

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GraphPage />} />
      <Route path="/investments" element={<InvestmentsTracker />} />
      {/* Redirect any unknown route to GraphPage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default ProtectedRoutes;
