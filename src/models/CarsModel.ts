import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
  id!: number;
  name!: string;
  price!: number;
  picture!: string;
  start_rent!: string;
  finish_rent!: string;
  created_at!: Date | string;
  updated_at!: Date | string;

  static get tableName() {
    return 'cars';
  }
}

export type Cars = ModelObject<CarsModel>;
