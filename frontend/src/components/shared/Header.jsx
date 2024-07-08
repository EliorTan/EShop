import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {LinkContainer} from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import { Link ,useLocation ,useNavigate} from "react-router-dom";
import SearchBox from "./SearchBox";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Store } from "../../store";
import { useContext } from "react";
import { USER_SIGNOUT } from "../../actions";


const Header = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo,
        cart: { cartItems },
    } = state
    const navigate = useNavigate();


    const logoutHandler = () => {
        ctxDispatch({type: USER_SIGNOUT});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('paymentMethod');
        navigate('/signin');
    }

  return (
    <header>
        <NavBar bg="dark" variant="dark">
            <Container>
                <Link onClick={() => navigate(-1)}>
                {location.pathname !== "/" && (
                    <i className="fas fa-arrow-left text-white align-arrow-right">
                        Back
                    </i>
                )}
                </Link>
                <LinkContainer to="/">
                    <NavBar.Brand>
                    <img
                        src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                        width={80}
                        alt="Amazon logo"/>
                    </NavBar.Brand>
                </LinkContainer>
                {" "}
                <SearchBox/>
                <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
                <Link to="/cart" className="nav-link me-2">
                    <i className="fas fa-shopping-cart text-white"></i>
                    {cartItems.length > 0 && (
                        <Badge pill bg="danger">
                            {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                    )}
                    </Link>
                </nav>
                {userInfo?(
                    <NavDropdown className="text-white" title={userInfo.name} id="basic-nav-dropdown">
                        <LinkContainer to="/profile">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider/>
                        <LinkContainer to="/orderhistory">
                            <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link onClick={logoutHandler} to="#signout" className="dropdown-item">Sign Out</Link>
                    </NavDropdown>
                ):(
                    <NavDropdown className="text-white" title="Sign In" id="basic-nav-dropdown">
                    <LinkContainer className="nav-link text-black me-2 ms-2" to="/signin">
                    <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />

                     <LinkContainer className="nav-link text-black me-2 ms-2" to="/signup">
                     <NavDropdown.Item>Sign Up</NavDropdown.Item> 
                     </LinkContainer>
                    </NavDropdown>
                )}
                {/* {TODO - deal with users} */}
            </Container>
        </NavBar>
    </header>
  )
}

export default Header