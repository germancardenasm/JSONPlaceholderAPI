import { renderDetail } from "../js/detail.js";

const detail = {
  render: async () => {
    let view = `
          
          <div class="detail px-3" id="detail">
            <div class="detail-header p-2 p-sm-4 d-flex flex-column sticky-top">
              <h2 class=" my-0 pr-1 text-capitalize" id="name"></h1>
              <span class="  my-0 pr-1 text-capitalize" id="email"></span>
              <span class=" my-0 pr-1 text-capitalize" id="phone"></span>
            </div>
            <div class="detail-container container-fluid mx-0 px-2 d-flex flex-column "> 
              <div id="photo-container"  class="photo-container my-4">
                <img id="photo" class="photo" src="../img/dummyImg.png" alt="" />
              </div>
              <div id="info-container" class="info-container ml-2 my-sm-4">
                <table id="table-info" class="table table-responsive table-striped table-dark text-capitalize">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Todo</th>
                      <th scope="col">Completed</th>
                    </tr>               
                  </thead>
                  <tbody id="tbody">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
    return view;
  },
  after_render: async () => {
    renderDetail();
  }
};

export default detail;
