// src/app/betting/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Bet {
  id: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  prediction: 'home' | 'draw' | 'away';
  amount: number;
  odds: number;
  potentialWin: number;
  status: 'PENDING' | 'WON' | 'LOST';
  matchDate: string;
  createdAt: string;
}

export default function MyBets() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "settled">("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated")
      // In a real app, this would be an API fetch
      async function fetchBets() {
        try {
          // const response = await fetch(`/api/bets?userId=${session.user.id}`);
          // if (!response.ok) throw new Error('Failed to fetch bets');
          // const data = await response.json();
          // setBets(data.bets);

          // Mock data for demonstration
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setBets([
            {
              id: "1",
              matchId: "1001",
              homeTeam: "Club América",
              awayTeam: "Cruz Azul",
              prediction: "home",
              amount: 25,
              odds: 2.1,
              potentialWin: 52.5,
              status: "WON",
              matchDate: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000
              ).toISOString(),
              createdAt: new Date(
                Date.now() - 4 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            {
              id: "2",
              matchId: "1002",
              homeTeam: "Monterrey",
              awayTeam: "Tigres UANL",
              prediction: "draw",
              amount: 15,
              odds: 3.25,
              potentialWin: 48.75,
              status: "LOST",
              matchDate: new Date(
                Date.now() - 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              createdAt: new Date(
                Date.now() - 8 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            {
              id: "3",
              matchId: "1003",
              homeTeam: "Santos Laguna",
              awayTeam: "Toluca",
              prediction: "away",
              amount: 20,
              odds: 2.85,
              potentialWin: 57.0,
              status: "PENDING",
              matchDate: new Date(
                Date.now() + 2 * 24 * 60 * 60 * 1000
              ).toISOString(),
              createdAt: new Date(
                Date.now() - 1 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
          ]);
        } catch (error) {
          console.error("Error fetching bets:", error);
        } finally {
          setLoading(false);
        }
      }

    fetchBets();
  }, [status, router, session]);

  const filteredBets = bets.filter((bet) => {
    if (filter === "all") return true;
    if (filter === "pending") return bet.status === "PENDING";
    if (filter === "settled")
      return bet.status === "WON" || bet.status === "LOST";
    return true;
  });

  const calculateStats = () => {
    const total = bets.length;
    const won = bets.filter((bet) => bet.status === "WON").length;
    const pending = bets.filter((bet) => bet.status === "PENDING").length;
    const betAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    const winAmount = bets
      .filter((bet) => bet.status === "WON")
      .reduce((sum, bet) => sum + bet.potentialWin, 0);
    const lostAmount = bets
      .filter((bet) => bet.status === "LOST")
      .reduce((sum, bet) => sum + bet.amount, 0);
    const profit = winAmount - lostAmount;

    return {
      total,
      won,
      pending,
      betAmount,
      winAmount,
      profit,
    };
  };

  const stats = calculateStats();

  const getBetStatusClass = (status: string) => {
    switch (status) {
      case "WON":
        return "bg-green-100 text-green-800 border-green-200";
      case "LOST":
        return "bg-red-100 text-red-800 border-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Bets</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Bets</div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm">
              <span className="text-green-600 font-medium">
                {stats.won} won
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-yellow-600 font-medium">
                {stats.pending} pending
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Wagered</div>
          <div className="text-2xl font-bold">
            ${stats.betAmount.toFixed(2)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Profit/Loss</div>
          <div
            className={`text-2xl font-bold ${
              stats.profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats.profit >= 0 ? "+" : ""}
            {stats.profit.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "all"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All Bets
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "pending"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("settled")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "settled"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Settled
          </button>
        </div>
      </div>

      {/* Bets List */}
      {loading ? (
        <div className="flex justify-center items-center min-h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      ) : filteredBets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-lg text-gray-600 mb-4">No bets found</div>
          <Link
            href="/matches"
            className="inline-block bg-green-700 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-800"
          >
            Browse Matches
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Match
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBets.map((bet) => (
                <tr key={bet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {bet.homeTeam} vs {bet.awayTeam}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(bet.matchDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">
                      {bet.prediction === "home"
                        ? bet.homeTeam
                        : bet.prediction === "away"
                        ? bet.awayTeam
                        : "Draw"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Odds: {bet.odds.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">${bet.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">
                      Potential: ${bet.potentialWin.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getBetStatusClass(
                        bet.status
                      )}`}
                    >
                      {bet.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
