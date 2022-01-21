import { flushPromises, mount } from '@vue/test-utils';
import { createRouterMock, getRouter, injectRouterMock } from 'vue-router-mock';
import Register from '@/views/Register.vue';
import { UserModel } from '@/models/UserModel';
import Alert from '@/components/Alert.vue';

const mockUserService = {
  register: jest.fn()
};
jest.mock('@/composables/UserService', () => ({
  useUserService: () => mockUserService
}));
const router = createRouterMock();

function registerWrapper() {
  injectRouterMock(router);
  return mount(Register, {
    global: {
      components: {
        Alert
      }
    }
  });
}

describe('Register.vue', () => {
  test('should have a userModel property', () => {
    const wrapper = registerWrapper();
    // The component should have a `userModel` property initialized with default values
    const userModel = (wrapper.vm as unknown as { userModel: UserModel }).userModel;
    expect(userModel).not.toBeNull();
    expect(userModel.login).toBe('');
    expect(userModel.password).toBe('');
    expect(userModel.birthYear).toBe(new Date().getFullYear() - 18);
  });

  test('should have an errors computed property', () => {
    const wrapper = registerWrapper();
    const vm = wrapper.vm as unknown as { userModel: UserModel; errors: Partial<Record<keyof UserModel, boolean>> };
    vm.userModel.login = 'cedric';
    vm.userModel.birthYear = 0;
    // The component should have a computed property `errors`
    const errors = vm.errors;
    expect(errors.login).toBeFalsy();
    expect(errors.password).toBe(true);
    expect(errors.birthYear).toBe(true);

    vm.userModel.login = '';
    vm.userModel.password = 'pwd';
    vm.userModel.birthYear = 1986;
    const errorsUpdated = vm.errors;
    expect(errorsUpdated.login).toBe(true);
    expect(errorsUpdated.password).toBeFalsy();
    expect(errorsUpdated.birthYear).toBeFalsy();
  });

  test('should display a form', () => {
    const wrapper = registerWrapper();

    // The template should display an input for the login
    expect(wrapper.find('input').exists()).toBe(true);
    // The template should display an input of type password for the password
    expect(wrapper.find('input[type=password]').exists()).toBe(true);
    // The template should display an input of type number for the birth year
    expect(wrapper.find('input[type=number]').exists()).toBe(true);

    // The template should display a submit button
    const button = wrapper.get('button');
    // Your submit button should be disabled if the form is not dirty or not valid
    expect(button.attributes('disabled')).toBeDefined();
  });

  test('should update the dirtiness of a field', () => {
    const wrapper = registerWrapper();

    // The component should have a `dirty` property
    const dirty = (wrapper.vm as unknown as { dirty: Partial<Record<keyof UserModel, boolean>> }).dirty;
    expect(dirty.login).toBeFalsy();
    expect(dirty.password).toBeFalsy();
    expect(dirty.birthYear).toBeFalsy();

    wrapper.get('input').trigger('input');
    // The login field should be dirty after the input event
    expect(dirty.login).toBe(true);
    dirty.login = false;
    wrapper.get('input').trigger('input');
    // The input event listener for the login field should be executed only once by using `@input.once`
    expect(dirty.login).toBeFalsy();

    wrapper.get('input[type=password]').trigger('input');
    // The password field should be dirty after the input event
    expect(dirty.password).toBe(true);
    dirty.password = false;
    wrapper.get('input[type=password]').trigger('input');
    // The input event listener for the password field should be executed only once by using `@input.once`
    expect(dirty.password).toBeFalsy();

    wrapper.get('input[type=number]').trigger('input');
    // The birthYear field should be dirty after the input event
    expect(dirty.birthYear).toBe(true);
    dirty.birthYear = false;
    wrapper.get('input[type=number]').trigger('input');
    // The input event listener for the birthYear field should be executed only once by using `@input.once`
    expect(dirty.birthYear).toBeFalsy();
  });

  test('should display errors for login', async () => {
    const wrapper = registerWrapper();

    const loginInput = wrapper.get('input');
    // The login input should not have the CSS class is-invalid when not dirty
    expect(loginInput.classes()).not.toContain('is-invalid');
    // The login field error should not be displayed when not dirty
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
    // The login label should not have the CSS class text-danger when not dirty
    const label = wrapper.findAll('label')[0];
    expect(label.classes()).not.toContain('text-danger');

    await loginInput.setValue('cedric');
    await loginInput.setValue('');
    // The login field should display an error
    const loginError = wrapper.get('.invalid-feedback');
    expect(loginError.text()).toContain('The login is required');
    // The login input should have the CSS class is-invalid when in error
    expect(loginInput.classes()).toContain('is-invalid');
    // The login label should have the CSS class text-danger when in error
    expect(label.classes()).toContain('text-danger');

    await loginInput.setValue('cedric');
    // The login field error should not be displayed
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
    // The login input should not have the CSS class is-invalid when not in error
    expect(loginInput.classes()).not.toContain('is-invalid');
    // The login label should not have the CSS class text-danger when not in error
    expect(label.classes()).not.toContain('text-danger');
    // The field should be linked to the userModel.login value
    expect((wrapper.vm as unknown as { userModel: UserModel }).userModel.login).toBe('cedric');
  });

  test('should display errors for password', async () => {
    const wrapper = registerWrapper();

    const passwordInput = wrapper.get('input[type=password]');
    // The password input should not have the CSS class is-invalid when not dirty
    expect(passwordInput.classes()).not.toContain('is-invalid');
    // The password field error should not be displayed when not dirty
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
    // The password label should not have the CSS class text-danger when not dirty
    const label = wrapper.findAll('label')[1];
    expect(label.classes()).not.toContain('text-danger');

    await passwordInput.setValue('password');
    await passwordInput.setValue('');
    // The password field should display an error
    const passwordError = wrapper.get('.invalid-feedback');
    expect(passwordError.text()).toContain('The password is required');
    // The password input should have the CSS class is-invalid when in error
    expect(passwordInput.classes()).toContain('is-invalid');
    // The password label should have the CSS class text-danger when in error
    expect(label.classes()).toContain('text-danger');

    await passwordInput.setValue('password');
    // The password field error should not be displayed
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
    // The password input should not have the CSS class is-invalid when not in error
    expect(passwordInput.classes()).not.toContain('is-invalid');
    // The password label should not have the CSS class text-danger when not in error
    expect(label.classes()).not.toContain('text-danger');
    // The field should be linked to the userModel.password value
    expect((wrapper.vm as unknown as { userModel: UserModel }).userModel.password).toBe('password');
  });

  test('should display errors for birthYear', async () => {
    const wrapper = registerWrapper();

    const birthYearInput = wrapper.get('input[type=number]');
    // The birthYear input should not have the CSS class is-invalid when not dirty
    expect(birthYearInput.classes()).not.toContain('is-invalid');
    // The birthYear field error should not be displayed when not dirty
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
    // The birthYear label should not have the CSS class text-danger when not dirty
    const label = wrapper.findAll('label')[2];
    expect(label.classes()).not.toContain('text-danger');

    await birthYearInput.setValue(1986);
    await birthYearInput.setValue('');
    // The birthYear field should display an error
    const birthYearError = wrapper.get('.invalid-feedback');
    expect(birthYearError.text()).toContain('The birth year is required');
    // The birthYear input should have the CSS class is-invalid when in error
    expect(birthYearInput.classes()).toContain('is-invalid');
    // The birthYear label should have the CSS class text-danger when in error
    expect(label.classes()).toContain('text-danger');

    await birthYearInput.setValue(1986);
    // The birthYear field error should not be displayed
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
    // The birthYear input should not have the CSS class is-invalid when not in error
    expect(birthYearInput.classes()).not.toContain('is-invalid');
    // The birthYear label should not have the CSS class text-danger when not in error
    expect(label.classes()).not.toContain('text-danger');
    // The field should be linked to the userModel.birthYear value
    expect((wrapper.vm as unknown as { userModel: UserModel }).userModel.birthYear).toBe(1986);
  });

  test('should call the register function on submit', async () => {
    mockUserService.register.mockResolvedValue({} as UserModel);
    const wrapper = registerWrapper();
    const mockRouter = getRouter();

    // You should have a `form` element
    const form = wrapper.get('form');
    await form.trigger('submit');
    // You may have forgot the submit handler on the `form` element
    // or to call the `register` function in the submit handler
    expect(mockUserService.register).toHaveBeenCalled();
    await flushPromises();
    // It should redirect to home after a submission success
    expect(mockRouter.push).toHaveBeenCalled();

    const alert = wrapper.findComponent(Alert);
    // An alert should not be displayed on registration success
    expect(alert.exists()).toBe(false);
  });

  test('should display an alert on submission failure', async () => {
    mockUserService.register.mockRejectedValue(null);
    const wrapper = registerWrapper();
    const mockRouter = getRouter();

    // You should have a `form` element
    const form = wrapper.get('form');
    await form.trigger('submit');
    // You may have forgot the submit handler on the `form` element
    // or to call the `register` function in the submit handler
    expect(mockUserService.register).toHaveBeenCalled();
    await flushPromises();
    // It should not redirect to home after a submission failure
    expect(mockRouter.push).not.toHaveBeenCalled();

    const alert = wrapper.getComponent(Alert);
    // An alert should be displayed on registration failure
    expect(alert.text()).toContain('Try again with another login');
    expect(alert.props().variant).toBe('danger');

    const closeButton = alert.get('button');
    await closeButton.trigger('click');
    // The alert should be closable
    expect(wrapper.findComponent(Alert).exists()).toBe(false);
  });
});
