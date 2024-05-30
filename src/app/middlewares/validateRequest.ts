import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // data validation schema using zod
      await schema.parseAsync({
        body: req.body,
      });
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
