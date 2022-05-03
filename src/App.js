import 'normalize.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === product.id)) {
        return prevCart.map((item) => {
          if (item.id === product.id) {
            const newItem = { ...item };
            newItem.quantity++;
            return newItem;
          }
          return item;
        });
      } else {
        product.quantity = 1;
        return [product, ...prevCart];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.id === product.id) {
          const newItem = { ...item };
          newItem.quantity--;
          return newItem;
        }
        return item;
      });
      return newCart.filter((item) => item.quantity > 0);
    });
  };

  return (
    <>
      <Header cart={cart} />
      <main>
        <Routes>
          <Route index element={<Home addToCart={addToCart} cart={cart} />} />
          <Route
            path='products'
            element={
              <Products
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            }
          />
          <Route
            path='cart'
            element={
              <Cart
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
