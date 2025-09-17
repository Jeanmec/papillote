import api from '../api';
import {
  AuthCredentialsDto,
  UserProfileDto,
  LoginResponseDto,
} from '@papillote/validation';

export const getProfile = async (
  token: string
): Promise<UserProfileDto | null> => {
  return await api.get<UserProfileDto>('/user', token);
};

export const createUser = async (
  userData: AuthCredentialsDto
): Promise<LoginResponseDto | null> => {
  return await api.post<AuthCredentialsDto, LoginResponseDto>(
    '/user',
    userData
  );
};

export const login = async (
  credentials: AuthCredentialsDto
): Promise<LoginResponseDto | null> => {
  return await api.post<AuthCredentialsDto, LoginResponseDto>(
    '/user/login',
    credentials
  );
};

export const checkUserExistence = async (
  mobileId: string
): Promise<boolean | null> => {
  return await api.get<boolean>(`/user/check/${mobileId}`);
};
