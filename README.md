# 📌 Remind-Me-Later API (Backend)

This is the backend for the **Remind-Me-Later** web app. It provides a simple API endpoint to store reminder messages (with date, time, and notification method) into a MongoDB database.

---

## Features

- Accepts reminder details from the frontend:
  - Date
  - Time
  - Message
  - Method (SMS or Email)
- Combines date and time into a single Date object.
- Saves the reminder to MongoDB using Mongoose.
- Responds with success or error status based on input.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**

---

## 📁 Project Structure

Since this is a small project with a single endpoint, everything is kept in one file (`app.js`) for simplicity.

---

## 📨 API Endpoint

### `POST /api/reminders`

**Request Body (JSON):**

```json
{
  "date": "2025-05-22",
  "time": "14:30",
  "message": "Attend the meeting",
  "method": "SMS"
}

```
**Response:**

```json
{
  "success": true,
  "reminder": {
    "_id": "mongodb_generated_id",
    "message": "Attend the meeting",
    "method": "SMS",
    "remindAt": "2025-05-22T14:30:00.000Z",
    "createdAt": "timestamp_here",
    "__v": 0
  }
}
```
 **How It Works**

- The server accepts JSON input via a POST request.

- Combines the date and time using JavaScript's Date object (${date}T${time} format).

- Saves the reminder to MongoDB.

- Responds with either:

  -201 Created on success

  -400 Bad Request if required fields are missing

  -500 Server Error if DB write fails

