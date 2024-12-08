
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCaLQ76xhAgrNc-ADZTA1Bjht5jzM8QJUQ",
  authDomain: "restarantappfilerepo.firebaseapp.com",
  projectId: "restarantappfilerepo",
  storageBucket: "restarantappfilerepo.appspot.com",
  messagingSenderId: "483203995591",
  appId: "1:483203995591:web:022cb265ea4b786461ebe2",
  measurementId: "G-600LKXC33L"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app)


















// import { initializeApp , getApps} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyCaLQ76xhAgrNc-ADZTA1Bjht5jzM8QJUQ",
//   authDomain: "restarantappfilerepo.firebaseapp.com",
//   projectId: "restarantappfilerepo",
//   storageBucket: "restarantappfilerepo.appspot.com",
//   messagingSenderId: "483203995591",
//   appId: "1:483203995591:web:022cb265ea4b786461ebe2",
//   measurementId: "G-600LKXC33L"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const imageDb = getStorage(app)

