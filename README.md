# TravelSphere | Smart Travel Management

## Overview
**TravelSphere** is a prototype web application designed for seamless trip booking, custom tour packages, and tourism analytics. It connects four distinct stakeholders: Travelers, Travel Agents, Administrators, and NATPAC (National Transportation Planning and Research Centre) Scientists onto a single cohesive platform.

This project is currently a **Frontend-Only Prototype** built using vanilla HTML and CSS (`styles.css`). It serves as the foundation for a tourism management dashboard and provides UI layouts for various user roles.

---

## 🏗️ Architecture & Tech Stack
- **Frontend Core:** HTML5 (Semantic HTML, Accessible layouts)
- **Styling:** CSS3 (Vanilla CSS, Flexbox/Grid layouts, CSS variables for theming)
- **Modularity:** Separate HTML files for each user role dashboard to mimic routing.
- **No Backend (Yet):** Currently relies on static layouts. Ready to be integrated with JavaScript frameworks (React, Vue) or vanilla JS with a backend (Node.js, Python, Firebase).

---

## 👥 Stakeholders & Features

### 1. Traveler
Discover, book, and customize ideal trips.
- **Files:** `traveler-dashboard.html`, `traveler-packages.html`, `traveler-custom.html`
- **Key Features:**
  - Browse curated basic packages with transparent pricing.
  - Create custom trip requests (tailored itineraries).
  - Track active bookings and manage profiles.

### 2. Travel Agent
Turn traveler requirements into tailored/custom packages.
- **Files:** `agent-dashboard.html`
- **Key Features:**
  - View incoming custom package requests from travelers.
  - Build detailed itineraries with clear cost breakdowns.
  - Manage active bookings and approvals.

### 3. NATPAC Scientist
Analyze tourism trends and generate data-driven policy insights.
- **Files:** `scientist-dashboard.html`
- **Key Features:**
  - Study regional footfalls, peak seasonality, and demographics.
  - Export data/reports for strategic tourism planning.
  - Data visualization containers (ready for chart.js/D3.js integration).

### 4. Administrator (Admin)
Control users, agents, and platform performance.
- **Key Features:**
  - Approve agents and oversee all system bookings.
  - Monitor platform revenue and system KPIs.

---

## 📂 File Structure

```text
/
├── index.html                  # Main Landing Page (Hero, Search, Roles, Features)
├── login.html                  # Mock Login/Authentication View
├── styles.css                  # Global Stylesheet (Typography, Colors, Components, Responsive rules)
├── traveler-dashboard.html     # Portal for Travelers
├── traveler-packages.html      # Basic packages browsing view for Travelers
├── traveler-custom.html        # Custom package creation form for Travelers
├── agent-dashboard.html        # Workspace for Travel Agents
├── scientist-dashboard.html    # Analytics & Reports for NATPAC Scientists
├── VISUAL_GUIDE.md             # Empty placeholder for design documentation
└── assets/                     # Images and Icons
```

---

## 🤖 Instructions for ChatGPT (Testing & Development)

If you are reading this as an AI assistant (like ChatGPT) to help the user test, debug, or expand this codebase, please refer to the following guidelines:

### 1. Adding Interactivity (JavaScript)
The current HTML templates are static. You can help by generating vanilla JavaScript scripts (`script.js`) to:
- Handle form submissions (e.g., Traveler custom trip requests).
- Simulate login authentication based on the selected role on `login.html`.
- Create mock JSON data arrays to populate the agent dashboards and traveler package lists dynamically.

### 2. UI/UX Polishing
- Improve `styles.css` constraints for full mobile responsiveness (media queries).
- Add CSS animations/transitions for hover effects, modal popups, or page routing.
- Inject placeholder charts using `Chart.js` for `scientist-dashboard.html`.

### 3. Testing Scenarios
You can write unit/E2E test outlines or prompt the user to manually verify:
- **Navigation Flow:** Landing Page -> Login -> Role-Specific Dashboard.
- **CSS Checks:** Are the grid layouts breaking on mobile screens (`< 768px`)?
- **Feature Flow:** Creating a mock "Custom Package Request" and seeing how it should theoretically appear on the `agent-dashboard.html`.

### 4. Integration Prep
If the user wants to migrate to React/Next.js or connect to a Database:
- Ask them which backend/framework they prefer.
- Offer to convert these static HTML files into JSX components (e.g., `<Hero />`, `<RoleCard />`, `<DashboardNav />`).
