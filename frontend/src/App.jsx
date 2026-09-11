import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();
  return (
    <>
      <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
