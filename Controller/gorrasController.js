import { authState } from "./app.js";
import {
  deleteDocument,
  deleteDocumentFromOwner,
  getBikeById,
  getOwnerBikes,
} from "./db/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  const ownerBikes = document.getElementById("owner-bikes");

  await authState(async (user) => {
    try {
      await getOwnerBikes(user.uid)
        .then((result) => {
          const bikes = result.docs.map((doc) => doc.data());
          console.log(bikes);
          bikes.forEach(async (bike) => {
            const bikeId = bike.bikeId;
            await getBikeById(bikeId).then((bikeResult) => {
              //console.log(bikeResult);
              let bikeData = bikeResult.data();
              if (bikeData) {
                const row = document.createElement("tr");
                console.log(bikeData);
                row.innerHTML = `
                        <td>${bikeId}</td>
                        <td>${bikeData.bikeName}</td>
                        <td>${bikeData.pricePerHour}</td>
                        <td><img src="${bikeData.picture}" alt="${bikeData.bikeName}"></td>
                        <td>${bikeData.description}</td>
                        <td class="actions">
                            <button class="update" data-id="${bikeId}">Editar</button>
                            <button class="delete delete-btn" data-id="${bikeId}">Eliminar</button>
                        </td>
                    `;
                ownerBikes.appendChild(row);
              }
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      const row = document.createElement("tr");
      row.innerHTML = `<h3>No hay gorras</h3>`;
      ownerBikes.appendChild(row);
    }
    console.log(user.uid)

    ownerBikes.addEventListener("click", async (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        console.log(id)
        await deleteDocument(id).then(() => {
          alert("Se elimino de mundigorras");
        });
        await deleteDocumentFromOwner(user.uid, id).then(() => {
          alert("Se elimino de owner");
          window.location.reload();
        });
      }
    });
    
  });

  document.getElementById("addBikeButton").addEventListener("click", () => {
    window.location.href = "./formulario.html";
  });
});
