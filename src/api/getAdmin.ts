import { axiosApi } from '@/api/axios';
import type { ParamsType } from '@/types/models';

export function getContent(path: string, idOrSlug?: string, params?: ParamsType) {
  if (idOrSlug) {
    return axiosApi
      .get(`api/${path}/${idOrSlug}`, { params })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } else {
    return axiosApi
      .get(`api/${path}`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
