import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const app = initializeApp({
  apiKey: 'AIzaSyDPbe0Z4kCsQ7BL_mNMaq-Q5yTNy4tjUMs',
  authDomain: 'cloud-retail-a03f5.firebaseapp.com',
  projectId: 'cloud-retail-a03f5',
  storageBucket: 'cloud-retail-a03f5.firebasestorage.app',
  messagingSenderId: '677455186748',
  appId: '1:677455186748:web:92ec49a514144bda9fec39',
  databaseURL:
    'https://cloud-retail-a03f5-default-rtdb.europe-west1.firebasedatabase.app',
});

export const auth = getAuth(app);

export const database = getDatabase(app);

const tasksRef = ref(database, 'tasks');

onValue(tasksRef, (snapshot) => {
  const data = snapshot.val();
  console.info('data', data);
});

setTimeout(() => {
  set(tasksRef, [
    { description: 'test 1', is_complete: false },
    { description: 'test 2', is_complete: false },
    { description: 'test 3', is_complete: false },
  ]).then(() => console.info('done'), console.error);
}, 5000);
