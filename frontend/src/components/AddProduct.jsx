import React,{useState,useEffect} from 'react';
import axios from 'axios';
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

export default function AddProduct() {
  const navigate=useNavigate();

const [name,setName]=useState('');
const [price,setPrice]=useState('');
const [category,setCategory]=useState('');
const [company,setCompany]=useState('');
const [photo,setPhoto]=useState(null);
const [img,setImg]=useState("")
const [imgurl,setImgurl]=useState('');


console.log('photo',photo);
console.log(img);




  const handleSubmit = async (event) => {
    event.preventDefault();
console.log('hi')
    const formdata=new FormData();
    
formdata.append("file",photo);
formdata.append("name",name);
formdata.append("category",category);
formdata.append("price",price);
formdata.append("company",company);

formdata.append("upload_preset","ecomm-dash");
formdata.append("cloud_name","hosteltrend");



fetch('https://api.cloudinary.com/v1_1/hosteltrend/image/upload', {
  method:"post",
  body:formdata
}).then(res=> res.json())
.then(data=> {
  setImgurl(data.url);
 

})
.catch(err=> {
  console.log(err);
})

let result=await fetch('http://localhost:5000/add-product', {

  method:'post',
  body:JSON.stringify({
    name,
    category,
    price,
    company,
    photo:imgurl,
  }),
  headers: {
    'Content-Type':'application/json',
  },
});
result=await result.json()
console.warn(result);






// let userId=JSON.parse(localStorage.getItem('user'))._id;    
// let result=await fetch('http://localhost:5000/add-product', {

//   method:'post',
//   body:JSON.stringify({
//     name,
//     category,
//     price,
//     company,
//     userId,
//     photo,
//   }),
//   headers: {
//     'Content-Type':'application/json',
//     authorization:JSON.parse(localStorage.getItem('token')),
//   },
// });
// result=await result.json()
// console.warn(result);

  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
   
    
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} enctype="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
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

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  value={img}
                
                  onChange={(e)=>{setPhoto(e.target.files[0]);setImg(e.target.value)}}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
 
      </Container>
    </ThemeProvider>
  );
}