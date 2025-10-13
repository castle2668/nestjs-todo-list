import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { flatten } from 'flat';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public createUser(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  public updateUser(id: string, dto: UpdateUserDto) {
    const obj = flatten(dto);
    console.log(obj);
    return this.userModel.findByIdAndUpdate(id, { $set: obj }, { new: true });
  }

  public getUser(id: string) {
    return this.userModel.findById(id);
  }

  public getUsers(skip: number, limit: number) {
    return this.userModel.find().skip(skip).limit(limit).exec();
  }

  public removeUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
