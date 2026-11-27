import {UserDocument} from './user.model.js';
import {UpdateUserDto} from './dto/index.js';
import {CreateUserDto} from './dto/index.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<UserDocument>;
  updateById(userId: string, dto: UpdateUserDto): Promise<UserDocument | null>;
}
