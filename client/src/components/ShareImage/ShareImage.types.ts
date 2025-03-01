
export type AlertTypes = 'success' | 'error';
export type AllowedImageTypes = 'image/png' | 'image/jpeg' | 'image/jpg' | 'image/gif' | 'image/webp';

export const ALLOWED_IMAGE_TYPES: AllowedImageTypes[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp'
];

export enum UploadStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Error = 'ERROR',
  Success = 'SUCCESS',
}
