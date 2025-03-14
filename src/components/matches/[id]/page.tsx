// src/app/matches/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { BetForm } from "@/components/betting/BetForm";

interface MatchDetailProps {
  params: {
    id: string;
  };
}

interface MatchDetail {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      long: string;
    };
    venue: {
      name: string;
      city: string;
    };
    referee: string;
  };
  league: {
    name: string;
    round: string;
    season: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
  };
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

export default function MatchDetail({ params }: MatchDetailProps) {
  const { id } = params;
  const { data: session } = useSession();
  const router = useRouter();
  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This would be fetched from your API in a real application
  // We're using mock data for demonstration
  useEffect(() => {
    // In a real app, fetch from your API:
    // const fetchMatch = async () => {
    //   try {
    //     const response = await fetch(`/api/liga-mx/matches/${id}`);
    //     if (!response.ok) throw new Error('Failed to fetch match details');
    //     const data = await response.json();
    //     setMatch(data.match);
    //   } catch (err) {
    //     setError('Could not load match details');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchMatch();

    // Mock data for demonstration
    setTimeout(() => {
      setMatch({
        fixture: {
          id: parseInt(id),
          date: new Date().toISOString(),
          status: {
            short: "NS",
            long: "Not Started",
          },
          venue: {
            name: "Estadio Azteca",
            city: "Mexico City",
          },
          referee: "César Ramos",
        },
        league: {
          name: "Liga MX",
          round: "Regular Season - 12",
          season: "2024",
        },
        teams: {
          home: {
            id: 1,
            name: "Club América",
            logo: "/placeholder.png",
          },
          away: {
            id: 2,
            name: "Guadalajara Chivas",
            logo: "/placeholder.png",
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
        },
        odds: {
          homeWin: 2.15,
          draw: 3.25,
          awayWin: 3.75,
        },
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error || "Match not found"}</p>
        <button
          onClick={() => router.push("/matches")}
          className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Back to matches
        </button>
      </div>
    );
  }

  const isMatchLive = ["LIVE", "1H", "2H", "HT"].includes(
    match.fixture.status.short
  );
  const isMatchFinished = ["FT", "AET", "PEN"].includes(
    match.fixture.status.short
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Match Header */}
        <div className="bg-green-700 text-white p-4">
          <div className="text-sm mb-1">
            {match.league.name} - {match.league.round}
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {match.teams.home.name} vs {match.teams.away.name}
            </h1>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                isMatchLive
                  ? "bg-red-500"
                  : isMatchFinished
                  ? "bg-gray-600"
                  : "bg-green-500"
              }`}
            >
              {match.fixture.status.long}
            </span>
          </div>
        </div>

        {/* Match Info */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <div>
                {format(new Date(match.fixture.date), "MMMM d, yyyy • h:mm a")}
              </div>
              <div>
                {match.fixture.venue.name}, {match.fixture.venue.city}
              </div>
              {match.fixture.referee && (
                <div>Referee: {match.fixture.referee}</div>
              )}
            </div>
          </div>
        </div>

        {/* Teams and Score */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="w-20 h-20 mx-auto relative mb-2">
              <Image
                src={match.teams.home.logo || "/placeholder.png"}
                alt={match.teams.home.name}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
            <h2 className="font-bold">{match.teams.home.name}</h2>
          </div>

          <div className="flex-shrink-0 flex items-center mx-6">
            <span className="text-4xl font-bold mx-2">
              {match.goals.home !== null ? match.goals.home : "-"}
            </span>
            <span className="text-2xl font-bold text-gray-400 mx-1">:</span>
            <span className="text-4xl font-bold mx-2">
              {match.goals.away !== null ? match.goals.away : "-"}
            </span>
          </div>

          <div className="flex-1 text-center">
            <div className="w-20 h-20 mx-auto relative mb-2">
              <Image
                src={match.teams.away.logo || "/placeholder.png"}
                alt={match.teams.away.name}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
            <h2 className="font-bold">{match.teams.away.name}</h2>
          </div>
        </div>

        {/* Betting Section */}
        {!isMatchFinished && session ? (
          <div className="p-6 border-t">
            <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
            <BetForm match={match} userId={session.user?.id as string} />
          </div>
        ) : !session ? (
          <div className="p-6 border-t text-center">
            <p className="mb-3">Sign in to place bets on this match</p>
            <button
              onClick={() => router.push("/auth/signin")}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              Sign In
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
