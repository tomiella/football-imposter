import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BeforeGameProps {
  disabled: boolean;
  players: string;
  isOwner: boolean;
  changeGameRunning: Function;
}

export default function BeforeGame({
  disabled,
  players,
  isOwner,
  changeGameRunning,
}: BeforeGameProps) {
  if (disabled) return false;
  return (
    <div className="py-12">
      {parseInt(players.charAt(0)) < 1 ? (
        <div>
          <h1>Need 3 players to start game</h1>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      ) : (
        <div>
          <h1>Enough players to start</h1>
          <Button
            disabled={!isOwner}
            onClick={() => {
              changeGameRunning(true);
            }}
          >
            Start Game
          </Button>
        </div>
      )}
    </div>
  );
}
