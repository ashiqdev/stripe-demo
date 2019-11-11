import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import User from './User';

const Navbar = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <Link className='navbar-brand' to='/vip'>
            Stripe
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          {me && (
            <div className='collapse navbar-collapse' id='navbarNav'>
              <div className='navbar-nav'>
                {/* {me && me.type === 'free trial' && (
                  <NavLink className='nav-item nav-link' to='/subscribe'>
                    Subscribe
                  </NavLink>
                )} */}
                <NavLink className='nav-item nav-link' to='/signout'>
                  SignOut
                </NavLink>
              </div>
            </div>
          )}

          {!me && (
            <div className='collapse navbar-collapse' id='navbarNav'>
              <div className='navbar-nav'>
                {/* <NavLink className='nav-item nav-link' to='/signin'>
                  SignIn
                </NavLink> */}

                <NavLink className='nav-item nav-link' to='/signup'>
                  SignUp
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      );
    }}
  </User>
);

export default Navbar;
