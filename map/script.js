let userMarker = null;
let markers = [];
let selectedStore = null;
let map = null;

const groceryPrices = {
    "noFrills": {
        "Apple": 0.5,
        "Banana": 0.25,
        "Bread": 2.0,
        "Milk": 1.5,
        "Eggs": 1.75,
        "Cheese": 3.0,
        "Chicken Breast": 5.0,
        "Pasta": 1.0,
        "Rice": 1.25,
        "Cereal": 2.5,
        "Yogurt": 1.0,
        "Orange Juice": 2.2,
        "Carrot": 0.3,
        "Broccoli": 0.75,
        "Potato": 0.4,
        "Onion": 0.35,
        "Tomato": 0.6,
        "Cucumber": 0.5,
        "Spinach": 1.0,
        "Ground Beef": 4.5,
        "Salmon": 7.0,
        "Salt": 0.5,
        "Pepper": 0.6,
        "Garlic": 0.4,
        "Olive Oil": 3.0,
        "Flour": 1.2,
        "Sugar": 1.0,
        "Rosemary": 0.8,
        "Thyme": 0.7,
        "Oregano": 0.6,
        "Basil": 0.6,
        "Cumin": 0.5,
        "Paprika": 0.7
    },
    "FoodBasic": {
        "Apple": 0.6,
        "Banana": 0.3,
        "Bread": 2.2,
        "Milk": 1.6,
        "Eggs": 2.0,
        "Cheese": 3.2,
        "Chicken Breast": 5.5,
        "Pasta": 1.2,
        "Rice": 1.4,
        "Cereal": 2.8,
        "Yogurt": 1.2,
        "Orange Juice": 2.5,
        "Carrot": 0.35,
        "Broccoli": 0.8,
        "Potato": 0.45,
        "Onion": 0.4,
        "Tomato": 0.65,
        "Cucumber": 0.55,
        "Spinach": 1.2,
        "Ground Beef": 4.8,
        "Salmon": 6.5,
        "Salt": 0.55,
        "Pepper": 0.65,
        "Garlic": 0.45,
        "Olive Oil": 3.2,
        "Flour": 1.3,
        "Sugar": 1.1,
        "Rosemary": 0.9,
        "Thyme": 0.8,
        "Oregano": 0.7,
        "Basil": 0.7,
        "Cumin": 0.6,
        "Paprika": 0.8
    },
    "Fortinos": {
        "Apple": 0.7,
        "Banana": 0.35,
        "Bread": 2.5,
        "Milk": 1.8,
        "Eggs": 2.25,
        "Cheese": 3.5,
        "Chicken Breast": 6.0,
        "Pasta": 1.25,
        "Rice": 1.6,
        "Cereal": 3.0,
        "Yogurt": 1.3,
        "Orange Juice": 2.8,
        "Carrot": 0.4,
        "Broccoli": 0.9,
        "Potato": 0.5,
        "Onion": 0.45,
        "Tomato": 0.7,
        "Cucumber": 0.6,
        "Spinach": 1.3,
        "Ground Beef": 5.0,
        "Salmon": 7.5,
        "Salt": 0.6,
        "Pepper": 0.7,
        "Garlic": 0.5,
        "Olive Oil": 3.5,
        "Flour": 1.4,
        "Sugar": 1.2,
        "Rosemary": 1.0,
        "Thyme": 0.9,
        "Oregano": 0.8,
        "Basil": 0.8,
        "Cumin": 0.7,
        "Paprika": 0.9
    },
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