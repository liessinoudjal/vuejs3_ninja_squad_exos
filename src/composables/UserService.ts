import { UserModel } from '@/models/UserModel';

import axios from 'axios';

export function useUserService() {
  const apiUrl = 'https://ponyracer.ninja-squad.com';

  async function register(userModel: UserModel): Promise<UserModel> {
    const usersUrl = `${apiUrl}/api/users`;

    const response = await axios.post<UserModel>(usersUrl, userModel);
    return response.data;
  }

  return {
    register
  };
}
