import type { ImageType } from '@/types/models';
import type { MetaType } from '@/types/common';

export type CollectionsType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  isDeleted: boolean;
  fileId: string;
  preview: ImageType;
  books: any;
};

export interface CollectionsResponseType {
  data: CollectionsType[];
  meta: MetaType;
}
