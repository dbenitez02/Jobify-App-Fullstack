import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, DashboardLayout, Login, Register, Landing, Error, AddJob, AllJobs, Profile, Admin, Stats, EditJob } from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { loader as dasboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { action as editJobAction } from "./pages/EditJob";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminPageLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsPageLoader } from "./pages/Stats";

export const checkDefaultTheme = () => {
  const isDarkTheme = (localStorage.getItem('darkTheme') === 'true');
      document.body.classList.toggle('dark-theme', isDarkTheme);
      return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dasboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsPageLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminPageLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction
          },
        ]
      },
    ],
  },

]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;