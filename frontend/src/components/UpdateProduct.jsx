import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function UpdateProduct() {
  const navigate=useNavigate();
  const params=useParams();

const [name,setName]=useState('');
const [price,setPrice]=useState('');
const [category,setCategory]=useState('');
const [company,setCompany]=useState('');






  const handleSubmit = async (event) => {
    event.preventDefault();
let userId=JSON.parse(localStorage.getItem('user'))._id;    
let result=await fetch(`http://localhost:5000/product/${params.id}`, {
  method:'put',
  body:JSON.stringify({
    name,
    category,
    price,
    company,
    userId
  }),
  headers: {
    'Content-Type':'application/json',
    authorization:JSON.parse(localStorage.getItem('token')),
  },
});
result=await result.json()
console.warn(result);
if(result) {
    navigate('/');
}else {
    console.warn('product not found')
}

  };

const getProductDetails=async()=> {
let result=await fetch(`http://localhost:5000/product/${params.id}`, {
  headers: {
    authorization:JSON.parse(localStorage.getItem('token')),
}
});
result=await result.json();
setName(result.name)
setCategory(result.category)
setCompany(result.company)
setPrice(result.price)

}


useEffect(()=> {
    getProductDetails();
},[])


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
   
    
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  minlength="5"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="company"
                  label="Company"
                  type="text"
                  value={company}
                  onChange={(e)=>setCompany(e.target.value)}
                />
              </Grid>

 

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Product
            </Button>
          </Box>
 
      </Container>
    </ThemeProvider>
  );
}