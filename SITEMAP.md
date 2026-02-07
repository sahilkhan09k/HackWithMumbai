# 🗺️ CivicPulse - Complete Sitemap

## Site Structure Overview

```
CivicPulse Application
│
├── 🌐 PUBLIC PAGES (No Authentication)
│   │
│   ├── Home (/)
│   │   ├── Hero Section
│   │   ├── Live Counters (Issues Reported/Resolved/Active Zones)
│   │   ├── How It Works (3 Steps)
│   │   ├── Smart City + AI Badges
│   │   └── CTA Buttons
│   │
│   ├── City Live Map (/map)
│   │   ├── Filters (Category & Priority)
│   │   ├── Interactive Heatmap
│   │   ├── Issue List
│   │   └── Priority Legend
│   │
│   ├── About (/about)
│   │   ├── Problem Statement
│   │   ├── Why CivicPulse is Different
│   │   ├── Smart City Alignment
│   │   └── Impact Metrics
│   │
│   ├── Login (/login)
│   │   ├── Email/Password Form
│   │   ├── Demo Credentials
│   │   └── Link to Register
│   │
│   └── Register (/register)
│       ├── User Registration Form
│       ├── Name, Email, Phone, Password
│       └── Link to Login
│
├── 👤 USER PAGES (User Authentication Required)
│   │
│   ├── Dashboard (/dashboard)
│   │   ├── Stats Widgets
│   │   │   ├── Issues Reported
│   │   │   ├── Issues Resolved
│   │   │   ├── Avg Response Time
│   │   │   └── Trust Score
│   │   ├── My Issues Section
│   │   ├── Nearby Issues Section
│   │   └── Trending Issues Section
│   │
│   ├── Report Issue (/report-issue)
│   │   ├── Image Upload
│   │   ├── AI Analysis Display
│   │   ├── Location Detection
│   │   ├── Title Input
│   │   ├── Category Selection
│   │   ├── Description Textarea
│   │   └── Submit Button
│   │
│   ├── My Issues (/my-issues)
│   │   ├── Status Filter
│   │   ├── Issues List
│   │   ├── Timeline Visualization
│   │   └── View Details Links
│   │
│   ├── Issue Detail (/issue/:id)
│   │   ├── Issue Image
│   │   ├── Details Card
│   │   │   ├── Category
│   │   │   ├── Location
│   │   │   ├── Reported Date
│   │   │   └── Confirmations
│   │   ├── Description
│   │   ├── AI Priority Explanation
│   │   └── Resolution Timeline
│   │
│   ├── Verify Issues (/verify)
│   │   ├── Why Verify Info
│   │   ├── Nearby Issues List
│   │   ├── Confirm Button
│   │   ├── Add Evidence Button
│   │   └── Verification Status
│   │
│   └── Profile (/profile)
│       ├── Profile Header
│       ├── Stats Grid
│       │   ├── Total Reported
│       │   ├── Total Resolved
│       │   ├── Community Contributions
│       │   └── Resolution Rate
│       ├── Achievements Section
│       ├── Recent Activity
│       └── Impact Breakdown
│
└── 🔐 ADMIN PAGES (Admin Authentication Required)
    │
    ├── Admin Dashboard (/admin)
    │   ├── Key Metrics
    │   │   ├── Critical Unresolved
    │   │   ├── Avg Resolution Time
    │   │   ├── Resolution Efficiency
    │   │   └── Total Issues
    │   ├── Weekly Trend Chart
    │   ├── Top 5 Problem Zones
    │   └── City Heatmap
    │
    ├── Issue Intelligence (/admin/issues)
    │   ├── AI Recommendations Banner
    │   ├── Top 5 Issues to Fix Today
    │   ├── Filters (Sort & Category)
    │   └── Issues Grouped by Clusters
    │
    ├── Manage Issues (/admin/manage)
    │   ├── Search Bar
    │   ├── Issues Table
    │   │   ├── ID
    │   │   ├── Title
    │   │   ├── Category
    │   │   ├── Priority
    │   │   ├── Status
    │   │   ├── Date
    │   │   └── Actions
    │   └── Update Modal
    │       ├── Status Dropdown
    │       ├── Admin Remarks
    │       ├── Resolution Image Upload
    │       └── Save/Cancel Buttons
    │
    ├── Analytics (/admin/analytics)
    │   ├── Key Metrics Cards
    │   ├── Issues by Category (Pie Chart)
    │   ├── Area-wise Density (Bar Chart)
    │   └── Resolution Trend (Line Chart)
    │
    └── Feedback & Trust (/admin/feedback)
        ├── Trust Metrics Overview
        │   ├── Overall Score
        │   ├── Total Feedback
        │   ├── Positive Rate
        │   ├── Avg Quality
        │   └── Trust Index
        ├── Rating Distribution
        ├── Recent Citizen Feedback
        └── Trust Score Explanation
```

