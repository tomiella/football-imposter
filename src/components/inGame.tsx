import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { socket } from "@/lib/socket";

import Picking from "@/components/picking";
import Disc from "@/components/disc";

interface InGameProps {
  disabled: boolean;
  players: string;
  state: string;
}

export default function InGame({ disabled, players, state }: InGameProps) {
  const [status, setStatus]: [string[], any] = useState([]);
  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("packet", (data) => {
      switch (data.cmd) {
        case "picking-status":
          setStatus(data.data);
          break;
      }
    });
  }, []);
  if (disabled) return false;

  let list: any = [];
  players
    .split(" | ")[1]
    .split(" ")
    .forEach((player, _idx) => {
      if (player != "") {
        let bg = "rounded-md border px-2 py-1 font-mono text-sm bg-red-400";
        if (status.includes(player))
          bg = "rounded-md border px-2 py-1 font-mono text-sm bg-green-400";
        list.push(<div className={bg}>{player}</div>);
        list.push(<Separator orientation="vertical" />);
      }
    });
  list.pop();

  return (
    <div className="grid grid-flow-row gap-10">
      <div className="flex h-4 items-center justify-center space-x-2 text-sm">
        {list}
      </div>
      <Picking disabled={state != "picking" ? true : false}></Picking>
      <Disc disabled={state != "disc" ? true : false}></Disc>
    </div>
  );
}
