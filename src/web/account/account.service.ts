import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountEntity } from '../../share/entity/account.entity';
import { AccountDto } from '../../share/dto/account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly repo: Repository<AccountEntity>,
    ) { }

    async getAll(): Promise<AccountDto[]> {
        const accounts = await this.repo.find();
        return accounts.map(account => AccountDto.fromEntity(account));
    }

    async getById(id: number): Promise<AccountDto | null> {
        const one = await this.repo.findOne({ where: { id: id } });
        if (!one) {
            return null;
        }

        return AccountDto.fromEntity(one);
    }

    async getByEmail(email: string): Promise<AccountDto | null> {
        const one = await this.repo.findOne({ where: { email } });
        if (!one) {
            return null;
        }
        return AccountDto.fromEntity(one);
    }
}
