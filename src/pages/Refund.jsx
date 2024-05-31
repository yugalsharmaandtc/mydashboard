import React, { useState, useEffect } from 'react';
import { Divider, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 190,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 190,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 190,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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

  useEffect(() => {
    fetch('http://10.34.40.114:8000/airline') // Replace with your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
         console.log('Fetched airlines data:', data); // Debug log to check fetched data
        setAirlines(data);
      })
      .catch(error => console.error('There was an error fetching the airlines!', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <Typography variant='h4' sx={{ textAlign: "center", marginBottom: 4 }}>Refund Report</Typography>
      
      <Box component="form" sx={{ flexGrow: 1, marginBottom: 4, width: '80%', margin: '0 auto' }}>
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
                onChange={handleInputChange}
                label="Airline"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {airlines.map((airline) => (
                  <>
                  {console.log(airline)}
                   <MenuItem key={airline.AIRLINE_NAME} value={airline.AIRLINE_NAME}>{airline.AIRLINE_NAME}</MenuItem>
                  </>
                 
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
                onChange={handleInputChange}
                label="Payment Gateway"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Gateway1">Gateway1</MenuItem>
                <MenuItem value="Gateway2">Gateway2</MenuItem>
                <MenuItem value="Gateway3">Gateway3</MenuItem>
              </Select>
            </FormControl>
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
          rows={rows}
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
