import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "kamrapajtas", appId: "1:328746751523:web:e4506fccc11e9440684396", storageBucket: "kamrapajtas.firebasestorage.app", apiKey: "AIzaSyBhCeMtlMoDWbwcKly5IiKhqZlBJtO-364", authDomain: "kamrapajtas.firebaseapp.com", messagingSenderId: "328746751523" })), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideAuth(() => getAuth())
  ]
};
