import React, {useState, useEffect} from "react"
import { useQuery, useMutation } from "react-query"
import { API } from "../config/api"
import {Container, Row, Col} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import DetailAdmin from "../components/DetailAdmin"
import DeleteTransaksi from "../components/ModalDelete"

export default function ListTransaksi() {
    const [detailShow, setDetailShow] = useState(false)
    const [idDelete, setIdDelete] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const handleCloseDetail = () => setDetailShow(false)
    const handleShowDetail= () => setDetailShow(true)
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleDelete = (id) => {
        setIdDelete(id)
        handleShow()
    }

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/transaction/${id}`)
            refetch()
        } catch (error) {
            console.log(error)
        }
    })

    let { data: transactions, refetch } = useQuery(
        "transactionCache",
        async () => {
          const response = await API.get("/transactions");
          return response.data.data;
        }   
        )
        console.log(transactions)

        useEffect(() => {
            if (confirmDelete) {
              handleClose();
              deleteById.mutate(idDelete);
              setConfirmDelete(null);
            }
            // eslint-disable-next-line
          }, [confirmDelete]);

    return(
        <>
            <Container className="mt-5">
                <h3>List Transaksi</h3>
                <Row className="mt-4">
                    <Col>
                    <p>No.</p>
                    </Col>
                    <Col>
                    <p>Users</p>
                    </Col>
                    <Col>
                    <p>Tiket</p>
                    </Col>
                    <Col>
                    <p>Status Payment</p>
                    </Col>
                    <Col>
                    <p>Action</p>
                    </Col>
                </Row>
                {transactions?.map((data, index) =>
                <Row key={data.id} style={{padding: "10px 0px", background: "#C4C4C4", border: "2px solid grey",}}>
                    <Col>
                    <p>{index + 1}</p>
                    </Col>
                    <Col>
                    <p>{data.user.full_name}</p>
                    </Col>
                    <Col>
                    <p>{data.ticket.start_station.name}-{data.ticket.destination_station.name}</p>
                    </Col>
                    <Col>
                    {data.status === "Pending" && (
                    <p style={{color: "#F7941E"}}>{data.status}</p>
                    )}
                    {data.status === "success" && (
                    <p style={{color: "green"}}>{data.status}</p>
                    )}
                    </Col>
                    <Col>
                        <Row md={6}>
                            <Col onClick={handleShowDetail}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#2fc5f7", fontSize: "25px",}} />
                            </Col>
                            <Col onClick={() => {handleDelete(data.id)}}>
                                <FontAwesomeIcon icon={faTrashCan} style={{color: "#ff0742", fontSize: "25px", marginLeft:"20px"}} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                )}
            </Container>
            <DeleteTransaksi setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}/>
            {/* <Footer /> */}
            <DetailAdmin show={detailShow} onHide={handleCloseDetail} />
        </>
    )
}