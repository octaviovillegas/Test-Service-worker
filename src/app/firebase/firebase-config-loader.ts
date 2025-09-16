import { FirebaseOptions } from 'firebase/app';

const CONFIG_URL = '/assets/firebase-config.json';

export async function loadFirebaseConfig(): Promise<FirebaseOptions> {
  const response = await fetch(CONFIG_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`No se pudo obtener la configuracion de Firebase (${response.status})`);
  }

  const data = (await response.json()) as FirebaseOptions;

  validateFirebaseConfig(data);

  return data;
}

function validateFirebaseConfig(options: FirebaseOptions): void {
  const requiredKeys: Array<keyof FirebaseOptions> = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missing = requiredKeys.filter((key) => !options[key]);

  if (missing.length > 0) {
    throw new Error(`Faltan claves obligatorias en firebase-config.json: ${missing.join(', ')}`);
  }
}
