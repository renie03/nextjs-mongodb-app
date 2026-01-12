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
