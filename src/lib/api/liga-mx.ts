// src/lib/api/liga-mx.ts
import fetch from 'node-fetch';

const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST;
const BASE_URL = process.env.NEXT_PUBLIC_RAPID_API_URL;

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': API_HOST,
};

export async function getTournamentData() {
  try {
    const response = await fetch(`${BASE_URL}/media/tournaments/1`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching tournament data:', error);
    throw error;
  }
}


export async function getLigaMxTeams(season: string) {
  try {
    const response = await fetch(`${BASE_URL}/teams/league/1`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}

export async function getLigaMxMatches(season: string, from: string, to: string) {
  try {
    const response = await fetch(`${BASE_URL}/fixtures/league/1`, {
      method: 'GET',
      headers,
      params: {
        season,
        from,
        to,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
}

export async function getLigaMxStandings(season: string) {
  try {
    const response = await fetch(`${BASE_URL}/standings/league/1`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching standings:', error);
    throw error;
  }
}

export async function getLigaMxPlayers(season: string) {
  try {
    const response = await fetch(`${BASE_URL}/players/league/1`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
}

export async function getLigaMxTeamDetails(teamId: string) {
  try {
    const response = await fetch(`${BASE_URL}/teams/team/${teamId}`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching team details:', error);
    throw error;
  }
}

export async function getLigaMxPlayerDetails(playerId: string) {
  try {
    const response = await fetch(`${BASE_URL}/players/player/${playerId}`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw error;
  }
}

export async function getLigaMxTeamFixtures(teamId: string) {
  try {
    const response = await fetch(`${BASE_URL}/fixtures/team/${teamId}`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching team fixtures:', error);
    throw error;
  }
}

export async function getLigaMxTeamStats(teamId: string) {
  try {
    const response = await fetch(`${BASE_URL}/teams/team/${teamId}/stats`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching team stats:', error);
    throw error;
  }
}

export async function getLigaMxTeamNews(teamId: string) {
  try {
    const response = await fetch(`${BASE_URL}/teams/team/${teamId}/news`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching team news:', error);
    throw error;
  }
}
