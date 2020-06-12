import React, { useState, useContext, useEffect } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { RootStoreContext } from '../stores/rootStore';
import { Link } from 'react-router-dom';
import Login from './User/Login'
import './NavMenu.css';
import Register from './User/Register';
import { Button, Icon } from 'semantic-ui-react';

const NavMenu = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout, isAdmin } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {

  }, [user, isAdmin])

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  }

  return (
    <header style={{ backgroundImage: 'linear-gradient(to right, #e8645d 0%, #ffb199 100%)' }}>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand style={{ color: 'white' }} tag={Link} to="/">RecipeApp</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse justify-content-between" isOpen={collapsed} navbar>
            <ul className="navbar-nav flex-grow" >
              {user ? (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} to="/">{user.username}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} onClick={logout} to="/">Wyloguj</NavLink>
                  </NavItem>
                </ul>
              ) :
                (
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <NavLink tag={Link} onClick={() => openModal(<Login />, null)} to='#' >Zaloguj</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} onClick={() => openModal(<Register />, null)} to='#' >Zarejestruj</NavLink>
                    </NavItem>
                  </ul>
                )}
            </ul>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} to="/">Strona główna</NavLink>
              </NavItem>
              <NavItem>
                {user ? (
                  <Button style={{ padding: '10px', marginTop: '3px', marginLeft: '2px' }} primary tag={Link}  to="/recipe/addrecipe">
                    <Icon name='plus square outline' />
                     Dodaj przepis
                  </Button>
                ) : (
                    <Button style={{ padding: '10px', marginTop: '3px', marginLeft: '2px' }} primary tag={Link} onClick={() => openModal(<Login />, null)} to="#">
                      <Icon name='plus square outline' />
                      Dodaj przepis
                    </Button>
                  )}
              </NavItem>
              {user && isAdmin && (
                <NavItem>
                  <NavLink tag={Link} to='/manage' className="">Zarządzaj</NavLink>
                </NavItem>
              )}

            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );

}

export default NavMenu;
