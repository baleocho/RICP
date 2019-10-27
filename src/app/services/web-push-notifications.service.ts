import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment ';

@Injectable({
  providedIn: 'root'
})
export class WebPushNotificationsService {

  private swRegistration;
  private isSubscribed: boolean;
  private applicationServerPublicKey: string;

  constructor(private httpClient: HttpClient) {
    this.applicationServerPublicKey = 'nuestra clave privada';
   }

   private checkServiceWorkerPushEnabled(): boolean {
    return ('serviceWorker' in navigator && 'PushManager' in window);
    }

    private enableServiceWorker(): void {
      navigator.serviceWorker.register('/app/serviceWorker/sw.js', {scope: '/app/serviceWorker/'})
      .then( swReg => {
        console.info('Service Worker esta registrado', swReg);
        this.swRegistration = swReg;
        this.initialiseUI();
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
    }

    private initialiseUI(): void {
      // Set the initial subscription value
      this.swRegistration.pushManager.getSubscription()
      .then( subscription => {
        this.isSubscribed = !(subscription === null);
    
        if (this.isSubscribed) {
          this.sendSubcriptionObject(subscription);
        } else {
          console.log('Usuario NO esta registrado');
          this.subscribeUser();
        }
      });
    }

    private subscribeUser(): void {
      const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
      this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(subscription) {
        console.log('Usuario suscrito: ', subscription);
        this.isSubscribed = true;
      })
      .catch(function(err) {
        console.log('Fallo al realizar la suscripción: ', err);
      });
    }

    private sendSubcriptionObject(subscription): void {
    }
    
    private urlB64ToUint8Array(base64String): Uint8Array {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
  
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
}
