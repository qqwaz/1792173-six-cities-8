import { combineReducers } from '@reduxjs/toolkit';
import { data } from './data/reducer';
import { service } from './service/reducer';

export enum NameSpace {
  Data = 'DATA',
  Service = 'SERVICE',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: data,
  [NameSpace.Service]: service,
});

export type RootState = ReturnType<typeof rootReducer>;
