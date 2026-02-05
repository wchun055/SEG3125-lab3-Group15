// Array of products, each product is an object with different fieldset.
// A set of ingredients should be added to products.

var products = [
	{
		name: "lettuce",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/lettuce.jpg",
		price: 1.99
	},
	{
		name: "whole wheat bread",
		vegetarian: true,
		glutenFree: false,
        organic: false,
		image: "assets/whole-wheat-bread.jpg",
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/salmon.jpg",
		price: 10.00
	},
    {
		name: "ground beef",
		vegetarian: false,
		glutenFree: true,
        organic: false,
		image: "assets/ground-beef.jpg",
		price: 15.49
	},
    {
		name: "potato chips",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		image: "assets/potato-chips.jpg",
		price: 4.30
	},
    {
		name: "mango",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/mango.png",
		price: 5.00
	},
    {
		name: "frozen pizza",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		image: "assets/frozen-pizza.jpg",
		price: 4.99
	},
    {
		name: "tomato",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/tomato.jpg",
		price: 0.99
	},
    {
		name: "strawberry",
		vegetarian: true,
		glutenFree: false,
        organic: true,
		image: "assets/strawberry.jpg",
		price: 5.45
	},
    {
		name: "celery",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/celery.jpg",
		price: 16.00
	}
];

// Creating a product list that adheres to the customer diet/profile.
function updateProducts(diet, accesibility){
	updatedProductSet = new Set([]); // Using a set to avoid duplicate additions.
	updatedProduct = [];
	toCheck = [];

	for (let key in diet){
		if (diet[key] == true){
			toCheck.push(key);
		}
	}

	for (let i = 0; i < products.length; i++){
		for (let j = 0; j < toCheck.length; j++){
			if (products[i][toCheck[j]] == true){
				updatedProductSet.add(products[i]);
			}
			else{
				updatedProductSet.delete(products[i]);
				break;
			}
		}
	}

	if (toCheck.length == 0){ // If the user has no diet restrictions, show all products.
		updatedProductSet = products;
	}

	updatedProduct = Array.from(updatedProductSet);

	if (accesibility["sortType"] == "lowToHigh"){
		updatedProduct.sort((a, b) => a.price - b.price);
	}
    else if (accesibility["sortType"] == "highToLow"){
		updatedProduct.sort((a, b) => b.price - a.price);
	}
	populateProductList(updatedProduct, accesibility) // Populate the HTML with the updated product list.
}

// Calculate the total price of items, with received parameter being a list of products.
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}