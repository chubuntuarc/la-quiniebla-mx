'use client';
// src/components/layout/Navbar.tsx
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Liga MX Betting
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/matches" className="hover:text-green-200">
              Matches
            </Link>
            <Link href="/teams" className="hover:text-green-200">
              Teams
            </Link>
            <Link href="/standings" className="hover:text-green-200">
              Standings
            </Link>

            {session ? (
              <>
                <Link href="/betting" className="hover:text-green-200">
                  My Bets
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-green-200">
                    <span>{session.user?.name || "Account"}</span>
                    <span>▼</span>
                  </button>
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/auth/signin" className="hover:text-green-200">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
