export type UserType = {
  name: string;
  password: string;
};

export type CarType = {
  title: string;
  description: string;
  file: File | null;
  user: string | null;
};

export type ItemCarType = CarType & {
  _id: string;
  imageUrl: string;
  date: string;
  comments: [comType];
  user: {
    _id: string;
    name: string;
  };
};

export type comType = {
  _id: string;
  date: string;
  content: string;
  user: {
    _id: string;
    name: string;
  };
};

export type CommentType = {
  content: string;
  user: string | null;
};
