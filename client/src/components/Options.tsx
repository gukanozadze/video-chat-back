import React, { useContext, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { SocketContext } from "../SocketContext"
import Input from "./Inputs/Input"

interface Props {
  children: any
}

const Options = ({ children }: Props) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState("")

  return (
    <div className="flex flex-col ">
      <div className="flex space-x-8 mb-4 items-start">
        <div>
          <Input label="Account Info" placeholder={"Your Name"} value={name} setValue={setName} />
          <CopyToClipboard text={me}>
            <button
              type="button"
              className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              Copy ID To Clipboard
            </button>
          </CopyToClipboard>
        </div>
        <div>
          <Input label="Make a Call" placeholder={"ID to Call"} value={idToCall} setValue={setIdToCall} />
          {callAccepted && !callEnded ? (
            <button
              type="button"
              className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
              onClick={leaveCall}
            >
              Hang Up
            </button>
          ) : (
            <button
              type="button"
              className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              onClick={() => callUser(idToCall)}
            >
              Call
            </button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Options
