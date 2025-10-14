import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { flatten } from 'flat';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // 建立使用者
  public async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hash = await bcrypt.hash(password, 12);
    return this.userModel.create({ ...dto, password: hash });
  }

  // 檢查用戶是否存在
  public userExists(username: string, email: string) {
    return this.userModel.exists({ $or: [{ username }, { email }] });
  }

  // 查詢使用者
  public getUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter);
  }

  // 更新
  public updateUser(id: string, dto: UpdateUserDto) {
    const obj = flatten(dto);
    console.log(obj);
    return this.userModel.findByIdAndUpdate(id, { $set: obj }, { new: true });
  }

  // 刪除
  public removeUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
