
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login/Login.js'
import SignUp from "./components/Signup/Signup";
import Header from  './components/Header/Header';
function App() {
  return (
      <div className="App">
          <Header />
        <Routes>
              <Route path="/" element={<Home />} />  
              <Route path='/login' element={<Login />} />
              <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
