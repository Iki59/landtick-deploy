import React, { useState } from "react";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import {Container, Form, Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const style = {
    formInput: {
        fontColor: "black",
        marginBottom: "20px",
        height: "40px",
    },
    btnSave: {
        width: "200px",
        margin: "auto",
        background: "#0ACF83",
        border: "none",
    }
}

export default function AddTicket() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name_train: "",
        type: "",
        start_date: "",
        start_station_id: "",
        start_time: "",
        destination_station_id: "",
        arival_time: "",
        price: "",
        quantity: "",
    })
    const {name_train, type, start_date, start_station_id, start_time, destination_station_id, arival_time, price, quantity} = form

    let { data: stations} = useQuery("stationsCache", async () => {
        const response = await API.get("/stations");
        return response.data.data
      })

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        })
      }


      const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.set("name_train", form.name_train)
            formData.set("type", form.type)
            formData.set("start_date", form.start_date)
            formData.set("start_station_id", form.start_station_id)
            formData.set("start_time", form.start_time)
            formData.set("destination_station_id", form.destination_station_id)
            formData.set("arival_time", form.arival_time)
            formData.set("price", form.price)
            formData.set("quantity", form.quantity)

            const response = await API.post("/ticket", formData)
            console.log("add ticket success : ", response)
                setForm({
                    name_train: "",
                    type: "",
                    start_date: "",
                    start_station_id: "",
                    start_time: "",
                    destination_station_id: "",
                    arival_time: "",
                    price: "",
                    quantity: "",
                })
            alert("Add Ticket Success")
            navigate("/listtransaksi")
        } catch (error) {
            console.log("add ticket failed : ", error)
        }
      })

    return(
        <Container style={{padding: "30px"}}>
        <h3 className="mb-5 mt-3">Tambah Tiket</h3>
        <Form onSubmit={(e) => {handleSubmit.mutate(e)}}>
            <Form.Group>
                <Form.Control type="text" placeholder="Nama Kereta" name="name_train" value={name_train} onChange={handleChange} style={style.formInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Select value={type} name="type" onChange={handleChange} style={style.formInput}>
                    <option hidden>Jenis Kereta</option>
                    <option>Eksklusif</option>
                    <option>Bisnis</option>
                    <option>Ekonomi</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" placeholder="Tanggal Keberangkatan" name="start_date" value={start_date} onChange={handleChange} style={style.formInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Select value={start_station_id} name="start_station_id" onChange={handleChange} style={style.formInput}>
                    <option hidden>Start Station</option>
                    {stations?.map((data) => (
                        <option key={data?.id} value={data?.id}>{data.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" placeholder="Jam Keberangkatan" name="start_time" value={start_time} onChange={handleChange} style={style.formInput}/>
            </Form.Group>
            <Form.Group>
            <Form.Select value={destination_station_id} name="destination_station_id" onChange={handleChange} style={style.formInput}>
                    <option hidden>Destination Station</option>
                    {stations?.map((data) => (
                        <option key={data?.id} value={data?.id}>{data.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" placeholder="Jam Tiba" name="arival_time" value={arival_time} onChange={handleChange} style={style.formInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" placeholder="Harga Ticket" name="price" value={price} onChange={handleChange} style={style.formInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" placeholder="Quantity" name="quantity" value={quantity} onChange={handleChange} style={style.formInput}/>
            </Form.Group>
        <div className="d-grid">
            <Button type="submit" size="md" style={style.btnSave}>Save</Button>
        </div>
        </Form>
    </Container>
    )
}