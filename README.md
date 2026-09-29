# AZ-104 Practice Hub

A browser-based Microsoft Azure Administrator (AZ-104) practice platform maintained by **Manav Jagtap**.

The project provides topic-wise mock exams, an overall AZ-104 mock exam, normal question practice, a dedicated visual question bank, answer review, and student result tracking.

## Features

- **1,273** AZ-104 source question records
- **5** AZ-104 topic-wise practice domains
- Random **50-question / 50-mark** topic mock exams
- Random **50-question Overall AZ-104 Mock**
- **60-minute timer**
- Single-select and multi-select questions
- Question navigation palette
- Mark for Review
- Submit confirmation for unanswered questions
- Score and percentage calculation
- Correct, Wrong, and Unanswered question summary
- Detailed answer review with source explanations
- Dedicated Normal Question Bank
- Dedicated Visual Question Bank
- Topic-based question filtering
- Student Name and Email entry
- Automatic student result tracking using Google Sheets
- Responsive interface
- GitHub Pages compatible

## Question Bank

The complete question bank contains **1,273 source records** organized into five AZ-104 domains.

| AZ-104 Topic | Normal | Visual | Total |
|---|---:|---:|---:|
| Manage identities and governance in Azure | 185 | 99 | 284 |
| Configure and manage virtual networks | 181 | 225 | 406 |
| Implement and manage storage | 102 | 92 | 194 |
| Deploy and manage Azure compute resources | 184 | 114 | 298 |
| Monitor and back up Azure resources | 34 | 57 | 91 |
| **Total** | **686** | **587** | **1,273** |

## Practice Structure

### Normal Questions

The Normal Question Bank contains **686 questions** with machine-readable answer choices.

These questions are used for:

- Topic-wise mock exams
- Overall AZ-104 mock exam
- Single-select practice
- Multi-select practice
- Automatic scoring
- Answer review

Each mock exam randomly selects up to **50 questions** from the applicable normal-question pool.

### Visual Questions

The Visual Question Bank contains **587 source-format records** involving visual or layout-dependent question formats such as:

- HOTSPOT
- Drag and Drop
- Exhibit-based questions
- Table-based questions
- Image-based questions
- Hot Area
- Select and Place

Visual questions are maintained in a dedicated practice bank and are not mixed into the automatically scored normal mock exams.

Available source visuals, choices, answers, and explanations can be reviewed where present in the dataset.

## Mock Exam System

The platform provides:

### Topic Mock Exams

Students can practice questions from any of the five AZ-104 topic areas individually.

Each topic mock contains up to:

**50 Questions | 50 Marks | 60 Minutes**

### Overall AZ-104 Mock

The Overall Mock randomly selects questions across the normal question bank to simulate broader AZ-104 practice.

**50 Questions | 50 Marks | 60 Minutes**

## Result System

After submitting a mock exam, the platform calculates:

- Score
- Total Marks
- Percentage
- Correct Answers
- Wrong Answers
- Unanswered Questions
- Time Taken

Students can also review their submitted answers and the available source explanations.

## Result Tracking

Student mock-exam results are automatically recorded using **Google Apps Script and Google Sheets**.

Stored result information includes:

- Date / Time
- Student Name
- Email
- Exam
- Score
- Total
- Percentage
- Correct
- Wrong
- Unanswered
- Time Taken

The result sheet is maintained separately from the public website.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- JSON
- Google Apps Script
- Google Sheets
- Git
- GitHub
- GitHub Pages

## Project Structure

```text
AZ104-Practice-Hub/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       └── questions.js
├── data/
│   └── questions.json
├── docs/
│   └── AZ104_Practice_Hub_Documentation.pdf
├── README.md
├── LICENSE
└── .gitignore
```

## Run Locally

No backend server or build process is required for the main website.

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in a modern web browser.
4. Start practicing.

## Deploy on GitHub Pages

1. Open the GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch.
5. Select `/ (root)`.
6. Save the configuration.
7. GitHub Pages will publish the website and provide the live URL.

## Data and Content Note

The practice-question content was compiled from study materials supplied for this project.

Source wording and source answers are retained unless a verified correction is explicitly tagged.

Some source records depend on exhibits, diagrams, screenshots, tables, HOTSPOT areas, Drag-and-Drop layouts, or other visual elements. These questions are maintained separately in the Visual Question Bank when they are not suitable for normal automatic scoring.

## Disclaimer

This is an independent educational practice project created for learning and exam preparation.

It is **not affiliated with or endorsed by Microsoft**.

Microsoft Azure and AZ-104 are trademarks of Microsoft Corporation.

Third-party practice questions should not be treated as a substitute for the current official Microsoft Learn AZ-104 study materials.

## Maintainer

**Manav Jagtap**