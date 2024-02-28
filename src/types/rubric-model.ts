import type { EntryType } from './entry-model';

export type RubricType = {
  id: string;
  oldId: string;
  title: string;
  desc: string;
  slug: string;
  isDeleted: boolean;
  entries?: EntryType[];
};
