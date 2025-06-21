# Way UA 🌍

**Way UA** is a travel assistant web application designed for planning safe and exciting trips across Ukraine. Users can create detailed travel routes, explore landmarks, receive weather forecasts, and earn achievements.

---

## 🚀 Features 

- 🗺️ **Interactive Travel Planner** – step-by-step route creation based on dates, weather, hotel, and attractions.
- ⛅ **Weather Forecast** – weather for the planned trip based on OpenWeather API.
- 🏨 **Hotel and Landmark Suggestions** – via Google Places API.
- 🧠 **AI-based Itinerary Generation** – OpenAI helps generate a daily travel plan.
- 📄 **Export to PDF** – export routes in downloadable format.
- 🧳 **User Dashboard** – track past routes.
- 🌒 **Dark Mode Support**
- ✨ **Nature-themed UI** – design reflects nature and national style.

---

## 🧰 Tech Stack

### Frontend
- React
- React Router
- Context API 
- CSS Modules
- i18next (multilingual support)
- axios
- html2pdf

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Auth
- RESTful API
- axios
- bcrypt
- express-validator
- nodemailer

### External APIs

- Google Places API
- OpenWeather API
- OpenAI API

---

## 📸 Screenshots & Illustrations



---

## ⚙️ Installation

### 1. Clone the repository:

```
git clone https://github.com/TsNikolay/way-ua.git
cd way-ua
```

### 2. Install dependencies

 Frontend:
```
cd frontend
npm install --legacy-peer-deps
```

 Backend:
```
cd ../backend
npm install --legacy-peer-deps
```

### 3. Create environment variables

Set your API keys and DB connection in `.env` in the root of the backend:

```env
# Server
PORT=5000

# Database
DATABASE_URL=your_postgresql_connection_string

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=30d

# Mail (for account activation)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password

# API endpoints
API_URL=http://localhost:5000/api/v1
CLIENT_URL=http://localhost:3000

# External APIs
OPENAI_API_KEY=your_openai_api_key
GOOGLE_MAPS_API_KEY_SERVER=your_google_maps_key
OPEN_WEATHER_API_KEY=your_openweather_key

```

Create a .env file in the root of the frontend directory with the following variables
```
REACT_APP_GOOGLE_API_KEY=your_browser_google_maps_api_key
REACT_APP_API_URL=http://localhost:5000/api/v1
```
⚠️ Important Security Notice:
The REACT_APP_GOOGLE_API_KEY is exposed in the browser.
To prevent abuse or quota exhaustion, make sure to restrict the key in your Google Cloud Console to allow requests only from your own frontend domain (e.g., http://localhost:3000 or your deployed production domain).

---

## ▶️ Usage

### 0. Initialize the Database
Before initializing tables, make sure the database itself exists. You can create it using psql or any database GUI (like pgAdmin).
```
# Example command (replace with your own user/password)
psql -U postgres -c "CREATE DATABASE way_ua;"
```

Then initialize the tables:

```
cd backend
npm run db:init
```

### 1. Start the backend

```
cd backend
npm run dev
```

### 2. Start the frontend

```
cd ../frontend
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000)

---

## 📄 License

This project is licensed under the MIT License.