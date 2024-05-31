import { getDatabase } from 'firebase-admin/database';
import { initializeApp, cert } from 'firebase-admin/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import serviceAccount from './service-account.js';

const firebaseConfig = {
  credential: cert(serviceAccount),
  apiKey: "AIzaSyDnuwnsYlVwFTHP4dL5br735ljkK0T1y6c",
  authDomain: "astrokunj-587a9.firebaseapp.com",
  databaseURL: "https://astrokunj-587a9-default-rtdb.firebaseio.com",
  projectId: "astrokunj-587a9",
  storageBucket: "astrokunj-587a9.appspot.com",
  messagingSenderId: "349953920310",
  appId: "1:349953920310:web:99e96d984f8c8773e5f797",
  measurementId: "G-N9Y9LRXNRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
