import React from "react"

import VideoPlayer from "./components/VideoPlayer"
import Options from "./components/Options"
import Notifications from "./components/Notifications"

const App = () => {
  return (
    <div className="bg-gray-900">
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default App
