import React from 'react'
import classes from './header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {

    const user={name: 'Carlos'}

    const cart={
        totalCount:10,
    }
  return (
    <header className={classes.header}>
        <div className={classes.container}>

            <Link to="/" className={classes.logo}>
                Delicatessen Carlos
             </Link>

             <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <h4>Logout</h4>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            </ul>

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
        
       
            </nav>
        </div>
    </header>
  )
}
