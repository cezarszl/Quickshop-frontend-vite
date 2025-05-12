# QuickShop Frontend

Welcome to the **QuickShop** frontend repository – a modern e-commerce frontend built with React and Vite. It integrates with the [QuickShop API](https://github.com/cezarszl/QuickShopAPI) to provide a full shopping experience including browsing products, managing a cart, secure checkout with Stripe, and user authentication.

## 🌐 Live Demo

🛍️ [**Visit QuickShop**](https://quickshop-frontend-vite.vercel.app/)

## ⚙️ Features

- 🛒 View products, categories, brands, and colors
- 🔍 Filter and sort products
- ❤️ Add and manage favorite products
- 🧾 Checkout with Stripe (test mode)
- ✅ Orders stored after successful payment
- 👤 User registration and login (standard + Google OAuth)
- 🧺 Persistent cart for guests and users
- 🔐 JWT-based protected routes
- 📄 My Orders page to view order history

## 🧪 Test Card (Stripe)

Use the following test card for Stripe payments:

```
Card Number: 4242 4242 4242 4242
Expiry Date: 12/34
CVC: 123
ZIP: 12345
```

## 🧰 Tech Stack

- **React** – UI Library  
- **Vite** – Lightning-fast development environment  
- **Zustand** – State management  
- **Axios** – API requests  
- **Stripe** – Payment processing  
- **Google Auth** – OAuth login support  
- **React Router** – Client-side routing  
- **CSS Modules** – Scoped styling  
- **Zod + React Hook Form** – Validated forms

## 📦 Backend API

This project connects to the [QuickShop API](https://github.com/cezarszl/QuickShopAPI) – a RESTful backend built with NestJS and PostgreSQL, featuring:

- Product management  
- Cart management (anonymous and user-based)  
- Stripe checkout session generation  
- Order creation  
- Favorite products  
- Authentication with JWT and Google OAuth

---

> 🚧 The project is still evolving, and future improvements include better error handling, full mobile responsiveness, and admin-level tools.
