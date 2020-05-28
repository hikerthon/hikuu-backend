import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../share/entity/account.entity';
import { AccountDto } from '../../share/dto/account.dto';
import { HikooResponse } from '../../share/dto/generic.dto';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountEntity, 'mobile')
    private readonly repo: Repository<AccountEntity>,
    private _logger: Logger,
  ) {
  }

  async getAll(): Promise<AccountDto[]> {
    const accounts = await this.repo.find();

    return accounts.map(account => AccountDto.fromEntity(account));
  }

  async getById(id: number): Promise<AccountDto> {
    const account = await this.repo.findOne(
      { where: { id: id } },
    );

    return AccountDto.fromEntity(account);
  }

  async findOneByEmail(email: string): Promise<AccountDto> {
    const account = await this.repo.findOne(
      {
        where: { email: email },
        order: { id: 'ASC' },
      },
    );

    for (const queryKey of Object.keys(account)) {
      this._logger.debug(`${queryKey}: ${account[queryKey]}`);
    }

    return AccountDto.fromEntity(account);
  }

  async create(account: AccountDto): Promise<HikooResponse> {
    try {
      await this.repo.save(account);
    } catch (e) {
      return { success: false, errorMessage: e.message };
    }

    return { success: true };
  }

  async update(account: AccountDto): Promise<HikooResponse> {
    try {
      await this.repo.save(account);
    } catch (e) {
      return { success: false, errorMessage: e.message };
    }

    return { success: true };
  }
}

