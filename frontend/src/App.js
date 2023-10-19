
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalSalesTable from './components/TotalSales/TotalSalesTable';
import MonthlySalesGraph from './components/MonthlySales/MonthlySalesGraph';

//<Route path="/sales/:vendorId" element={<TotalSalesTable />} />
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sales/:vendorId" element={<TotalSalesTable />} />
        <Route path="/sales/monthly/:vendorId" element={<MonthlySalesGraph />} />
      </Routes>
    </Router>
  );
}

export default App;
