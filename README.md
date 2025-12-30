# <img src="./client/public/favicon.svg" width="30" height="30" alt="Collabify Logo"> Collabify

Collabify is a robust, full-stack project management platform designed for seamless team collaboration. Built with a modern tech stack, it provides workspaces, project tracking, and real-time task management to help teams stay organized and productive.

🚀 **[Live Demo](https://collabify-navyasrees-projects-6696cd47.vercel.app/)**

---

## ✨ Features <a name="-features"></a>

- **Multiple Workspaces**: Create and manage distinct workspaces for different teams or projects.
- **Role-Based Access**: Secure workspace management with Admin and Member roles.
- **Project Tracking**: Monitor project status, priority, and progress in real-time.
- **Task Management**: Create, assign, and track tasks (Bugs, Features, Improvements) with due dates and priorities.
- **Collaborative Comments**: Discuss tasks directly within the platform.
- **Inngest Background Jobs**: Handles automated workflows and notifications.
- **Responsive Design**: A sleek, premium UI built with Tailwind CSS and React.

---

## 🛠️ Tech Stack <a name="-tech-stack"></a>

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Authentication**: Clerk
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (Express)
- **Database**: PostgreSQL (Neon Database)
- **ORM**: Prisma
- **Background Jobs**: Inngest
- **Authentication**: Clerk Express Middleware
- **Deployment**: Vercel

---

## 📂 Project Structure <a name="-project-structure"></a>

```text
Project Management/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Landing, Dashboard, etc.)
│   │   ├── store/         # Redux state management
│   │   └── hooks/         # Custom React hooks
├── server/                # Node.js Express Backend
│   ├── prisma/            # Database schema and migrations
│   ├── routes/            # API Route definitions
│   ├── controllers/       # Business logic
│   ├── middlewares/       # Auth and error handling
│   └── inngest/           # Background job functions
```

---

## 🚀 Getting Started <a name="-getting-started"></a>

### 1. Clone the Repository
```bash
git clone https://github.com/Navyasree-ulava/Collabify.git
cd Collabify
```

### 2. Setup Server
```bash
cd server
npm install
# Configure .env file
npm run server
```

### 3. Setup Client
```bash
cd ../client
npm install
# Configure .env file
npm run dev
```

---

## ⚙️ Environment Variables <a name="-environment-variables"></a>

To run this project, you will need to add the following environment variables to your `.env` files:

#### Server (`/server/.env`)
- `DATABASE_URL`
- `DIRECT_URL`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`

#### Client (`/client/.env`)
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_SERVER_URL`

---

## 👨‍💻 Developer <a name="-developer"></a>

Developed with ❤️ by **[Navyasree-ulava](https://github.com/Navyasree-ulava)**
