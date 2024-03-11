"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import { useToast } from "@/components/ui/use-toast";
import Logic from "../../../components/logic";
import Image from "next/image";

export default function Game() {
  const { gameId } = useParams();
  const [showGame, setShowGame] = useState(true);
  const [players, setPlayers] = useState("");
  const [status, setStatus] = useState("");
  const { toast } = useToast();
  const [isOwner, setIsOwner] = useState(false);

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
    socket.on("owner", (data) => setIsOwner(data));

    socket.emit("check", gameId);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert px-24"
          src="/next.svg"
          alt="Football Imposter Logo"
          width={400}
          height={100}
          priority
        />
      </div>
      {showGame ? (
        <div className="mb-32 grid text-center">
          <a className="group rounded-lg border border-transparent px-5 pt-4 transition-colors">
            <p className={`mb-3 text-xl font-semibold`}>
              Game: {gameId} - Players: {players.split(" | ")[0]}{" "}
            </p>
          </a>
          <Logic players={players} isOwner={isOwner} />
        </div>
      ) : (
        <div className="mb-32 grid text-center">
          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              You are not part of this game!
            </h2>
          </a>
        </div>
      )}
    </main>
  );
}
