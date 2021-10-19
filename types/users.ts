import { Fellowship } from './shared'

export type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: Fellowship;
  avatar_url: string;
  projects: Project[];
}

export type Project = {
  id: number;
  name: string;
  icon_url: string;
}