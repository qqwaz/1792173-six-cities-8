import { nanoid } from 'nanoid';

type DataType = {
  id: string
};

export const getFakeData = (length: number): DataType[] => new Array(length).fill('').map((_) => ({ id: nanoid() }));
