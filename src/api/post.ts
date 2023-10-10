import { axiosApi } from '@/api/axios';
import type { UserType } from '@/types/models';

export function post(model: string, data?: object, params?: UserType): any {
  if (model && data) {
    return axiosApi
      .post(`api/${model}`, data)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
  if (!data && params) {
    return axiosApi
      .post(`api/${model}`, undefined, {
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

