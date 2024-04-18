import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.usersRepo.create({ email, password });
    return this.usersRepo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.usersRepo.findOneBy({ id });
  }

  find(email: string) {
    return this.usersRepo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    Object.assign(user, attrs);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    return this.usersRepo.remove(user);
  }
}
