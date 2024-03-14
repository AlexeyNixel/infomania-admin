import { findEntries, findEntry, postEntry, patchEntry } from '@/api/entry';
import type { EntryType, ParamsType } from '@/types/models';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import type { EntryQuery, EntryResponseType } from '@/types/entry-model';

export const useEntryStore = defineStore('entry', () => {
  const getEntries = async (
    params?: EntryQuery
  ): Promise<EntryResponseType> => {
    return await findEntries(params);
  };

  const getEntry = async (slug: string, params?: ParamsType) => {
    const { data } = await findEntry(slug, params);
    return data;
  };

  const updateEntry = async (slug: string, entry: any) => {
    await patchEntry(slug, entry);
  };

  const createEntry = async (entry: any) => {
    await postEntry(entry);
  };

  const deleteEntry = async (status: boolean, entry: EntryType) => {
    const rubrics: Array<string> = [];
    entry.rubrics.forEach((rubric: any) => {
      rubrics.push(rubric.rubricId);
    });
    ElMessage({
      message: status ? 'Новость удалена' : 'Новость восстановлена',
      type: 'success',
    });

    return await patchEntry(entry.id, {
      isDeleted: status,
      rubrics: rubrics,
    });
  };

  return {
    getEntries,
    getEntry,
    updateEntry,
    createEntry,
    deleteEntry,
  };
});
