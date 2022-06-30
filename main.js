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
    });
}

// const myFunction = (myData) => {
//   console.log("myData :>> ", myData);
// };

const createCards = (data) => {
  let divContainer = document.getElementById("card-container");
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
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
    // let divCollapseContainer = document.createElement("div");
    // divCollapseContainer.classList.add("collapse");
    // divCollapseContainer.setAttribute("id", "collapseExampl");
    // cardBody.appendChild(divCollapseContainer);

    // let toggleDiv = document.createElement("card-Body");
    // toggleDiv.setAttribute("id", "toggleDiv");
    // toggleDiv.classList.add("p");
    // cardBody.appendChild(toggleDiv);
  }
};

/*about card*/
// console.log(data);
myFetch();
