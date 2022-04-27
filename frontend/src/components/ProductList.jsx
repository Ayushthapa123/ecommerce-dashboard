import { ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './sass/productlist.module.scss'

export default function ProductList() {

const [products,setProducts]=useState([]);


const deleteProduct=async(id)=> {
    let result=await fetch(`http://localhost:5000/product/${id}`, {
        method:'delete',
        headers: {
            authorization:JSON.parse(localStorage.getItem('token')),
        }
    });
    result=await result.json()
    if(result) {
        fetchData();
        alert('record deleted')
    }
}

const searchHandle=async(e)=> {
let key=e.target.value;
if(key) {
    let result=await fetch(`http://localhost:5000/search/${key}`,{
    headers: {
        authorization:JSON.parse(localStorage.getItem('token')),
    }}
    );
    result=await result.json();
    if(result) {
        setProducts(result);
    }else {
        fetchData();
    }
}
}



const fetchData=async ()=> {
    let result=await fetch('http://localhost:5000/products', {
headers: {
    authorization:JSON.parse(localStorage.getItem('token')),
}
    })
    result=await result.json();
    setProducts(result);
   
    }

useEffect(()=> {
fetchData();

},[])

  return (
    <div className={styles.plist}>
        <input type='text' placeholder='Product Search'
        onChange={searchHandle}
        />
{products.length>0 && <div className={styles.products}>
<ul className={styles.header}>
    <li className={styles.sn}>S.N</li>
    <li>Name</li>
    <li>Category</li>
    <li>Company</li>
    <li>Price</li>
    <li >P.Id</li>
    <li>Operations</li>
</ul>

    {products.map((product,index)=> (
<div key={product._id}>
<ul>
    <li className={styles.sn}>{index+1}</li>
    <li>{product.name}</li>
    <li>{product.category}</li>
    <li>{product.company}</li>
    <li>${product.price}</li>
    <li className={styles.pid}>{product._id}</li>
    <li><button onClick={()=>deleteProduct(product._id)}>Delete</button>
    <button><Link to={'/update/'+product._id }>Update</Link></button></li>
</ul>
</div>
    ))}
    
    </div>}
    {products.length<1 &&<h2>Product Not Found</h2>}
    </div>
  )
}
