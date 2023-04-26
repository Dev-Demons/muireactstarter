// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import dayjs  from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';



function App() {
  const [nbRows, setNbRows] = useState(50);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new dayjs());
  const [apikey, setApikey] = useState('Test');
  const [apiurl, setApiurl] = useState('https://mw.kranzmedizintechnik.de/webhook/fls-sms-mock');
  const [apikeyForHTTP, setApikeyForHTTP] = useState('Test');
  const [apiurlForHTTP, setApiurlForHTTP] = useState('https://mw.kranzmedizintechnik.de/webhook/fls-sms-mock');

  const getDataGrid = () => {
    console.log('let me start', apiurlForHTTP);
    let senddate = date.format('YYYY-MM-DD');
    console.log('let me start', senddate);

    const params = {
      date: senddate, 
    };
    
    const urlParams = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiurlForHTTP}?${urlParams}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('apikey', apikeyForHTTP);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log('Request failed.  Returned status of ', xhr.status);
      }
    };
    
    xhr.send();
    // try {
    //   axios
    //     .get(apiurlForHTTP, {
    //       // headers: { 
    //       //   'apikey':apikeyForHTTP
    //       // },
    //       params: {
    //         date: senddate,
    //       },
    //       withCredentials: true
    //     })
    //     .then((res) => {
    //       console.log('res', res)
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } catch (ex) {
    //   console.log(ex);
    // }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setApikeyForHTTP(apikey)
    setApiurlForHTTP(apiurl)
  };
  
  const handleClose = () => {
    setOpen(false);
    setApikey(apikeyForHTTP);
    setApiurl(apiurlForHTTP);
  };

  const handleUpdate =()=>{
    setOpen(false);
    setApikeyForHTTP(apikey)
    setApiurlForHTTP(apiurl)    
  }

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  return (
     <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar style={{alignSelf: 'end'}}>
            <Button size="small"  color="inherit" onClick={handleClickOpen}>
              Setting  
            </Button>
        </Toolbar>
      </AppBar>
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          padding={3}
        >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Select date"
                value ={date}
                onChange={(newValue) => setDate(newValue)}
                />
            <Button size="small"    variant="contained"onClick={getDataGrid}>
              Get Data Grid
            </Button>
        </DemoContainer>
        </LocalizationProvider>
        <Button  size="large" onClick={getDataGrid} >
          SEND SMS
        </Button> 
      </Stack>  
      <Box paddingX={3}>
        <DataGrid autoHeight {...data} rows={data.rows.slice(0, nbRows)} />
      </Box>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Setting</DialogTitle>
        <DialogContent> 
          <TextField
            autoFocus
            margin="dense"
            id="apikey"
            label="API_KEY"
            type="text"
            fullWidth
            variant="standard"
            value= {apikey}
            onChange={(event) => {
              setApikey(event.target.value);
            }}
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="apiurl"
            label="API_URL"
            type="text"
            fullWidth
            variant="standard"
            value={apiurl}
            onChange={(event) => {
              setApiurl(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
