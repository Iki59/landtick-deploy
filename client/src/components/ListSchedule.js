import React, {useEffect, useState, useContext} from "react"
import {useQuery, useMutation} from "react-query"
import {Link, useNavigate} from "react-router-dom"
import {Container, Row, Col} from "react-bootstrap"
import {UserContext} from "../context/UserContext"
import {Modal} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { API, setAuthToken } from "../config/api"
import Login from "./Login"

const style = {
    ListSchedule: {
        marginTop: "30px",
        border: "1px solid #B7B7B7",
        padding: "10px",
    },
    topList: {
        fontSize: "18px",
    },
    contentList: {
        fontSize: "18px",
        fontWeight: "900",
    },
    contentListPrice: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#EC7A7A",
    },
    detailList: {
        fontSize: "14px",
        color: "#B7B7B7",
        fontWeight: "400",
        marginTop: "-20px",
        marginBottom: "0px"
    },
}

export default function ListSchedule({startStation, destinationStation, search}) {
    const [doneAdd, setDoneAdd] = useState(false)
    const [loginShow, setLoginShow] = useState(false)
    const navigate = useNavigate()

    const handleCloseLogin = () => setLoginShow(false)
    const handleShowLogin= () => {
        setLoginShow(true)
    }


    const handleCloseAdd = () => setDoneAdd(false)
    const handleShowAdd = () => setDoneAdd(true)

    const [state] = useContext(UserContext)

    setAuthToken(localStorage.token);

    let { data: tickets, refetch } = useQuery("ticketsCache", async () => {
        const response = search? (await API.get(`/ticket?start_station_id=${startStation}&destination_station_id=${destinationStation}`))
        : (await API.get("/tickets"))
        console.log("ini coba filter",response)
        return response.data.data;
      })

      
      const [ticketId, setTicketId] = useState(null)
      console.log(ticketId);
      const handleBuy = useMutation(async (e) => {
        try{
            e.preventDefault()

            let form = new FormData()
            form.set("ticket_id", ticketId)
            const response = await API.post("/transaction", form)
            
            console.log("Transaction Success: ", response)
            navigate("/my-ticket")
            return response.data.data
        } catch (error) {
            console.log("Transaction error: ", error)
        }
      })

      useEffect(() => {
        refetch();
      }, [search]);
    return (
        <>
        <Container className="mt-5" fluid="lg">
            <Row>
                <Col style={{textAlign: "center"}}>
                <p style={style.topList}>Nama Kereta</p>
                </Col>
                <Col md={2} style={{textAlign: "center"}}>
                <p style={style.topList}>Berangkat</p>
                </Col>
                <Col md={1} style={{textAlign: "center"}}>
                <p style={style.topList}>Break</p>
                </Col>
                <Col md={2} style={{textAlign: "center"}}>
                <p style={style.topList}>Tiba</p>
                </Col>
                <Col md={2} style={{textAlign: "center"}}>
                <p style={style.topList}>Durasi</p>
                </Col>
                <Col style={{textAlign: "center"}}>
                <p style={style.topList}>Harga Per Orang</p>
                </Col>
            </Row>  
            {tickets?.map((data) =>
            <Row style={style.ListSchedule} key={data.id} onClick={state.isLogin === true? (()=> {handleShowAdd(); setTicketId(data.id)}) : (() => setLoginShow(true)) } >
                <Col style={{textAlign: "center"}}>
                <p style={style.contentList}> {data.name_train} </p>
                <p style={style.detailList}>{data.type}</p>
                </Col>
                <Col md={2} style={{textAlign: "center"}}>
                <p style={style.contentList}>{data.start_time}</p>
                <p style={style.detailList}>{data.start_station.name}</p>
                </Col>
                <Col md={1} style={{textAlign: "center"}}>
                    <FontAwesomeIcon icon={faArrowRight} className="fs-5 mt-2" />
                </Col>
                <Col md={2} style={{textAlign: "center"}}>
                <p style={style.contentList}>{data.arival_time}</p>
                <p style={style.detailList}>{data.destination_station.name}</p>
                </Col>
                <Col md={2} style={{textAlign: "center"}}>
                <p style={style.contentList}>{parseInt(data.arival_time) - parseInt(data.start_time)} Jam</p>
                </Col>
                <Col style={{textAlign: "center"}}>
                <p style={style.contentListPrice}>{data.price}</p>
                </Col>
            </Row>
            )}
            <Modal show={doneAdd} onHide={handleCloseAdd}>
                <Modal.Body><p style={{textAlign: "center", fontSize: "14px"}}>Tiket anda berhasil ditambahkan silahkan segera melakukan pembayaran <br/> Klik <Link onClick={(e) => handleBuy.mutate(e)} style={{textDecoration: "none", color: "black"}}><b>disini</b></Link> </p></Modal.Body>
            </Modal>
        </Container>
        <Login show={loginShow} onHide={handleCloseLogin} onClick={handleShowLogin}  />
        </>
    )
}