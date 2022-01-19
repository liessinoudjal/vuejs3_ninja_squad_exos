import { mount } from '@vue/test-utils';
import { PonyModel } from '@/models/PonyModel';
import Pony from '@/components/Pony.vue';

function ponyWrapper(ponyModel: PonyModel) {
  return mount(Pony, {
    props: {
      ponyModel
    }
  });
}

describe('Pony.vue', () => {
  test('should display an image and a legend', () => {
    const ponyModel: PonyModel = {
      id: 1,
      name: 'Fast Rainbow',
      color: 'PURPLE'
    };

    const wrapper = ponyWrapper(ponyModel);

    // You should have an image for the pony
    const image = wrapper.get('img');
    // The `src` attribute of the image is not correct
    expect(image.attributes('src')).toBe('/images/pony-purple.gif');
    // The `alt` attribute for the image is not correct
    expect(image.attributes('alt')).toBe('Fast Rainbow');
    // You should have a `figcaption` element for the pony
    const legend = wrapper.get('figcaption');
    // The `figcaption` element should display the pony's name
    expect(legend.text()).toContain('Fast Rainbow');
  });

  test('should emit an event on click', () => {
    const ponyModel: PonyModel = {
      id: 1,
      name: 'Fast Rainbow',
      color: 'PURPLE'
    };

    const wrapper = ponyWrapper(ponyModel);

    // You should have a `figure` element for the pony
    const figure = wrapper.get('figure');
    figure.trigger('click');
    // You may have forgot the click handler on the `figure` element
    // or to emit the `ponySelected` event in the click handler
    expect(wrapper.emitted().ponySelected).toBeTruthy();
  });
});
