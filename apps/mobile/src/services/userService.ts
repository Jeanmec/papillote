import api from '~/api';
import {
  AuthCredentialsDto,
  UserProfileDto,
  LoginResponseDto,
  createUserSchema,
} from '@papillote/validation';

export const getProfile = async (): Promise<UserProfileDto | null> => {
  return await api.get<UserProfileDto>('/user');
};

export const createUser = async (
  userData: AuthCredentialsDto
): Promise<LoginResponseDto | null> => {
  return await api.post<AuthCredentialsDto, LoginResponseDto>(
    '/user',
    userData,
    createUserSchema
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
