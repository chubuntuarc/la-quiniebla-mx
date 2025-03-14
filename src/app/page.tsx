// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MatchesList } from "@/components/matches/MatchesList";

export default function Home() {
  const [featuredMatch, setFeaturedMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would come from your API
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setFeaturedMatch({
        fixture: {
          id: 1234,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          status: {
            short: "NS",
          },
          venue: {
            name: "Estadio Azteca",
            city: "Mexico City",
          },
        },
        teams: {
          home: {
            id: 1,
            name: "Club América",
            logo: "/placeholder.png",
          },
          away: {
            id: 2,
            name: "Cruz Azul",
            logo: "/placeholder.png",
          },
        },
        goals: {
          home: null,
          away: null,
        },
        odds: {
          homeWin: 2.1,
          draw: 3.25,
          awayWin: 3.8,
        },
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 flex items-center z-0">
          <div className="absolute inset-0 bg-[url('/soccer-bg.jpg')] opacity-20 mix-blend-overlay"></div>
          <div className="container mx-auto px-6 z-10">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Liga MX Soccer Betting
              </h1>
              <p className="text-white text-lg mb-6">
                Place bets on your favorite Mexican soccer teams and follow all
                Liga MX matches live!
              </p>
              <Link
                href="/matches"
                className="inline-block bg-white text-green-800 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                View Matches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Match */}
      {featuredMatch && (
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Featured Match
          </h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {new Date(featuredMatch.fixture.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
              <div className="text-sm font-medium text-green-700">
                {featuredMatch.fixture.venue.name}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex-1 flex items-center justify-end">
                <span className="text-lg font-bold mr-3">
                  {featuredMatch.teams.home.name}
                </span>
                <div className="w-12 h-12 relative">
                  <Image
                    src={featuredMatch.teams.home.logo || "/placeholder.png"}
                    alt={featuredMatch.teams.home.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mx-6 text-center">
                <div className="text-3xl font-bold text-gray-300">VS</div>
                <div className="text-xs font-medium text-gray-500 mt-1">
                  Mexican Clásico
                </div>
              </div>

              <div className="flex-1 flex items-center">
                <div className="w-12 h-12 relative">
                  <Image
                    src={featuredMatch.teams.away.logo || "/placeholder.png"}
                    alt={featuredMatch.teams.away.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold ml-3">
                  {featuredMatch.teams.away.name}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Home Win</div>
                <div className="text-xl font-bold">
                  {featuredMatch.odds.homeWin.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Draw</div>
                <div className="text-xl font-bold">
                  {featuredMatch.odds.draw.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Away Win</div>
                <div className="text-xl font-bold">
                  {featuredMatch.odds.awayWin.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href={`/matches/${featuredMatch.fixture.id}`}
                className="inline-block bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Bet Now
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <MatchesList />
      </section>

      {/* Liga MX Info Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Liga MX</h2>
        <div className="prose max-w-none">
          <p>
            Liga MX is the top professional football division of the Mexican
            football league system. Administered by the Mexican Football
            Federation, it is contested by 18 clubs with promotion and
            relegation with the Liga de Expansión MX.
          </p>
          <p>
            The season has two tournaments: Apertura, which starts in the
            summer, and Clausura, which starts in the winter. The top 12 teams
            in the standings qualify to the Liga MX Playoffs, the Liguilla,
            where the winner of each tournament is determined.
          </p>
        </div>
        <div className="mt-4">
          <Link
            href="/teams"
            className="text-green-700 font-medium hover:text-green-800"
          >
            View All Liga MX Teams →
          </Link>
        </div>
      </section>
    </div>
  );
}
