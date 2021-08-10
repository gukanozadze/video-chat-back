import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send("Server is running")
})

io.on("connection", (socket) => {
  socket.emit("me", socket.id)

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended")
  })

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name })
  })

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
