import { IBenefit } from "../models";

function generateID() {
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    const randomChar = characters.charAt(randomIndex);
    id += randomChar;
  }
  return id;
}


interface Props<T>{
    items: T[]
}

export function validateID<T extends {id: string}>({items}: Props<T>){
  let id = generateID();
  const isDuplicated = items.some(item => item.id === id);
  if (isDuplicated) {
    id = generateID();
  }
  return id;
};
