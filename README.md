## GoFutsal - Real-Time Futsal Booking System
GoFutsal is a modern web application designed to streamline the reservation process for futsal courts. Built with Next.js and integrated with Google Sheets as a database via Google Apps Script (GAS), this system allows users to book slots instantly while providing admins with a secure, dedicated dashboard to manage the facility.

## Key Features
👤 Customer-Facing (Frontend)
Real-Time Availability: View up-to-date court schedules directly from the landing page.

Intuitive Booking: Seamlessly book time slots with an automated data flow to the backend.

Court Information: Detailed sections for different court types (Synthetic Turf & Vinyl) with hover-reveal visuals.

Responsive Design: Fully optimized for mobile, tablet, and desktop using Tailwind CSS.

WhatsApp Integration: Automated redirection for payment confirmation and customer support.

## Admin Dashboard
Middleware Security: Protected routes using Next.js Middleware and Browser Cookies (Server-side Oauth simulation).

Schedule Management: Add, edit, or delete operational hours directly from the UI without touching the Spreadsheet.

Payment Tracking: Update booking statuses from 'Pending' to 'Paid' with real-time sync.

Live Data Fetching: Instant synchronization with Google Sheets as the primary database.

## Tech Stack
Framework: Next.js 14+ (App Router)

Styling: Tailwind CSS

Database: Google Sheets (via Google Apps Script API)

Backend Engine: Google Apps Script (RESTful API simulation)

Authentication: Custom Middleware & Cookie-based session management.

Deployment: Optimized for Vercel.

## Project Structure
Bash

├── src/
│   ├── app/                # Page routes (Admin & Client)
│   ├── components/         # Reusable UI (Navbar, Hero, About, etc.)
│   ├── services/           # API fetch logic & GAS integration
│   └── middleware.js       # Security layer for Admin routes
├── public/                 # Static assets, icons, and images
└── .env.local              # GAS Web App URL configuration
⚙️ Installation & Setup
Clone the Repository

Bash

git clone https://github.com/syahrul-arh38/gofutsal.git
cd gofutsal
Install Dependencies

Bash

npm install
Environment Variables
Create a .env.local file in the root directory and add your Google Apps Script Web App URL:

Cuplikan kode

NEXT_PUBLIC_GAS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Run Development Server

Bash

npm run dev
Access the app at http://localhost:3000.

## System Architecture
The application communicates with Google Apps Script using GET and POST requests. GAS serves as a serverless backend that handles CRUD operations on Google Sheets. Security for the admin dashboard is enforced at the edge via Next.js Middleware, which validates session cookies before granting access to sensitive routes.

## Contribution
Contributions are welcome! If you have suggestions or find any bugs, please open an issue or submit a pull request.

Developed by syahrul-arh38