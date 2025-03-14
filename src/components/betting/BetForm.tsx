// src/components/betting/BetForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BetFormProps {
  match: {
    fixture: {
      id: number;
    };
    teams: {
      home: {
        name: string;
      };
      away: {
        name: string;
      };
    };
    odds: {
      homeWin: number;
      draw: number;
      awayWin: number;
    };
  };
  userId: string;
}

type BetType = 'home' | 'draw' | 'away';

export function BetForm({ match, userId }: BetFormProps) {
  const router = useRouter();
  const [selectedBet, setSelectedBet] = useState<BetType | null>(null);
  const [amount, setAmount] = useState<number>(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState(100); // This would come from your API

  const getBetOdds = (type: BetType) => {
    switch (type) {
      case "home":
        return match.odds.homeWin;
      case "draw":
        return match.odds.draw;
      case "away":
        return match.odds.awayWin;
      default:
        return 0;
    }
  };

  const getTeamName = (type: BetType) => {
    switch (type) {
      case "home":
        return match.teams.home.name;
      case "draw":
        return "Draw";
      case "away":
        return match.teams.away.name;
      default:
        return "";
    }
  };

  const calculatePotentialWin = () => {
    if (!selectedBet) return 0;
    return amount * getBetOdds(selectedBet);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBet) {
      setError("Please select a bet type");
      return;
    }

    if (amount <= 0) {
      setError("Bet amount must be greater than 0");
      return;
    }

    if (amount > userBalance) {
      setError("Insufficient balance");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/bets', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId,
      //     matchId: match.fixture.id,
      //     prediction: selectedBet,
      //     amount,
      //     odds: getBetOdds(selectedBet),
      //     potentialWin: calculatePotentialWin()
      //   }),
      // });
      //
      // if (!response.ok) throw new Error('Failed to place bet');

      // Simulate successful bet placement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the balance (in a real app, this would happen via revalidation or refetch)
      setUserBalance((prev) => prev - amount);

      // Show success and redirect
      alert("Bet placed successfully!");
      router.push("/betting");
    } catch (err) {
      console.error("Error placing bet:", err);
      setError("Failed to place bet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          type="button"
          className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
            selectedBet === "home"
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => setSelectedBet("home")}
        >
          <div className="font-medium">{match.teams.home.name}</div>
          <div className="text-lg font-bold mt-1">
            {match.odds.homeWin.toFixed(2)}
          </div>
        </button>

        <button
          type="button"
          className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
            selectedBet === "draw"
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => setSelectedBet("draw")}
        >
          <div className="font-medium">Draw</div>
          <div className="text-lg font-bold mt-1">
            {match.odds.draw.toFixed(2)}
          </div>
        </button>

        <button
          type="button"
          className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
            selectedBet === "away"
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => setSelectedBet("away")}
        >
          <div className="font-medium">{match.teams.away.name}</div>
          <div className="text-lg font-bold mt-1">
            {match.odds.awayWin.toFixed(2)}
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="amount" className="font-medium">
              Bet Amount
            </label>
            <div className="text-sm text-gray-600">
              Balance: ${userBalance.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="px-3 py-2 bg-gray-200 rounded-l-md"
              onClick={() => setAmount((prev) => Math.max(5, prev - 5))}
            >
              -
            </button>
            <input
              id="amount"
              type="number"
              min="5"
              step="5"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="p-2 border text-center w-full"
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-200 rounded-r-md"
              onClick={() => setAmount((prev) => prev + 5)}
            >
              +
            </button>
          </div>
        </div>

        {selectedBet && (
          <div className="bg-white p-4 border rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Bet Summary</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>Selection:</div>
                <div className="font-medium">{getTeamName(selectedBet)}</div>
              </div>
              <div className="flex justify-between">
                <div>Odds:</div>
                <div className="font-medium">
                  {getBetOdds(selectedBet).toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between">
                <div>Potential Win:</div>
                <div className="font-medium text-green-700">
                  ${calculatePotentialWin().toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm p-2 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedBet || isSubmitting || amount > userBalance}
          className={`w-full p-3 rounded-lg text-white font-medium ${
            !selectedBet || isSubmitting || amount > userBalance
              ? "bg-gray-400"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          {isSubmitting ? "Placing Bet..." : "Place Bet"}
        </button>
      </form>
    </div>
  );
}
