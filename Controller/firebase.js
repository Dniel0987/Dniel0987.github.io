import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { 

  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'


const firebaseConfig = {
  apiKey: "AIzaSyB_b5IuoGzszEr3zZ1NKXufeA2D0681Rj4",
  authDomain: "apiweb2024-5bcf7.firebaseapp.com",
  projectId: "apiweb2024-5bcf7",
  storageBucket: "apiweb2024-5bcf7.appspot.com",
  messagingSenderId: "400986520256",
  appId: "1:400986520256:web:e149d7ffef6e8bf5c24b25",
  measurementId: "G-7TJE2MBDTY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

//Metodo de Registro de Usario
export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

//Verifacion por correo
export const verification = () =>
  sendEmailVerification(auth.currentUser)

// Metodo de autenticación de usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// Método Inicion Sesion Google
export const googleauth = (provider) =>
  signInWithPopup(auth, provider)

// Método Inicion Sesion Facebook
export const facebookauth = (provider) =>
  signInWithPopup(auth, provider)

// Estado del Usuario logeado
export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      console.log(uid)

    } else {
      window.location.href='../Index.html'
    }
  });
}

//Restablecer contraseña por correo
export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email)

// Cerrar sesion del usuario
export const loginout = () =>
  signOut(auth)


// Eliminar usuario
export const deleteuser = (user) =>
  deleteUser(user);

export { auth }; // Exportar la instancia de autenticación


