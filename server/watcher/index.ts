import CryptoComWatcher from './Crypto.com';
import Watcher from './watcher';

class PairsWatcher {
    private watchers: Watcher[] = [];
    constructor() {
        this.registerWatcher(CryptoComWatcher);
    }

    public getPairs(pair: string): number[] {
        return this.watchers.map((w) => w.getPair(pair));
    }

    public getNames(): string[] {
        return this.watchers.map((w) => w.name);
    }

    public registerWatcher(w: typeof Watcher) {
        this.watchers.push(new w());
        console.log(w.prototype);
    }
}

export var watcher = new PairsWatcher();
