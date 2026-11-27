import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { UpdateOfferDto } from './dto/index.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>;
