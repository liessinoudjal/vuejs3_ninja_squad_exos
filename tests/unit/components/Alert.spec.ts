import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import Alert from '@/components/Alert.vue';

const Test = defineComponent({
  name: 'Test',
  components: { Alert },
  props: {
    variant: {
      type: String,
      default: 'danger'
    },
    isDismissible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return { isDismissed: false };
  },
  template: '<Alert :variant="variant" :dismissible="isDismissible" @dismissed="isDismissed = false">Hello</Alert>'
});

function testWrapper() {
  return mount(Test);
}

describe('Alert.vue', () => {
  test('should display the alert content', () => {
    const wrapper = testWrapper();
    const alertWrapper = wrapper.getComponent(Alert);
    // `variant` should be `danger`
    expect(alertWrapper.props().variant).toBe('danger');
    // `dismissible` should be `false`
    expect(alertWrapper.props().dismissible).toBe(false);

    // it should display the alert content with a `<slot></slot>`
    expect(wrapper.html()).toContain('Hello');
  });

  test('should have the correct CSS classes', async () => {
    const wrapper = testWrapper();

    // the alert should always have the CSS class `alert`
    expect(wrapper.find('div.alert').exists()).toBe(true);

    // the alert should have the CSS classes `alert alert-danger` for the `danger` variant
    expect(wrapper.get('div.alert').classes()).toContain('alert-danger');

    await wrapper.setProps({ variant: 'success' });
    // the alert should have the CSS classes `alert alert-success` for the `success` variant
    expect(wrapper.get('div.alert').classes()).toContain('alert-success');
    // the alert should not have the CSS class `alert-dismissible` if not dismissible
    expect(wrapper.get('div.alert').classes()).not.toContain('alert-dismissible');

    await wrapper.setProps({ variant: 'success', dismissible: true });
    // the alert should have the CSS classes `alert alert-success` for the `success` variant
    expect(wrapper.get('div.alert').classes()).toContain('alert-success');
    // the alert should have the CSS class `alert-dismissible` if dismissible
    expect(wrapper.get('div.alert').classes()).toContain('alert-dismissible');
  });

  test('should be dismissible', async () => {
    const wrapper = testWrapper();

    // the dismiss button should not be shown
    // if the alert is not dismissible
    expect(wrapper.find('button').exists()).toBe(false);

    await wrapper.setProps({ isDismissible: true });
    // the dismiss button should be shown
    // if the alert is dismissible
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.html()).toContain('Hello');

    // it should emit a dismiss event when clicking on it
    await wrapper.get('button').trigger('click');
    expect(wrapper.getComponent(Alert).emitted().dismissed).toBeTruthy();
  });
});
