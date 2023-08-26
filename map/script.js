let userMarker = null;
let markers = []; // Array to store all markers for grocery stores
let selectedStore = null;
let map = null;

function initMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 14
    });

    const service = new google.maps.places.PlacesService(map);
    const groceryStoreTypes = ['grocery_or_supermarket'];
    const request = {
        location: { lat: latitude, lng: longitude },
        radius: 5000,
        types: groceryStoreTypes,
        name: ['Fortinos', 'No Frills', 'Food Basics']
    };

    if (userMarker) {
        userMarker.setMap(null); // Remove previous user marker if exists
    }

    userMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        icon: 'path-to-your-custom-marker-icon.png', // Replace with the path to your custom marker icon
        title: 'Your Location'
    });

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            markers.forEach(marker => {
                marker.setMap(null); // Clear previous store markers
            });
            markers = []; // Clear markers array

            for (const place of results) {
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name
                });

                markers.push(marker); // Add marker to the markers array
            }

            // Display store list in the sidebar
            displayStoreList(results);
        }
    });

    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'block';
}

function displayStoreList(storeResults) {
    const storeList = document.getElementById('storeList');
    storeList.innerHTML = ''; // Clear previous list

    for (const place of storeResults) {
        const storeItem = document.createElement('li');

        storeItem.innerHTML = `
            <strong>${place.name}</strong><br>
            <button onclick="showStoreDetails('${place.place_id}')">Show Details</button>
        `;

        storeList.appendChild(storeItem);
    }
}

function showStoreDetails(placeId) {
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(
        { placeId: placeId },
        (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                selectedStore = place;

                document.getElementById('selectedStoreName').textContent = place.name;

                const distance = google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(userMarker.getPosition().lat(), userMarker.getPosition().lng()),
                    place.geometry.location
                );
                const walkingTime = Math.round((distance / 80) * 60); // Walking speed: 80 m/minute
                const drivingTime = Math.round((distance / 400) * 60); // Driving speed: 400 m/minute
                const transitTime = Math.round((distance / 300) * 60); // Transit speed: 300 m/minute

                document.getElementById('selectedStoreWalkingTime').textContent = `Walking Time: ${walkingTime} minutes`;
                document.getElementById('selectedStoreDrivingTime').textContent = `Driving Time: ${drivingTime} minutes`;
                document.getElementById('selectedStoreTransitTime').textContent = `Transit Time: ${transitTime} minutes`;

                document.getElementById('getDirections').disabled = false;
            }
        }
    );
}

// Automatically find nearby stores when the page loads
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
