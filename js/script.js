// Use this URL to fetch NASA APOD JSON data.
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

const fetchButton = document.getElementById("getImageBtn");
const gallery = document.getElementById("gallery");
const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");


fetchButton.addEventListener("click", fetchImages);

async function fetchImages() {
    const selectFromValue = selectFrom.value;
    const selectToValue = selectTo.value;
    console.log(selectFromValue);
    console.log(selectToValue);

    try {
        const response = await fetch(apodData);
        const data = await response.json();
        console.log(data);
        const imagesOnly = data.filter((item) => item.media_type === "image" && item.date >= selectFromValue && item.date <= selectToValue);
        displayImages(imagesOnly.slice(0,9));
    }
    catch (error){
        console.error("Error fetching images:", error);
        gallery.innerHTML = "<p>Failed to fetch images. Please try again later.</p>";
    }
}

function displayImages(images) {
    gallery.innerHTML = '';

    images.forEach((image) => {
        const imageCard = document.createElement('div');
        imageCard.classList.add("gallery-item");

        imageCard.innerHTML = `
            <img src="${image.url}" alt="${image.title}" class="apod-image">
            <div class="info">
            <h3>${image.title}</h3>
            <p>${image.date}</p>
            </div>
        `;
    gallery.appendChild(imageCard);
    });
}