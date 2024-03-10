"use client";
import { socket } from "../../lib/socket";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Join() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {}, []);

  function handleJoin() {
    if (!socket.connected) socket.connect();
    socket.emit("join", { code: code, name: name });
    socket.on("err", (err) => {
      console.log(err);
      toast({
        title: "Error",
        description: err,
      });
    });
    socket.on("join-success", () => router.push(`/game/${code}`));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center">
        <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Enter your game code !
          </h2>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
              placeholder="Name"
            />
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.currentTarget.value);
              }}
              placeholder="Code"
            />
            <Button onClick={handleJoin}>Join</Button>
          </div>
        </a>

        <p className={`m-0 text-sm opacity-50 pb-4`}>or</p>

        <Link href="/create">
          <Button>Create Game</Button>
        </Link>
      </div>

      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Made by Tom</p>
    </main>
  );
}
