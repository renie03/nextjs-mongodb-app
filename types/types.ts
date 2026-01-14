export type LinkType = {
  title: string;
  path: string;
};

export type PostType = {
  _id: string;
  title: string;
  desc: string;
  img?: string;
  category: "general" | "technology" | "health" | "sports" | "education";
  isFeatured: boolean;
  createdAt: string;
  user?: {
    name: string;
    image?: string;
  };
};

export type UserType = {
  _id: string;
  username?: string;
  name: string;
  email: string;
  image?: string;
  isAdmin: boolean;
  createdAt: string;
};
