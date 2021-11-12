'use strict';
let options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 0
};

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            displayLocation,
            displayError,
            options);
    } else {
        alert('Oops, no geolocation support');
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let div = document.getElementById('location');

    div.innerHTML = `You are at latitude: ${latitude}, longitude: ${longitude} found in ${options.timeout} milliseconds`;
}

function displayError(error) {
    const errorTypes = {
        0: 'Unknown error',
        1: 'Permission denied',
        2: 'Position is not available',
        3: 'Request timeout'
    };

    let errorMessage = errorTypes[error.code];
    let div = document.getElementById('location');

    if (error.code === 0 || error.code === 2) {
        errorMessage += error.message;
    }

    div.innerHTML = errorMessage;

    if (error.code === 1) {
        return;
    }

    options.timeout += 100;

    if (options.timeout > 5000) {
        return;
    } else {
        navigator.geolocation.getCurrentPosition(
            displayLocation,
            displayError,
            options);

        div.innerHTML += `... checking again with timeout = ${options.timeout}`;
    }
}