import { RoleTypes } from '../../shared/constants';

export const getUserBorderColor = (role: string) => {
   return role === RoleTypes.ADMIN ? 'var(--color-error)' : 'var(--color-primary)';
};
