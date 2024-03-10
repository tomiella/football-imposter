"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socket } from "../../lib/socket";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Join() {
  const [name, setName] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  function handleCreate() {
    if (!socket.connected) socket.connect();
    socket.emit("create", name);
    socket.on("err", (err) => {
      console.log(err);
      toast({
        title: "Error",
        description: err,
      });
    });
    socket.on("create-success", (code) => router.push(`/game/${code}`));
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center">
        <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-2xl font-semibold`}>Create a game !</h2>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
              placeholder="Name"
            />
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </a>
      </div>

      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Made by Tom</p>
    </main>
  );
}
