import React, { useContext } from "react"
import { SocketContext } from "../SocketContext"

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext)

  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div className="flex justify-center">
          <h1 className="text-gray-500">{call.name} is calling - </h1>
          <button
            type="button"
            className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            onClick={answerCall}
          >
            Answer
          </button>
        </div>
      )}
    </div>
  )
}

export default Notifications
