export class ObjectPool {
  constructor(createFn) { this.createFn = createFn; this.items = []; }
  acquire() { return this.items.pop() || this.createFn(); }
  release(obj) { if (obj.reset) obj.reset(); this.items.push(obj); }
}
