# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


📝 Blog Post App (React + Appwrite)

A full-stack Blog Application built using React, Appwrite, Redux Toolkit, and Tailwind CSS.
Users can securely create, manage, and view their own blog posts with authentication.

🚀 Live Demo

👉 https://tushar-blog-project.netlify.app

⚙️ Tech Stack
⚛️ Frontend: React (Vite)
🗂 State Management: Redux Toolkit
☁️ Backend: Appwrite
🎨 Styling: Tailwind CSS
✍️ Editor: TinyMCE
🌐 Hosting: Netlify
🔐 Features
👤 Authentication
User Signup & Login
Secure session handling with Appwrite
Protected routes (Auth-based access)
📝 Post Management
Create blog posts
Edit posts
Delete posts
Upload featured images
🔍 User-Specific Data
Each user sees only their own posts
Data filtered using userID
🚫 Access Control
Users must login to view posts
Unauthorized users are redirected
📁 Folder Structure
src/
│── appwrite/        # Appwrite services (auth & database)
│── components/      # Reusable UI components
│── pages/           # All pages (Home, Login, Signup, Post, etc.)
│── store/           # Redux store & slices
│── conf/            # Environment config
│── App.jsx          # Main App component
│── main.jsx         # Entry point
🔧 Environment Variables

Create a .env file in root directory:

VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID
VITE_APPWRITE_BUCKET_ID=YOUR_BUCKET_ID
🧪 Local Setup
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev

App will run on:
👉 http://localhost:5173

🌐 Deployment (Netlify)
Step 1: Build project
npm run build
Step 2: Deploy
Upload dist folder manually
OR
Connect GitHub repo to Netlify
Step 3: Add Environment Variables in Netlify

Go to:
👉 Site Settings → Environment Variables

Add:

VITE_APPWRITE_URL
VITE_APPWRITE_PROJECT_ID
VITE_APPWRITE_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID
VITE_APPWRITE_BUCKET_ID
Step 4: Fix React Router issue

Create file:

public/_redirects

Add:

/*    /index.html   200
⚠️ Important Fixes
✅ CORS Error Fix

Go to Appwrite:

👉 Settings → Platforms → Add Platform → Web App

Add your Netlify domain:

tushar-blog-project.netlify.app
✅ 409 Error (Duplicate Slug)

Error:

Document already exists

Fix:

Use unique slug
OR
Use:
ID.unique()
✅ 401 Error (Unauthorized)

Handled by:

getCurrentUser() → return null if not logged in
📌 Appwrite Database Structure
Field	Type	Required
title	string	✅
content	string	✅
featuredimage	string	✅
status	string	❌
userID	string	✅
🧪 Demo Test Cases
Signup new user ✅
Login ✅
Create post ✅
Edit/Delete post ✅
Logout → posts hidden ✅
Different user → different posts ✅
💡 Future Improvements
💬 Comment system
❤️ Like & Save posts
👤 User profile page
🔍 Search functionality
📄 Pagination
🙌 Author

Tushar
Frontend Developer 🚀

⭐ Support

If you like this project:

⭐ Star the repository
🔗 Share with others
💼 Add to your portfolio
