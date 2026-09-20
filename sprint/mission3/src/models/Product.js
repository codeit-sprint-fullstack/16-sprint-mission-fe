export class Product {
  /** 상품명  */
  _name;

  /** 상품 설명 */
  _description;

  /** 판매 가격 */
  _price;

  /** 해시 태그 목록 */
  _tags;

  /** 이미지 목록 */
  _images;

  /** 찜하기 수 */
  _favoriteCount;

  constructor(name, description, price, tags, images, favoriteCount) {
    this._name = name;
    this._description = description;
    this._price = price;
    this._tags = Array.from(tags); // 깊은 복사를 통해, 외부의 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
    this._images = Array.from(images);
    this._favoriteCount = favoriteCount;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getPrice() {
    return this._price;
  }

  getTags() {
    return Array.from(this._tags); // 깊은 복사를 통해, 반환된 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
  }

  getImages() {
    return Array.from(this._images);
  }

  getFavoriteCount() {
    return this._favoriteCount;
  }

  favorite() {
    this._favoriteCount++;
  }
}
