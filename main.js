// This function is called when any of the tab is clicked.
// https://www.w3schools.com/howto/howto_js_tabs.asp
function openInfo(evt, tabName) {
	// Get all elements with class="tabcontent" and hide them.
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active".
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab.
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}
	
// This function is called when the "Add selected items to cart" button in clicked.
// The purpose is to build the HTML to be displayed (a Paragraph).
// We build a paragraph to contain the list of selected items, and the total price.
function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// Build list of selected item.
	var para = document.createElement("P");
	var cartCount = 1; // Used to number the items in the shopping cart.

	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(cartCount + " : " + ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
			cartCount++;
		}
	}
		
	// Add paragraph and total price.
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price: $" + getTotalPrice(chosenProducts).toFixed(2)));
		
}

// Update the product tab HTML to have the correct products only.
function populateProductList(prodList, accesibility){
    var displayProduct = document.getElementById("displayProduct");
    displayProduct.innerHTML = "";
		
	for (const item of prodList){
		var productName = item["name"];
		var checkbox = document.createElement("input");

		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;

		displayProduct.appendChild(checkbox);
		
		if (accesibility["image"] == true){ // If the image setting is selected, replace labels with images.
			var imageLabel = document.createElement('img');
			
			imageLabel.style.backgroundImage = "url(" + item["image"] + ")";

			var label = document.createElement('label')
			label.textContent = ("$" + item["price"].toFixed(2));
			
			if (accesibility["largeFont"] == true){ // If the large font setting is selected, ensure labels have large font size.
				label.style.fontSize = "20pt";
			}

			var br = document.createElement("br");
			br.style.marginBottom = "50pt"; // To ensure that multiple images are not stuck together we add some margin space per product option.

			displayProduct.appendChild(imageLabel);
			displayProduct.appendChild(label);
			displayProduct.appendChild(br);   
		}

		else{
			var label = document.createElement('label')
			
			if (accesibility["largeFont"] == true){ // If the large font setting is selected, ensure labels have large font size.
				label.style.fontSize = "20pt";
			}

			label.htmlFor = productName;
			label.appendChild(document.createTextNode(productName + " | $" + item["price"].toFixed(2))); // Prints product name and price, makes sure there are two decimals for price.

			displayProduct.appendChild(label);
			displayProduct.appendChild(document.createElement("br"));    
		}
	}
}

// Check which choices were made on profile.
// Have a diet list and a accesibility list.
function saveProfile(){
    event.preventDefault();

	const veggieCheck = document.getElementById("veggieCheck");
	const glutenCheck = document.getElementById("glutenCheck");
	const organicCheck = document.getElementById("organicCheck");
	const fontCheck = document.getElementById("fontCheckL");
	const imageCheck = document.getElementById("imageCheck");

	var diet = {
		vegetarian : false,
		glutenFree : false,
		organic : false,
	};

	var accesibility = {
		largeFont : false,
		image : false,
		sortLow : false
	}

	if (veggieCheck.checked){
		diet["vegetarian"] = true;
	}

	if (glutenCheck.checked){
		diet["glutenFree"] = true;
	}

	if (organicCheck.checked){
		diet["organic"] = true;
	}

	if (fontCheck.checked){
		accesibility["largeFont"] = true;
	}

	if (imageCheck.checked){
		accesibility["image"] = true;
	}

	if (sortLow.checked){
		accesibility["sortLow"] = true;
	}

	// Call with our specific diet list to update the product list.
	//updateProducts() is done in the groceries.js file.
	updateProducts(diet, accesibility);
}

//When the customer submits their profile, we begin updating their product list.
document.getElementById("customerSubmit").addEventListener("click", saveProfile); 
