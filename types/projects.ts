export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
}

export type User = {
  id: number;
  name: string;
  avatar_url: string;
}