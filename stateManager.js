export class StateManager {
  constructor() { this.states = {}; this.current = null; }
  add(name, state) { this.states[name] = state; return this; }
  change(name) {
    if (this.current) this.current.exit();
    this.current = this.states[name];
    this.current.enter();
  }
  update(dt) {
    if (this.current && this.current.update) this.current.update(dt);
  }
}
