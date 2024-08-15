import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Login from './components/Login/Login';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/users",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
