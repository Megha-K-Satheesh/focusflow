import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/ui/Footer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Navbar from "../../components/ui/Navbar";
import ProgressBar from "../../components/ui/ProgressBar";
import { getStudyPlan, markTaskCompleted } from "../../redux/slices/user/studyPlanSlice";
import { showError, showSuccess } from "../../utils/toast";


function ViewStudyPlan() {
const dispatch = useDispatch();

const { studyPlan, loading, error ,
  progress,
  completedTasks,
  totalTasks,} = useSelector(
(state) => state.studyPlan
);

const [selectedDay, setSelectedDay] = useState(null);

useEffect(() => {
dispatch(getStudyPlan());
}, [dispatch]);



useEffect(() => {
  if (studyPlan?.days?.length) {
    setSelectedDay((prev) => {
      if (!prev) return studyPlan.days[0];

      return (
        studyPlan.days.find(
          (d) => d._id === prev._id
        ) || studyPlan.days[0]
      );
    });
  }
}, [studyPlan]);
const handleTaskComplete =async (taskId) => {
  try {
    
    await dispatch(markTaskCompleted(taskId)).unwrap()
    showSuccess("Task status updated successfully")
  } catch (error) {
    showError(error)
  }
    
};

if (loading) {
return ( <div >
<LoadingSpinner/> </div>
);
}

if (error) {
return ( <div className="min-h-screen flex items-center justify-center text-red-500">
{error} </div>
);
}

if (!studyPlan) {
return ( <div className="min-h-screen flex items-center justify-center text-gray-500">
No Active Study Plan Found </div>
);
}

return (
  <>
  <Navbar/>
   <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 mt-12"> 
<div className="max-w-7xl mx-auto p-6">


    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
      <h1 className="text-4xl font-bold text-purple-800">
        {studyPlan.title}
      </h1>

      <div className="flex gap-6 mt-4 text-gray-600">
        <p>Goal: {studyPlan.goal}</p>
        <p>Duration: {studyPlan.duration} Days</p>
        <p>Status: {studyPlan.status}</p>
      </div>
    </div>

<ProgressBar

progress={progress}
  completedTasks={completedTasks}
  totalTasks={totalTasks}
  />

    <div className="grid lg:grid-cols-3 gap-6">

      <div className="bg-white rounded-3xl shadow-lg p-5">
        <h2 className="text-xl font-bold text-purple-700 mb-4">
          Roadmap
        </h2>

        <div className="space-y-3">
          {studyPlan.days.map((day) => (
            <button
              key={day._id}
              onClick={() => setSelectedDay(day)}
              className={`w-full text-left p-4 rounded-2xl transition-all ${
                selectedDay?._id === day._id
                  ? "bg-purple-600 text-white"
                  : "bg-purple-50 hover:bg-purple-100"
              }`}
            >
              <p className="font-semibold">
                Day {day.dayNumber}
              </p>

              <p className="text-sm truncate">
                {day.topic}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">

        {selectedDay && (
          <>
            <h2 className="text-3xl font-bold text-purple-800 mb-3">
              Day {selectedDay.dayNumber}
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              {selectedDay.topic}
            </p>

            <div className="space-y-5">
              {selectedDay.tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-purple-100 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={()=>handleTaskComplete(task._id)}
                      
                      className="w-5 h-5"
                    />

                    <h3 className="font-semibold text-purple-700">
                      {task.title}
                    </h3>
                  </div>

                  <p className="text-gray-600">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  </div>
</div>
<Footer/>
  </>


);
}

export default ViewStudyPlan;
