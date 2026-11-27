import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { ILogger } from '../../logger/index.js';
import { Component } from '../../types/index.js';
import { IOfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferPreviewRdo } from './rdo/offer-preview.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { HttpError } from '../../libs/rest/errors/index.js';
import { isCity } from '../../types/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });

    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/:offerId/favorite', method: HttpMethod.Post, handler: this.addToFavorites });
    this.addRoute({ path: '/:offerId/favorite', method: HttpMethod.Delete, handler: this.removeFromFavorites });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const offers = await this.offerService.findMany(limit);
    this.ok(res, fillDTO(OfferPreviewRdo, offers));
  }

  public async create(_req: CreateOfferRequest, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Authorization is not implemented yet.',
      'OfferController'
    );
  }

  public async show(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;

    if (typeof offerId !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offerId format.',
        'OfferController'
      );
    }

    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${offerId}» not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update(_req: UpdateOfferRequest, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Authorization is not implemented yet.',
      'OfferController'
    );
  }

  public async delete(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Authorization is not implemented yet.',
      'OfferController'
    );
  }

  public async getPremium(req: Request, res: Response): Promise<void> {
    const cityParam = req.params.city;

    if (typeof cityParam !== 'string') {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Invalid city format.', 'OfferController');
    }

    let city;
    try {
      city = isCity(cityParam);
    } catch (error) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `City «${cityParam}» is not supported.`,
        'OfferController'
      );
    }

    const offers = await this.offerService.findPremiumByCity(city);
    this.ok(res, fillDTO(OfferPreviewRdo, offers));
  }

  public async getFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Authorization is not implemented yet.',
      'OfferController'
    );
  }

  public async addToFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Authorization is not implemented yet.',
      'OfferController'
    );
  }

  public async removeFromFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Authorization is not implemented yet.',
      'OfferController'
    );
  }
}
