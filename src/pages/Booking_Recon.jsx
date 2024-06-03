import React, { useState, useEffect } from 'react';
import { Divider, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchAirlines } from '../components/services/fetchAirlines'; // Correct path
import { fetchTableData } from '../components/services/fetchTableData'; // Correct path

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

const Refunds = () => {
  const [formData, setFormData] = useState({
    transactionId: '',
    bookingDate: '',
    bookingFrom: '',
    bookingTo: '',
    airline: '',
    paymentGateway: ''
  });
  const [airlines, setAirlines] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const getAirlines = async () => {
      try {
        const data = await fetchAirlines();
        setAirlines(data);
      } catch (error) {
        console.error('There was an error fetching the airlines!', error);
      }
    };
    getAirlines();
  }, []);

  const getTableData = async (formData) => {
    try {
      const formattedFormData = {
        ...formData,
        bookingDate: formatDate(formData.bookingDate),
        bookingFrom: formatDate(formData.bookingFrom),
        bookingTo: formatDate(formData.bookingTo)
      };
      
      const response = await fetchTableData(formattedFormData);
      
      console.log('Full Response:', response); // Log the full response object
      
      // Assuming the response is an array of objects
      const responseData = response; // No need to navigate further
      
      console.log('Response Data:', responseData); // Log the response data

      if (!responseData || !Array.isArray(responseData)) {
        console.error('Invalid response data format:', responseData);
        return;
      }

      // Ensure each row has a unique `id` property
      const dataWithIds = responseData.map((item, index) => ({ ...item, id: item.ID || index }));

      if (dataWithIds.length > 0) {
        const cols = Object.keys(dataWithIds[0]).map(key => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
          editable: true,
        }));
        setColumns(cols);
        setTableData(dataWithIds);
      } else {
        console.error('Empty response data array:', dataWithIds);
      }
    } catch (error) {
      console.error('There was an error fetching the table data!', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTableData(formData);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day}-${monthNames[parseInt(month, 10) - 1]}-${year}`;
  };

  return (
    <div>
      <Typography variant='h4' sx={{ textAlign: "center", marginBottom: 4 }}>Refund Report</Typography>
      
      <Box component="form" sx={{ flexGrow: 1, marginBottom: 4, width: '80%', margin: '0 auto' }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              type="number"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              label="Transaction ID"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleInputChange}
              label="Booking Date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              name="bookingFrom"
              value={formData.bookingFrom}
              onChange={handleInputChange}
              label="Booking From"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              name="bookingTo"
              value={formData.bookingTo}
              onChange={handleInputChange}
              label="Booking To"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Airline</InputLabel>
              <Select
                name="airline"
                value={formData.airline}
                onChange={handleSelectChange}
                label="Airline"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {airlines.map((airline) => (
                  <MenuItem key={airline.AIRLINE_NAME} value={airline.AIRLINE_NAME}>{airline.AIRLINE_NAME}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Payment Gateway</InputLabel>
              <Select
                name="paymentGateway"
                value={formData.paymentGateway}
                onChange={handleSelectChange}
                label="Payment Gateway"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Gateway1">Gateway1</MenuItem>
                <MenuItem value="Gateway2">Gateway2</MenuItem>
                <MenuItem value="Gateway3">Gateway3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
          </Grid>
        </Grid>
      </Box>

      <LineChart width={1160} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>

      <Divider sx={{ marginTop: 4 }} />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          autoHeight
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default Refunds;
