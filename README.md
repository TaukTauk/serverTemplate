# **Node.js Server Template (Express + MongoDB + Cloudflare R2)**

A production-ready backend template using:

- **Express**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Cloudflare R2 for file uploads**
- **Multer middleware**
- **API key security**
- **Modular folder structure**

This gives you a clean starting point for any modern backend API.

---

## Features

- JWT authentication (register + login ready)
- API Key validation middleware
- Cloudflare R2 image/file upload
- Multer with dynamic file field names
- MongoDB Atlas configuration
- File size limit via environment variable
- CORS with allowed origins list
- API versioning support
- Nodemon for development

---

## Project Structure
```
server/
│
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── app.js
│ ├── server.js
│ └── ...
│
├── .env.example
├── package.json
└── README.md
```


## Installation

```bash
git clone <your-repo-url>
cd server
npm install
```

## Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Then fill in your values.
Required variables
| Key               | Description                                 |
| ----------------- | ------------------------------------------- |
| `PORT`            | Server port (e.g., 5000)                    |
| `API_KEY`         | Key clients must include in headers         |
| `MONGO_URI`       | MongoDB Atlas URI                           |
| `JWT_SECRET`      | Secret key for JWT                          |
| `IMAGE_FILE_SIZE` | Max upload size (MB)                        |
| `API_VERSION`     | Version string (e.g., v1)                   |
| `ALLOW_ORIGINS`   | Comma-separated list of allowed client URLs |

Cloudflare R2 variables
| Key                        | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| `CLOUDFLARE_R2_ENDPOINT`   | R2 S3 endpoint                                                        |
| `CLOUDFLARE_R2_KEY`        | R2 Access key                                                         |
| `CLOUDFLARE_R2_SECRET`     | R2 Secret key                                                         |
| `CLOUDFLARE_R2_BUCKET`     | R2 Bucket name                                                        |
| `CLOUDFLARE_R2_PUBLIC_URL` | Public URL (e.g., [https://pub-xxxx.r2.dev](https://pub-xxxx.r2.dev)) |
| `PROFILE_FOLDER_NAME`      | Folder name for profile images                                        |

## Running the Server
Development
```bash
npm run dev
```

Production
```bash
npm start
```

Server will start at:
```bash
http://localhost:<PORT>
```

## API Key Usage
Every request must include:
```
x-api-key: <your api key>
```

Example (axios)
```
axios.get("/api/v1/users", {
  headers: {
    x-api-key: "YOUR_API_KEY"
  }
});
```

## File Uploads (Cloudflare R2)
This template supports uploading:
- profile
- receipt
- cover_photo
- any other field name
- single or multiple files

Example in Postman
- Select Form-Data
- Field name: profile
- Type: File
- Upload image

Uploaded files will be stored at:
```
<PROFILE_FOLDER_NAME>/<uuid>-<original_filename>
```

Final file URL returned:
```
https://<your-r2-public-url>/<folder>/<filename>
```

## Authentication API
Register
POST /api/v1/auth/register

Form-data fields:
| Field      | Type | Required |
| ---------- | ---- | -------- |
| `name`     | text | Yes      |
| `email`    | text | Yes      |
| `password` | text | Yes      |
| `role`     | text | No       |
| `profile`  | file | Optional |

Response includes:
- user object
- JWT token
- uploaded profile image URL

Libraries Used
- express
- mongoose
- bcrypt
- jsonwebtoken
- multer
- uuid
- cors
- dotenv
- @aws-sdk/client-s3 (Cloudflare R2)
- nodemon (dev)

## License
MIT — free to use.

## Contributing
Pull requests and suggestions are welcome!
