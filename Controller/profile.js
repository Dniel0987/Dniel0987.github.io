import { authState, signOutSession } from "./app.js";

document.addEventListener("DOMContentLoaded", async () => {
  const signOutBtn = document.getElementById("signout");
  const adminMenu = document.getElementById("admin-menu");

  await authState(async (user) => {
    if (user) {
      adminMenu.innerHTML = `
                <div class="menu-container">
                    <form class="menu" action="#">
                        <button class="menu-button" type="button" onclick="location.href='usuario.html'">Administrar Productos</button>
                        <button class="menu-button" type="button" onclick="location.href='pedidos.html'">Pedidos Recientes</button>
                        <button class="menu-button" type="button" onclick="location.href='adminperfil.html'">Perfil de Vendedor</button>
                    </form>
                </div>
              `;
    } else {
      window.location.href = "../";
    }

    signOutBtn.addEventListener("click", async () => {
      await signOutSession();
    });
  });
});
