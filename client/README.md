# CivicPulse - Smart City Issue Management System

A comprehensive multi-page web application for civic issue reporting and management with AI-powered intelligence.

## Features

### Public Pages
- **Home**: Hero section with live counters, how it works, and CTA buttons
- **City Live Map**: Public transparency page with issue heatmap and filters
- **About**: Problem statement and solution explanation

### User Features (Authenticated)
- **Dashboard**: Personal stats, my issues, nearby issues, trending issues
- **Report Issue**: AI-powered issue reporting with image upload and auto-categorization
- **My Issues**: Track all reported issues with timeline
- **Issue Detail**: Detailed view with AI explanation and resolution timeline
- **Community Verification**: Verify issues reported by others
- **Profile**: Civic impact score, achievements, and activity tracking

### Admin Features (Admin Role Only)
- **Admin Dashboard**: City-wide metrics, heatmap, and problem zones
- **Issue Intelligence**: AI-powered prioritization and clustering
- **Manage Issues**: Update status, add remarks, upload resolution images
- **Analytics**: Charts and reports for data-driven decisions
- **Feedback & Trust Metrics**: Citizen satisfaction and accountability tracking

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Context API

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Demo Credentials

### Admin Access
- Email: admin@civic.com
- Password: admin123

### User Access
- Email: any email
- Password: any password

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Public pages navigation
│   │   └── Sidebar.jsx         # Dashboard navigation
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CityMap.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── user/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ReportIssue.jsx
│   │   │   ├── MyIssues.jsx
│   │   │   ├── IssueDetail.jsx
│   │   │   ├── VerifyIssues.jsx
│   │   │   └── Profile.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── IssueIntelligence.jsx
│   │       ├── ManageIssues.jsx
│   │       ├── Analytics.jsx
│   │       └── FeedbackMetrics.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Key Features Implemented

✅ Role-based authentication (User/Admin)
✅ Responsive design with Tailwind CSS
✅ Sidebar navigation for dashboards
✅ Navbar for public pages
✅ AI-powered issue categorization simulation
✅ Community verification system
✅ Trust score and gamification
✅ Interactive charts and analytics
✅ Issue timeline tracking
✅ Feedback and rating system
✅ Heatmap visualization placeholders

## Navigation Flow

### Public Users
Home → City Map → About → Login/Register

### Authenticated Users
Dashboard → Report Issue → My Issues → Verify Issues → Profile

### Admin Users
Admin Dashboard → Issue Intelligence → Manage Issues → Analytics → Feedback Metrics

## Notes

- Admin users are pre-configured in the database (no signup page for admins)
- User role has a signup page for registration
- All pages have proper navigation and attractive UI
- Sidebar is used for dashboard pages (both user and admin)
- Navbar is used for public pages
- Mock data is used for demonstration purposes
- Ready for backend API integration

## Future Enhancements

- Integrate real mapping library (Google Maps/Mapbox)
- Connect to backend API
- Implement real-time notifications
- Add image upload functionality
- Implement actual AI/ML models
- Add more detailed analytics
- Mobile app version
