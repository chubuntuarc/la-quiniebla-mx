// src/components/matches/MatchesList.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
    venue: {
      name: string;
      city: string;
    };
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
}

export function MatchesList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        // Get the current date
        const today = new Date();
        const from = format(today, "yyyy-MM-dd");
        const to = format(
          new Date(today.setDate(today.getDate() + 14)),
          "yyyy-MM-dd"
        );

        const response = await fetch(
          `/api/liga-mx/matches?from=${from}&to=${to}`
        );
        if (!response.ok) throw new Error("Failed to fetch matches");

        const data = await response.json();
        setMatches(data.matches || []);
        setLoading(false);
      } catch (err) {
        setError("There was an error loading matches");
        setLoading(false);
        console.error(err);
      }
    }

    fetchMatches();
  }, []);

  function getStatusColor(status: string) {
    switch (status) {
      case "FT":
        return "bg-gray-600";
      case "LIVE":
        return "bg-red-600";
      case "HT":
        return "bg-yellow-600";
      default:
        return "bg-green-600";
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case "FT":
        return "Final";
      case "LIVE":
        return "Live";
      case "HT":
        return "Half-time";
      case "NS":
        return "Not Started";
      default:
        return status;
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No upcoming matches found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-800">Upcoming Matches</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {matches.map((match) => (
          <Link
            href={`/matches/${match.fixture.id}`}
            key={match.fixture.id}
            className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gray-50 p-3 border-b">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {format(new Date(match.fixture.date), "MMM d, yyyy • h:mm a")}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded text-white ${getStatusColor(
                    match.fixture.status.short
                  )}`}
                >
                  {getStatusText(match.fixture.status.short)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {match.fixture.venue.name}, {match.fixture.venue.city}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 relative mr-3">
                    <Image
                      src={match.teams.home.logo || "/placeholder.png"}
                      alt={match.teams.home.name}
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium">{match.teams.home.name}</span>
                </div>
                <span className="text-lg font-bold">
                  {match.goals.home !== null ? match.goals.home : "-"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 relative mr-3">
                    <Image
                      src={match.teams.away.logo || "/placeholder.png"}
                      alt={match.teams.away.name}
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium">{match.teams.away.name}</span>
                </div>
                <span className="text-lg font-bold">
                  {match.goals.away !== null ? match.goals.away : "-"}
                </span>
              </div>

              <div className="mt-3 flex justify-end">
                <div className="text-sm font-medium text-green-700">
                  Place a bet →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
