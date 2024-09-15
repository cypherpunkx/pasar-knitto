import { Role } from '@models/user.model';
import type { Request, Response, NextFunction } from 'express';

async function authorizeRoles(requiredRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Asumsikan `req.user` sudah di-set dari middleware autentikasi

    if (!user || !user.roles.some((role) => requiredRoles.includes(role))) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}

export default authorizeRoles;
