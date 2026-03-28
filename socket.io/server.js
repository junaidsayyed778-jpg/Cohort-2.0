import { Socket } from "dgram";
import app from "./src/app.js"
import { createServer} from "http"
import { Server } from "socket.io";

const httpServer = createServer(app)
const io = new Server(httpServer, {})

io.on("connection", (socket) => {
     console.log("new user connected")

     socket.on("message",(msg) => {
        console.log("user fired message event")
        console.log(msg)
        io.emit("abc  ")
     } )
})

httpServer.listen(3000, ()=> {
    console.log("Server is running on port 3000")
})