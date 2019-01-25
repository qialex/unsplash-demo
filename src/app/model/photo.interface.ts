export interface PhotoInterface {
  id: string;
  urls: {
    full: string,
    small: string,
    thumb: string
  };
  likes: number;
}
