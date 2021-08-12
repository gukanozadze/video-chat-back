/* eslint-disable react/no-string-refs */
import React, { useContext } from "react"
import { SocketContext } from "../SocketContext"
import Notifications from "./Notifications"
import Options from "./Options"

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)

  return (
    <div className="bg-gray-900 space-y-12">
      <div className="flex items-start flex-col sm:flex-row ">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">WebRTC Video Chat</h2>
          <p className="text-sm sm:text-lg text-gray-300">
            Enter your name, send ID to friend and he will make a call.
          </p>
        </div>
        <div className="mt-6 sm:mt-0 sm:ml-16">
          <Options>
            <Notifications />
          </Options>
        </div>
      </div>
      <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
        {stream && (
          <li className="pb-10 bg-gray-800 text-center rounded-lg xl:text-left">
            <div className="space-y-10">
              <video className="mx-auto h-full w-full rounded-lg" playsInline muted ref={myVideo} autoPlay />

              <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                <div className="font-medium text-lg leading-6 space-y-1">
                  <h3 className="text-white">{name}</h3>
                  <p className="text-indigo-400">Software Developer</p>
                </div>
              </div>
            </div>
          </li>
        )}
        {callAccepted && !callEnded && (
          <li className="pb-10 bg-gray-800 text-center rounded-lg  xl:text-left">
            <div className="space-y-10">
              <video className="mx-auto h-full w-full rounded-lg" playsInline muted ref={userVideo} autoPlay />

              <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                <div className="font-medium text-lg leading-6 space-y-1">
                  <h3 className="text-white">{call.name}</h3>
                  <p className="text-indigo-400">Senior Designer</p>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default VideoPlayer
