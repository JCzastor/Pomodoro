import './main.scss';
import Countdown from "react-countdown/dist/LegacyCountdown";
import StartButton from "./components/StartButton";
import PauseButton from "./components/PauseButton";
import Timer from "./components/Timer";
import React, { useEffect, useRef, useState } from "react";
import Settings from "./components/Settings";

function App() {
  return (
    <main>
        <Timer/>
    </main>
  )
}

export default App
