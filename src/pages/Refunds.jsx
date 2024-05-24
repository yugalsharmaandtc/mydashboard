import React from 'react'
import { Divider, Box ,Typography } from '@mui/material';
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
  return (
    <div>
    
    <Typography variant='h4' sx={{textAlign:"center",marginBottom:4}} >Refund Report </Typography>

      <LineChart width={1160} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>

      <Divider />
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
  )
}

export default Refunds
