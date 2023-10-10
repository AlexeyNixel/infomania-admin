import { axiosApi } from '@/api/axios'

export function put(model: string, idOrSlug: string, data: object) {
  if (model && data && idOrSlug) {
    return axiosApi
      .put(`/${model}/${idOrSlug}`, data)
      .then((data) => {
        return data
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}

