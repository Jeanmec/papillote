import api from '~/api';
import {
  ValidateGeneratedIdDto,
  CreateLinkRequestDto,
  RespondToLinkRequestDto,
} from '@papillote/validation';

export interface ValidateGeneratedIdResponse {
  isValid: boolean;
}

export interface Link {
  id: number;
  fromUserId: string;
  toUserId: string;
  fromUserGeneratedId: string;
  toUserGeneratedId: string;
  fromUserPseudo: string;
  toUserPseudo?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export const validateGeneratedId = async (
  generatedId: string
): Promise<ValidateGeneratedIdResponse | null> => {
  const data: ValidateGeneratedIdDto = { generatedId };
  return await api.post<ValidateGeneratedIdDto, ValidateGeneratedIdResponse>(
    '/links/validate-id',
    data,
    ValidateGeneratedIdDto
  );
};

export const sendLinkRequest = async (
  targetGeneratedId: string,
  pseudo: string
): Promise<Link | null> => {
  const data = { targetGeneratedId, pseudo };
  return await api.post<typeof data, Link>(
    '/links/send-request',
    data,
    CreateLinkRequestDto
  );
};

export const answerLinkRequest = async (
  data: RespondToLinkRequestDto
): Promise<Link | null> => {
  return await api.post<RespondToLinkRequestDto, Link | null>(
    '/links/answer-request',
    data,
    RespondToLinkRequestDto
  );
};

export const getMyLinks = async (): Promise<Link[] | null> => {
  return await api.get<Link[]>('/links/my-links');
};
