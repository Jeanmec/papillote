import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkEntity, LinkStatus } from '../../entities/link.entity';
import { UserEntity } from '../../entities/user.entity';

export interface ValidateGeneratedIdDto {
  generatedId: string;
}

export interface CreateLinkRequestDto {
  targetGeneratedId: string;
  pseudo: string;
}

export interface RespondToLinkRequestDto {
  requestId: number;
  accept: boolean;
  pseudo?: string;
}

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async validateGeneratedId(
    generatedId: string,
    pseudo?: string
  ): Promise<{
    isValid: boolean;
    user?: { generatedId: string; pseudo?: string };
  }> {
    console.log(
      'Validating generated ID:',
      generatedId,
      'with pseudo:',
      pseudo
    );
    const user = await this.userRepository.findOne({
      where: { generatedId },
      select: ['generatedId'],
    });

    return {
      isValid: !!user,
      user: user ? { generatedId: user.generatedId, pseudo } : undefined,
    };
  }

  async createLinkRequest(
    fromUserId: string,
    dto: CreateLinkRequestDto
  ): Promise<LinkEntity> {
    const targetUser = await this.userRepository.findOne({
      where: { generatedId: dto.targetGeneratedId },
    });

    if (!targetUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const existingLink = await this.linkRepository.findOne({
      where: [
        { fromUserId, toUserId: targetUser.mobileId },
        { fromUserId: targetUser.mobileId, toUserId: fromUserId },
      ],
    });

    if (existingLink) {
      throw new BadRequestException(
        'Une demande de liaison ou liaison existe déjà avec cet utilisateur'
      );
    }

    const fromUser = await this.userRepository.findOne({
      where: { mobileId: fromUserId },
    });

    if (!fromUser) {
      throw new NotFoundException('Utilisateur émetteur non trouvé');
    }

    const link = this.linkRepository.create({
      fromUserId,
      toUserId: targetUser.mobileId,
      fromUserPseudo: dto.pseudo,
      status: LinkStatus.PENDING,
    });

    return await this.linkRepository.save(link);
  }

  async respondToLinkRequest(
    toUserId: string,
    dto: RespondToLinkRequestDto
  ): Promise<LinkEntity | null> {
    const link = await this.linkRepository.findOne({
      where: { id: dto.requestId, toUserId, status: LinkStatus.PENDING },
    });

    if (!link) {
      throw new NotFoundException('Demande de liaison non trouvée');
    }

    if (!dto.accept) {
      link.status = LinkStatus.REJECTED;
      return await this.linkRepository.save(link);
    }

    if (!dto.pseudo) {
      throw new BadRequestException(
        'Le pseudo est requis pour accepter la liaison'
      );
    }

    link.status = LinkStatus.ACCEPTED;
    link.toUserPseudo = dto.pseudo;

    return await this.linkRepository.save(link);
  }

  async getUserLinks(userId: string): Promise<LinkEntity[]> {
    const links = await this.linkRepository.find({
      where: [{ fromUserId: userId }, { toUserId: userId }],
      relations: ['fromUser', 'toUser'],
      order: { createdAt: 'DESC' },
    });

    return links.map((link) => ({
      ...link,
      fromUserGeneratedId: link.fromUser.generatedId,
      toUserGeneratedId: link.toUser.generatedId,
    }));
  }
}
