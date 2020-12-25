// No import statement before loading the env !
import * as dotend from 'dotenv';
dotend.config();
// Put import statements above
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { bot } from './bot';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('./public/'));

app.listen(8080);

bot;
