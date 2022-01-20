import axios, { AxiosResponse } from 'axios';
import { useRaceService } from '@/composables/RaceService';
import { RaceModel } from '@/models/RaceModel';

describe('useRaceService', () => {
  test('should list races', async () => {
    const response = { data: [{ name: 'Paris' }, { name: 'Tokyo' }, { name: 'Lyon' }] } as AxiosResponse<Array<RaceModel>>;
    jest.spyOn(axios, 'get').mockResolvedValue(response);

    const raceService = useRaceService();
    const races = await raceService.list();

    // It should get the pending races from the API
    expect(axios.get).toHaveBeenCalledWith('https://ponyracer.ninja-squad.com/api/races', { params: { status: 'PENDING' } });
    // It should return three races for the `list()` function
    expect(races).toHaveLength(3);
  });
});
