import { bootstrapApplication } from '@angular/platform-browser';
import { buildAppConfig } from './app/app.config';
import { App } from './app/app';
import { loadFirebaseConfig } from './app/firebase/firebase-config-loader';

async function main() {
  try {
    const firebaseConfig = await loadFirebaseConfig();
    await bootstrapApplication(App, buildAppConfig(firebaseConfig));
  } catch (error) {
    console.error('No se pudo inicializar Firebase.', error);
  }
}

main();
