import { registerauth, verification } from './firebase.js';

const save_auth = document.getElementById('rgsbtn');

async function register() {
    const email = document.getElementById('email').value;
    const email2 = document.getElementById('email2').value;
    const psw = document.getElementById('password').value;
    const psw2 = document.getElementById('password2').value;

    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail|hotmail)\.com$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido de Gmail o Hotmail.');
        return;
    }

    if (email !== email2) {
        alert('Los correos electrónicos no coinciden.');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_;.+-])[A-Za-z\d!@#$%^&*()_+-]{8,}$/;;
    if (!passwordRegex.test(psw)) {
        alert('La contraseña debe contener al menos 8 caracteres con una combinación de 1 letra mayúscula y 1 letra minúscula, números y un caracter especial.');
        return;
    }

    if (psw !== psw2) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        const verificar = await registerauth(email, psw);
        verification()
        alert('Registro exitoso para ' + email);
        alert('¡Correo de Verificacion enviado al usuario!')
        const user = verificar.user; 
        window.location.href = "/Index.html";
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert('Usuario en uso. Por favor, cámbielo.');
        } else {
            alert('Registro no exitoso');
        }
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    save_auth.addEventListener('click', register);
});

document.getElementById("exitbtn").addEventListener("click", function() {
    window.location.href = "/Index.html";
});



