import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Races from '@/views/Races.vue';

describe('Races.vue', () => {
  test('should display every race name in a title', async () => {
    const wrapper = mount(Races);
    await nextTick();

    const raceNames = wrapper.findAll('h2');
    // You should have an `h2` element per race in your template
    expect(raceNames).toHaveLength(2);
    expect(raceNames[0].text()).toContain('Lyon');
    expect(raceNames[1].text()).toContain('London');
  });
});
