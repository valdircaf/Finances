import './App.scss';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route';


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
