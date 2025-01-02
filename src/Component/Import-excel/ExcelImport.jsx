import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import './ExcelImport.css';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../sidebar/SidebarComponent';
import axios from 'axios';

const ExcelImport = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { title } = location.state || {};

  const asset = [
    { value: 'name', label: 'name' },
    { value: 'sku', label: 'sku' },
    { value: 'assetTag', label: 'assetTag' },
    { value: 'category', label: 'category' },
    { value: 'model', label: 'model' },
    { value: 'brand', label: 'brand' },
    { value: 'serialNumber', label: 'serialNumber' },
    { value: 'quantity', label: 'quantity' },
    { value: 'vendor', label: 'vendor' },
  ];

  const employee = [
    { value: 'name', label: 'name' },
    { value: 'emp_id', label: 'emp_id' },
    { value: 'department', label: 'department' },
    { value: 'dateofjoin', label: 'dateofjoin' },
    { value: 'skillset', label: 'skillset' },
    { value: 'email', label: 'email' },
    { value: 'phone', label: 'phone' },
    { value: 'password', label: 'password' },
  ];

  const [columnMapping, setColumnMapping] = useState({});
  const [dbColumns] = useState(title === 'Stock' ? asset : employee);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    // Validate file type
    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.split('.').pop();
    if (!validExtensions.includes(`.${fileExtension}`)) {
      console.error("Invalid file type. Please upload an Excel file.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      setData(jsonData);
    };
    
    reader.readAsBinaryString(file);
  };
  const handleMappingChange = (columnIndex, selectedOption) => {
    setColumnMapping((prev) => ({
      ...prev,
      [columnIndex]: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleSubmit = async () => {
    const mappedData = data.slice(1).map((row) => {
      const mappedRow = {};
      for (let i = 0; i < row.length; i++) {
        const dbColumn = columnMapping[i];
        if (dbColumn) {
          mappedRow[dbColumn] = row[i];
        }
      }
      return mappedRow;
    });

    try {
      if (title === 'Employee') {
        for (const currentEmployee of mappedData) {
          const formData = new FormData();
          Object.entries(currentEmployee).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const response = await axios.post(
            'https://nissicmms.digidiary.in/api/emp_api.php',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );

          if (response.data.message) {
            console.log('Employee created successfully:', response.data.message);
          } else {
            console.error('Error creating employee:', response.data.error);
          }
        }
      } else if (title === 'Stock') {
        for (const currentAsset of mappedData) {
          const formData = new FormData();
          Object.entries(currentAsset).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const response = await axios.post(
            'https://nissicmms.digidiary.in/api/assets_api.php',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );

          if (response.status === 200 || response.status === 201) {
            console.log('Asset added/updated successfully');
          } else {
            console.error('Error submitting asset data:', response.data.error);
          }
        }
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <>
      <div className="excelimport">
        <SidebarComponent />
        <div className="main-content">
          <h3>Add {title}</h3>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          {data.length > 0 && (
            <div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      {data[0].map((col, index) => (
                        <th key={index}>
                          <label htmlFor="">
                            <Select
                              options={dbColumns}
                              onChange={(selectedOption) =>
                                handleMappingChange(index, selectedOption)
                              }
                              isClearable
                              styles={{
                                container: (base) => ({ ...base, width: '150px' }),
                              }}
                            />
                          </label>
                          <br />
                          <br />
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="ex-btn" onClick={handleSubmit}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExcelImport;
