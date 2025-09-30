import api from '~/api';
import {
  ClientDto,
  LoginDto,
  LoginResponseDto,
  CreateUserSchema,
  LoginSchema,
  ResetAccountDto,
} from '@papillote/validation';
import DeviceInfo from 'react-native-device-info';

export const getProfile = async (): Promise<ClientDto | null> => {
  return await api.get<ClientDto>('/user');
};

export const createUser = async (
  password: number
): Promise<LoginResponseDto | null> => {
  const mobileId = await DeviceInfo.getUniqueId();

  const credentials: LoginDto = {
    mobileId,
    password,
  };

  return await api.post<LoginDto, LoginResponseDto>(
    '/user',
    credentials,
    CreateUserSchema
  );
};

export const login = async (
  password: number
): Promise<LoginResponseDto | null> => {
  const mobileId = await DeviceInfo.getUniqueId();

  const credentials: LoginDto = {
    mobileId,
    password,
  };

  return await api.post<LoginDto, LoginResponseDto>(
    '/user/login',
    credentials,
    LoginSchema
  );
};

export const checkUserExistence = async (
  mobileId: string
): Promise<boolean | null> => {
  return await api.get<boolean>(`/user/check/${mobileId}`);
};

export const resetUser = async (
  password: number
): Promise<LoginResponseDto | null> => {
  const mobileId = await DeviceInfo.getUniqueId();

  const credentials: LoginDto = {
    mobileId,
    password,
  };

  return await api.post<ResetAccountDto, LoginResponseDto>(
    '/user/forgot',
    credentials
  );
};
