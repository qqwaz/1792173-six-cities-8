import { nanoid } from 'nanoid';

export const getFakeData = (length: number) => new Array(length).fill('').map((_) => ({ id: nanoid() }));
