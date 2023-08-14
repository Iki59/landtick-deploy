import {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {useMutation} from "react-query"
import {UserContext} from "../context/UserContext"
import {API, setAuthToken} from "../config/api"
import {Modal, Container, Form, Button, Alert} from "react-bootstrap";

const style = {
    formBox: {
        height: "auto",
        padding: "30px",
        borderRadius: "10px",
        background: "#FFF",
    },
    fontLogin: {
        fontSize: "36px",
        fontWeight: "900",
        background: "-webkit-linear-gradient(45deg, #EC7AB7, #EC7A7A)",
        webkitBackgroundClip: "text",
        webkitTextFillColor: "transparent",
        marginBottom: "50px",
    },
    formLogin : {
        width: "350px",
        height: "50px",
        margin: "30px auto"
    },
    btnLogin : {
        borderRadius: "50px",
        border: "none",
        background: "linear-gradient(#EC7AB7, #EC7A7A)",
        width: "360px",
        margin: "5px auto"

    },
    linkTo: {
        fontSize: "18px",
        marginTop: "20px",
        color: "#B1B1B1"
    },
}

export default function Login(props) {
const navigate = useNavigate()
const [,dispatch] = useContext(UserContext)
const [message, setMessage] = useState(null);

const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
})

const {username, password} = formLogin

const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault()

        const response = await API.post('/login', formLogin)
        console.log("login success : ", response)

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
        })
        setAuthToken(localStorage.token)
        if (response.data.data.role === "admin") {
            navigate("/listtransaksi")
            alert("Admin Success Login")
        } else {
            navigate("/")
            alert("User Success Login")
        }
    } catch (error) {
        const alert = (
            <Alert variant="danger" className="py-1">
                Login Failed
            </Alert>
        )
        setMessage(alert)
        console.log("login failed : ", error)
    }
  })

    
    return(
        <div>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton style={{border: "none"}}></Modal.Header>
                <Modal.Body>
                    <Container fluid style={style.formBox}>
                        <h1 style={style.fontLogin} className="text-center">LOGIN</h1>
                        {message && message}
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="username" value={username} name="username" onChange={handleChange} style={style.formLogin} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" placeholder="password" value={password} name="password" onChange={handleChange} style={style.formLogin} />
                            </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={props.onHide} type="submit" size="lg" style={style.btnLogin}>Login</Button>
                        </div>
                        </Form>
                        <p className="text-center" style={style.linkTo}>Belum Punya Akun? Klik <span onClick={props.onClick} style={{cursor: "pointer", fontWeight: "bold"}}>disini</span></p>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

