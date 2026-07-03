import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../components/ui/Footer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Navbar from "../../components/ui/Navbar";

import CurrentStudyPlanCard from "../../components/dashboard/CurrentStudyPlanCard";
import InterviewCard from "../../components/dashboard/InterviewCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import StatsCards from "../../components/dashboard/StatsCards";
import WelcomeHero from "../../components/dashboard/WelcomeHero";

import { getDashboard } from "../../redux/slices/user/dashboardSlice";

function Home() {
  const dispatch = useDispatch();

 const dashboard = useSelector((state) => state.dashboard);
const { loading, error } = dashboard;

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-violet-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 pt-24 pb-16 mt-10">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <WelcomeHero dashboard={dashboard} />

          <StatsCards dashboard={dashboard} />

          <QuickActions dashboard={dashboard} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <CurrentStudyPlanCard dashboard={dashboard} />
            </div>

            <InterviewCard dashboard={dashboard} />
          </div>

          <RecentActivity dashboard={dashboard} />

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;


