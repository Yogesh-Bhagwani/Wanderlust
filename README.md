# 🌍 Wanderlust - Hotel Management App

Wanderlust is a full-stack hotel management application that allows users to explore hotels, register/login securely, post reviews, and manage listings. Built with **Node.js**, **Express**, **MongoDB**, and **EJS templating**, it delivers a dynamic and responsive experience for both travelers and hotel managers.

## 🔗 Live Demo

🌐 [View Deployed App on Render](https://wanderlust-9bua.onrender.com)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Templating Engine**: EJS (Embedded JavaScript)
- **Authentication**: Passport.js (Local Strategy)
- **Authorization**: JSON Web Tokens (JWT)
- **UI/Styling**: Bootstrap, Custom CSS
- **Others**: Express-session, Connect-flash, Method-override, Cloudinary (for image storage)

## ✨ Features

- ✅ User authentication (Register/Login/Logout)
- ✅ Hotel listing creation and management
- ✅ Review system with CRUD
- ✅ Secure sessions with flash messages
- ✅ Responsive UI using Bootstrap
- ✅ Image upload via Cloudinary
- ✅ MongoDB Atlas as database

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account
- Cloudinary account

### Clone the Repository

```bash
git clone https://github.com/Yogesh-Bhagwani/Wanderlust.git
cd Wanderlust
npm install
```

## Set up Environment Variables
Create a .env file in the root directory and add the following:

- CLOUD_NAME=your_cloud_name
- CLOUD_API_KEY=your_cloudinary_key
- CLOUD_API_SECRET=your_cloudinary_secret
- MAP_TOKEN=your_mapbox_token
- ATLASDB_URL=your_mongodb_atlas_connection_string

## Run the App
```bash
node app.js
```

## 🤝 Contributing
Contributions are welcome! If you find a bug or have suggestions, feel free to open an issue or PR.


