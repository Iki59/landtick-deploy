import React, {useState} from "react"
import {Modal, Container, Form, Button, Alert} from "react-bootstrap";
import {useMutation} from "react-query"
import { API } from '../config/api';

const style = {
    formBox: {
        height: "490px",
        overflow: "auto",
        padding: "30px",
        background: "#FFF",
    },
    fontRegister: {
        fontSize: "36px",
        fontWeight: "900",
        background: "-webkit-linear-gradient(45deg, #EC7AB7, #EC7A7A)",
        webkitBackgroundClip: "text",
        webkitTextFillColor: "transparent",
        marginBottom: "50px",
    },
    formRegister : {
        width: "350px",
        height: "50px",
        margin: "30px auto"
    },
    formAdress : {
        width: "350px",
        height: "100px",
        margin: "30px auto",
        resize: "none"
    },
    btnRegister : {
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
    }
}

export default function Register(props) {

const [message, setMessage] = useState(null)
const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    telepon: '',
    adress: '',
})
const {full_name, username, email, password, gender, telepon, adress} = form

const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault()
        const response = await API.post('/register', form)

        console.log("register success :", response)

        const alert = (
            <Alert variant="success" className="py-1">
                Register Success!
            </Alert>
        )
        setMessage(alert)
        setForm({
            full_name: '',
            username: '',
            email: '',
            password: '',
            gender: '',
            telepon: '',
            adress: '',
        })
    } catch (error) {
        const alert = (
            <Alert variant="danger" className="py-1">
                Failed to Register!
            </Alert>
        )
        setMessage(alert)
        console.log("register failed : ", error)
    }
})
    return(
        <div>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton style={{border: "none"}}></Modal.Header>
                <Modal.Body>
                    <Container style={style.formBox}>
                        <h1 style={style.fontRegister} className="text-center">REGISTER</h1>
                        {message && message}
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Nama Lengkap" value={full_name} name="full_name" onChange={handleChange} style={style.formRegister} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Username" value={username} name="username" onChange={handleChange} style={style.formRegister} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="email" placeholder="Email" value={email} name="email" onChange={handleChange} style={style.formRegister} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={handleChange} style={style.formRegister} />
                            </Form.Group>
                            <Form.Group>
                               <Form.Select value={gender} name="gender" onChange={handleChange} style={style.formRegister}>
                                    <option hidden>Jenis Kelamin</option>
                                    <option>Laki-Laki</option>
                                    <option>Perempuan</option>
                               </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Telp" value={telepon} name="telepon" onChange={handleChange} style={style.formRegister} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" type="text" placeholder="Alamat" value={adress} name="adress" onChange={handleChange} style={style.formAdress} />
                            </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" onClick={props.onHide} size="lg" style={style.btnRegister}>Daftar</Button>
                        </div>
                        </Form>
                    <p className="text-center" style={style.linkTo}>Sudah Punya Akun? Klik <span onClick={props.onClick} style={{cursor: "pointer", fontWeight: "bold"}}>disini</span></p>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}