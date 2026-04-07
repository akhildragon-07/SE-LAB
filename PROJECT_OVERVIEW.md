# TravelSphere: Project Overview & Tech Stack

This document serves as a high-level technical summary of the TravelSphere platform designed for team alignment and presentations.

## 🎯 Project Vision
**TravelSphere** is a prototype tourism management application bridging the gap between Travelers, Travel Agents, NATPAC Scientists (data analysts), and Platform Administrators. It handles custom trips, package booking, dynamic status tracking, and high-level analytical modeling in a single integrated ecosystem.

---

## 🛠️ Architecture & Tech Stack
We prioritized a lightweight, dependency-free development path to demonstrate core software engineering fundamentals, specifically avoiding massive boilerplate frameworks where natively supported Web APIs suffice.

### Frontend
- **Structure:** Semantic **HTML5**. Multipage structure mimicking routing (via `login.html`, `traveler-dashboard.html`, etc.).
- **Styling:** **Vanilla CSS3**. Implemented using CSS Grid, Flexbox, custom variables, and responsive media queries (No Tailwind/Bootstrap overhead).
- **Interactivity:** **Vanilla JavaScript (ES6+)**. Uses native asynchronous `fetch()` API for client-server communication.
- **Data Visualization:** **Chart.js** via CDN used securely in `scientist-dashboard.html` for rendering analytics.

### Backend & Data Persistence
- **Runtime:** **Node.js**
- **Server:** **Native `http` module**. We built our own custom request router (`server.js`) mapping to endpoints instead of relying on Express.js. Perfect for understanding raw backend engineering!
- **Database:** **Local JSON Mocking**. Securely manipulated via Node’s `fs` (file system) module (`users.json`, `packages.json`, `bookings.json`, `custom_requests.json`). Simulates real-time CRUD persistence.

### Quality Assurance & Testing Suites
- **Black Box Testing:** Methodologies applied across the board (Decision Tables, Equivalence Partitioning, Boundary Value Analysis) and documented. 
- **White Box Testing:** CFG mapping and Cyclomatic Complexity calculations tested via Python's built-in `unittest` frameworks.

---

## 🤖 AI Assistance & Tools Used
To rapidly prototype, test, and integrate the full-stack connections, the following AI paradigms were utilized:
1. **Google DeepMind Antigravity Agent:** 
   - Used as our primary Agentic AI Pair Programmer.
   - Handled backend API endpoint generation, frontend script wiring, and real-time environment debugging.
   - Designed our automated continuous `task.md` checklists and structural walkthroughs.
2. **AI-Driven QA Engineering:**
   - Instead of manually writing exhaustive test suites, the AI was prompted to dynamically evaluate the application constraints, map out Boundary Values, generate our CFG (Control Flow Graph) models, and provide theoretical metrics on cyclomatic complexities (Modules 1-7).
