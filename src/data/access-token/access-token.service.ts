import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessTokenEntity } from './access-token.entity';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessTokenEntity)
    private readonly accessTokenRepository: Repository<AccessTokenEntity>,
  ) {}

  saveToken(userId: number, accessKey: string) {
    const token = this.accessTokenRepository.create({ userId, accessKey });
    return this.accessTokenRepository.save(token);
  }

  async getUserId(accessKey: string) {
    const token = await this.accessTokenRepository.findOneBy({ accessKey });
    if (token) {
      return token.userId;
    }
    return null;
  }
}
