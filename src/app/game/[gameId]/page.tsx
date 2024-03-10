"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import { useToast } from "@/components/ui/use-toast";
import Logic from "../../../components/logic";

export default function Game() {
  const { gameId } = useParams();
  const [showGame, setShowGame] = useState(true);
  const [players, setPlayers] = useState("");
  const [status, setStatus] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("err", (err) => {
      err == "not-part-of-game" ? setShowGame(false) : null;
      toast({
        title: "Error",
        description: err,
      });
    });

    socket.on("size", (size) => setPlayers(size));

    socket.emit("check", gameId);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {showGame ? (
        <div className="mb-32 grid text-center">
          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <p className={`mb-3 text-xl font-semibold`}>
              Game: {gameId} - Players: {players}{" "}
            </p>
          </a>
          <Logic players={players} />
        </div>
      ) : (
        <div className="mb-32 grid text-center">
          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              YOU ARE NOT PART OF THE GAME
            </h2>
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Status: {showGame}
            </h2>
          </a>
        </div>
      )}
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Made by Tom</p>
    </main>
  );
}
