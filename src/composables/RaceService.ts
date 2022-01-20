import { RaceModel } from '@/models/RaceModel';

import axios from 'axios';

export function useRaceService() {
  const apiUrl = 'https://ponyracer.ninja-squad.com';

  async function list(): Promise<Array<RaceModel>> {
    const racesUrl = `${apiUrl}/api/races`;
    const params = {
      status: 'PENDING'
    };
    const response = await axios.get<Array<RaceModel>>(racesUrl, { params });
    return response.data;
  }

  return {
    list
  };
}
