import { socket } from "../lib/socket";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

import BeforeGame from "./beforeGame";
import InGame from "./inGame";

interface LogicProps {
  players: string;
}

export default function Logic({ players }: LogicProps) {
  const [gameRunning, setGameRunning] = useState(false);
  const [state, setState] = useState("init");
  const [status, setStatus]: [string[], any] = useState([]);

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
        case "picking-status":
          setStatus(data.data);
          break;
      }
    });
  }, []);
  let list: any = [];
  players
    .split(" | ")[1]
    .split(" ")
    .forEach((player, _idx) => {
      if (player != "") {
        let bg = "rounded-md border px-2 py-1 font-mono text-sm bg-red-400";
        if (status.includes(player))
          bg = "rounded-md border px-2 py-1 font-mono text-sm bg-green-400";
        else bg = "rounded-md border px-2 py-1 font-mono text-sm bg-red-400";
        list.push(<div className={bg}>{player}</div>);
        list.push(<Separator orientation="vertical" />);
      }
    });
  list.pop();

  return (
    <div className="flex-row">
      <div className="flex h-4 items-center justify-center space-x-2 text-sm">
        {list}
      </div>
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
