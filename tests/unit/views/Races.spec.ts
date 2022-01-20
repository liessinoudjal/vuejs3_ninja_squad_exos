import { flushPromises, mount } from '@vue/test-utils';
import Races from '@/views/Races.vue';
import Race from '@/components/Race.vue';
import Alert from '@/components/Alert.vue';
import { RaceModel } from '@/models/RaceModel';

const mockRaceService = {
  list: jest.fn()
};
jest.mock('@/composables/RaceService', () => ({
  useRaceService: () => mockRaceService
}));

function racesWrapper() {
  return mount(Races, {
    global: {
      components: {
        Alert
      }
    }
  });
}

describe('Races.vue', () => {
  test('should display every race name in a title', async () => {
    mockRaceService.list.mockResolvedValue([
      { name: 'London', startInstant: '2020-02-18T08:02:00Z' },
      { name: 'New York', startInstant: '2020-02-18T08:03:00Z' }
    ] as Array<RaceModel>);
    const wrapper = racesWrapper();
    await flushPromises();

    const raceComponents = wrapper.findAllComponents(Race);
    // You should have a `Race` component per race in your template
    expect(raceComponents).toHaveLength(2);

    // No alert should be displayed
    const alert = wrapper.findComponent(Alert);
    expect(alert.exists()).toBe(false);
  });

  test('should display a closable alert in case of error', async () => {
    mockRaceService.list.mockRejectedValue(new Error('oops'));
    const wrapper = racesWrapper();
    await flushPromises();

    const raceComponents = wrapper.findAllComponents(Race);
    // You should have no `Race` component in your template
    expect(raceComponents).toHaveLength(0);

    const alert = wrapper.getComponent(Alert);
    // You should have an alert displayed
    expect(alert.text()).toContain('An error occurred while loading');

    await alert.find('button').trigger('click');
    // The alert should be closed when the button is clicked
    expect(wrapper.findComponent(Alert).exists()).toBe(false);
  });
});
