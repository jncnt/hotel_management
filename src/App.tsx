import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Rooms } from './pages/Rooms';
import { Reservations } from './pages/Reservations';
import { Guests } from './pages/Guests';
import { Billing } from './pages/Billing';
import { Staff } from './pages/Staff';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="guests" element={<Guests />} />
          <Route path="billing" element={<Billing />} />
          <Route path="staff" element={<Staff />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
