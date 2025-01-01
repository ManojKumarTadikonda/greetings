# Greetings Sender Application

This project is a web-based application that allows users to send greetings to their loved ones via email with personalized messages and selected images.

## Features
- Send greetings for Christmas, New Year, and Pongal.
- Select from a variety of beautiful images for each greeting type.
- Add a custom message to personalize the greeting.
- Backend handles email sending via Nodemailer and saves greeting data to MongoDB.

---

## Prerequisites
Make sure you have the following installed on your system:
1. **Node.js**
2. **npm (Node Package Manager)**
3. **MongoDB** (Local or Cloud instance like MongoDB Atlas)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. MongoDB Connection
Ensure MongoDB is running locally or provide a connection string for your MongoDB instance.
1. Open the `.env` file.
2. Add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/<your-database-name>
   ```
3. Save the file.

### 4. Configure Email Credentials
1. Open the `.env` file.
2. Add your email and app password for Nodemailer:
   ```env
   EMAIL_ADDRESS=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```
3. Update the email credentials in `/routes/greetings.js` to match your `.env` file:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_ADDRESS,
       pass: process.env.EMAIL_PASSWORD,
     },
   });
   ```

---

## Running the Application

### 1. Start the Backend Server
```bash
npm start
```
The server will start at `http://localhost:5000`.

### 2. Open the Application
Access the frontend by opening `index.html` in your browser or by serving it with a local web server.

---

## Usage
1. Navigate to the application in your browser.
2. Select a greeting type (e.g., Christmas, New Year, Pongal).
3. Choose an image and enter the recipient's email along with your custom message.
4. Click **Send Greeting**.
5. The email will be sent to the recipient, and the data will be stored in the MongoDB database.

---

## Project Structure
```plaintext
project/
├── public/
│   ├── images/             # Greeting images
│   ├── style.css           # Frontend styling
├── backend/
│   ├── routes/
│   │   ├── greetings.js    # Backend API routes
│   ├── models/
│   │   ├── Greetings.js    # MongoDB schema for greetings
│   ├── server.js           # Main server file
├── index.html              # Main frontend page
├── script.js               # Frontend logic
├── README.md               # Project documentation
├── .env                    # Environment variables
```

---

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally.
- Verify the connection string in the `.env` file is correct.

### Email Sending Issues
- Check that your email and app password in `.env` and `/routes/greetings.js` are correct.
- Ensure "Allow less secure apps" or "App Password" is enabled in your email account settings.

---

## Contributing
Feel free to fork the project and submit pull requests for enhancements or bug fixes.

---

## License
This project is open source and available under the [MIT License](LICENSE).

