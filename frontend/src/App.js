
import './App.css';
import PrivateRoute from './component/PrivateRoute';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Post from './component/Post';

function App() {

  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PrivateRoute element={<Post />} />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
