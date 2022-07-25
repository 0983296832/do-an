import "./App.css";
import RootRoute from "./routes/RootRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <RootRoute />
      <ToastContainer />
    </div>
  );
}

export default App;
