import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Navbar from "./components/main/Header";
import Main from "./components/main/Main";
import ScrollTop from "./components/main/ScrollTop";
import Footer from "./components/main/Footer";

import "./index.css";

const App = () => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <div style={{ flexGrow: "2", alignContent: "center" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            {/*<Route path="/user/*" element={<PrivateRoute allowedRoles={['user', 'admin']}>
              <Routes>
                <Route path="*" element={<Error />}></Route>
              </Routes>
            </PrivateRoute>} />
            <Route path="/admin/*" element={<PrivateRoute allowedRoles={['admin']}>
              <Routes>
                <Route path="*" element={<Error />}></Route>
              </Routes>
            </PrivateRoute>} />*/}
          </Routes>
        </div>
        <Footer />
        <ScrollTop />
      </Router>
    </div>
  );
};

export default App;
