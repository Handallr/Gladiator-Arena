export class EventQueue {
  constructor() { this.queue = []; }
  emit(event) { this.queue.push(event); }
  process() { while (this.queue.length) { this.queue.shift(); } }
}
