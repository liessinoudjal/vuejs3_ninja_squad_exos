import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Races from '@/views/Races.vue';

describe('App.vue', () => {
  test('renders a title', () => {
    const wrapper = mount(App);
    expect(wrapper.get('h1').text()).toBe('Ponyracer');
  });

  test('renders the navbar', () => {
    const wrapper = mount(App);
    const navbar = wrapper.findComponent(Navbar);
    // Maybe you forgot to add <Navbar/> in your App.vue component
    expect(navbar.exists()).toBe(true);
  });

  test('renders the races list', () => {
    const wrapper = mount(App);
    const races = wrapper.findComponent(Races);
    // Maybe you forgot to add <Races/> in your App.vue component
    expect(races.exists()).toBe(true);
  });
});
