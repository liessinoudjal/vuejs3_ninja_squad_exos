import { mount } from '@vue/test-utils';
import Race from '@/components/Race.vue';
import Pony from '@/components/Pony.vue';
import { RaceModel } from '@/models/RaceModel';

describe('Race.vue', () => {
  test('should display a race name and its ponies', () => {
    const raceModel = {
      id: 12,
      name: 'Paris',
      ponies: [
        { id: 1, name: 'Gentle Pie', color: 'YELLOW' },
        { id: 2, name: 'Big Soda', color: 'ORANGE' },
        { id: 3, name: 'Gentle Bottle', color: 'PURPLE' },
        { id: 4, name: 'Superb Whiskey', color: 'GREEN' },
        { id: 5, name: 'Fast Rainbow', color: 'BLUE' }
      ],
      startInstant: '2020-02-18T08:02:00Z'
    } as RaceModel;

    const wrapper = mount(Race, {
      props: {
        raceModel
      }
    });

    // You need an h2 element for the race name
    const raceName = wrapper.get('h2');
    // The h2 element should contain the race name
    expect(raceName.text()).toContain('Paris');
    // You need a p element for the race start instant
    const raceStart = wrapper.get('p');
    // The p element should contain the race start instant transformed by the fromNow function
    expect(raceStart.text()).toContain('ago');
    const ponies = wrapper.findAllComponents(Pony);
    // You should have one Pony component per pony
    expect(ponies).toHaveLength(5);
  });
});
