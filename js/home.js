import config from "./config.js";
import mixins from "./mixins.js";
import { redirectToDetail } from "./detail.js";

const API_URL = config.API_URL;
const QTY_HOME = config.QTY_HOME;
let previousLastId = 0;
let nextFigureId = 0;

const redirectToHome = () => {
  location.hash = "/home";
};

const renderHome = async () => {
  initStorage();
  previousLastId = 0;
  nextFigureId = mixins.renderPeoleFigures(
    QTY_HOME,
    "grid-container",
    previousLastId
  );
  fetchDataFromServer();

  addHomeListeners();
  mixins.setActiveLink("home-link");
};

const fetchDataFromServer = async () => {
  let users = await mixins
    .reqDataServer(config.USERS_URL)
    .then(console.log("users ready"));
  let photos = await mixins
    .reqDataServer(config.PHOTO_URL)
    .then(console.log("photos ready"));
  let todos = await mixins
    .reqDataServer(config.TODOS_URL)
    .then(console.log("todos ready"));
  formatServerData(users, photos, todos);
};

function formatServerData(users, photos, todos) {
  let newUsers = users.map(user => {
    user.photo = photos.find(photo => photo.id === user.id);
    user.todos = todos.filter(todo => todo.userId === user.id);
    return user;
  });
  sessionStorage.setItem("users", JSON.stringify(newUsers));
  setNewFiguresInfo(newUsers);
}

const reqDataServer = async (qtyCharacters = 1) => {
  let dataFromServer = await mixins.reqDataServer(
    API_URL,
    "?results=" + qtyCharacters
  );
  return dataFromServer;
};

const initStorage = () => {
  sessionStorage.setItem("idToShowDetail", 0);
  sessionStorage.setItem("users", JSON.stringify({}));
  sessionStorage.setItem("personToShowDetail", JSON.stringify({}));
};

const setNewFiguresInfo = users => {
  const [IMG, NAME] = [0, 1];
  users.forEach((user, index) => {
    let figure = mixins.getById(index + previousLastId).children;
    figure[NAME].innerHTML = user.name;
    figure[IMG].src = user.photo.thumbnailUrl;
  });

  previousLastId = nextFigureId;
};

const addHomeListeners = () => {
  const gridContainer = mixins.getById("grid-container");
  gridContainer.addEventListener("click", showUserTodos);
};

const showUserTodos = e => {
  let personIdtoShowDetail = 0;
  if (!isPersonContainer(e)) return;
  sessionStorage.setItem("idToShowDetail", getPersonId(e));
  redirectToDetail();
};

const isPersonContainer = e => {
  const isIt =
    e.target.parentElement.classList.contains("person-container") ||
    e.target.classList.contains("person-container");
  return isIt;
};

const getPersonId = e => {
  if (e.target.classList.contains("person-container"))
    return parseInt(e.target.id);
  else return parseInt(e.target.parentElement.id);
};

export { redirectToHome, renderHome };
