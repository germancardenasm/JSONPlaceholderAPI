import { renderHome } from "../js/home.js";

const home = {
  render: async () => {
    let view = `
      <article id="home" >
        <h1 class="main-title">...Title</h1>
        <blockquote class="blockquote px-1 mt-1  text-left">
            <p class="mb-0">
              dont know yet </p>
        </blockquote>
        <section id="grid-container" class="grid-container">  
        </section>
      </article>
      `;
    return view;
  },
  after_render: async () => {
    renderHome();
  }
};

export default home;
