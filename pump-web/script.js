let userMarker = null;
let markers = [];
let selectedStore = null;
let map = null;

const groceryPrices = {
    "noFrills": {
        "Apple (1 kg)": 0.5,
        "Banana (1 kg)": 0.25,
        "White Bread": 2.0,
        "Whole Milk (1L)": 1.5,
        "Large Eggs (dozen)": 1.75,
        "Cheddar Cheese (200g)": 3.0,
        "Chicken Breast (1 kg)": 5.0,
        "Pasta (500g)": 1.0,
        "Rice (1 kg)": 1.25,
        "Cereal (400g)": 2.5,
        "Yogurt (500g)": 1.0,
        "Orange Juice (1L)": 2.2,
        "Carrot (1 kg)": 0.3,
        "Broccoli (1 kg)": 0.75,
        "Potato (1 kg)": 0.4,
        "Onion (1 kg)": 0.35,
        "Tomato (1 kg)": 0.6,
        "Cucumber (1 kg)": 0.5,
        "Spinach (200g)": 1.0,
        "Ground Beef (1 kg)": 4.5,
        "Ribeye Steak (200g)": 12.0,
        "Sirloin Steak (200g)": 10.0,
        "Beef Roast (1 kg)": 9.0,
        "Salmon Fillet (200g)": 7.0,
        "Salt (box)": 0.5,
        "Pepper (box)": 0.6,
        "Garlic (box)": 0.4,
        "Olive Oil (500ml)": 3.0,
        "All-Purpose Flour (1 kg)": 1.2,
        "Granulated Sugar (1 kg)": 1.0,
        "Fresh Rosemary (box)": 0.8,
        "Dried Thyme (box)": 0.7,
        "Dried Oregano (box)": 0.6,
        "Fresh Basil (box)": 0.6,
        "Ground Cumin (box)": 0.5,
        "Paprika (box)": 0.7,
        "Spaghetti Noodles (500g)": 0.8,
        "Fusilli Noodles (500g)": 0.7,
        "Tomato Sauce (680ml)": 1.2,
        "Pasta Sauce (500ml)": 1.5,
        "Soy Sauce (500ml)": 2.0,
        "Honey (500g)": 3.5,
        "Brown Sugar (1 kg)": 1.5,
        "Balsamic Vinegar (250ml)": 4.0,
        "White Wine Vinegar (250ml)": 2.5,
        "Chicken Broth (1L)": 1.8,
        "Beef Broth (1L)": 1.8,
        "Vegetable Broth (1L)": 1.5,
        "Canned Tomatoes (400g)": 1.0,
        "Coconut Milk (400ml)": 1.8,
        "Dried Lentils (500g)": 1.2,
        "Quinoa (500g)": 3.0,
        "Ground Turmeric (box)": 0.5,
        "Cayenne Pepper (box)": 0.6,
        "Cinnamon (box)": 0.7,
        "Nutmeg (box)": 0.8,
        "Vanilla Extract (bottle)": 4.5,
        "Baking Powder (200g)": 1.0,
        "Baking Soda (200g)": 0.8,
        "Cornstarch (200g)": 1.0,
        "Sesame Oil (250ml)": 3.0,
    },
    "FoodBasic": {
        "Apple (1 kg)": 0.6,
        "Banana (1 kg)": 0.3,
        "White Bread": 2.2,
        "Whole Milk (1L)": 1.6,
        "Large Eggs (dozen)": 2.0,
        "Cheddar Cheese (200g)": 3.2,
        "Chicken Breast (1 kg)": 5.5,
        "Pasta (500g)": 1.2,
        "Rice (1 kg)": 1.4,
        "Cereal (400g)": 2.8,
        "Yogurt (500g)": 1.2,
        "Orange Juice (1L)": 2.5,
        "Carrot (1 kg)": 0.35,
        "Broccoli (1 kg)": 0.8,
        "Potato (1 kg)": 0.45,
        "Onion (1 kg)": 0.4,
        "Tomato (1 kg)": 0.65,
        "Cucumber (1 kg)": 0.55,
        "Spinach (200g)": 1.2,
        "Ground Beef (1 kg)": 4.8,
        "Ribeye Steak (200g)": 11.5,
        "Sirloin Steak (200g)": 9.5,
        "Beef Roast (1 kg)": 8.5,
        "Salmon Fillet (200g)": 6.5,
        "Salt (box)": 0.55,
        "Pepper (box)": 0.65,
        "Garlic (box)": 0.45,
        "Olive Oil (500ml)": 3.2,
        "All-Purpose Flour (1 kg)": 1.3,
        "Granulated Sugar (1 kg)": 1.1,
        "Fresh Rosemary (box)": 0.9,
        "Dried Thyme (box)": 0.8,
        "Dried Oregano (box)": 0.7,
        "Fresh Basil (box)": 0.7,
        "Ground Cumin (box)": 0.6,
        "Paprika (box)": 0.8,
        "Spaghetti Noodles (500g)": 0.9,
        "Fusilli Noodles (500g)": 0.8,
        "Tomato Sauce (680ml)": 1.4,
        "Pasta Sauce (500ml)": 1.6,
        "Soy Sauce (500ml)": 2.2,
        "Honey (500g)": 3.7,
        "Brown Sugar (1 kg)": 1.6,
        "Balsamic Vinegar (250ml)": 4.3,
        "White Wine Vinegar (250ml)": 2.7,
        "Chicken Broth (1L)": 2.0,
        "Beef Broth (1L)": 2.0,
        "Vegetable Broth (1L)": 1.7,
        "Canned Tomatoes (400g)": 1.2,
        "Coconut Milk (400ml)": 2.0,
        "Dried Lentils (500g)": 1.4,
        "Quinoa (500g)": 3.2,
        "Ground Turmeric (box)": 0.6,
        "Cayenne Pepper (box)": 0.7,
        "Cinnamon (box)": 0.8,
        "Nutmeg (box)": 0.9,
        "Vanilla Extract (bottle)": 4.8,
        "Baking Powder (200g)": 1.2,
        "Baking Soda (200g)": 0.9,
        "Cornstarch (200g)": 1.2,
        "Sesame Oil (250ml)": 3.2,
    },
    "Fortinos": {
        "Apple (1 kg)": 0.7,
        "Banana (1 kg)": 0.35,
        "White Bread": 2.5,
        "Whole Milk (1L)": 1.8,
        "Large Eggs (dozen)": 2.25,
        "Cheddar Cheese (200g)": 3.5,
        "Chicken Breast (1 kg)": 6.0,
        "Pasta (500g)": 1.25,
        "Rice (1 kg)": 1.6,
        "Cereal (400g)": 3.0,
        "Yogurt (500g)": 1.3,
        "Orange Juice (1L)": 2.8,
        "Carrot (1 kg)": 0.4,
        "Broccoli (1 kg)": 0.9,
        "Potato (1 kg)": 0.5,
        "Onion (1 kg)": 0.45,
        "Tomato (1 kg)": 0.7,
        "Cucumber (1 kg)": 0.6,
        "Spinach (200g)": 1.3,
        "Ground Beef (1 kg)": 5.0,
        "Ribeye Steak (200g)": 12.5,
        "Sirloin Steak (200g)": 10.5,
        "Beef Roast (1 kg)": 9.5,
        "Salmon Fillet (200g)": 7.5,
        "Salt (box)": 0.6,
        "Pepper (box)": 0.7,
        "Garlic (box)": 0.5,
        "Olive Oil (500ml)": 3.5,
        "All-Purpose Flour (1 kg)": 1.4,
        "Granulated Sugar (1 kg)": 1.2,
        "Fresh Rosemary (box)": 1.0,
        "Dried Thyme (box)": 0.9,
        "Dried Oregano (box)": 0.8,
        "Fresh Basil (box)": 0.8,
        "Ground Cumin (box)": 0.7,
        "Paprika (box)": 0.9,
        
        
    }
};


