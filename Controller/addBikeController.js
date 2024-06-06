import { authState } from "./app.js";
import { addBikeData, addOwnerBikes } from "./db/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  const bikeIdInput = document.getElementById("bikeId");
  const bikeNameInput = document.getElementById("bikeName");
  const bikePriceByHourInput = document.getElementById("bikePriceByHour");
  const bikePriceByDayInput = document.getElementById("bikePriceByDay");
  const bikePriceByWeekInput = document.getElementById("bikePriceByWeek");
  const bikeImageInput = document.getElementById("bikeImage");
  const bikeDescriptionTextarea = document.getElementById("bikeDescription");
  const bikeMaterialInput = document.getElementById("bikeMaterial");
  const bikeSizeInput = document.getElementById("bikeSize");
  const bikeSuspensionInput = document.getElementById("bikeSuspension");
  const bikeGearsInput = document.getElementById("bikeGears");
  const bikeBreaksInput = document.getElementById("bikeBreaks");
  const saveButton = document.getElementById("save-btn");

  await authState(async (user) => {
    if (user) {
      let userId = user.uid;
      saveButton.addEventListener("click", async () => {
        await addBikeData(
          userId,
          bikeNameInput.value,
          bikePriceByHourInput.value,
          bikePriceByDayInput.value,
          bikePriceByWeekInput.value,
          bikeDescriptionTextarea.value,
          bikeImageInput.value,
          bikeMaterialInput.value,
          bikeSizeInput.value,
          bikeSuspensionInput.value,
          bikeBreaksInput.value,
          bikeGearsInput.value
        ).then(async (e) => {
          console.log(e);
          await addOwnerBikes(userId, e);
          alert("Se agrego la bicicleta");
          window.location.href = "./profile.html";
        });
      });
    } else {
      window.location.href = "../";
    }
  });
});
