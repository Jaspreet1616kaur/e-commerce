/* search bar */

//const category = Document.getElementById("category");

/* ASYNC FUNCTION FETCH */
function myFetch() {
  fetch("https://fakestoreapi.com/products")
    .then((apidata) => {
      console.log(apidata);
      return apidata.json();
    })
    .then((actualData) => {
      const myData = actualData;
      console.log(myData);
      // function call is : nameOfTheFunction()   , if there is some information inside the () it is called a parameter. nameOfTheFunction(paremert, paretemer2)
      createCards(myData);
      createEvents(myData);
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
}

const createCards = (data) => {
  console.log("data: ", data);
  let divContainer = document.getElementById("card-container");
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    divContainer.innerHTML = "";
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "	col-sm-12	col-md-6	col-lg-4");
    divCard.classList.add("card");
    divCard.classList.add("border-info");

    //this is for image coding//
    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);

    img.setAttribute("alt", "product picture");

    img.classList.add("card-img-top");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-Body");
    //this is for title//
    let h5 = document.createElement("h5");
    cardBody.classList.add("card-title");
    h5.innerHTML = data[i].title;

    let p = document.createElement("p");
    cardBody.classList.add("card-text");
    p.innerHTML = data[i].price;
    cardBody.appendChild(p);
    cardBody.appendChild(h5);
    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    divContainer.appendChild(divCard);

    let discrP = document.createElement("p");
    // cardBody.classList.add("card-text");
    discrP.setAttribute("class", "discrP");
    discrP.innerHTML = data[i].description;
    cardBody.appendChild(discrP);

    //about show more button//

    let moreButton = document.createElement("button");
    moreButton.innerText = "show more";
    moreButton.setAttribute("class", "btn btn-primary");
    moreButton.setAttribute("type", "button");
    let rate = document.createElement("p");

    rate.innerHTML = data[i].rating.rate;
    cardBody.appendChild(rate);

    let paragraph = document.querySelector(".card-Body .discrP");
    cardBody.appendChild(moreButton);

    moreButton.addEventListener("click", () => {
      console.log("test");
      discrP.classList.toggle("moreText");
    });
    // const displayData = (id) => {
    //   const search = document.getElementById("search");
    //   search.classList.remove.add("form-control me-2");

    //   const container = document.getElementById("card-container");
    //   container.classList.remove("card-container");
    // };
  }
};
/*about card*/
// console.log(data);
/*about serach bar filtering
 */

const createEvents = (data) => {
  console.log("data: ", data);
  const filterBar = document.getElementById("filterBar");
  console.log(filterBar);

  filterBar.addEventListener("input", (e) => {
    console.log(e.target.value);

    const filteredData = data.filter((item) => {
      return item.title.toUpperCase().includes(e.target.value.toUpperCase());
    });
    createCards(filteredData);
    console.log("filter :>> ", filteredData);
  });
};

myFetch();
