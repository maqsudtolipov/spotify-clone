import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

interface LoginInput {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'user/login',
  async (input: LoginInput) => {
    console.log(input);
    const res = await axios.post('/auth/login', input);
    console.log(res);
    return res.data;
  },
);
