import React from "react"

import VideoPlayer from "./components/VideoPlayer"
import Options from "./components/Options"
import Notifications from "./components/Notifications"

const App = () => {
  return (
    <div className="container mx-auto">
      <h1>Video Chat</h1>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default App
