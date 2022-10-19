// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT

export type User = {
  id: string;
  username: string;
  email: string;
  homePage: HomePage;
  homePageId: string;
};

export type HomePage = {
  id: string;
  user?: User;
};
