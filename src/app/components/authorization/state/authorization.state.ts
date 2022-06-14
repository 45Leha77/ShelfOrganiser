import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  errorMessage: string;
}

export const initialState: AuthState = {
  user: null,
  errorMessage: '',
};
