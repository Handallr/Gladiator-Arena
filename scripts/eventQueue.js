// Simple event queue implementation
export class EventQueue {
  constructor() {
    this.queue = [];
  }
  emit(event) {
    this.queue.push(event);
  }
  process() {
    while (this.queue.length) {
      const { type, data } = this.queue.shift();
      // handle events or dispatch to systems here
    }
  }
}
