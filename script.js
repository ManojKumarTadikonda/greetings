const images = {
  Christmas: [
    'images/christmas1.jpg',
    'images/christmas2.jpg',
    'images/christmas3.jpg',
    'images/christmas4.jpg',
    'images/christmas5.jpg',
  ],
  "New Year": [
    'images/newyear1.jpg',
    'images/newyear2.jpg',
    'images/newyear3.jpg',
    'images/newyear4.jpg',
    'images/newyear5.jpg',
  ],
  Pongal: [
    'images/pongal1.jpg',
    'images/pongal2.jpg',
    'images/pongal3.jpg',
    'images/pongal4.jpg',
    'images/pongal5.jpg',
  ],
};

function showPopup(greetingType) {
  const popup = document.getElementById("popup");
  const title = document.getElementById("popup-title");
  const message = document.getElementById("popup-message");
  const imageSelection = document.getElementById("image-selection");

  title.textContent = `${greetingType} Greetings!`;
  message.textContent = `Send your warm wishes for ${greetingType} to your loved ones.`;

  imageSelection.innerHTML = ''; // Clear the container

  images[greetingType].forEach((imageSrc, index) => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `${greetingType} Image ${index + 1}`;
    img.className = 'greeting-image';
    img.onclick = () => selectImage(imageSrc);
    imageSelection.appendChild(img);
  });

  popup.style.display = "flex";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function selectImage(imageSrc) {
  const selectedImageInput = document.getElementById('selectedImage');
  selectedImageInput.value = imageSrc;

  const allImages = document.querySelectorAll('.greeting-image');
  allImages.forEach(img => img.classList.remove('selected'));

  const selectedImage = Array.from(allImages).find(img => img.src.includes(imageSrc));
  selectedImage?.classList.add('selected');
}

function sendGreeting(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const description = document.getElementById("description").value;
  const greetingTitle = document.getElementById("popup-title").textContent.replace(" Greetings!", "");
  const selectedImage = document.getElementById("selectedImage").value;

  if (!selectedImage) {
    alert("Please select an image before sending!");
    return;
  }

  fetch("http://localhost:5000/api/greetings/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipientEmail: email,
      greetingType: greetingTitle,
      customMessage: description,
      selectedImage,
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message || "Greeting sent successfully!");
      closePopup();
    })
    .catch(err => {
      alert("Failed to send greeting.");
      console.error(err);
    });
}
