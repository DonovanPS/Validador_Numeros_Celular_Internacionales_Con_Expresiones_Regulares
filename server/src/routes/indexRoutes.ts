import {Router} from 'express';
import IndexController from '../controllers/indexController';

class IndexRoutes{

    public router: Router = Router();

    private indexController = new IndexController();

    constructor(){
        this.config();
    }

    config(): void{
       
        this.router.get('/validatePhoneNumber', this.indexController.validatePhoneNumber);
        this.router.get('/getAll', this.indexController.getAll);
        this.router.post('/create', this.indexController.create);
    
        
    }
}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;