import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

import KantinListesi from './components/KantinListesi';
import KutuphaneListesi from './components/KutuphaneListesi';
import YemekhaneListesi from './components/YemekhaneListesi';
import FakulteListesi from './components/FakulteListesi';
import FotokopiListesi from './components/FotokopiListesi';
import Yurtlar from './components/Yurtlar';
import Kulupler from './components/Kulupler';
import Danismanlar from './components/Danismanlar';
import Ulasim from './components/Ulasim';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kantinler" element={<KantinListesi />} />
        <Route path="/kutuphaneler" element={<KutuphaneListesi />} />
        <Route path="/yemekhaneler" element={<YemekhaneListesi />} />
        <Route path="/fakulteler" element={<FakulteListesi />} />
        <Route path="/fotokopi" element={<FotokopiListesi />} />
        <Route path="/yurtlar" element={<Yurtlar />} />
        <Route path="/kulupler" element={<Kulupler />} />
        <Route path="/danismanlar" element={<Danismanlar />} />
        <Route path="/ulasim" element={<Ulasim />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
