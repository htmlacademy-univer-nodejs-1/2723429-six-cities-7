import { ContainerModule } from 'inversify';
import { Model } from 'mongoose';
import { Component } from '../../types/index.js';
import { OfferModel, OfferDocument } from './offer.model.js';
import { IOfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';
import {IController} from '../../libs/rest/index.js';
import {OfferController} from './offer-controller.js';

export function createOfferContainer(): ContainerModule {
  return new ContainerModule((options) => {
    options.bind<Model<OfferDocument>>(Component.OfferModel).toConstantValue(OfferModel);
    options.bind<IOfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
    options.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
  });
}
