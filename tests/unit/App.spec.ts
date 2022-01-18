import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  test('renders a title', () => {
    const wrapper = mount(App);
    expect(wrapper.get('h1').text()).toBe('Ponyracer');
  });
});
