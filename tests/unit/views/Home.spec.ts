import { mount, RouterLinkStub } from '@vue/test-utils';
import Home from '@/views/Home.vue';

function homeWrapper() {
  return mount(Home, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  });
}

describe('Home.vue', () => {
  test('should display every race name in a title', () => {
    const wrapper = homeWrapper();

    // You should have an `h1` element to display the title
    const title = wrapper.get('h1');
    expect(title.text()).toContain('Ponyracer');
    // You should have the `small` element inside the `h1` element
    expect(title.text()).toContain('Always a pleasure to bet on ponies');

    // You should have a `small` element to display the subtitle
    const subtitle = wrapper.get('small');
    expect(subtitle.text()).toBe('Always a pleasure to bet on ponies');
  });

  test('display a link to go the races', () => {
    const wrapper = homeWrapper();

    // You should have an `a` element to display the link to the races
    const link = wrapper.getComponent(RouterLinkStub);
    // The link should have a text
    expect(link.text()).toBe('Races');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/races">` or `<RouterLink :to="{ name: 'races' }">`?
    expect(link.props().to?.name || link.props().to).toContain('races');
  });
});
