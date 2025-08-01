const ECS = {
  _nextId: 1,
  entities: new Set(),
  components: new Map(),
  createEntity() {
    const id = this._nextId++;
    this.entities.add(id);
    return id;
  },
  addComponent(entity, type, data) {
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type).set(entity, data);
  },
  getComponent(entity, type) {
    return this.components.get(type)?.get(entity);
  },
  query(types) {
    return [...this.entities].filter(e =>
      types.every(t => this.components.get(t)?.has(e))
    );
  }
};
export default ECS;
