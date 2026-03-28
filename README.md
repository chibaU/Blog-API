# 📝 Blog API

A full-featured **RESTful Blog API** built with Node.js, Express, and MongoDB.  
Supports user authentication, JWT authorization, and complete CRUD operations for blog posts.

---

## ✨ Features

- 🔐 **Secure Authentication** — Register & Login with JWT tokens
- 🛡️ **Authorization** — Only post authors can edit or delete their content
- 📄 **Full CRUD** — Create, Read, Update, Delete blog posts
- 🔒 **Password Hashing** — bcrypt with salt rounds
- ✅ **Input Validation** — Joi schema validation on all endpoints
- 🚦 **Rate Limiting** — Protect against brute-force attacks
- 🌐 **CORS Configured** — Whitelist-based origin control
- ⚠️ **Global Error Handling** — Centralized error middleware

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Token-based authentication |
| **bcryptjs** | Password hashing |
| **Joi** | Request validation |
| **express-rate-limit** | Rate limiting |
| **cors** | Cross-origin resource sharing |
| **nodemon** | Dev auto-restart |

---

## 📁 Project Structure

```
blog-api/
├── server.js                  # Entry point
├── package.json
├── .env                       # Environment variables (not committed)
├── .gitignore
│
└── src/
    ├── app.js                 # Express app setup
    │
    ├── config/
    │   ├── db.js              # MongoDB connection
    │   └── corsOptions.js     # CORS configuration
    │
    ├── models/
    │   ├── User.js            # User schema
    │   └── Post.js            # Post schema
    │
    ├── controllers/
    │   ├── authController.js  # Register & Login logic
    │   └── postController.js  # CRUD logic
    │
    ├── routes/
    │   ├── auth.js            # Auth routes
    │   └── posts.js           # Post routes
    │
    ├── middleware/
    │   ├── authMiddleware.js  # JWT verification
    │   ├── errorMiddleware.js # Global error handler
    │   ├── rateLimiter.js     # Rate limiting
    │   └── validate.js        # Joi validation wrapper
    │
    └── validators/
        ├── authValidator.js   # Auth Joi schemas
        └── postValidator.js   # Post Joi schemas
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/blog-api.git
cd blog-api

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
# Then fill in your values (see Environment Variables section)

# 4. Start the server
npm run dev     # development (nodemon)
npm start       # production
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/blog-api
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=development
PORT=5000
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `CLIENT_URL` | Frontend URL allowed by CORS |
| `NODE_ENV` | `development` or `production` |
| `PORT` | Server port (default: 5000) |

---

## 📡 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and get token | ❌ |

### 📝 Posts

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/posts` | Get all posts (paginated) | ❌ |
| `GET` | `/api/posts/:id` | Get a single post | ❌ |
| `POST` | `/api/posts` | Create a new post | ✅ |
| `PUT` | `/api/posts/:id` | Update your post | ✅ |
| `DELETE` | `/api/posts/:id` | Delete your post | ✅ |

> 🔒 Protected routes require `Authorization: Bearer <token>` header.

---

## 📬 Request & Response Examples

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "chiba",
  "email": "chiba@example.com",
  "password": "123456"
}
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "chiba",
    "email": "chiba@example.com"
  }
}
```

---

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "chiba@example.com",
  "password": "123456"
}
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "chiba",
    "email": "chiba@example.com"
  }
}
```

---

### Create Post

```http
POST /api/posts
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my first post..."
}
```

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "title": "My First Blog Post",
  "content": "This is the content of my first post...",
  "author": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "chiba",
    "email": "chiba@example.com"
  },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

### Get All Posts (with Pagination)

```http
GET /api/posts?page=1&limit=10
```

```json
{
  "posts": [...],
  "pagination": {
    "total": 42,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

---

## 🛡️ Security

- Passwords are hashed with **bcrypt** (salt rounds: 10)
- JWT tokens expire after **7 days**
- Auth routes are limited to **10 requests / 15 minutes**
- API routes are limited to **100 requests / 15 minutes**
- CORS is restricted to whitelisted origins in production
- Error messages are intentionally generic to prevent user enumeration

---

## 🗄️ Database Schema

### User

```
{
  username : String  (required, unique, min: 3)
  email    : String  (required, unique, lowercase)
  password : String  (required, hashed, min: 6)
  createdAt: Date
  updatedAt: Date
}
```

### Post

```
{
  title    : String  (required, min: 3, max: 100)
  content  : String  (required, min: 10)
  author   : ObjectId → ref: User
  createdAt: Date
  updatedAt: Date
}
```

---

## 🧪 Testing with Postman

1. **Register** → copy the `token` from response
2. **Login** → get a fresh `token`
3. For protected routes → add header:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```
4. Try creating, updating, and deleting posts
5. Try editing another user's post → expect `403 Forbidden`

---

## ☁️ Deployment (Render.com)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Configure:

| Setting | Value |
|---|---|
| Build Command | `npm install` |
| Start Command | `npm start` |

5. Add environment variables in Render dashboard
6. Deploy 🚀

---

## 🔮 Future Improvements

- [ ] Comments on posts
- [ ] Likes / Reactions
- [ ] Categories & Tags
- [ ] Search functionality
- [ ] Image upload (Cloudinary)
- [ ] Email verification
- [ ] Refresh tokens
- [ ] Swagger / OpenAPI docs

---

## 👤 Author

**Chiba Abdallah**  
GitHub: [@chibaU](https://github.com/chibaU)

---

## 📄 License

This project is licensed under the **ISC License**.
