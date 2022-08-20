import "./App.css";
import RootRoute from "./routes/RootRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

function App() {

  return (
    <>
      <RootRoute />
      <TawkMessengerReact
        propertyId="62e4f9a737898912e9605b50"
        widgetId="1g976uejs" />
      <ToastContainer />
    </>
  );
}

export default App;
