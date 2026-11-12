import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { AccessToken } from './entities/access-token.entity';
import { UserData } from './entities/user-data.entity';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly tokenRepo: Repository<AccessToken>,
    @InjectRepository(UserData)
    private readonly dataRepo: Repository<UserData>,
  ) {}

  async auth(dto: AuthDto) {
    let userId = 0;
    for (let i = 0; i < dto.login.length; i++) {
      userId = userId + dto.login.charCodeAt(i);
    }

    const accessKey = randomUUID();
    const token = this.tokenRepo.create({
      userId,
      accessKey,
    });

    try {
      await this.tokenRepo.save(token);
    } catch (e: any) {
      if (e.code === '23505') {
        throw new ConflictException('Такой ключ уже есть');
      }
      throw e;
    }

    return { access_key: accessKey };
  }

  async getUserIdByKey(accessKey: string): Promise<number> {
    const token = await this.tokenRepo.findOneBy({ accessKey });
    if (!token) {
      throw new UnauthorizedException('Неверный access key');
    }
    return token.userId;
  }

  async createData(userId: number, dto: CreateDataDto) {
    const row = this.dataRepo.create({
      userId,
      data: dto.data,
    });
    return this.dataRepo.save(row);
  }

  async findAll(userId: number) {
    return this.dataRepo.find({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    const row = await this.dataRepo.findOneBy({ id, userId });
    if (!row) {
      throw new NotFoundException('Данные не найдены');
    }
    return row;
  }

  async update(id: number, userId: number, dto: UpdateDataDto) {
    const row = await this.findOne(id, userId);
    row.data = dto.data;
    return this.dataRepo.save(row);
  }

  async remove(id: number, userId: number) {
    const result = await this.dataRepo.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Данные не найдены');
    }
  }
}
