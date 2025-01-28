let getColor = document.getElementById("get-btn");
let remColor = document.getElementById("del-btn");
let colorBox = document.getElementById("all-color");
let pickedColor = JSON.parse(localStorage.getItem("Color Codes")) || [];

let activeDroper = async () => {
  try {
    let eyeDroper = new EyeDropper();

    let colorCode = await eyeDroper.open();

    navigator.clipboard.writeText(colorCode.sRGBHex);

    // sending color codes to the array.
    pickedColor.push(colorCode.sRGBHex);

    showColor();

    localStorage.setItem("Color Codes", JSON.stringify(pickedColor));
  } catch (error) {
    alert("Faild to pick any color!");
  }
};

let showColor = () => {
  if (pickedColor.length > 0) {
    colorBox.innerHTML = pickedColor
      .map(
        (color) =>
          `
                    <li>
                        <div>
                            <span style="background-color: ${color}"></span>
                            <p class="copy">${color}</p>
                        </div>
                    </li>
        `
      )
      .join("");

    // Time out event + Clipboard copy Event
    document.querySelectorAll(".copy").forEach((p) => {
      p.addEventListener("click", (e) => {
        let colorText = e.target.innerText;
        navigator.clipboard.writeText(colorText);
        e.target.innerText = "Copied";
        setTimeout(() => {
          e.target.innerText = colorText;
        }, 1000);
      });
    });
  } else {
    colorBox.innerHTML = `
                    <li>
                        <div>
                            <span style="display: none;"></span>
                            <p class="copy">Please Pick a Color First!</p>
                        </div>
                    </li>
        `;
  }
};

showColor();
getColor.addEventListener("click", activeDroper);

remColor.addEventListener("click", () => {
  pickedColor = []; // Clear the array
  localStorage.removeItem("Color Codes"); // Clear localStorage
  showColor();
});
