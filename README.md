# JobHints

JobHints is a job marketplace platform designed to connect **job seekers, employers, and skilled artisans** in one platform. It allows applicants to discover job opportunities, employers to post and manage jobs, and users to explore available artisans and services.

## 🚀 Features

### Applicants / Job Seekers

- Create an account and log in
- Browse available jobs
- Search for jobs
- View job details
- Apply for jobs
- Save jobs
- View applications
- Manage profile and settings
- Receive notifications and messages

### Employers

- Create an employer account
- Access an employer dashboard
- Post job opportunities
- Manage posted jobs
- View applicants
- Manage employer profile and settings

### Artisans

- Browse available artisans
- View artisan profiles
- Explore different service categories
- Contact or hire artisans through the platform

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- React Router
- CSS
- React Icons

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB Atlas
- Mongoose

## 📁 Project Structure

```text
JobHints/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/soronnadiogochukwu-sys/JobHints.git
```

Navigate into the project:

```bash
cd JobHints
```

Install frontend dependencies:

```bash
npm install
```

Navigate to the backend:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not upload your `.env` file to GitHub. It contains private credentials.

## ▶️ Running the Application

### Start the Backend

From the `backend` folder:

```bash
npm start
```

The API should run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal and return to the main project folder:

```bash
cd ..
```

Then run:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5174
```

## 🔗 Application Architecture

```text
React Frontend
       ↓
Express REST API
       ↓
MongoDB Atlas
```

The frontend communicates with the Express backend, while the backend handles communication with MongoDB.

## 🧪 Development

JobHints is currently under active development. Features and API functionality are being continuously improved as the platform evolves.

## 🔮 Future Improvements

- User authentication and authorization
- Complete applicant and employer profile management
- Job application management
- Real-time messaging
- Notifications
- Resume uploads
- Advanced job search and filtering
- Employer applicant management
- Artisan hiring system
- Production deployment
- Improved security and validation

## 👨‍💻 Author

**Ogochukwu Soronnadi**

JobHints is a personal project focused on creating a functional platform that connects job seekers, employers, and skilled professionals.

## 📄 License

This project is currently intended for educational and development purposes.
