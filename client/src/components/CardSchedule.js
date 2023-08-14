import { useEffect, useState } from "react"
import { API } from "../config/api"
import ListSchedule from "./ListSchedule"
import {Col, Row, Nav, Container, Tab, Form, Button} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrainSubway, faRightLeft } from '@fortawesome/free-solid-svg-icons'

const style = {
    RowNav: {
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "5px",
    },
    NavItem: {
        border: "none",
        height: "215px",
        borderRadius: "0px",
        backgroundColor: "#F2F2F2"
    },
    NavLink: {
        borderRadius: "0px",
        border: "none",
        width: "285px",
        height: "50px",
        borderLeft: "8px solid #e48424",
        marginTop: "10px",
        marginLeft: "-12px",
    },
    IconTrain: {
        fontSize: "30px",
        color: "#e48424",
        marginRight: "10px",
        marginTop: "2px",
    },
    FontTrain: {
        fontSize: "18px",
        marginTop: "5px",
    },
    TabColContent: {
        backgroundColor: "white",
    },
    TabContent: {
        padding: "10px",
        paddingRight: "20px",
        marginBottom: "5px",
    },
    FormPlace: {
        height: "30px",
        fontSize: "15px",
        paddingTop: "3px"
    },
    FormDate: {
        height: "30px",
        width: "145px",
        fontSize: "14px"
    },
    FormCount: {
        height: "30px",
        width: "80px",
        fontSize: "14px"
    },
    BtnSubmit: {
        padding: "4px 28px",
        border: "none",
        background: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
        marginTop: "30px",
        marginLeft: "20px",
    },
    Ellipse: {
        marginLeft: "20px",
        marginTop: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        background: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    },
    IconTransfer : {
        marginTop: "20px",
        marginLeft: "25px",
        fontSize: "25px",
        color: "white",
        padding: "10px",
        borderRadius: "100%",
        background: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    }
}

export default function Schedule() {
    const [stations, setStations] = useState([])
    const [form, setForm] = useState({
        start_station_id: "",
        destination_station_id: "",
    })

    const getStations = async () => {
        try {
            const response = await API.get("/stations")
            setStations(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const [search, setSearch] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        form.start_station_id === "" && form.destination_station_id === ""
        ? setSearch(false)
        : setSearch(true)
    }
    
    useEffect(() => {
        getStations();
      }, []);
    return(
        <div>
            <Container style={{marginTop: "-35px"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row style={style.RowNav}>
                        <Col sm={3} style={style.NavItem}>
                            <Nav variant="tabs" className="flex-column">
                                <Nav.Item>
                                     <Nav.Link style={style.NavLink} eventKey="first">
                                        <div className="d-flex">
                                        <FontAwesomeIcon icon={faTrainSubway} style={style.IconTrain} />
                                        <p style={style.FontTrain}>Tiket Kereta Api</p>
                                        </div>
                                        </Nav.Link>
                                </Nav.Item>
                            </Nav>
                         </Col>
                        <Col sm={9} style={style.TabColContent}>
                             <Tab.Content style={style.TabContent}>
                                <Tab.Pane eventKey="first">
                                <h3>Tiket Kereta Api</h3>
                                <Row>
                                    <Col sm={5}>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{fontWeight: "700"}}>Asal</Form.Label>
                                            <Form.Select value={form.start_station_id} name="start_station_id" onChange={handleChange} aria-label="Select Asal" style={style.FormPlace}>
                                                <option value="" hidden>Select</option>
                                                {stations.map((data, index) => (
                                                <option key={index} value={data.id}>{data.name}</option>
                                                ))}
                                            </Form.Select>
                                            <Row className="mt-2">
                                                <Col>
                                                    <Form.Label style={{fontWeight: "700"}}>Tanggal Berangkat</Form.Label>
                                                    <Form.Control type="date" style={style.FormDate} />
                                                </Col>
                                                <Col>
                                                <Form.Check label="Pulang Pergi" style={{fontWeight: "700"}} />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                    <Col sm={2}>
                                        <FontAwesomeIcon icon={faRightLeft} style={style.IconTransfer} />
                                    </Col>
                                    <Col sm={5}>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{fontWeight: "700"}}>Tujuan</Form.Label>
                                            <Form.Select value={form.destination_station_id} name="destination_station_id" onChange={handleChange} aria-label="Select Asal" style={style.FormPlace}>
                                            <option value="" hidden>Select</option>
                                                {stations.map((data, index) => (
                                                <option key={index} value={data.id}>{data.name}</option>
                                                ))}
                                            </Form.Select>
                                            <Row className="mt-2">
                                                <Col sm={3}>
                                                    <Form.Label style={{fontWeight: "700"}}>Dewasa</Form.Label>
                                                    <Form.Select style={style.FormCount}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Form.Select>
                                                </Col>
                                                <Col sm={3}>
                                                    <Form.Label style={{fontWeight: "700"}}>Bayi</Form.Label>
                                                    <Form.Select style={style.FormCount}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Form.Select>
                                                </Col>
                                                <Col sm={6}>
                                                <Button type="submit" onClick={handleClick} style={style.BtnSubmit} href="#">Cari Tiket</Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                </Row>
                                </Tab.Pane>
                            </Tab.Content>
                          </Col>
                    </Row>
                </Tab.Container>
                <ListSchedule startStation={form.start_station_id} destinationStation={form.destination_station_id} search={search} />
            </Container>
        </div>
    )
}