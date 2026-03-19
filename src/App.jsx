import { Helmet } from "react-helmet-async";
import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

/* ORIGINAL IMPORTS (kept as requested) */
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
import Contact from "./pages/Contact";

/* ✅ PERFORMANCE IMPROVEMENT ADDED
   Lazy loading for better initial load speed
*/
const LazyAdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LazyAdmin = lazy(() => import("./pages/Admin"));
const LazyChannel = lazy(() => import("./pages/Channel"));
const LazyHome = lazy(() => import("./pages/Home"));
const LazyWatch = lazy(() => import("./pages/Watch"));
const LazyArticle = lazy(() => import("./pages/Article"));
const LazyAbout = lazy(() => import("./pages/About"));
const LazyTechnology = lazy(() => import("./pages/Technology"));
const LazyTechnologyArticle = lazy(() => import("./pages/TechnologyArticle"));
const LazyPrivacy = lazy(() => import("./pages/Privacy"));

function App() {
  return (
    <div className="app">

      {/* SEO META */}
      <Helmet>
        <title>ArenaPulse – Breaking News & Live Sports</title>
        <meta
          name="description"
          content="ArenaPulse brings breaking world news, trending stories, and live sports channels in one place."
        />

        {/* ✅ SEO IMPROVEMENT ADDED */}
        <link rel="canonical" href="https://arenapulse.site/" />

        {/* ✅ SOCIAL SEO */}
        <meta property="og:site_name" content="ArenaPulse" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* LOGO */}
      <h1 className="site-logo">
        {/* ✅ SEO + UX improvement */}
        <Link to="/">ArenaPulse</Link>
      </h1>

      {/* NAVIGATION */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/technology">Tech</Link>
        <Link to="/Channel">Channel</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* ✅ PERFORMANCE IMPROVEMENT ADDED */}
      <Suspense fallback={<div className="loading">Loading...</div>}>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/Channel" element={<LazyChannel />} />
          <Route path="/watch/:id" element={<LazyWatch />} />
          <Route path="/article/:slug" element={<LazyArticle />} />
          <Route path="/admin" element={<LazyAdmin />} />
          <Route path="/admin-dashboard" element={<LazyAdminDashboard />} />
          <Route path="/about" element={<LazyAbout />} />
          <Route path="/technology" element={<LazyTechnology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tech/:slug" element={<LazyTechnologyArticle />} />
          <Route path="/privacy" element={<LazyPrivacy />} />
        </Routes>

      </Suspense>

      <Footer />
    </div>
  );
}

export default App;