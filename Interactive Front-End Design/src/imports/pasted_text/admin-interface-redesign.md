Redesign the Guild Master / Admin interface for the “Downtown” university platform to make it easier to use, less crowded, and more app-like.

Main Goal:
The current admin page has too many sections on one screen. Convert it into a simple, task-based admin app with clear navigation and separate pages. The admin should immediately understand where to go to create missions, review proof, issue certificates, and track students.

Keep the same visual style:
- Deep navy background
- Gold highlights
- Cyan system accents
- Emerald success states
- Glassmorphism cards
- Rounded corners
- Premium university SaaS style
- Same style as the Login Page, Vanguard Page, and current Admin Page

Important:
Remove the “all-in-one dashboard” feeling. The interface should feel simple, calm, and easy to navigate.

Create a left sidebar navigation with these items:
1. Dashboard
2. Missions
3. Proof Reviews
4. Certificates
5. Students
6. Leaderboard
7. Settings

The active navigation item should have a gold/cyan glow.
Add a notification badge beside “Proof Reviews” showing pending reviews.
Example:
Proof Reviews · 9

Page 1: Admin Dashboard

Make the Dashboard a simple overview page only.

Top header:
- Club or department name
- Role badge: Guild Master
- Verified university organization badge
- Small profile/avatar menu

Main dashboard cards:
- 9 Pending Proof Reviews
- 12 Active Missions
- 42 Certificates Issued
- 18,420 Points Awarded
- 6 Students Eligible for Certificates

Add a “Today’s Priority” section.
This should show the most urgent admin tasks:
- Review 9 pending proof submissions
- Approve 6 certificate requests
- Publish 2 draft missions

Add quick action buttons:
- Create Mission
- Review Proof
- Issue Certificate
- View Students

Do not include long tables, certificate builder forms, full analytics charts, or full student lists on the dashboard.

Page 2: Missions

Create a clean Missions page.

Purpose:
Admins create and manage missions.

Layout:
Top section:
- Page title: “Missions”
- Subtitle: “Create recognition missions and reward students with points, badges, and certificate progress.”
- Primary button: “Create Mission”

Mission cards or table should show:
- Mission title
- Mission type
- Status: Draft / Active / Completed
- Points reward
- Certificate linked
- Participants
- Deadline
- Button: View / Edit

Add filters:
- All
- Draft
- Active
- Completed
- Mentorship
- Volunteer
- Event Support

Create Mission flow:
Make the mission creation form appear as a clean step-by-step wizard, not a huge form.

Step 1: Mission Basics
- Mission title
- Description
- Mission type
- Deadline

Step 2: Reward Setup
- Points reward
- Volunteer hours
- Badge reward
- Certificate progress

Step 3: Proof Requirements
- Required proof type
- Approval instructions

Step 4: Review & Publish
- Mission preview
- Publish button

Page 3: Proof Reviews

Create a dedicated Proof Reviews page.

This should be the easiest and fastest page to use.

Page title:
“Proof Reviews”

Subtitle:
“Review student submissions and award points or certificate progress.”

Show proof submissions as review cards.

Each proof card should include:
- Student name
- Student rank
- Mission title
- Submission time
- Proof type
- Proof preview
- Points to award
- Certificate progress affected
- Status: Pending Review

Admin buttons:
- Approve
- Reject
- Request Resubmission
- View Student Profile

When the admin clicks Approve, show a confirmation panel:
“Approve this proof and award +150 points?”
“Add progress to Peer Mentor Certificate?”
Button:
“Approve & Award Points”

Use emerald for approved states.
Use red only for rejection.
Use gold for points and certificate rewards.

Page 4: Certificates

Create a dedicated Certificates page.

Purpose:
Admins manage certificate templates and issue certificates.

Split the page into 3 simple tabs:
1. Templates
2. Eligible Students
3. Issued Certificates

Templates tab:
Show certificate template cards:
- Peer Mentor Certificate
- Campus Leadership Certificate
- Volunteer Excellence Certificate
- Event Ambassador Certificate
- Hackathon Support Certificate
- Community Contributor Certificate

Each card should show:
- Certificate name
- Requirement summary
- Number of eligible students
- Status: Active / Draft
- Button: Edit / Preview

Eligible Students tab:
Show students who qualify for certificates.

Each card:
- Student name
- Rank
- Certificate eligible for
- Requirement progress
- Missions completed
- Points earned
- Button: Issue Certificate

Issued Certificates tab:
Show already issued certificates:
- Student name
- Certificate name
- Issue date
- Verification ID
- Button: View Certificate

Add a certificate preview modal:
- University logo placeholder
- Certificate title
- Student name placeholder
- Issue date
- Verification ID
- Signature area
- QR code placeholder

Page 5: Students

Create a dedicated Students page.

Purpose:
Admins track student achievements.

Top summary cards:
- Total active students
- Top ranked student
- Students near next rank
- Certificates earned this month

Student table/card list:
- Student name
- Current rank
- Total points
- Missions completed
- Mentorship sessions
- Certificates earned
- Leaderboard position
- Trust / approval rate

Add filters:
- Rank
- Certificate status
- Mission type
- Points range

Add search bar:
“Search students…”

Page 6: Leaderboard

Create a simple Leaderboard page.

Show:
- Top contributors
- Most active mentors
- Fastest rising students
- Top mission completers

Leaderboard row:
- Rank number
- Student avatar
- Student name
- Vanguard rank
- Points
- Certificates earned

Add a small insight section:
- “32 students moved up a rank this month”
- “Peer mentorship generated 4,200 points”
- “12 students are close to unlocking certificates”

UX Improvements:
- Use progressive disclosure. Do not show everything at once.
- Use tabs, modals, and step-by-step forms.
- Keep the dashboard simple.
- Put complex actions on dedicated pages.
- Make the most important action visible: Proof Reviews.
- Use clear empty states.
- Use large readable buttons.
- Use simple labels.
- Avoid overwhelming charts.
- Reduce the number of cards on each page.
- Use consistent spacing and alignment.

Microinteractions:
- Sidebar hover glow
- Smooth page transitions
- Approve proof success animation
- Certificate issued animation
- Mission published success toast
- Notification badge animation for pending reviews

Final Result:
The admin interface should become easier to navigate and more practical for real use. It should feel like a clean admin app, not a crowded control center. The admin should be able to complete the main tasks quickly: create missions, review proof, issue certificates, and track students.