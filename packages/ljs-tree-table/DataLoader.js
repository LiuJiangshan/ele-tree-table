export default class DataLoader {
  constructor (load) {
    this.load = load
  }

  load (cb = { onLoad (data) {}, onError (e) {}, onEnd () {} }, ctx) {

  }
}
