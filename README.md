# AttendTrack - School Attendance Management System

A modern, production-ready School Attendance Portal built with React + Vite. Designed for teachers and admins to manage attendance, exams, grades, timetables, and more.

**Live Demo:** [https://schoolattendancemanagementsystem.vercel.app](https://schoolattendancemanagementsystem.vercel.app)

## Screenshots

### Login Page
![Login](screenshots/01-login.png)

### Dashboard
![Dashboard](screenshots/02-dashboard.png)

### Mark Attendance
![Mark Attendance](screenshots/03-mark-attendance.png)

### Class View - Student Attendance Summary
![Class View](screenshots/04-class-view.png)

### Class Timetable
![Timetable](screenshots/05-timetable.png)

### CLO Details
![CLO Details](screenshots/06-clo-plo.png)

### CLO-PLO Mapping Matrix
![CLO-PLO Mapping](screenshots/07-clo-plo-mapping.png)

### Exam Schedule
![Exam Schedule](screenshots/08-exam-schedule.png)

### Student Grades
![Grades](screenshots/09-grades.png)

### Announcements
![Announcements](screenshots/10-announcements.png)

### Leave Management
![Leave Management](screenshots/11-leave-management.png)

### Settings (Admin)
![Settings](screenshots/12-settings.png)

## Features

- **Attendance Tracking** - Mark students as Present, Absent, or Late with date-based tracking
- **Configurable Late Value** - Late counts as a configurable partial value (0-1) in percentage calculations
- **Dashboard** - Class-wise summaries, attendance distribution, and quick actions
- **Class View** - Sortable and filterable tables with attendance grades (Excellent/Good/Average/Poor)
- **Student Detail** - Individual attendance history with visual heatmap and monthly filters
- **Timetable** - Weekly schedule with grid and list views, today's schedule highlighted
- **CLOs & PLOs** - Course/Program Learning Outcomes with mapping matrix and coverage analysis
- **Exam Schedule** - Upcoming and past exams with type filters (midterm/final/quiz/practical)
- **Grades** - Student performance tracking with class average, pass rate, and letter grades
- **Announcements** - Notice board with priority levels (high/medium/low), pinned notices, and creation modal
- **Leave Management** - Student leave requests with approve/reject actions and status tracking
- **Role-Based Access** - Teacher and Admin views with different permissions
- **Responsive Design** - Works across desktop, tablet, and mobile devices

## Tech Stack

- **React 19** with JSX
- **Vite 8** for build tooling
- **React Router v7** for navigation
- **CSS** custom properties with Navy Blue + Electric Blue + White theme
- **Mock API** with simulated async delays

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.edu | admin123 |
| Teacher 1 | omer@school.edu | teacher123 |
| Teacher 2 | check@school.edu | teacher123 |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
