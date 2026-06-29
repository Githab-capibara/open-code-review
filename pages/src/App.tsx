import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import BenchmarkPage from './pages/BenchmarkPage';
import QuickStartPage from './pages/QuickStartPage';
import DocsPage from './pages/DocsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage><FeaturesPage /></LandingPage>} />
      <Route path="/benchmark" element={<LandingPage><BenchmarkPage /></LandingPage>} />
      <Route path="/quickstart" element={<LandingPage><QuickStartPage /></LandingPage>} />
      <Route path="/docs" element={<LandingPage><DocsPage /></LandingPage>} />
    </Routes>
  );
};

export default App;
