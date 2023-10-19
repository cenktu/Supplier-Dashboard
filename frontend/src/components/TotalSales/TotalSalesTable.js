import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TotalSalesTable.css'; 

const TotalSalesTable = () => {
  const { vendorId } = useParams(); // get the vendor id 
  const [salesData, setSalesData] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [loading, setLoading] = useState(true);

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
    fetch(`/orders/products/${vendorId}`)
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data.data.salesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  }, [vendorId]);

  return (
    <div>
      <h2>Total Sales for Vendor: {vendorName}</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Total Amount Sold</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((product) => (
              <tr key={product.productName}>
                <td>{product.productName}</td>
                <td>{product.totalSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TotalSalesTable;
