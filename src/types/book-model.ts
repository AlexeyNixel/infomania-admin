import type { MetaType, PreviewType } from '@/types/common';

export interface BookModel {
  id: string;
  title: string;
  desc: string;
  content: string;
  category: string;
  storagePlace: string;
  link: string;
  dateOfReceipt: string;
  isDeleted: false;
  createdAt: string;
  fileId: string;
  oldId: 5;
  preview: PreviewType;
}

export interface BookResponse {
  data: BookModel[];
  meta: MetaType;
}
