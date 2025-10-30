import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const{getTotalcartAmount,token,setToken} = useContext(StoreContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowLogin(true);
    navigate("/");
  };

  return (
    <div className='navbar'>
     <Link to="/"> <img className='logo' src={assets.logo} alt="Logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? 'active' : ''}>Mobile</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === 'contact' ? 'active' : ''}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search Icon" />
        <div className='navbar-basket'>
         <Link to='/cart'> <  img src={assets.basket_icon} alt="Basket Icon" /></Link> 
         <div className={getTotalcartAmount() > 0 ? "dot" : ""}></div>

        </div>
        {!token?<button onClick={() => setShowLogin(true)} className='sign-in-button'>Sign In</button>: <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="User Icon" />
          <ul className="nav-profile-dropdown">
            <li onClick={() => navigate("/myorders")}> <img src= {assets.bag_icon} alt="" /> <p>Orders</p></li>
            <hr />
            <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /> <p>Logout</p></li>
          </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
