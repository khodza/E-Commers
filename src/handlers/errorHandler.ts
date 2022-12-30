import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
	err: Error,
	res: Response,
	req: Request,
	next: NextFunction
) => {
	res.status(500).json({ message: err.message });
};
