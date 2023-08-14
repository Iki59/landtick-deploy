import React, {useState, useContext, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import {UserContext} from "../context/UserContext"
import {Navbar, Nav, NavDropdown,  Container, Image, Button} from "react-bootstrap"
import { API, setAuthToken } from "../config/api";
import Profile from "../components/img/profile.png"
import Register from "./Register"
import Login from "./Login"
import train from "../components/img/train.svg"

const style = {
    Navbar: {
        height: "8vh",
        boxShadow: "0px 3px 20px 0px rgba(0, 0, 0, 0.25)",
    },
    BtnRegis: {
        padding: "4px 25px",
        background: "white",
        border: "2px solid #EC7AB7",
        color: "#EC7AB7"
    },
    BtnLogin: {
        padding: "4px 28px",
        border: "none",
        background: "linear-gradient(to right, #EC7AB7, #EC7A7A)"
        
    },
}

function NavBar() {
    const [loginShow, setLoginShow] = useState(false)
    const [registerShow, setRegisterShow] = useState(false)

    const handleCloseLogin = () => setLoginShow(false)
    const handleShowLogin= () => {
        handleCloseRegister(false)
        setLoginShow(true)
    }

    const handleCloseRegister = () => setRegisterShow(false)
    const handleShowRegister= () => {
        handleCloseLogin(false)
        setRegisterShow(true)
    }

    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && state.isLogin === false) {
            navigate("/")
        }
    }, [isLoading])

    useEffect(() =>{
        if (localStorage.token) {
            setAuthToken(localStorage.token)
            checkUser();
        } else {
            setIsLoading(false)
        }
    }, [])

    const checkUser = async () => {
        try {
          const response = await API.get("/check-auth");
          console.log("check user success : ", response);
          let payload = response.data.data;
          payload.token = localStorage.token;
          dispatch({
            type: "USER_SUCCESS",
            payload,
          });
          setIsLoading(false);
        } catch (error) {
          console.log("check user failed : ", error);
          dispatch({
            type: "AUTH_ERROR",
          });
          setIsLoading(false);
        }
      };

    const logout = () => {
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }

    return(
        <div>
            <Navbar style={style.Navbar}>
                <Container>
                    <Link style={{textDecoration:"none"}} to={"/"}>
                        <Navbar.Brand className="nav-brand">Land Tick <Image src={train} style={{width: "50px", marginBottom: "7px", marginTop:"5px", marginLeft:"3px"}} /> </Navbar.Brand>
                    </Link>
                                    <Nav>
                                       {state.isLogin === true ? (
                                           state.user.role === 'admin' ? (
                                               <>
                                            <p className="fs-5 mt-2">{state.user.username}</p>
                                            <NavDropdown title={<img src={Profile} alt="profile" style={{width: "30px"}} />}>
                                                <Link to="/add-ticket" style={{textDecoration: "none"}}>
                                                <NavDropdown.Item href="#/action2">Tambah Tiket</NavDropdown.Item>
                                                </Link>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                            </>
                                        ) : (
                                            <>
                                            <p className="fs-5 mt-2">{state.user.username}</p>
                                            <NavDropdown title={<img src={Profile} alt="profile" style={{width: "30px"}} />
                                                }>
                                                <Link to="/my-ticket" style={{textDecoration: "none"}}>
                                                <NavDropdown.Item href="#/action2">Tiket Saya</NavDropdown.Item>
                                                </Link>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                            </>
                                        )
                                       ) : (
                                        <>
                                            <Button onClick={handleShowRegister} style={{padding: "2px 13px", background: "white", border: "2px solid #EC7AB7", color: "#EC7AB7", marginTop: "1px", marginRight: "10px"}}>
                                                Register
                                            </Button>
                                            <Button onClick={handleShowLogin} style={{padding: "3px 20px",border: "none", background: "linear-gradient(to right, #EC7AB7, #EC7A7A)"}}>
                                                Login
                                            </Button>
                                        </>
                                       )
                                    } 
                                    </Nav>
                </Container>
            <Register show={registerShow} onHide={handleCloseRegister} onClick={handleShowLogin} />
            <Login show={loginShow} onHide={handleCloseLogin} onClick={handleShowRegister}  />
            </Navbar>
        </div>
    )
}

export default NavBar