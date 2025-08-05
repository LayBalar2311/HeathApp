import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login'; // Adjust path if needed
import AdminPanel from './AdminPanel'; // Adjust path if needed

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;