export interface UserInterface {
  id: string;
  username: string;
  name: string;
  profile_image: {
    medium: string,
    large: string,
  };
  links: {
    html: string,
  };
}
