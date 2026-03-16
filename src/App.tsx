import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const shouldUseHashRouter =
  import.meta.env.VITE_USE_HASH_ROUTER === "true" ||
  (typeof window !== "undefined" && window.location.hostname.endsWith("github.io"));

const Router = shouldUseHashRouter ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
