import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DiscProps {
  disabled: boolean;
}

export default function Disc({ disabled }: DiscProps) {
  const [fplayer, setFPlayer] = useState("");

  function handleClick() {
    if (!socket.connected) socket.connect();
    socket.emit("packet", {
      cmd: "disc-stop",
      data: "",
    });
  }

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("packet", (data) => {
      console.log(data);
      switch (data.cmd) {
        case "round":
          setFPlayer(data.data);
          break;
      }
    });
  }, []);

  if (disabled) return false;

  return (
    <div className="flex items-center justify-center">
      <Button disabled className="ml-2">
        {fplayer}
      </Button>
      <Button onClick={handleClick} className="ml-2">
        Stop
      </Button>
    </div>
  );
}
