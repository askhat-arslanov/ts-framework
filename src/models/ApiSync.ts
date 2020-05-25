import axios, { AxiosPromise } from 'axios'

interface HasId {
  id?: number
}

export class ApiSync<T extends HasId> {
  constructor(private baseUrl: string) {}

  fetch(id: number): AxiosPromise {
    if (!id) throw new Error('Cannot fetch without an "id"')
    return axios.get(`${this.baseUrl}/${id}`)
  }

  save(data: T): AxiosPromise {
    const { id } = data
    return id
      ? axios.put(`${this.baseUrl}/${id}`, data)
      : axios.post(this.baseUrl, data)
  }
}
