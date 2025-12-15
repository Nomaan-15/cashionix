import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuyPhones from './pages/BuyPhones';
import BuyLaptops from './pages/BuyLaptops';
import Sell from './pages/Sell';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/buy/phones" element={<BuyPhones />} />
            <Route path="/buy/laptops" element={<BuyLaptops />} /> */}
            <Route path="/sell" element={<Sell />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;