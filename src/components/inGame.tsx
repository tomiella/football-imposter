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
  if (disabled) return false;
  console.log(state);

  return (
    <div className="grid grid-flow-row gap-10 pt-12">
      <Picking disabled={state != "picking" ? true : false}></Picking>
      <Disc disabled={state != "disc" ? true : false}></Disc>
    </div>
  );
}
