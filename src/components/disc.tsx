import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DiscProps {
  disabled: boolean;
}

export default function Disc({ disabled }: DiscProps) {
  const [fplayer, setFPlayer]: [any, any] = useState(null);

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
    <div className="flex-row items-center justify-center">
      <div className="flex items-center justify-center pb-4">
        {fplayer && (
          <Button disabled className="ml-2">
            {fplayer.name}
          </Button>
        )}
        {fplayer && fplayer.name == "imposter" && (
          <Button onClick={handleClick} className="ml-2">
            Stop
          </Button>
        )}
      </div>
      {fplayer && fplayer.name != "imposter" && (
        <ul className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <li>Name: {fplayer.name}</li>
          <li>Country of Birth: {fplayer.country_of_birth}</li>
          <li>Position: {fplayer.position}</li>
          <li>Foot: {fplayer.foot}</li>
        </ul>
      )}
    </div>
  );
}
