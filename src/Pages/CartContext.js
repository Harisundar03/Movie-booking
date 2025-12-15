import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider  ({ children }) {
    const [cart, setCart] = useState([]);


    const addToCart = (item) => {
        const exists = cart.find(cartItem => cartItem._id === item._id);
        if (exists) {
            alert(`${item.name} is already in cart`);
            return;
        }
        setCart([...cart, { ...item, quantity: 1 }]);
        alert(`${item.name} added to cart!`);
    };


    const increaseQuantity = (id) => {
        setCart(
            cart.map(item =>
                item._id === id ? { ...item, quantity: item.quantity < 10 ? item.quantity + 1 : 10} : item
            )
        );
    };


    const decreaseQuantity = (id) => {
        setCart(
            cart.map(item =>
                item._id === id
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };


    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    
    const getTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + item.ticketprice * item.quantity,
            0
        );
    };
    return (
        <CartContext.Provider value={{ cart,addToCart, increaseQuantity, decreaseQuantity, removeFromCart,getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
