import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContext from "./Context.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-datepicker/dist/react-datepicker.css";
// import 'sassy-datepicker/dist/styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContext>
    <App />
  </AppContext>
);
