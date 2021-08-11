import React, { createContext, useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"
import Peer from "simple-peer"

const SocketContext = createContext<SocketContextType>({} as SocketContextType)

const socket = io("http://localhost:5000")

const ContextProvider = ({ children }: Props) => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined)
  const [me, setMe] = useState<string>("")
  const [call, setCall] = useState<Partial<Call>>({})
  const [callAccepted, setCallAccepted] = useState<boolean>(false)
  const [callEnded, setCallEnded] = useState<boolean>(false)
  const [name, setName] = useState("")

  const myVideo = useRef<HTMLVideoElement>()
  const userVideo = useRef<HTMLVideoElement>()
  const connectionRef = useRef<Peer.Instance>()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream)

      if (myVideo.current) {
        myVideo.current.srcObject = currentStream
      }
    })

    socket.on("me", (id) => setMe(id))

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, signal, from, name: callerName })
    })
  }, [""])
  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from })
    })

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        me: name,
      })
    })

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true)

      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    if (connectionRef.current) {
      connectionRef.current.destroy()
    }

    window.location.reload()
  }

  return (
    // prettier-ignore
    <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
      {children}
    </SocketContext.Provider>
  )
}

interface Props {
  children: any
}
interface SocketContextType {
  call: any
  callAccepted: any
  myVideo: any
  userVideo: any
  stream: any
  name: any
  setName: any
  callEnded: any
  me: any
  callUser: any
  leaveCall: any
  answerCall: any
}
interface Call {
  isReceivedCall: boolean
  from: any
  name: string
  signal: any
}

export { ContextProvider, SocketContext }
