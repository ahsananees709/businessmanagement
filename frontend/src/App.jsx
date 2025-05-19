import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Otp from "./Pages/Otp";
import ResetPassword from "./Pages/ResetPassword";
import AcceptInvitationPage from "./Pages/InviteAccept";
import "./styles/global.css";

// Components
import Dashboard from "./Components/Dashboard";
import Members from "./Components/Members";
import GroupMembers from "./Components/GroupMembers";
import FramMembers from "./Components/FramMembers";
import Projects from "./Components/Projects";
import ClientDashboard from "./Components/ClientDashboard";
import ChatMessage from "./Components/ChatMessage";
import PageNotFound from "./Pages/Error";
import UserVerification from "./Pages/verifyAccount";
// Setting
import Settings from "./Settings/Settings";
import MemberRoles from "./Settings/MemberRoles";
import Notifications from "./Settings/Notifications";
import Permissions from "./Settings/Permissions";
import DangerZone from "./Settings/DangerZone";
import BusinessInfo from "./Components/BusinessDetails";
function App() {
  return (
    <Router>
      <Routes>
        {/* pages */}
        <Route path="/" element={<SignUpPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/userverification" element={<UserVerification />} />

        {/* Components */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members/:businessId" element={<Members />} />
        <Route path="/groupMembers/:businessId" element={<GroupMembers />} />
        <Route path="/framMembers/:businessId" element={<FramMembers />} />
        <Route path="/businessDetails/:businessId" element={<BusinessInfo />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/clientdashboard/:businessId"
          element={<ClientDashboard />}
        />
        <Route path="/chatmessage/:businessId" element={<ChatMessage />} />
        <Route
          path="/invite/accept/:token"
          element={<AcceptInvitationPage />}
        />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/memberroles" element={<MemberRoles />} />
        <Route path="/settings/notifications" element={<Notifications />} />
        <Route path="/settings/permissions" element={<Permissions />} />
        <Route path="/settings/dangerzone" element={<DangerZone />} />

        {/* 404 page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
