# Penality Board Frontend

A responsive Vite + React + Tailwind CSS frontend for the Penality Board API.

## Features

- Employee-wise mistake report
- Today's report by default
- Custom date range filter
- Total mistake count
- Employee ranking by mistake count
- Expandable mistake breakdown per employee
- Search employees
- Add new mistake
- Mistake image URL support
- Loading, empty and API error states
- Mobile-friendly responsive UI
- Lucide React icons

## Backend API

The frontend expects:

```text
GET  http://localhost:5000/api/v1/penality-boards/report
POST http://localhost:5000/api/v1/penality-boards
```

For production or another backend URL, create `.env`:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Important

Your backend must allow the frontend origin through CORS.

Example:

```js
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
```

## Expected GET response

The frontend supports this response shape:

```json
{
  "statusCode": 200,
  "data": {
    "allMistakes": 15,
    "employees": [
      {
        "name": "Rahul",
        "totalMistakes": 8,
        "mistakes": [
          {
            "mistake": "Wrong Cutting",
            "count": 5,
            "mistake_image": null
          }
        ]
      }
    ]
  },
  "message": "Mistake report fetched successfully",
  "success": true
}
```

It also supports the older response where `data` is directly an array of employees.