function initMap(latitude, longitude) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const mapContainer = document.getElementById('map');

    loadingSpinner.style.display = 'block';
    mapContainer.style.display = 'none';

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
    });

    const service = new google.maps.places.PlacesService(map);
    const groceryStoreTypes = ['grocery_or_supermarket'];
    const request = {
        location: { lat: latitude, lng: longitude },
        radius: 5000,
        types: groceryStoreTypes,
        name: ['Fortinos', 'No Frills', 'Food Basics'],
    };

    if (userMarker) {
        userMarker.setMap(null);
    }

    userMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Your Location',
    });

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            markers = [];

            for (const place of results) {
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                });

                markers.push(marker);
            }

            loadingSpinner.style.display = 'none';
            mapContainer.style.display = 'block';

            displayStoreList(results);
        }
    });

    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'block';
}

function displayStoreList(storeResults) {
    const storeList = document.getElementById('storeList');
    storeList.innerHTML = '';

    for (const place of storeResults) {
        const storeItem = document.createElement('li');

        const selectedStorePrices = groceryPrices[place.name];
        let totalPrice = 0;
        for (const item in selectedStorePrices) {
            const itemPrice = selectedStorePrices[item];
            totalPrice += itemPrice;
        }

        storeItem.innerHTML = `
            <strong>${place.name} - $${totalPrice.toFixed(2)}</strong><br>
            <button onclick="showStoreDetails('${place.place_id}')">Show Details</button>
        `;

        storeList.appendChild(storeItem);
    }
}

function showStoreDetails(placeId) {
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId: placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            selectedStore = place;

            document.getElementById('selectedStoreName').textContent = place.name;

            const selectedStorePrices = groceryPrices[place.name];
            const itemList = document.getElementById('itemList');
            itemList.innerHTML = '';

            for (const item in selectedStorePrices) {
                const itemPrice = selectedStorePrices[item];
                const itemItem = document.createElement('li');
                itemItem.textContent = `${item}: $${itemPrice.toFixed(2)}`;
                itemList.appendChild(itemItem);
            }
        }
    });
}

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                initMap(latitude, longitude);
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});