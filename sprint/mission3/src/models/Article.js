export class Article {
  /** 제목 */
  _title;

  /** 내용 */
  _content;

  /** 좋아요 개수 */
  _likeCount;

  constructor(title, content, likeCount) {
    this._title = title;
    this._content = content;
    this._likeCount = likeCount;
  }

  getTitle() {
    return this._title;
  }

  getContent() {
    return this._content;
  }

  getLikeCount() {
    return this._likeCount;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  like() {
    this._likeCount++;
  }
}
