import ReconnectingWebSocket, {
  type Options,
  type UrlProvider,
} from 'reconnecting-websocket'

type SingleReconnectWebSocketMessageListener = (message: any) => void
export class SingleReconnectWebSocket {
  static #instance: SingleReconnectWebSocket
  #websocket: ReconnectingWebSocket
  #listeners: SingleReconnectWebSocketMessageListener[]

  constructor(url: UrlProvider, protocols?: string | string[], options?: Options) {
    this.#listeners = []
    this.#websocket = new ReconnectingWebSocket(url, protocols, options)
    this.#websocket.onmessage = ({ data: message }) => {
      const data = JSON.parse(message)
      this.#listeners.forEach(listener => listener(data))
    }
  }

  static getInstance(url: UrlProvider, protocols?: string | string[], options?: Options) {
    if (!this.#instance) {
      this.#instance = new SingleReconnectWebSocket(url, protocols, options)
    }
    return this.#instance
  }

  addMessageListener<T>(listener: (value: T) => void) {
    if (!this.#listeners.includes(listener)) {
      this.#listeners.push(listener)
    }
  }

  removeMessageListener<T>(listener: (value: T) => void) {
    const index = this.#listeners.indexOf(listener)
    if (index > -1) {
      this.#listeners.splice(index, 1)
    }
  }
}
