import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PickingProps {
  disabled: boolean;
}

export default function Picking({ disabled }: PickingProps) {
  const [fplayer, setFPlayer] = useState("");
  if (disabled) return false;

  function handleClick() {
    if (!socket.connected) socket.connect();
    socket.emit("packet", {
      cmd: "submit-player",
      data: fplayer,
    });
  }

  return (
    <div className="flex">
      <Input
        value={fplayer}
        placeholder="input player"
        onChange={(e) => setFPlayer(e.target.value)}
      ></Input>
      <Button className="ml-2" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}
