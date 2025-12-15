import { NavLink , useNavigate} from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";  

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const Logout = () =>{
    localStorage.clear()
    navigate('/login')
  }


  return (
    <nav className={styles.navbar}>
      <img src="/Sitelogo.png" alt="nav logo" style={{height:"50px" , width:"100px"}} className={styles.img}/>
      <div className={styles.navLogo}>Peace Makers</div>
      <div className={styles.navToggle} onClick={() => setOpen(!open)}>
        ☰
      </div>
      <ul
        className={
          open
            ? `${styles.navLinks} ${styles.navActive}`
            : styles.navLinks
        }
      >
        <li>
          <NavLink to="/" end 
          onClick={() => setOpen(false)}
          className={({isActive})=>
          isActive
                ? `${styles.navLink} ${styles.active}`
                : styles.navLink
                } 
                >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" 
          className={({isActive})=>
          isActive
                ? `${styles.navLink} ${styles.active}`
                : styles.navLink
                } 
          onClick={() => setOpen(false)}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart"
          className={({isActive})=>
          isActive
                ? `${styles.navLink} ${styles.active}`
                : styles.navLink
                }  onClick={() => setOpen(false)}>
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={() => setOpen(false)}>
            {localStorage.getItem('token')
            ?<div className={styles.loginBtn} onClick={Logout} ><img src="/Profile.png"  alt = "Logout" style={{width:"35px",height:"35px" }} className="logout"/></div>
            :<button className={styles.loginBtn}>Login</button>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;