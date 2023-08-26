// Initialize fridge data
let fridgeItems = [];

// DOM elements
const itemNameInput = document.getElementById('itemName');
const itemQuantityInput = document.getElementById('itemQuantity');
const addItemButton = document.getElementById('addItemButton');
const fridgeList = document.getElementById('fridgeList');

// Add item to fridge
function addItem(name, quantity) {
    fridgeItems.push({ name, quantity });
    displayFridgeItems();
}

// Delete item from fridge
function deleteItem(itemIndex) {
    fridgeItems.splice(itemIndex, 1);
    displayFridgeItems();
}

// Display fridge items on the UI
function displayFridgeItems() {
    fridgeList.innerHTML = '';
    for (let i = 0; i < fridgeItems.length; i++) {
        const item = fridgeItems[i];
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} grams`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(i));
        listItem.appendChild(deleteButton);
        fridgeList.appendChild(listItem);
    }
}

// Add item button click handler
addItemButton.addEventListener('click', () => {
    const itemName = itemNameInput.value.trim();
    const itemQuantity = parseInt(itemQuantityInput.value);

    // Basic validation
    if (itemName && itemQuantity > 0) {
        addItem(itemName, itemQuantity);
        itemNameInput.value = '';
        itemQuantityInput.value = '';
    }
});

// Initial display of fridge items
displayFridgeItems();
