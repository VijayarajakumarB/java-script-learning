import * as moneyModule from '../js/utils/money.js';


export function getProduct(productId){

   let matchingProduct;

      products.forEach(prodItem => {
          if(prodItem.id === productId){
              matchingProduct = prodItem;
          }
      });

    return matchingProduct;
}


class Products{
    id;
    image;
    name;
    priceCents;
    rating;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.priceCents = productDetails.priceCents;
        this.rating = productDetails.rating;
    }

    getStarsUrl() {
        return `images/ratings/rating-${this.rating.stars * 10}.png`;
    }

    getPrice() {
        return `$${moneyModule.formatCurrency(this.priceCents)}`;
    }

    sizeChartInfoLink(){
      return '';
    }
}


class Clothing extends Products {

    sizeChartLink;

    constructor(productDetails){
      super(productDetails);
      this.sizeChartLink = productDetails.sizeChartLink;
    }

    sizeChartInfoLink(){
      return `
        <a href="images/clothing-size-chart.png" target="_blank">
          Size Chart
        </a>
      `;
    }

}


class Appliance extends Products {

  instructionsLink;
  warrentyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrentyLink = productDetails.warrentyLink;
  }

  sizeChartInfoLink(){
      return `
        <a href="images/appliance-instructions.png" target="_blank">
          Instructions
        </a>
        <a href="images/appliance-warranty.png" target="_blank">
          Warrenty
        </a>
      `;
    }

}

export let products = [];

function loadProductsFetch(){
  fetch('https://supersimplebackend.dev/products').then((response) =>{
    return response.json();
  }).then((data) => {
      products = data.map(productDetails => {
           if(productDetails.type === 'clothing'){
              return new Clothing(productDetails);
            }else if(productDetails.type === 'appliance'){
              return new Appliance(productDetails);
            }else{
              return new Products(productDetails);
            }
      });
  });
}

loadProductsFetch();

export function loadProducts(fun){

  const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', ()=> {
      products = JSON.parse(xhr.response).map((productDetails)=>{
        if(productDetails.type === 'clothing'){
          return new Clothing(productDetails);
        }else if(productDetails.type === 'appliance'){
          return new Appliance(productDetails);
        }else{
          return new Products(productDetails);
        }
      
      });

      console.log('load products success');
      fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();

}