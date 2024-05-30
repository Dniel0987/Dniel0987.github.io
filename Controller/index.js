import { loginauth } from './firebase.js'; 

document.addEventListener('DOMContentLoaded', function() {
    var loginbtn = document.getElementById('loginbtn');

    loginbtn.addEventListener('click', function() {
        var email = document.getElementById('edtemail').value;
        var password = document.getElementById('edtpassword').value;
        
        if (email === '' || password === '') {
            alert('Por favor, complete todos los campos.');
            return; 
        }

        
        loginauth(email, password)
            .then(() => {
                alert('Inicio de sesión exitoso');
                
            })
            .catch((error) => {
                
                alert('Error al iniciar sesión. Por favor, revisa el usuario y la contraseña.');
            });
    });
});

document.getElementById("signbtn").addEventListener("click", function() {
    window.location.href = "/Templates/registrar.html";
});