## Navigation Components

### Navbar (Public Pages)
```
┌─────────────────────────────────────────────────────────┐
│ 🗺️ CivicPulse  Home  Map  About  Login  [Sign Up]     │
└─────────────────────────────────────────────────────────┘
```

### Sidebar (User Dashboard)
```
┌──────────────────┐
│ 🗺️ CivicPulse    │
│ User Dashboard   │
├──────────────────┤
│ 🏠 Dashboard     │
│ 📝 Report Issue  │
│ 📋 My Issues     │
│ ✓ Verify Issues  │
│ 👤 Profile       │
├──────────────────┤
│ 🚪 Logout        │
└──────────────────┘
```

### Sidebar (Admin Dashboard)
```
┌──────────────────┐
│ 🗺️ CivicPulse    │
│ Admin Panel      │
├──────────────────┤
│ 🏠 Dashboard     │
│ 🧠 Intelligence  │
│ ⚙️ Manage        │
│ 📊 Analytics     │
│ 💬 Feedback      │
├──────────────────┤
│ 🚪 Logout        │
└──────────────────┘
```

## User Flows

### New User Journey
```
1. Home → Learn about CivicPulse
2. Register → Create account
3. Dashboard → See overview
4. Report Issue → Submit first issue
5. Verify Issues → Help community
6. Profile → Check civic impact
```

### Returning User Journey
```
1. Login → Access dashboard
2. Dashboard → Check updates
3. My Issues → Track progress
4. Report Issue → Submit new
5. Profile → View achievements
```

### Admin Journey
```
1. Login (admin) → Admin dashboard
2. Issue Intelligence → See AI priorities
3. Manage Issues → Update statuses
4. Analytics → Review metrics
5. Feedback → Check trust scores
```

### Public Visitor Journey
```
1. Home → Understand mission
2. City Map → See transparency
3. About → Learn solution
4. Register → Join platform
```

## Page Relationships

```
Home
 ├─→ Report Issue (CTA)
 ├─→ View City Map (CTA)
 ├─→ Login
 └─→ Register

Dashboard
 ├─→ My Issues (View All)
 ├─→ Issue Detail (Click issue)
 └─→ Report Issue (Quick action)

My Issues
 └─→ Issue Detail (View Details)

Issue Detail
 ├─→ My Issues (Back)
 └─→ Verify (Related)

Admin Dashboard
 ├─→ Issue Intelligence (Insights)
 ├─→ Manage Issues (Actions)
 ├─→ Analytics (Reports)
 └─→ Feedback (Trust)
```

## Access Control Matrix

| Page | Public | User | Admin |
|------|--------|------|-------|
| Home | ✅ | ✅ | ✅ |
| City Map | ✅ | ✅ | ✅ |
| About | ✅ | ✅ | ✅ |
| Login | ✅ | ❌ | ❌ |
| Register | ✅ | ❌ | ❌ |
| User Dashboard | ❌ | ✅ | ❌ |
| Report Issue | ❌ | ✅ | ❌ |
| My Issues | ❌ | ✅ | ❌ |
| Issue Detail | ❌ | ✅ | ✅ |
| Verify Issues | ❌ | ✅ | ❌ |
| Profile | ❌ | ✅ | ❌ |
| Admin Dashboard | ❌ | ❌ | ✅ |
| Issue Intelligence | ❌ | ❌ | ✅ |
| Manage Issues | ❌ | ❌ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| Feedback & Trust | ❌ | ❌ | ✅ |

## Route Protection

```javascript
// Public Routes (No Auth)
/ → Home
/map → City Map
/about → About
/login → Login
/register → Register

// Protected Routes (User Auth)
/dashboard → User Dashboard
/report-issue → Report Issue
/my-issues → My Issues
/issue/:id → Issue Detail
/verify → Verify Issues
/profile → Profile

// Admin Routes (Admin Auth)
/admin → Admin Dashboard
/admin/issues → Issue Intelligence
/admin/manage → Manage Issues
/admin/analytics → Analytics
/admin/feedback → Feedback & Trust
```

## Mobile Navigation

### Public (Hamburger Menu)
```
☰ Menu
├─ Home
├─ Live Map
├─ About
├─ Login
└─ Sign Up
```

### User Dashboard (Bottom Nav)
```
┌──────┬──────┬──────┬──────┬──────┐
│ 🏠   │ 📝   │ 📋   │ ✓    │ 👤   │
│ Home │Report│Issues│Verify│Profile│
└──────┴──────┴──────┴──────┴──────┘
```

### Admin Dashboard (Drawer)
```
☰ Menu
├─ Dashboard
├─ Intelligence
├─ Manage
├─ Analytics
├─ Feedback
└─ Logout
```

---

**Total Pages: 16**
- Public: 5
- User: 6
- Admin: 5
