# Anime-Blog

Anime-Blog is a full-stack blog application built with **React**, **Redux**, **Vite**, and **Appwrite** as the backend. It allows users to register, log in, create, edit, and delete anime-related blog posts with rich text content and image uploads.

---

## 🚀 Features

### 📝 Authentication

- **User Registration & Login:**  
  Secure authentication using Appwrite.  
  See: [`src/components/Register.jsx`](src/components/Register.jsx), [`src/components/Login.jsx`](src/components/Login.jsx), [`src/store/authSlice.js`](src/store/authSlice.js)

- **Protected Routes:**  
  Only authenticated users can add, edit, or delete posts.  
  See: [`src/components/AuthLayout.jsx`](src/components/AuthLayout.jsx)

### 📰 Blog Posts

- **Create Post:**  
  Authenticated users can create new posts with a title, slug, rich text content (TinyMCE), featured image, and status (Active/Inactive).  
  See: [`src/components/post-form/PostForm.jsx`](src/components/post-form/PostForm.jsx), [`src/pages/AddPost.jsx`](src/pages/AddPost.jsx)

- **Edit Post:**  
  Authors can edit their own posts. The form is pre-filled with existing data.  
  See: [`src/pages/EditPost.jsx`](src/pages/EditPost.jsx)

- **Delete Post:**  
  Authors can delete their own posts, including the associated image file.  
  See: [`src/pages/Post.jsx`](src/pages/Post.jsx)

- **View Posts:**  
  All users can view published posts.  
  See: [`src/pages/Home.jsx`](src/pages/Home.jsx), [`src/pages/AllPost.jsx`](src/pages/AllPost.jsx), [`src/components/PostCard.jsx`](src/components/PostCard.jsx)

### 🖼️ Image Uploads

- **Featured Image:**  
  Upload and preview images for each post using Appwrite Storage.  
  See: [`src/appwrite/file.service.js`](src/appwrite/file.service.js)

### 🏷️ Slug Generation

- **Automatic Slug:**  
  Slug is auto-generated from the title and can be edited manually.  
  See: [`src/components/post-form/PostForm.jsx`](src/components/post-form/PostForm.jsx)

### 🗂️ Organized Components

- **Reusable Components:**  
  Includes Button, Input, Select, RTE (Rich Text Editor), Loader, Header, Footer, and Container for a modular UI.  
  See: [`src/components/`](src/components/)

### ⚡ Fast & Modern Stack

- **React + Vite:**  
  Fast development and hot module replacement.
- **Redux Toolkit:**  
  For global authentication state management.
- **Appwrite:**  
  Handles authentication, database, and file storage.

---

## 📁 Project Structure
```
src/ │ 
├── appwrite/ # Appwrite service wrappers (auth, database, file)
├── components/ # Reusable UI components and form elements
│ ├── post-form/ # Post creation/edit form
│ ├── header/ # Header and navigation
│ ├── footer/ # Footer
│ ├── loader/ # Loading spinner
│ └── ... # Other UI components
├── config/ # Appwrite and TinyMCE config 
├── pages/ # Page components (Home, AddPost, EditPost, Post, etc.) 
├── store/ # Redux store and auth slice ├── App.jsx # Main app layout 
├── main.jsx # Entry point and router setup └── index.css # Tailwind CSS setup

```

## 🛠️ How It Works

- **Authentication:**  
  Users register and log in via Appwrite. Auth state is managed in Redux.

- **CRUD Operations:**  
  Posts are stored in Appwrite Database. Images are stored in Appwrite Storage.

- **Rich Text Editor:**  
  Uses TinyMCE for post content.

- **Routing:**  
  React Router v6 for navigation and protected routes.

---

## 🧑‍💻 Getting Started

1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
