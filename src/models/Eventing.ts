type Callback = () => void

export class Eventing {
  public events: { [key: string]: Callback[] } = {}

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || []
    this.events[eventName] = [...handlers, callback]
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName]
    if (handlers?.length) {
      handlers.forEach((cb) => {
        cb()
      })
    }
  }
}
