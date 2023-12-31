import express, {Application, application} from 'express'
import morgan from 'morgan';
import cors from 'cors';

import path from 'path';


import indexRoutes from './routes/indexRoutes';



class Server {
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static(path.join(__dirname, '../src/public')));

    }
    
    routes(): void{
        this.app.use(indexRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port `,this.app.get('port'));
        });
    }

}

const server = new Server();

server.start();