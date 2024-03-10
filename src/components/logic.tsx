import { socket } from "../lib/socket";
import React, { useState, useEffect } from "react";

import BeforeGame from "./beforeGame";
import InGame from "./inGame";

interface LogicProps {
  players: string;
}

export default function Logic({ players }: LogicProps) {
  const [gameRunning, setGameRunning] = useState(false);
  const [state, setState] = useState("init");

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("packet", (data) => {
      switch (data.cmd) {
        case "running":
          setGameRunning(data.data);
          break;
        case "state":
          setState(data.data);
          break;
      }
    });
  }, []);

  return (
    <div className="flex-row">
      <h2 className="pb-5">State: {state}</h2>
      <BeforeGame
        disabled={gameRunning ? true : false}
        players={players}
        changeGameRunning={(b: boolean) => {
          setGameRunning(b);
          socket.emit("packet", {
            cmd: "changeGameRunning",
            data: true,
          });
        }}
      ></BeforeGame>

      <InGame
        disabled={gameRunning ? false : true}
        players={players}
        state={state}
      ></InGame>
    </div>
  );
}
