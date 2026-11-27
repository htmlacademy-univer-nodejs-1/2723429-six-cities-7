import { ContainerModule } from 'inversify';
import { IUserService } from './user-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import {UserDocument, UserModel} from './user.model.js';
import {Model} from 'mongoose';
import {IController} from '../../libs/rest/index.js';
import {UserController} from './user-controller.js';

export function createUserContainer(): ContainerModule {
  return new ContainerModule((options) => {
    options.bind<Model<UserDocument>>(Component.UserModel).toConstantValue(UserModel);
    options.bind<IUserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
    options.bind<IController>(Component.UserController).to(UserController).inSingletonScope();
  });
}
