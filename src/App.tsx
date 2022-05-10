import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/new" element={<NewRoom />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
