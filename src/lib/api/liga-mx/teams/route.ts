// src/app/api/liga-mx/teams/route.ts
import { getLigaMxTeams } from '@/lib/api/liga-mx';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const season = searchParams.get('season') || '2025';
  
  try {
    const teams = await getLigaMxTeams(season);
    return NextResponse.json({ teams });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}
