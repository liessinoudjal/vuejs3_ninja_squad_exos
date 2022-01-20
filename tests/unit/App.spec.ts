import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/Alert.vue';
import Races from '@/views/Races.vue';

function appWrapper() {
  return mount(App, {
    global: {
      components: {
        Alert
      }
    }
  });
}

describe('App.vue', () => {
  test('renders a title', () => {
    const wrapper = appWrapper();
    expect(wrapper.get('h1').text()).toBe('Ponyracer');
  });

  test('renders the navbar', () => {
    const wrapper = appWrapper();
    const navbar = wrapper.findComponent(Navbar);
    // Maybe you forgot to add <Navbar/> in your App.vue component
    expect(navbar.exists()).toBe(true);
  });

  test('renders the races list', () => {
    const wrapper = appWrapper();
    const races = wrapper.findComponent(Races);
    // Maybe you forgot to add <Races/> in your App.vue component
    expect(races.exists()).toBe(true);
  });
});
