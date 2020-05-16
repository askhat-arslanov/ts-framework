import axios, { AxiosResponse } from 'axios'

interface UserProps {
  id?: number
  name?: string
  age?: number
}

type Callback = () => void

export class User {
  events: { [key: string]: Callback[] } = {}

  constructor(private data: UserProps) {}

  get(propName: string): (number | string) {
    return this.data[propName]
  }

  set(update: UserProps): void {
    this.data = { ...this.data, ...update}
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []
    this.events[eventName] = [...handlers, callback]
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName]
    if (handlers?.length) {
      handlers.forEach(cb => cb())
    }
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
    .then((response: AxiosResponse): void => {
      this.set(response.data)
      
    })
  }
}