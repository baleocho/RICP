import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  // From Slide Bar Component
  private wrapperToggled = new BehaviorSubject<any>(null);
  currentWrapperToggled: Observable<any> = this.wrapperToggled.asObservable();
  // From Side Bar Component
  private sideBarToggled = new BehaviorSubject<any>(null);
  currentSideBarToggled: Observable<any> = this.sideBarToggled.asObservable();
  constructor() { }
  /**
   * Asigna un nuevo valor a la variable compartida de slide-bar
   * @param data {boolean} Info que se pasara para el nuevo valor para abrir o cerrar slide bar
   */
  changeWrapperToggled(data: boolean): void { this.wrapperToggled.next(false); }
    /**
   * Asigna un nuevo valor a la variable compartida de side-bar
   * @param data {boolean} Info que se pasara para el nuevo valor para abrir o cerrar side bar
   */
  changeSideBarToggled(data: boolean): void { this.sideBarToggled.next(data); }

}
