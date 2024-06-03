import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
const Cancellation = () => {

   const [getRow,setRow] = useState({})


   const columns = [
    { field: 'ID', headerName: 'ID', width: 70 },
    { field: 'TRANSACTION_ID', headerName: 'TRANSACTION_ID', width: 130 },
    { field: 'AIRLINE_PNR', headerName: 'AIRLINE_PNR', width: 130 },
    { field: 'AIRLINE', headerName: 'AIRLINE', width: 130 },
    { field: 'BOOKING_STATUS', headerName: 'BOOKING_STATUS', width: 130 },
    { field: 'FARE_AMOUNTS', headerName: 'FARE_AMOUNTS', width: 130 },
    { field: 'SEAT_AMOUNT', headerName: 'SEAT_AMOUNT', width: 130 },
    { field: 'MEAL_AMOUNT', headerName: 'MEAL_AMOUNT', width: 130 },
    { field: 'BAGGAGE_AMOUNT', headerName: 'BAGGAGE_AMOUNT', width: 130 },
    { field: 'IRCTC_CHARGES', headerName: 'IRCTC_CHARGES', width: 130 },
    { field: 'CREATION_DATE', headerName: 'CREATION_DATE', width: 130 },
    { field: 'BOOKING_DATE', headerName: 'BOOKING_DATE', width: 130 },
    { field: 'PAYMENT_GATEWAY_NAME', headerName: 'PAYMENT_GATEWAY_NAME', width: 130 },
    { field: 'PAYMENT_GATEWAY_ID', headerName: 'PAYMENT_GATEWAY_ID', width: 130 },
    { field: 'TICKET_NO', headerName: 'TICKET_NO', width: 130 },
  ];

  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

 useEffect((()=>{
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "airline": "",
  "bookfrom": "",
  "bookto": "",
  "bookdate": "28-MAY-2024",
  "transactionid": "",
  "airpnr": "",
  "paymentGid": ""
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://10.34.40.114:8000/book_recon/100", requestOptions)
  .then((response) => response.json())
  .then((result) =>{
//console.table(result)
    setRow(result)
    })
  .catch((error) => console.error(error));
 }),[])

  return (
    <div>
      This is Cancellation Page
      {console.log(getRow)}
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );


    </div>
  )
}

export default Cancellation
