import { defineStore } from 'pinia';
import { findSlide, findSlides, postSlides, putSlide } from '@/api/slider';
import type { ParamsType } from '@/types/models';

export const useSliderStore = defineStore('slider', () => {
  const getSlides = async (params?: ParamsType) => {
    const { data } = await findSlides(params);
    return data;
  };

  const getSlide = async (slug: string, params?: ParamsType): Promise<any> => {
    const { data } = await findSlide(slug, params);
    return data;
  };

  const updateSlide = async (slug: string, data: any) => {
    return await putSlide(slug, data)
  }

  const createSlide = async (data: any) => {
    return await postSlides(data)
  }

  return {
    getSlides,
    getSlide,
    updateSlide,
    createSlide
  };
});