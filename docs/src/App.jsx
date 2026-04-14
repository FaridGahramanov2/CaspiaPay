import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocsLayout from './components/layout/DocsLayout';
import Home from './pages/Home';
import Quickstart from './pages/Quickstart';
import Authentication from './pages/Authentication';
import Charges from './pages/Charges';
import Customers from './pages/Customers';
import Payouts from './pages/Payouts';
import Merchants from './pages/Merchants';
import Webhooks from './pages/Webhooks';
import Connect from './pages/Connect';
import Testing from './pages/Testing';
import SDKs from './pages/SDKs';
import Security from './pages/Security';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<DocsLayout />}>
          <Route path="/quickstart" element={<Quickstart />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/webhooks" element={<Webhooks />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/sdks" element={<SDKs />} />
          <Route path="/security" element={<Security />} />
        </Route>
      </Routes>
    </Router>
  );
}
