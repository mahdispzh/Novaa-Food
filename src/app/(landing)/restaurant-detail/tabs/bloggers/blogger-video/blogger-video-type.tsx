export type BloggerVideo = {
  id: number;
  type: "video";
  url: string;
  thumbnail: string;
  user: {
    username: string;
    avatar?: string;
  };
};