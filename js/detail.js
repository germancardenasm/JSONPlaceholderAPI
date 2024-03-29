import mixins from "./mixins.js";
import config from "./config.js";

const redirectToDetail = e => {
  location.hash = "/detail";
};

async function renderDetail() {
  mixins.hideNavbar();
  window.scrollBy({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
  mixins.setActiveLink("detail-link");
  const users = await JSON.parse(sessionStorage.getItem("users"));
  const idToShowDetail = await JSON.parse(
    sessionStorage.getItem("idToShowDetail")
  );
  renderPersonDetail(users[idToShowDetail]);
}

const renderPersonDetail = person => {
  const table = mixins.getById("tbody");
  const photo = mixins.getById("photo");
  const name = mixins.getById("name");
  const email = mixins.getById("email");
  const phone = mixins.getById("phone");
  const labels = {
    email: person.email,
    phone: person.phone
  };
  photo.src = person.photo.url;
  name.textContent = person.name + " - Todos Status";
  email.textContent = person.email;
  phone.textContent = person.phone;
  person.todos.forEach((todo, index) => {
    let row = table.insertRow(index);
    let num = row.insertCell(0);
    let todoTitle = row.insertCell(1);
    let completed = row.insertCell(2);
    num.innerHTML = index;
    todoTitle.innerHTML = todo.title;
    completed.innerHTML =
      todo.completed === true
        ? `<i class="fas fa-check-double green"></i>`
        : `<i class="fas fa-times red"></i>`;
  });
};

export { renderDetail, redirectToDetail };
