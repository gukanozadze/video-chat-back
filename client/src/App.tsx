import React from "react"

import VideoPlayer from "./components/VideoPlayer"
import Options from "./components/Options"
import Notifications from "./components/Notifications"

const App = () => {
  return (
    <div className="bg-gray-900 mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
      <VideoPlayer />
    </div>
  )
}

export default App
