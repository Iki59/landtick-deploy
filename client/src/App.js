import {Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import MyTicket from "./pages/MyTicket"
import Invoice from "./pages/Invoice"
import ListTransaksi from "./pages/ListTransaksi"
import AddTicket from "./pages/AddTicket"
import PrivateRoute from "./privateroute/privateroute"


function App() {
  return(
    <div style={{minHeight: "100%", position: "relative"}}>
       <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/listtransaksi" element={<ListTransaksi />} />
          <Route path="/add-ticket" element={<AddTicket />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App