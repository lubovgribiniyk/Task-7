export default class DeviceView {
  constructor(root) {
    this._root = root;
  }
  destroy() {
    this._root.parentElement.removeChild(this._root);
  }
}
