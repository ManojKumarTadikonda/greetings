function showPopup(greetingType) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    const message = document.getElementById('popup-message');
  
    title.textContent = `${greetingType} Greetings!`;
    message.textContent = `Send your warm wishes for ${greetingType} to your loved ones.`;
  
    popup.style.display = 'flex';
  }
  
  function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
  }
  
  function sendGreeting(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;
    const greetingTitle = document.getElementById('popup-title').textContent;
    fetch('http://localhost:5000/api/greetings/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientEmail: email,
        greetingType: greetingTitle,
        customMessage: description,
      }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message || 'Greeting sent successfully!');
        closePopup();
      })
      .catch(err => {
        alert('Failed to send greeting.');
        console.error(err);
      });
    closePopup();
  }
  