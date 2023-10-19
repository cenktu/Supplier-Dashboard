import {React, useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import LineChart from './LineChart';
import { useParams } from 'react-router-dom';
import './MonthlySalesGraph.css'


function MonthlySalesGraph() {
  const {vendorId} = useParams(); // get the vendor id 
  const [vendorName, setVendorName] = useState('');
  const [monthlyData, setMonthlyData]= useState([]);
  const [loading,setLoading] =useState(true);
  

  useEffect(() => {
    // fetch vendor data to get vendor name
    fetch(`/vendors/${vendorId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setVendorName(data.data.vendor.name);
        }
      })
      .catch((error) => {
        console.error('Error fetching vendor data:', error);
      });

    // fetch orders data
    fetch(`/orders/products/monthly/${vendorId}`)
      .then((response) => response.json())
      .then((data) => {
        
        setMonthlyData(data.data.salesData);
        const fetchData = data;
        setLoading(false);
        console.log('payment date data :',fetchData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [vendorId]);

  // calculate total sales for each month
  function getMonthlySales(data) {
    const monthlyTotals = {};
    const order = ['Ekim','Kasım','Aralık','Ocak', 'Şubat', 'Mart'];
    // initially all months equals to 0
    order.forEach((month) => {
      monthlyTotals[month] = 0;
    });
    // 
    data.forEach((product) => {
      for (const monthData of product.paymentDate) {
        for (const month in monthData) {
          // if there exists a month, add the amount
          if (monthlyTotals[month]) {
            monthlyTotals[month] += monthData[month];
          } else {
            // if not exists, create it (should remain 0 as initial)
            monthlyTotals[month] = monthData[month];
          }
        }
      }
    });
    

    // sort the months based on the chronologic order
    const sortedMonthlyTotals = Object.fromEntries(
      Object.entries(monthlyTotals).sort(
        (a, b) => order.indexOf(a[0]) - order.indexOf(b[0])
      )
    );
    return sortedMonthlyTotals;
  }

  return (
    <div className="graph">
      <h2>Last 6 Month Sales for Vendor: {vendorName}</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="chart" >
          <LineChart monthlyTotals={getMonthlySales(monthlyData)} />
        </div>
      )}

    </div>
  );
}

export default MonthlySalesGraph;