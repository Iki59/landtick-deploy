import {useNavigate} from "react-router-dom"
import {useQuery} from "react-query"
import { API } from "../config/api"
import {Container, Navbar, Row, Col, Button, Image} from "react-bootstrap"
import Brand2 from "../components/img/brand2.png"


const style = {
    boxTicket: {
        width: "63rem",
        border: "1px solid #B7B7B7",
        borderRadius: "5px",
        marginBottom: "25px",
    },
    ticketBrand: {
        background: "linear-gradient(to top, #EC7AB7, #EC7A7A)",
        marginLeft: "-12px",
        padding: "10px 25px",
        borderRadius: "7px 3px 60px 0px",
    },
    pendingStatus: {
        background: "pink",
        opacity: "0.9",
        padding: "4px 7px",
        fontStyle: "normal",
        fontWeight: "500",
        color: "#DC7D0B",
    },
    successStatus: {
        background: "#0BDC5F",
        padding: "4px 7px",
        fontStyle: "normal",
        fontWeight: "500",
        color: "white",
    },
    pointer: {
        display: "flex",
        alignItems: "end",
        flexDirection: "column", 
        marginTop: "6px",
    },
    circle1: {
        width: "20px",
        height: "20px",
        borderRadius: "100%",
        border: "1px solid #EC7A7A",
        marginBottom: "3px",
    },
    circle2: {
        width: "20px",
        height: "20px",
        borderRadius: "100%",
        border: "none",
        background: "#EC7A7A",
        marginTop: "3px",
    },
    verticalLine: {
        height: "55px",
        borderLeft: "1px solid #D0D0D0",
        display: "inline-block",
        margin: "0 9px",

    },
    scheduleTicket: {
        fontSize: "18px",
        fontWeight: "900",
    },
    detailTicket: {
        fontSize: "14px",
        color: "#B7B7B7",
        fontWeight: "400",
        marginTop: "-20px",
        marginBottom: "0px"
    },
    headOrder: {
        marginTop: "35px",
    },
    detailOrder: {
        color: "#B1B1B1",
        marginTop: "5px",
    },
    btnBuy: {
        fontSize: "18px",
        padding: "4px 20px",
        background: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
        border: "none",
        marginBottom: "10px",
        marginTop: "-10px"
    }

}

export default function MyTicket() {
    const navigate = useNavigate()
    let {data: myTicket} = useQuery("MyTicketcache", async () => {
        const response = await API.get("/ticket-myticket")
        return response.data.data
    })
    console.log(myTicket)

   const handleBuy = async (id) => {
    try {
        const response = await API.get(`/transaction/${id}`)
            navigate(`/invoice/${id}`)
            console.log("ini invoice", response)
            return response.data.data
    } catch (error) {
        console.log(error)
    }
   }
    return(
        <div>
            <h3 style={{margin: "1rem 7rem"}}>Tiket Saya</h3>
            {myTicket?.map((data, id) => 
            <Container style={style.boxTicket} key={id}>
                <Row>
                    <Col style={{marginTop: "-10px"}}>
                            <Navbar.Brand style={style.ticketBrand} className="ticket-brand">Land Tick <Image src={Brand2} style={{width: "40px", marginBottom: "5px"}} /> </Navbar.Brand>
                    </Col>
                    <Col>
                        <h3 className="text-end fw-bold mb-0">Kereta Api</h3>
                        <p style={{color: "#878787", textAlign: "end"}}>{data.ticket.start_date}</p>
                    </Col>
                </Row>
                <Row md={6}>
                    <Col style={{textAlign: "center"}}>
                        <h4><b>{data.ticket.name_train}</b></h4>
                        <p className="mt-0"> {data.ticket.type} (H)</p>
                        {data.status === "Pending" && (
                            <div style={style.pendingStatus}>{data.status}</div>
                        )}
                        {data.status === "success" && (
                            <div style={style.successStatus}>{data.status}</div>
                        )}
                    </Col>
                    <Col md={1} style={style.pointer}>
                        <div style={style.circle1}></div>
                        <span style={style.verticalLine}></span>
                        <div style={style.circle2}></div>
                    </Col>
                    <Col>
                        <div style={{marginBottom: "35px"}}>
                        <p style={style.scheduleTicket}>{data.ticket.start_time}</p>
                        <p style={style.detailTicket}>{data.ticket.start_date}</p>
                        </div>
                        <div>
                        <p style={style.scheduleTicket}>{data.ticket.arival_time}</p>
                        <p style={style.detailTicket}>{data.ticket.start_date}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{marginBottom: "35px"}}>
                        <p style={style.scheduleTicket}>{data.ticket.start_station.name}</p>
                        <p style={style.detailTicket}>{data.ticket.start_station.name}</p>
                        </div>
                        <div>
                        <p style={style.scheduleTicket}>{data.ticket.destination_station.name}</p>
                        <p style={style.detailTicket}>{data.ticket.destination_station.name}</p>
                        </div>
                    </Col>
                </Row>
                <Row md={5} style={style.headOrder}>
                    <Col style={{textAlign: "center"}}>
                    <p>No. Tanda Pengenal</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    <p>Nama Pemesan</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    <p>No. Handphone</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    <p>Email</p>
                    </Col>
                </Row>
                <hr style={{width: "49rem", marginLeft: "-14px", marginTop: "-10px", marginBottom: "0px"}} />
                <Row md={5} style={style.detailOrder}>
                    <Col style={{textAlign: "center"}}>
                    <p>31175033390001</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    <p>{data.user.full_name}</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    <p>{data.user.telepon}</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    <p>{data.user.email}</p>
                    </Col>
                    <Col style={{textAlign: "center"}}>
                    {data.status === "Pending" && (
                        <Button type="submit" onClick={() => handleBuy(data.id)} style={style.btnBuy}>Bayar Sekarang</Button>
                    )}
                        </Col>
                </Row>
            </Container>
            )}
        </div>
    )
}