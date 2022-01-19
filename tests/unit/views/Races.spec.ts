import { flushPromises, mount } from '@vue/test-utils';
import Races from '@/views/Races.vue';
import Race from '@/components/Race.vue';

describe('Races.vue', () => {
  test('should display every race name in a title', async () => {
    const wrapper = mount(Races);
    await flushPromises();

    const raceComponents = wrapper.findAllComponents(Race);
    // You should have a `Race` component per race in your template
    expect(raceComponents).toHaveLength(2);
  });
});
