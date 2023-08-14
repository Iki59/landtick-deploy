import {Container, Row, Col, Image, Modal, Navbar} from "react-bootstrap"
import Qrcode from "./img/qr-code.png"
import Brand2 from "./img/brand2.png"

const style = {
    ticketBrand: {
        background: "linear-gradient(to top, #EC7AB7, #EC7A7A)",
        padding: "2px 15px",
        borderRadius: "7px 3px 60px 0px",
    },
    pointer: {
        display: "flex",
        alignItems: "end",
        flexDirection: "column", 
        marginTop: "6px",
    },
    circle1: {
        width: "15px",
        height: "15px",
        borderRadius: "100%",
        border: "1px solid #EC7A7A",
        marginBottom: "4px",
    },
    circle2: {
        width: "15px",
        height: "15px",
        borderRadius: "100%",
        border: "none",
        background: "#EC7A7A",
        marginTop: "3px",
    },
    verticalLine: {
        height: "50px",
        borderLeft: "1px solid #D0D0D0",
        display: "inline-block",
        margin: "0 7px",

    },
}

export default function DetailAdmin(props) {
    return(
        <>
        <Modal size="lg" dialogClassName="modal-90w" show={props.show} onHide={props.onHide} style={{maxHeight:"100vh", borderRadius:"0px", padding:"0px"}}>
            <Modal.Header closeButton style={{border: "none", padding:"0px", paddingRight:"10px"}}>
                <Navbar.Brand style={style.ticketBrand} className="ticket-brand">Land Tick <Image src={Brand2} style={{width: "40px", marginBottom: "5px"}} /> </Navbar.Brand>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <h3 className="fw-bold mb-1">INVOICE</h3>
                    <p style={{fontSize: "13px", color:"#767676"}}>Kode Invoice: INV0101</p>
                    <Row className="mt-4">
                        <Col>
                            <Row>
                                <Col>
                                    <h4 className="fw-bold">Kereta Api</h4>
                                    <p style={{fontSize: "13px", color:"#767676"}}>21 Februari 2020</p>
                                </Col>
                            </Row>
                            <div className="mt-2">
                                <p style={{fontSize: "18px", fontWeight:"700", marginBottom:"3px"}}>Argo Wilis</p>
                                <p style={{fontSize:"12px"}}>Eksekutif (H)</p>
                            </div>
                            <Row>
                                <Col md="1" style={style.pointer}>
                                <   div style={style.circle1}></div>
                                        <span style={style.verticalLine}></span>
                                <   div style={style.circle2}></div>
                                </Col>
                                <Col md="5">
                                    <div style={{marginBottom:"25px"}}>
                                        <p style={{fontSize:"14px", marginBottom:"2px"}}>05.00</p>
                                        <p style={{fontSize:"12px", color:"#959595"}}>21 Februari 2020</p>
                                    </div>
                                    <div>
                                        <p style={{fontSize:"14px", marginBottom:"2px"}}>10.00</p>
                                        <p style={{fontSize:"12px", color:"#959595"}}>21 Februari 2020</p>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div style={{marginBottom:"25px"}}>
                                        <p style={{fontSize:"14px", marginBottom:"2px"}}>Jakarta(GMR)</p>
                                        <p style={{fontSize:"12px", color:"#959595"}}>Stasiun Gambir</p>
                                    </div>
                                    <div>
                                        <p style={{fontSize:"14px", marginBottom:"2px"}}>Surabaya(SBY)</p>
                                        <p style={{fontSize:"12px", color:"#959595"}}>Stasiun Surabaya</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Image src={Qrcode} style={{width:"5rem"}}/>
                            <p style={{fontSize: "16px", marginRight: "7px",}}>INV0101</p>  
                        </Col>
                    </Row>
                    <hr style={{border: "1px solid black", marginTop:"0px", marginBottom:"8px"}} />
                    <Row>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px"}}>No. Tanda Pengenal</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px"}}>Nama Pemesan</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px"}}>No. Handphone</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px"}}>Email</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px", color:"#B1B1B1"}}>3162662717726612</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px", color:"#B1B1B1"}}>Anto</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px", color:"#B1B1B1"}}>0986532616711</p>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <p style={{fontSize:"14px", color:"#B1B1B1"}}>anto@gmail.com</p>
                        </Col>
                    </Row>
                    <hr style={{border: "1px solid black", marginTop:"-8px", marginBottom:"5px"}} />
                    <Row style={{background:"#E6E6E6", padding:"5px", paddingBottom:"0px"}}>
                        <Col className="ms-3">
                            <h4 className="fw-bold">Total</h4>
                        </Col>
                        <Col style={{textAlign:"right"}}>
                            <h4 style={{fontWeight:"bold", color:"#FF0742"}}>Rp.250.000</h4>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}