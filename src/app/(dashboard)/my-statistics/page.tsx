


















import StatsHeader from "./_components/stats-header";



export default function page() {
  return (
    <div>
      <StatsHeader />
    </div>
  );
}



// import { useStatistics } from '@/lib/hooks/useStatistics';
// // import { getUserProjects } from '@/lib/statistics';
// import { Project } from '@/lib/types/statistics';
// import { useEffect, useState } from 'react';
// import { StatisticsFilters } from './_components/StatisticsFilters';
// import { KPICards } from './_components/KPICards';
// import { WeeklyCalendar } from './_components/WeeklyCalendar';
// import { TasksDoughnutChart } from './_components/TasksDoughnutChart';
// import { ProjectsList } from './_components/ProjectsList';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { fetchProjects } from '@/redux/features/project/project';
// import { getAllProjects } from '@/lib/projects';
// // import { StatisticsFilters } from '@/components/statistics/StatisticsFilters';
// // import { KPICards } from '@/components/statistics/KPICards';
// // import { WeeklyCalendar } from '@/components/statistics/WeeklyCalendar';
// // import { TasksDoughnutChart } from '@/components/statistics/TasksDoughnutChart';
// // import { ProjectsList } from '@/components/statistics/ProjectsList';
// // import { useStatistics } from '@/hooks/useStatistics';
// // import { getUserProjects } from '@/services/statisticsService';
// // import { Project } from '@/types/statistics';

// export default function MyStatisticsPage() {
//   const {
//     filters,
//     calendarStats,
//     projectsTasks,
//     isLoading,
//     error2,
//     dateRangeError,
//     updateFilters,
//     fetchStatistics,
//   } = useStatistics();



//   const [projects, setProjects] = useState<Project[]>([]);

  
// useEffect(() => {
//   const fetchProjects = async () => {
//     try {
//       const res = await getAllProjects();

//       setProjects(res);

//       console.log("Fetched Projects:", res);
//     } catch (err) {
//       console.error("Error fetching projects:", err);
//     }
//   };

//   fetchProjects();
// }, []);

//   const handleApplyFilters = () => {
//     fetchStatistics();
//   };

//   if (isLoading && !calendarStats) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading statistics...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error2) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//             <p className="text-red-600 mb-2">Error loading statistics</p>
//             <p className="text-sm text-red-500">{error2}</p>
//             <button
//               onClick={fetchStatistics}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Statistics</h1>
//           <p className="text-gray-600">Track your task performance and team velocity</p>
//         </div>

//         <StatisticsFilters
//           filters={filters}
//           projects={projects}
//           dateRangeError={dateRangeError}
//           onUpdateFilters={updateFilters}
//           onApply={handleApplyFilters}
//         />

//         {calendarStats && (
//           <>
//             <KPICards
//               totalTasks={calendarStats.total_tasks}
//               completedTasks={calendarStats.done_tasks}
//               overdueTasks={calendarStats.overdue_tasks}
//             />

//             <div className="mb-6">
//               <WeeklyCalendar
//                dailyStats={calendarStats?.daily ?? []}
//   startDate={filters.startDate}
//   endDate={filters.endDate}
//               />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <TasksDoughnutChart totals={calendarStats.totals} />
//               <ProjectsList projects={projectsTasks} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// import StatsHeader from "./_components/stats-header";