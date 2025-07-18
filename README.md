# complaint-management-system

## Setup and Installation

1. **Clone the repository:**

```bash
git clone https://github.com/vishwasenthil/complaint-management-system.git
cd complaint-management-system
```

2. **Install dependencies:**

```bash
#Backend
cd backend
npm install

#Frontend
cd ../frontend
npm install
```
3. **Configure environment variables:**
- Create a `.env` file in the `backend` directory and add your environment variables.

4. **Run the application:**
```bash
#Backend
cd backend
npm run dev

#Frontend
cd ../frontend
npm run dev
```

5. The frontend runs by default on `http://localhost:5173`.

If that port is busy, Vite will pick the next available port. Check your terminal output for the exact URL.

- Submit form: `http://localhost:5173/submit`  
- Admin dashboard: `http://localhost:5173/admin`

## Assumptions and Tradeoffs
- **Asumptions:**
  - Admin access is protected on the backend via middleware but frontend authorization is minimal for this assessment.
  - Supabase is used for the database with a complaints table as described in the assessment.
  - Email validation is done both client and server side.
  - The system is built with scalability in mind but prioritizes delivering working functionality within the assessment timeframe.
- **Tradeoffs:**
  - Did not implement full user authentication due to time constraints.
  - Error handling is basic, focusing on clarity rather than extensive logging.
  - No automated testing was added due to time constraints, which could affect future maintainability.
  - Deployment considerations (e.g., containerization, CI/CD pipelines) were not covered in this implementation.

## What I would Improve or Build Next Time
- **Improvements:**
  - Implement user authentication and role based access control for the admin page.
  - Add search functionality on the admin page.
  - Add caching and pagination on the admin complaints list for better scalability.
  - Add tests for backend routes and frontend components.
  - Implement a CI/CD pipeline for automated testing and deployment.
  - Containerize the application for easier deployment.
  - Implement real time updates for the admin dashboard using WebSockets.

