import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import MovieDetail from './Pages/Moviedetails';
import { CartProvider } from "./Pages/CartContext";
import Products from './Pages/Prouducts';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  return (
    <div className="App">
      <CartProvider>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/products" element={<Products />}/>
                <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
        </CartProvider>
    </div>
  );
}

export default App;
