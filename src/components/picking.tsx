import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { socket } from "@/lib/socket";
import Papa from "papaparse";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PickingProps {
  disabled: boolean;
}

export default function Picking({ disabled }: PickingProps) {
  const [fplayer, setFPlayer]: [any, any] = useState(null);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("reset-picking", (data) => {
      setFPlayer(null);
    });
  }, []);
  if (disabled) return false;

  const handleSearch = async (query: any) => {
    try {
      const response = await fetch("/players.csv"); // Adjust the file name

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const csvData = await response.text();
      const parsedData = Papa.parse(csvData, { header: true });

      // Now 'parsedData' contains an array of objects representing each row in the CSV
      console.log(parsedData);

      // Filter the data based on the search query and update the 'results' state
      const filteredResults: any = parsedData.data
        .filter((player: any) => {
          if (player.name)
            return player.name.toLowerCase().includes(query.toLowerCase());
          return false;
        })
        .slice(0, 5);

      setResults(filteredResults);
    } catch (error: any) {
      console.error("Error fetching or parsing data:", error.message);
      // Handle error, display a message, or set an error state
    }
  };

  const debouncedSearch = debounce((value: any) => {
    handleSearch(value);
  }, 300);

  function handleClick(p: any) {
    if (!socket.connected) socket.connect();
    console.log(p);
    socket.emit("packet", {
      cmd: "submit-player",
      data: p,
    });
  }

  return (
    <div className="flex-row">
      {fplayer == null ? (
        <div>
          <Input
            value={query}
            placeholder="search Player"
            onChange={(e) => {
              setQuery(e.target.value);
              setResults([]);
              debouncedSearch(e.target.value);
            }}
          ></Input>
          <ul className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {results.map((player: any) => (
              <li
                key={player.player_id}
                onClick={() => {
                  handleClick(player);
                  setFPlayer(player.name);
                }}
              >
                {player.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Selected Player</h2>
          <p>Name: {fplayer}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}
