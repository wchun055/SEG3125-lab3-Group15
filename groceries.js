//saveProfile > updateProducts > populateProductList
// selectedItems > getTotalPrice

// Array of products, each product is an object with different fieldset.
// A set of ingredients should be added to products.

var products = [
	{
		name: "lettuce",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/lettuce.jpg",
		price: 1.99,
		category: "vegetable"
		
	},
	{
		name: "whole wheat bread",
		vegetarian: true,
		glutenFree: false,
        organic: false,
		image: "assets/whole-wheat-bread.jpg",
		price: 2.35,
		category: "bakery"
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/salmon.jpg",
		price: 10.00,
		category: "meat"
	},
    {
		name: "ground beef",
		vegetarian: false,
		glutenFree: true,
        organic: false,
		image: "assets/ground-beef.jpg",
		price: 15.49,
		category: "meat"
	},
    {
		name: "potato chips",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		image: "assets/potato-chips.jpg",
		price: 4.30,
		category: "pantry"
	},
    {
		name: "mango",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/mango.png",
		price: 5.00,
		category: "fruit"
	},
    {
		name: "frozen pizza",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		image: "assets/frozen-pizza.jpg",
		price: 4.99,
		category: "bakery"
	},
    {
		name: "tomato",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/tomato.jpg",
		price: 0.99,
		category: "vegetable"
	},
    {
		name: "strawberry",
		vegetarian: true,
		glutenFree: false,
        organic: true,
		image: "assets/strawberry.jpg",
		price: 5.45,
		category: "fruit"
	},
    {
		name: "celery",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/celery.jpg",
		price: 16.00,
		category: "vegetable"
	},
	{
		name: "tropical juice",
		vegetarian: false,
		glutenFree: true,
        organic: false,
		image: "assets/tropical-juice.jpg",
		price: 6.79,
		category: "juice"
	},
	{
		name: "cheese",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/cheese.png",
		price: 3.49,
		category: "dairy"
	}
];

function categoryProducts(category, accesibility){
	categoryProductSet = new Set([]);

	for (let i = 0; i < products.length; i++){
		console.log(products[i], products[i]["category"])
		if (products[i]["category"] == category){
			categoryProductSet.add(products[i]);
		}
	}

	if (accesibility["sortType"] == "lowToHigh"){
		categoryProductSet.sort((a, b) => a.price - b.price);
	}
    else if (accesibility["sortType"] == "highToLow"){
		categoryProductSet.sort((a, b) => b.price - a.price);
	}
	console.log(categoryProductSet)

	return categoryProductSet;
}

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