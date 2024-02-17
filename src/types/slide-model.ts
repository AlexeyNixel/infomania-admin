import type { PreviewType, MetaType } from './common';
import type { EntryType } from './entry-model';

export type SlideType = {
  id: string;
  oldId: number;
  title: string;
  desc: string;
  createdAt: string;
  isDeleted: boolean;
  entryId: string;
  fileId: string;
  url: string;
  position: number;
  entry: EntryType;
  image: PreviewType;
};

export type SlideResponseType = {
  data: SlideType[];
  meta: MetaType;
};
