import { IClient } from "./client.model";

export interface IProject{
    id: string;
    title: string;
    description: string,
    client: IClient;
    images: string[];
}