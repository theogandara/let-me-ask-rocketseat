import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/new" element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
