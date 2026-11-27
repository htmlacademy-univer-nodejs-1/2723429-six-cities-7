import { Expose } from 'class-transformer';
import { City, HouseType } from '../../../types/index.js';

export class OfferPreviewRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public price: number;

  @Expose()
  public houseType: HouseType;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public preimage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;
}
