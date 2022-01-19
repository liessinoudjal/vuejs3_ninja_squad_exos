import { useRaceService } from '@/composables/RaceService';

describe('useRaceService', () => {
  test('should list races', async () => {
    const raceService = useRaceService();
    const races = await raceService.list();
    // It should return two races for the `list()` function
    expect(races).toHaveLength(2);
    // The race should include the ponies
    expect(races[0].ponies).toHaveLength(5);
  });
});
