<template>
  <form @submit.prevent="register($event)">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input id="email" name="email" class="form-control" v-model="userModel.login" @input.once="dirty.login = true" />
      <div v-if="errors.login && dirty.login" class="invalid-feedback d-block">The login is required</div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">password</label>
      <input id="email" name="email" class="form-control" v-model="userModel.password" @input.once="dirty.password = true" />
      <div v-if="errors.password && dirty.password" class="invalid-feedback d-block">The password is required</div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">birthYear</label>
      <input id="email" name="email" class="form-control" v-model.number="userModel.birthYear" @input.once="dirty.birthYear = true" />
      <div v-if="errors.birthYear && dirty.birthYear" class="invalid-feedback d-block">The birth year is required</div>
    </div>

    <submit class="btn btn-success">Let's go!</submit>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { UserModel } from '@/models/UserModel';

const userModel = reactive<UserModel>({
  login: '',
  password: '',
  birthYear: new Date().getFullYear() - 18
});

function register(e) {
  //appeler composable
  console.log(e);
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
