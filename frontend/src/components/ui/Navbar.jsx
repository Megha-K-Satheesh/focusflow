
import {
  Brain,
  LogOut,
  Menu,
  Target,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/user/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboard = useSelector((state) => state.dashboard);

const hasActiveStudyPlan = !!dashboard?.studyPlan;
  const hasActiveInterview = !!dashboard?.activeInterview;

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-violet-600"
        : "text-gray-600 hover:text-gray-900"
    }`;

  const closeMenu = () => setMobileMenuOpen(false);

  const handleStudyPlan = () => {
    closeMenu();

    navigate(
      hasActiveStudyPlan
        ? "/view-study-plan"
        : "/create-study-plan"
    );
  };

  const handleInterview = () => {
    closeMenu();

    navigate(
      hasActiveInterview
        ? "/interview-history"
        : "/interview-start"
    );
  };

  const handleLogout = () => {
    closeMenu();

    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/dashboard"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Target className="absolute h-8 w-8 text-violet-300/40" />
            <Brain className="relative h-5 w-5 text-white" />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              FocusFlow
            </h1>

            <p className="text-xs text-gray-500">
              Stay Focused. Keep Growing.
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink end to="/dashboard" className={navLinkClass}>
            Home
          </NavLink>

          <button
            onClick={handleStudyPlan}
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Study Plan
          </button>

          <button
            onClick={handleInterview}
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Interviews
          </button>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4">
          <NavLink
            end
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Home
          </NavLink>

          <button
            onClick={handleStudyPlan}
            className="rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Study Plan
          </button>

          <button
            onClick={handleInterview}
            className="rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Interviews
          </button>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            About
          </NavLink>

          <div className="my-3 border-t border-gray-200" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
