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
      // createCards(myData);
      // createEvents(myData);
      setDropdownFilter(myData);
      setTitleFilter(myData);
      setEventListeners(myData);
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
}
// here  is create card
const createCards = (data) => {
  console.log("data: ", data);
  let divContainer = document.getElementById("card-container");
  divContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "	col-sm-12	col-md-6	col-lg-4 ");
    divCard.classList.add("card");
    divCard.classList.add("border-info");

    //this is for image coding//
    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("alt", "product picture");
    img.classList.add("card-img-top");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-Body");
    //This is for title//
    let h5 = document.createElement("h5");
    cardBody.classList.add("card-title");
    h5.innerHTML = data[i].title;
    // This is for price
    let p = document.createElement("p");
    cardBody.classList.add("card-text");
    p.innerHTML = data[i].price;
    // This is for Discription
    let discrP = document.createElement("p");
    // cardBody.classList.add("card-text");
    discrP.setAttribute("class", "discrP");
    discrP.innerHTML = data[i].description;
    // All Apend child here
    cardBody.appendChild(p);
    cardBody.appendChild(h5);
    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    divContainer.appendChild(divCard);
    cardBody.appendChild(discrP);

    //About show more button//

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
  }
};
// filtering in searchbar
const createEvents = (data) => {
  console.log("data: ", data);
  const filterBar = document.getElementById("filterBar");

  filterBar.addEventListener("input", (e) => {
    // console.log(e.target.value);

    // const filteredData = data.filter((item) => {
    //   return item.title.toUpperCase().includes(e.target.value.toUpperCase());
    // });
    // createCards(filteredData);
    // console.log("filter :>> ", filteredData);
    filterCombined(data);
  });
};

// CONTROL FUNTION
const setEventListeners = (data) => {
  document
    .querySelector("#category-dropdown")
    .addEventListener("change", (e) => {
      console.log(e.target.value);
      // selectItemDropdown(data);
      filterCombined(data);
    });

  document.querySelector("#title-dropdown").addEventListener("change", () => {
    // filterByTitle(data);
    filterCombined(data);
    // console.log(e.target.value);
  });
};
// dropdown slect category
const setDropdownFilter = (data) => {
  const dropDownValue = document.querySelector("#category-dropdown");

  /* created double categories */
  let doubleCategories = [];
  const filteredDouble = data.filter((category) => {
    return doubleCategories.push(category.category);
  });
  /* deleted repeated data */
  let cleanedFilter = [...new Set(doubleCategories)];

  cleanedFilter.forEach((category) => {
    const option = document.createElement("option");
    option.innerText = category.toUpperCase();
    dropDownValue.appendChild(option);
  });
  // displayCardData(cleanedFilter);
};
// filtering in category one of the dropdowns
// const selectItemDropdown = (data) => {
//   const dropdown = document.getElementById("category-dropdown").value;
//   console.log("dropdown: ", dropdown);

//   const categorys = data.filter((category) => {
//     return category.category === dropdown.toLowerCase() || dropdown === "all";
//   });
//   console.log("categorys: ", categorys);
//   createCards(categorys);
// };

// create a funtion in title
const setTitleFilter = (data) => {
  const dropDownValue = document.querySelector("#title-dropdown");

  let repateTitle = [];
  const filterDouble = data.filter((title) => {
    return repateTitle.push(title.title);
  });
  let cleanedData = [...new Set(repateTitle)];
  console.log("cleanedData: ", cleanedData);
  cleanedData.forEach((title) => {
    const option = document.createElement("option");
    option.innerText = title.toUpperCase();
    dropDownValue.appendChild(option);
  });
};
// filtering in title(first here try  doing a single filtering )
// const filterByTitle = (data) => {
//   const dropdown = document.getElementById("title-dropdown").value;
//   // console.log("dropdown:>> ", dropdown.toupperCase());

//   const tiltes = data.filter((title) => {
//     // console.log("title.title: ", title.title === dropdown.toLowerCase());
//     return title.title === dropdown.toLowerCase();
//   });
//   console.log("titles: ", tiltes);
//   createCards(tiltes);
// };
//––––––––––––––––––––––––––––––––––––––––––––––––––
//Here  doing a  combined filtering  with category and serch bar
const filterCombined = (data) => {
  // ––––––THis is to find the value selected in the dropdown–––––
  const dropDownValue = document
    .querySelector("#category-dropdown")
    .value.toLowerCase();
  console.log("dropDownValue :>> ", dropDownValue);
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  // ––––––THis is to find the value that you type in the search bar (it is an input element)–––––
  const filterBarValue = document
    .getElementById("filterBar")
    .value.toUpperCase();
  console.log("filterbar >>>", filterBarValue);
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  // ––––––THis is to find the value selected in the select
  const selectValue = document.getElementById("title-dropdown").value;
  console.log("selectValue:>> ", selectValue);
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  //then with the use of the And operator (&&) , include a third condition in the filters combined: return (dropdown..condition)&&(search bar condition..)&&(select condition)

  const filteredCategoriesResut = data.filter((singleElement) => {
    return (
      singleElement.title.toUpperCase().includes(filterBarValue) &&
      (selectValue === singleElement.title.toUpperCase() ||
        selectValue === "all") &&
      (singleElement.category === dropDownValue || dropDownValue === "all")
    );
  });
  console.log("filteredCategoriesResut :>> ", filteredCategoriesResut);
  createCards(filteredCategoriesResut);
};

myFetch();
