import { Link , useNavigate} from "react-router-dom";
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
      <img src="Sitelogo.png" alt="nav logo" style={{height:"50px" , width:"100px"}} className={styles.img}/>
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
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={() => setOpen(false)}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" onClick={() => setOpen(false)}>
            Cart
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={() => setOpen(false)}>
            {localStorage.getItem('token')
            ?<Link className={styles.loginBtn} onClick={Logout} ><img src="Profile.png"  alt = {<button >Logout</button>}style={{width:"35px",height:"35px" }} className="logout"/></Link>
            :<button className={styles.loginBtn}>Login</button>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;