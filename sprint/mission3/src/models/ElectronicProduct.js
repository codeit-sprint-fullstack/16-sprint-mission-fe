import { Product } from './Product.js';

export class ElectronicProduct extends Product {
  /** 제조사 */
  _manufacturer;

  constructor(name, description, price, tags, images, favoriteCount, manufacturer) {
    super(name, description, price, tags, images, favoriteCount);

    this._manufacturer = manufacturer;
  }

  getManufacturer() {
    return this._manufacturer;
  }
}
