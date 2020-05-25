import { AxiosResponse, AxiosPromise } from 'axios'

interface HasId {
  id?: number
}

interface Events {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
  set(value: T): void
}

interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>
  ) {
  }

  get get() {
    return this.attributes.get
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  set(update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  fetch(): void {
    const id = this.get('id')
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data)
    })
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((): void => {
        this.trigger('saved')
      })
      .catch(() => {
        this.trigger('error')
      })
  }
}
