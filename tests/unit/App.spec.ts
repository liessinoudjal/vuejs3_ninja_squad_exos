/* eslint-disable vue/one-component-per-file */
import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/Alert.vue';

function appWrapper(stubs = {}) {
  return mount(App, {
    global: {
      components: {
        Alert
      },
      stubs
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

  test('renders the races list inside a Suspense component', async () => {
    const wrapper = appWrapper({
      Races: defineComponent({
        async setup() {
          return { result: 'Hello' };
        },
        template: '<div>{{ result }}</div>'
      })
    });
    expect(wrapper.html()).toContain('Loading...');

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Hello');
  });

  test('renders an error if races list does not load', async () => {
    const wrapper = appWrapper({
      Alert: defineComponent({
        // eslint-disable-next-line vue/require-prop-types
        props: ['variant', 'dismissible'],
        emits: ['dismissed'],
        template: 'Alert displayed'
      }),
      Races: defineComponent({
        async setup() {
          await Promise.reject();
        },
        template: '<div>Error</div>'
      })
    });
    expect(wrapper.html()).toContain('Loading...');

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Alert displayed');
  });
});
