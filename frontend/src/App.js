
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/Signup';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
 <BrowserRouter>  
 <Nav/>
{/* <Footer/> */}

<Routes>
  <Route element={<PrivateComponent/>}>
  <Route path='/' element={<ProductList/>}/>
   <Route path='/add-product' element={<AddProduct/>}/>
   <Route path='/update/:id' element={<UpdateProduct/>}/>
</Route>

   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/login' element={<Login/>}/>
</Routes>
 </BrowserRouter>   
    </div>
  );
}

export default App;
