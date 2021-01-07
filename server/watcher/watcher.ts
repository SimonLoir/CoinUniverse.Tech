export default class Watcher {
    protected pairs: any = {};
    public name = 'Error: Name not defined';
    constructor() {}
    public getPair(pair: string): number {
        return this.pairs[pair];
    }
}
