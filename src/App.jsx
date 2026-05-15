import { Helmet } from "react-helmet-async";
import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

/* Lazy loading for better initial load speed */
const LazyAdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LazyAdmin = lazy(() => import("./pages/Admin"));
const LazyHome = lazy(() => import("./pages/Home"));
const LazyArticle = lazy(() => import("./pages/Article"));
const LazyAbout = lazy(() => import("./pages/About"));
const LazyTechnology = lazy(() => import("./pages/Technology"));
const LazyTechnologyArticle = lazy(() => import("./pages/TechnologyArticle"));
const LazyPrivacy = lazy(() => import("./pages/Privacy"));
const LazyWatches = lazy(() => import("./pages/Watches"));
const LazyWatchesArticle = lazy(() => import("./pages/WatchesArticle")); // ✅ ADDED

import Footer from "./components/Footer";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="app">

      {/* SEO META */}
      <Helmet>
        <title>ArenaPulse – AI - Technology Information & Watches </title>
        <meta
          name="description"
          content="ArenaPulse brings breaking world news, trending stories, and live sports channels in one place."
        />
        <link rel="canonical" href="https://arenapulse.site/" />

        {/* SOCIAL SEO */}
        <meta property="og:site_name" content="ArenaPulse" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HEADER */}
      <header>
        <h1 className="site-logo">
          <Link to="/">ArenaPulse</Link>
        </h1>

        <nav className="nav" aria-label="Main Navigation">
          <Link to="/">Home</Link>
          <Link to="/technology">Tech</Link>
          <Link to="/watches">Watches</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/article/:slug" element={<LazyArticle />} />
          <Route path="/admin" element={<LazyAdmin />} />
          <Route path="/admin-dashboard" element={<LazyAdminDashboard />} />
          <Route path="/about" element={<LazyAbout />} />
          <Route path="/technology" element={<LazyTechnology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tech/:slug" element={<LazyTechnologyArticle />} />
          <Route path="/privacy" element={<LazyPrivacy />} />
          <Route path="/watches" element={<LazyWatches />} />
          <Route path="/watches/:slug" element={<LazyWatchesArticle />} /> {/* ✅ FIXED */}
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;