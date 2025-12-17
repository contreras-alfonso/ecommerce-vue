import type { TypeManagement } from './type-management';

export interface ManagementDialog<T> {
  isOpen: boolean;
  type: TypeManagement;
  entity: T | null;
}
