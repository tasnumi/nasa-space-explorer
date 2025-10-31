// Use this URL to fetch NASA APOD JSON data.
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

const fetchButton = document.getElementById("getImageBtn");
const gallery = document.getElementById("gallery");
const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");
const galleryItem = document.querySelectorAll("gallery-item");

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
        let imagesOnly = data.filter((item) => item.media_type === "image" && item.date >= selectFromValue && item.date <= selectToValue);
        imagesOnly.sort((a,b) => new Date(a.date) - new Date(b.date));
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
            <p>${convertDate(image.date)}</p>
            </div>
        `;
    gallery.appendChild(imageCard);
    });
}
function convertDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const day = date.getDate();
    const monthIndex = date.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[monthIndex];
    return `${monthName} ${day}, ${year}`;
}