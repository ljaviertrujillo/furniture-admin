import { Client } from "./client.model";

export interface Project {
  id: string;
  title: string;
  description: string;
  client: Client;
  images: string[];
  isNew: true;
  isUpdated: false;
}
