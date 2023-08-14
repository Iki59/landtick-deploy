import {Container, Form, Button, Image, Navbar, Modal} from "react-bootstrap"
import Brand2 from "./img/brand2.png"

const style = {
    formBox: {
        height: "auto",
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0px 3px 20px 0px rgba(0, 0, 0, 0.25)",
    },
    formEdit : {
        width: "350px",
        height: "50px",
        margin: "30px auto"
    },
    btnEdit : {
        borderRadius: "50px",
        border: "none",
        background: "linear-gradient(#EC7AB7, #EC7A7A)",
        width: "360px",
        margin: "5px auto"

    },
    ticketBrand: {
        background: "linear-gradient(to top, #EC7AB7, #EC7A7A)",
        marginLeft: "-12px",
        padding: "2px 25px",
        borderRadius: "7px 3px 60px 0px",
        marginTop: "-30px"
    },
}

export default function EditAdmin(props) {
    return(
        <div>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton style={{border: "none"}}></Modal.Header>
                <Modal.Body>
                    <Container style={style.formBox}>
                    <Navbar.Brand style={style.ticketBrand} className="ticket-brand">Land Tick <Image src={Brand2} style={{width: "40px", marginBottom: "5px"}} /> </Navbar.Brand>
                    <Form>
                        <Form.Group>
                            <Form.Control type="email" placeholder="1" disabled style={style.formEdit} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="email" placeholder="Anto" disabled style={style.formEdit} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="email" placeholder="Surabaya-Jakarta" disabled style={style.formEdit} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="email" placeholder="bri.jpg" disabled style={style.formEdit} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="email" placeholder="Approved" style={style.formEdit} />
                        </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button size="lg" style={style.btnEdit}>Save</Button>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}