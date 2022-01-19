import { flushPromises, mount } from '@vue/test-utils';
import Races from '@/views/Races.vue';
import Race from '@/components/Race.vue';
import { RaceModel } from '@/models/RaceModel';

const mockRaceService = {
  list: jest.fn()
};
jest.mock('@/composables/RaceService', () => ({
  useRaceService: () => mockRaceService
}));

describe('Races.vue', () => {
  test('should display every race name in a title', async () => {
    mockRaceService.list.mockResolvedValue([
      { name: 'London', startInstant: '2020-02-18T08:02:00Z' },
      { name: 'New York', startInstant: '2020-02-18T08:03:00Z' }
    ] as Array<RaceModel>);
    const wrapper = mount(Races);
    await flushPromises();

    const raceComponents = wrapper.findAllComponents(Race);
    // You should have a `Race` component per race in your template
    expect(raceComponents).toHaveLength(2);
  });
});
