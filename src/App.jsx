import { Helmet } from "react-helmet-async";
import { Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Article from "./pages/Article";
import About from "./pages/About";
import Technology from "./pages/Technology";
import TechnologyArticle from "./pages/TechnologyArticle";
import Footer from "./components/Footer";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <div className="app">

      <Helmet>
        <title>ArenaPulse – Breaking News & Live Sports</title>
        <meta
          name="description"
          content="ArenaPulse brings breaking world news, trending stories, and live sports channels in one place."
        />
      </Helmet>

      <h1 className="site-logo">ArenaPulse</h1>

      {/* NAVIGATION */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/technology">Tech</Link>
        <Link to="/Channel">Channel</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Channel" element={<Channel />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/tech/:id" element={<TechnologyArticle />} />  
        <Route path="/privacy" element={<Privacy />} />      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
