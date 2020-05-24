import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/share/entity/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/share/dto/account.dto';

@Injectable()
export class AccountService {
    constructor(
      @InjectRepository(AccountEntity)
      private readonly repo: Repository<AccountEntity>,
    ) {}

    getFakeData(){
        return []
    }

    async getAll(): Promise<AccountDto[]> {
        const accounts = await this.repo.find();
        return accounts.map( account => AccountDto.fromEntity(account) );
    }

    async getById(id: number): Promise<AccountDto> {
        const one = await this.repo.findOne({where: {id: id}});
        return AccountDto.fromEntity(one);
    }
}
