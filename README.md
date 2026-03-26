# 🏨 Hotel Management System (MEAN Stack)

A full-stack Hotel Management System built using the **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**.
This application streamlines hotel operations including booking management, user roles, analytics, and notifications.

---

## 🚀 Features

* 🔐 **Authentication & Authorization**

  * JWT-based authentication
  * Role-Based Access Control (Admin, Employee, Manager)

* 🏨 **Hotel Operations**

  * Room booking & management
  * Customer handling
  * Reservation tracking

* 📊 **Dashboard & Analytics**

  * Visual reports using Chart.js
  * Insights on bookings and performance

* 🔍 **Search Functionality**

  * Integrated with Elasticsearch for fast searching

* 📧 **Notifications**

  * Email notifications using EmailJS

* 🔒 **Security**

  * Password encryption using bcrypt

* 🧪 **Testing**

  * Unit testing using Karma (Angular)

* ⚙️ **Environment Setup**

  * Separate configurations for UAT, IT, and Production

---

## 🛠️ Tech Stack

### Frontend

* Angular
* RxJS
* Bootstrap
* Chart.js

### Backend

* Node.js
* Express.js
* MongoDB

### Tools & Libraries

* JWT (Authentication)
* bcrypt (Password Hashing)
* Elasticsearch (Search)
* EmailJS (Email Services)

---

## 📁 Project Structure

```
HMS/
│
├── hotel-backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── setupdb.js
│
├── hotel-frontend/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd HMS
```

---

### 2️⃣ Install Backend Dependencies

```
cd hotel-backend
npm install
```

---

### 3️⃣ Install Frontend Dependencies

```
cd ../hotel-frontend
npm install
```

---

### 4️⃣ Run the Application

#### Start Backend

```
cd hotel-backend
npm start
```

#### Start Frontend

```
cd hotel-frontend
ng serve
```

---

## 🌐 Application URLs

* Frontend: http://localhost:4200
* Backend: http://localhost:3000

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🧪 Running Tests

```
ng test
```

---

## 📌 Key Learnings

* Implemented secure authentication using JWT
* Designed scalable backend with Express & MongoDB
* Integrated third-party tools like Elasticsearch & EmailJS
* Built responsive UI using Angular & Bootstrap
* Learned real-world deployment configurations

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork this repository and submit a pull request.

---

## 📬 Contact

**Raghav Dang**

* LinkedIn: (Add your profile link here)
* Email: (Add your email here)

---

## ⭐ Acknowledgement

This project was developed as part of learning and implementing full-stack development using the MEAN stack.

---

### 🚀 “Push code, not dependencies. Build systems, not just projects.”
