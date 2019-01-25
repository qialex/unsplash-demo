export interface PhotoInterface {
  id: string;
  urls: {
    full: string,
    small: string,
  };
  likes: number;
}
