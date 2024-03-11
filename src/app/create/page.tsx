"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socket } from "../../lib/socket";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
    <main className="flex min-h-screen flex-col items-center justify-between pt-12 pb-5">
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
