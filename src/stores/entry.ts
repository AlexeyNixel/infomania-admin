import { findEntries, findEntry, postEntry, putEntry } from '@/api/entry';
import type { EntryType, ParamsType } from '@/types/models';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';

export const useEntryStore = defineStore('entry', () => {
  const getEntries = async (params?: ParamsType) => {
    const { data } = await findEntries(params);
    return data;
  };

  const getEntry = async (slug: string, params?: ParamsType) => {
    const { data } = await findEntry(slug, params);
    return data;
  };

  const updateEntry = async (slug: string, entry: any) => {
    await putEntry(slug, entry);
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

    return await putEntry(entry.id, {
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
