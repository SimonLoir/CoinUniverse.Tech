import * as WebSocket from 'ws';
import Watcher from './watcher';

export default class CryptoComWatcher extends Watcher {
    name = 'Crypto.com';
    constructor() {
        super();

        const ws = new WebSocket('wss://stream.crypto.com/v2/market', {
            perMessageDeflate: false,
        });

        ws.on('open', () => {
            ws.send(
                JSON.stringify({
                    method: 'subscribe',
                    params: {
                        channels: [
                            'ticker.BTC_USDT',
                            'ticker.DOT_USDT',
                            'ticker.ZIL_USDT',
                        ],
                    },
                })
            );
        });

        ws.on('message', (data: any) => {
            const d: any = JSON.parse(data.toString());
            if (d?.result?.data[0]) {
                const { i, a } = d.result.data[0];
                this.pairs[i] = a;
                //console.log(obj);
            } else {
                console.log(`\nHeartbeat\n`);

                if (d.method == 'public/heartbeat') {
                    ws.send(
                        JSON.stringify({
                            id: d.id,
                            method: 'public/respond-heartbeat',
                        })
                    );
                }
            }
        });
    }
}
