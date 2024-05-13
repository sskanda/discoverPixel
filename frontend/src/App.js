import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/places/new" element={<NewPlaces />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
