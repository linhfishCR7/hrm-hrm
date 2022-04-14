import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { TOKEN } from '../constants/Config'
import axios from '../utils/axios'

var firebaseConfig = {
  apiKey: 'AIzaSyC1KwPA9bLa89tsiFlmhLnc548bW-Yovfk',
  authDomain: 'fluttershare-1ab94.firebaseapp.com',
  projectId: 'fluttershare-1ab94',
  storageBucket: 'fluttershare-1ab94.appspot.com',
  messagingSenderId: '928337012028',
  appId: '1:928337012028:web:416ebcb578b699ee54ea39',
  measurementId: 'G-FVFJF6FM6F',
}

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

const getTokenFCM = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BCL90hDFViJNkFwrHObVBRWv9a7WP98GFUOkpCKOz2qYW1fWYJZGvBTONVOUm8PrwvBcFGSSe9wItynQJoovc-I',
  })
    .then((currentToken) => {
      if (currentToken) {
        const data = {
          token: currentToken,
          device: '',
          meid: '',
        }
        setTokenFound(true)
        axios
          .post('/auth/me/fcm-device/', data, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`,
            },
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res)
            console.log('OK')
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        console.log('No registration token available. Request permission to generate one.')
        setTokenFound(false)
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
}

export default getTokenFCM
