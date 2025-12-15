import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import styles from './Cart.module.css';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice } = useCart();
    if (cart.length === 0) {
        return (
            <>
            <Navbar />
            <div className={styles.cartContainer}>
                <h2 className={styles.cartTitle}>Your Cart is Empty</h2>
                <Link to="/">
                    <button className={styles.emptyBtn}>Continue Shopping</button>
                </Link>
            </div>
            </>
        );
    }

    return (
        <>
        <Navbar />
        <div className={styles.cartContainer}>
            <h1 className={styles.cartTitle}>Book Your Peace</h1>

            <Link to="/">
                <button className={styles.backBtn}>Back to Home</button>
            </Link>
            
            
               
               
                    {cart.map(item => (
                        
                        <div className=" card " >
                        <div className={styles.cartItem} key={item._id}>
                            <img className={styles.cartImg} src={item.image} alt={item.name} />
                        <div className={styles.itemDetails}>
                        <div className={styles.itemName} style={{display:"block"}}>{item.name}</div>
                        <h4 className={styles.itemPrice}>₹{item.ticketprice}</h4>
                        <div style={{display:"block"}}>
                        <button className={styles.qtyBtn} onClick={() => decreaseQuantity(item._id)}>-</button>
                        <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                        <button className={styles.qtyBtn} onClick={() => increaseQuantity(item._id)}>+</button>
                        
                        <div className={styles.itemPrice}>₹{item.ticketprice * item.quantity}</div>
                        <button className={styles.removeBtn} onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                        </div>
                        </div>
                        </div>
                        
                    ))}
                
            
            <div className={styles.totalBox}>
                Total: ₹{getTotalPrice()}
            </div>
            
            <button
              className={styles.checkoutBtn} 
              onClick={() => alert('Ordered')}
            >
                Checkout
            </button>
            </div>
            
        </>
    );
};

export default Cart;