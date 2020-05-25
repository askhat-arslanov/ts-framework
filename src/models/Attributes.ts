export class Attributes<T> {
  constructor(private data: T) {}

  // Generic constraint
  // <K extends keyof T> - "K" может быть только одним из ключей,
  // которые находятся в "T"

  // T[K] - как обычное обращение к полю объекта,
  // только берется тип, а не значение
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  getAll = (): T => {
    return this.data
  }

  set = (update: T): void => {
    this.data = { ...this.data, ...update }
  }
}
