/* eslint-disable vue/one-component-per-file */
import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/Alert.vue';

const Hello = defineComponent({
  async setup() {
    await Promise.resolve();
    return {};
  },
  template: 'Hello'
});
const Error = defineComponent({
  async setup() {
    await Promise.reject();
  },
  template: 'Error'
});
const mockRouter = createRouterMock({
  routes: [
    { path: '/', component: Hello },
    { path: '/error', component: Error }
  ]
});
injectRouterMock(mockRouter);

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
  test('renders the navbar', () => {
    const wrapper = appWrapper();
    const navbar = wrapper.findComponent(Navbar);
    // Maybe you forgot to add <Navbar/> in your App.vue component
    expect(navbar.exists()).toBe(true);
  });

  test('renders the router view inside a Suspense component', async () => {
    const wrapper = appWrapper({
      RouterView: false
    });
    await mockRouter.push('/');
    expect(wrapper.html()).toContain('Loading...');

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Hello');
  });

  test('renders an error if router view does not load', async () => {
    const wrapper = appWrapper({
      Alert: defineComponent({
        // eslint-disable-next-line vue/require-prop-types
        props: ['variant', 'dismissible'],
        emits: ['dismissed'],
        template: 'Alert displayed'
      }),
      RouterView: false
    });
    await mockRouter.push('/error');
    expect(wrapper.html()).toContain('Loading...');

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Alert displayed');
  });
});
