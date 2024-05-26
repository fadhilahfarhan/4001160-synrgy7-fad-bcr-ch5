import { Request, Response } from 'express';
import { CarsModel } from '../models/CarsModel';
import { Cars } from '../interfaces/Cars';
import { CreateCar } from '../interfaces/CreateCar'
import cloudinaryHelper from '../utils/cloudinaryHelper'

class CarsController {
  async getAll(req: Request, res: Response) {
    try {
      const getCars: Cars[] = await CarsModel.query();

      if (!getCars.length) {
        return res.status(404).json({
          message: 'No cars found',
        });
      }

      return res.status(200).json({
        message: 'Get all cars successfully',
        data: getCars,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const requestId: number = Number(req.params.id);

      if (isNaN(requestId)) {
        throw new Error('Invalid ID cars');
      }

      const getCar: Cars | undefined = await CarsModel.query().findById(
        requestId
      );

      if (!getCar) {
        return res.status(404).json({
          message: 'Car not found',
        });
      }

      return res.status(200).json({
        message: 'Get car successfully',
        data: getCar,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }

  async insert(req: Request, res: Response) {
    try {
      const { name, price, picture, start_rent, finish_rent } = req.body;

      const fileBase64: string | undefined = req.file?.buffer.toString('base64');
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;

      const reqData: CreateCar = {
        name: name,
        price: Number(price),
        picture: picture,
        start_rent: start_rent,
        finish_rent: finish_rent,
      };

      const secureUrl: string = await cloudinaryHelper.upload(file)

      if (secureUrl) {
        reqData.picture = secureUrl
        await CarsModel.query().insert(reqData);

        res.status(201).json({
          message: 'Cars successfully added'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to add car to the database',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, price, picture, start_rent, finish_rent } = req.body;
      const requestId: number = Number(req.params.id);
      const getCar: Cars | undefined = await CarsModel.query().findById(requestId);

      if (!getCar) {
        return res.status(404).json({
          message: 'Car not found',
        });
      }

      const updatedCar = {
        name: name || getCar.name,
        price: price || getCar.price,
        picture: picture || getCar.picture,
        start_rent: start_rent || getCar.start_rent,
        finish_rent: finish_rent || getCar.finish_rent,
        updated_at: new Date().toISOString(),
      };

      const fileBase64: string | undefined = req.file?.buffer.toString('base64');
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;

      if (req.file) {
        cloudinaryHelper.destroy(getCar.picture);
        updatedCar.picture = await cloudinaryHelper.upload(file);
      }

      const updated = await CarsModel.query().findById(requestId).update(updatedCar);

      if (updated) {
        return res.status(200).json({
          message: 'Car data successfully updated',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update car data',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const requestId: number = Number(req.params.id);

      if (isNaN(requestId)) {
        throw new Error('Invalid ID cars');
      }

      const getCar: Cars | undefined = await CarsModel.query().findById(requestId);
      const result = await CarsModel.query().findById(requestId).delete();

      if (!result) {
        return res.status(404).json({ message: 'Cars not found' });
      }

      if(getCar){
        cloudinaryHelper.destroy(getCar.picture);
      }
      
      return res.status(200).json({ message: 'Cars successfully deleted' });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }
}

export default CarsController;
