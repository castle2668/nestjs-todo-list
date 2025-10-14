import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../../core/models/user';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../../core/models/user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // 在應用程式啟動時建立預設管理員
  public async onApplicationBootstrap() {
    await this.createDefaultAdmin();
  }

  // 建立使用者
  public async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hash = await bcrypt.hash(password, 12);
    return this.userModel.create({ ...dto, password: hash });
  }

  // 查詢使用者
  public async getUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter).exec();
  }

  // 建立預設管理員
  private async createDefaultAdmin() {
    const { username, password, email } = this.configService.get('admin');
    const dto: CreateUserDto = {
      username,
      password,
      email,
      role: Role.ADMIN,
    };
    const exist = await this.userModel
      .exists({
        $and: [{ username }, { role: Role.ADMIN }],
      })
      .exec();
    if (exist) {
      return;
    }
    await this.createUser(dto);
  }
}
