import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {isCity, isConvenience, isHouseType, RentalOffer} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentalOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, date, city, preimage, images, isPremium, isFavourite, rating, houseType, roomsCount, guestsCount, price, conveniences, author, commentsCount, location]) => ({
        name,
        description,
        date: new Date(date),
        city: isCity(city),
        preimage,
        images: images.split(',').map((img) => img.trim()),
        isPremium: isPremium.toLowerCase() === 'true',
        isFavorite: isFavourite.toLowerCase() === 'true',
        rating: Number.parseFloat(rating),
        houseType: isHouseType(houseType),
        roomsCount: Number.parseInt(roomsCount, 10),
        guestsCount: Number.parseInt(guestsCount, 10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(',').map((convenience) => isConvenience(convenience.trim())),
        author: {
          email: 'email',
          name: 'Tim',
          type: 'common',
          password: '12345',
          photoUrl: 'url',
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        location: {
          latitude: Number.parseFloat(location.split(';')[0]),
          longitude: Number.parseFloat(location.split(';')[1])
        }
      }));
  }
}
