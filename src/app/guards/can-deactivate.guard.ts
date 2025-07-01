import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

// Create an interface for components to implement
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// Functional CanDeactivate guard
export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
