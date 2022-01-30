<template>
  <Alert v-if="registrationFailed" variant="danger" dismissible @dismissed="registrationFailed = false">
    Try again with another login.
  </Alert>
  <form @submit.prevent="register()">
    <div class="mb-3">
      <label for="login" class="form-label" :class="{ 'text-danger': errors.login && dirty.login }">Email</label>
      <input
        id="login"
        name="login"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.login && dirty.login }"
        v-model="userModel.login"
        @input.once="dirty.login = true"
      />
      <div v-if="errors.login && dirty.login" class="invalid-feedback d-block">The login is required</div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label" :class="{ 'text-danger': errors.password && dirty.password }">password</label>
      <input
        id="password"
        type="password"
        name="password"
        class="form-control"
        :class="{ 'is-invalid': errors.password && dirty.password }"
        v-model="userModel.password"
        @input.once="dirty.password = true"
      />
      <div v-if="errors.password && dirty.password" class="invalid-feedback d-block">The password is required</div>
    </div>
    <div class="mb-3">
      <label for="birthYear" class="form-label" :class="{ 'text-danger': errors.birthYear && dirty.birthYear }">birthYear</label>
      <input
        id="birthYear"
        name="birthYear"
        type="number"
        class="form-control"
        :class="{ 'is-invalid': errors.birthYear && dirty.birthYear }"
        v-model.number="userModel.birthYear"
        @input.once="dirty.birthYear = true"
      />
      <div v-if="errors.birthYear && dirty.birthYear" class="invalid-feedback d-block">The birth year is required</div>
    </div>
    {{ errors }}
    <button class="btn btn-success" type="submit" :disabled="Object.keys(errors).length > 0">Let's go!</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { UserModel } from '@/models/UserModel';
import { useUserService } from '@/composables/UserService';
import { useRouter } from 'vue-router';

const userModel = reactive<UserModel>({
  login: '',
  password: '',
  birthYear: new Date().getFullYear() - 18
});
const registrationFailed = ref(false);
const router = useRouter();
const userService = useUserService();
async function register() {
  try {
    await userService.register(userModel);
    router.push({ name: 'home' });
  } catch (e) {
    registrationFailed.value = true;
  }
}
const errors = computed(() => {
  const errors: Partial<Record<keyof UserModel, boolean>> = {};

  if (!userModel.login) {
    errors.login = true;
  }
  if (!userModel.password) {
    errors.password = true;
  }
  if (!userModel.birthYear) {
    errors.birthYear = true;
  }
  return errors;
});

const dirty = reactive<{ [K in keyof UserModel]: boolean }>({
  login: false,
  password: false,
  birthYear: false
});
</script>
