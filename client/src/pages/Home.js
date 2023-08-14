import React from "react"
import "../style.css"
import Iklan1 from "../components/img/iklan1.png"
import Iklan2 from "../components/img/iklan2.png"
import {Container, Col, Row, Image} from "react-bootstrap"
import Schedule from "../components/CardSchedule"
import Footer from "../components/Footer"

const style = {
  Container: {
    background: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    height: "50vh",
  },
  GreetingText: {
    margin: "50px auto"
  },
  ImgRelative: {
    position: "relative",
    width: "500px",
    height: "200px"
  },
  ImgAbsolute: {
    position: "absolute",
    top: "70px",
    right: "200px",
    width: "500px",
    height: "200px",
  },
}

function Home() {
  return(
    <div>
      <Container style={style.Container} fluid>
        <Row>
          <Col>
              <div className="GreetingText" style={style.GreetingText}>
                <h2 className="text-md-center text-white fw-bold">Selamat Pagi, Ticket Seekers !</h2>
                <p className="text-white" style={{marginLeft:"130px", marginTop: "25px", lineHeight: "3 0px",}}>
                  Ingin Pulkam dengan Good Deal ?<br /> Masuk atau Daftar Sekarang
                </p>
              </div>
          </Col>
          <Col>
            <div style={{margin: "40px auto"}}>
            <Image src={Iklan1}  style={style.ImgRelative} />
              <div>
              <Image src={Iklan2} style={style.ImgAbsolute} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Schedule />
      </div>
      <div className="mt-5">
        {/* <ListSchedule /> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home
