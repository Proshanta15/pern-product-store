import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="min-h-screen bg-base-200 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
