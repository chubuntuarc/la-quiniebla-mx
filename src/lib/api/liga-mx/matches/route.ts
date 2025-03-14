// src/app/api/liga-mx/matches/route.ts
import { getLigaMxMatches } from '@/lib/api/liga-mx';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const season = searchParams.get('season') || '2024';
  const from = searchParams.get('from') || undefined;
  const to = searchParams.get('to') || undefined;
  
  try {
    const matches = await getLigaMxMatches(season, from, to);
    return NextResponse.json({ matches });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
