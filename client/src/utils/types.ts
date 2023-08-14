export type ParamType = {
  name: string;
  age: number;
};

export type PayloadType = {
  address: string;
  Param: ParamType;
};

export interface PayloadInterface {
  address: string;
}

export type likesSign = {
  user_id: string;
  blog_id: string;
};

export type registerData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

export type loginData = {
  email: string;
  password: string;
};

export type tokenData = {
  name: string;
  id: string;
  exp: Number;
  iat: Number;
};

export type newBlodData = {
  user: string;
  user_name: string;
  title: string;
  text: string;
  image_url: string;
  likes: Number;
  watches: Number;
  followers: Array<String>;
  created_at: Date;
};

export type getBlogData = {
  user: string;
  title: string;
  text: string;
  image_url: string;
  created_at: string;
  watches: string;
  likes: Array<any>;
};

export type updateBlodData = {
  blog_id: string;
  title: string;
  text: string;
  image_url: string;
};
