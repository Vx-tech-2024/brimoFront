import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/team-members":
        return "Team Members";
      case "/loans":
        return "Loan Management";
      case "/target":
        return "Agent Targets";
      case "/performance":
        return "Performance Tracker";
      case "/reports":
        return "Reports";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">{getTitle()}</h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}