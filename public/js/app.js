const _ = document.querySelector("body");

const btnSearch = _.querySelector("#btn_search");

const msg_1 = _.querySelector("#message_1");
const msg_2 = _.querySelector("#message_2");
const msg_3 = _.querySelector("#message_3");
const icon_weather = document.getElementById("icon_weather");
const list_icon = document.getElementById("list_icon");

fetch("https://puzzle.mead.io/puzzle").then((res) => {
  res.json().then((data) => {});
});

btnSearch.addEventListener("click", () => {
  const valueSearch = _.querySelector("#search");

  fetch(`http://localhost:3005/weather?address=${valueSearch.value}`).then(
    (res) => {
      msg_1.textContent = "Loading..";
      msg_3.textContent = "";
      msg_2.textContent = "";
      list_icon.innerHTML = "";
      res.json().then((data) => {
        if (data.error) {
          msg_1.textContent = data.error;
        } else {
          const ms_1 = data.products.current.weather_descriptions.reduce(
            (a, b) => {
              return a + " " + b;
            },
            ""
          );
          msg_1.textContent = "Thời tiết hôm nay: " + ms_1;
          msg_3.textContent = data.products.location.name;
          msg_2.textContent =
            "Lat: " +
            data.products.location.lat +
            " - Long: " +
            data.products.location.lon;

          data.products.current.weather_icons.forEach((element) => {
            const item = document.createElement("img");
            item.src = element;
            item.alt = element;
            item.classList.add("icon_weather");
            list_icon.appendChild(item);
          });
        }
      });
    }
  );
});
