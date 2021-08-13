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

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name })
  })

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
