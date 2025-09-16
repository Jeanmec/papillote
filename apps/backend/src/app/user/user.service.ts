import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto, LoginResponseDto } from '@papillote/validation';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  private async getUniqueGeneratedId(): Promise<string> {
    let generatedId: string;
    let exists = true;
    do {
      generatedId = Math.random().toString(36).substring(2, 10);
      const user = await this.userRepository.findOne({
        where: { generatedId },
      });
      exists = !!user;
    } while (exists);
    return generatedId;
  }

  async signUp(body: AuthCredentialsDto): Promise<LoginResponseDto> {
    const { mobileId, password } = body;

    const generatedId = await this.getUniqueGeneratedId();
    const hashedPassword = await bcrypt.hash(String(password), 10);

    const newUser = this.userRepository.create({
      mobileId,
      generatedId,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    const payload = { sub: generatedId };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async login(body: AuthCredentialsDto): Promise<LoginResponseDto> {
    const { mobileId, password } = body;
    const user = await this.userRepository.findOne({ where: { mobileId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.generatedId };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
