import { Request, Response } from 'express';
import IndexService from '../services/indexService';



class IndexController {

  private indexService: IndexService = new IndexService();

  public validatePhoneNumber = async (req: Request, res: Response) => {
    const phone = req.headers.phone as string;
    try {
      const resp = await this.indexService.validatePhoneNumber(phone);
      res.status(200).json({
        success: true,
        response: resp,
      });
    } catch (err) {

      res.status(400).json({
        success: false,
        message: err,
      });
    }


  }


  public getAll = async (req: Request, res: Response) => {
    
    const table = req.headers.table as string;

    try {
      const resp = await this.indexService.getAll(table);
      res.status(200).json({
        success: true,
        response: resp,
      });
    } catch (err) {

      res.status(400).json({
        success: false,
        message: err,
      });
    }


  }


  public create = async (req: Request, res: Response) => {
    const table = req.headers.table as string;
    
    try {
      const resp = await this.indexService.create(table, req.body);
      res.status(200).json({
        success: true,
        response: resp,
      });
    } catch (err) {

      res.status(400).json({
        success: false,
        message: err,
      });
    }
  }





}



export default IndexController