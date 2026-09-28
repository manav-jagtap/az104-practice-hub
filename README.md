# AZ-104 Practice Hub

A browser-based Microsoft Azure Administrator (AZ-104) practice project maintained by **Manav Jagtap**.

## Features
- 1,273 source question records from the supplied AZ-104 study PDFs
- 5 topic-wise practice domains
- Random 50-question / 50-mark topic mocks
- Random 50-question overall AZ-104 mock
- 60-minute timer
- Single-select and multi-select interaction
- Question palette and mark-for-review
- Score, percentage, answered/unanswered summary
- Answer review with source explanations
- Complete question-bank browser with topic filtering
- Responsive static site suitable for GitHub Pages

## Question-bank breakdown
- Manage identities and governance in Azure: **284**
- Deploy and manage Azure compute resources: **298**
- Implement and manage storage in Azure: **194**
- Configure and manage virtual networks for Azure administrators: **406**
- Monitor and back up Azure resources: **91**

## Project structure
```text
AZ104-Practice-Hub/
├─ index.html
├─ assets/
│  ├─ css/styles.css
│  └─ js/
│     ├─ app.js
│     └─ questions.js
├─ data/questions.json
├─ docs/AZ104_Practice_Hub_Documentation.pdf
├─ README.md
├─ LICENSE
└─ .gitignore
```

## Run locally
Open `index.html` in a modern browser. No backend or build step is required.

## Deploy on GitHub Pages
1. Create a new GitHub repository, for example `az104-practice-hub`.
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. GitHub will provide the public Pages URL after deployment.

## Data / content note
The practice-question content was compiled from study materials supplied for this project. Source wording and source answers are retained unless a verified correction is explicitly tagged. Some source records may depend on an exhibit, diagram, screenshot, table, or other PDF layout that is not fully represented by extracted text; those records remain in the bank and are marked when detected.

## Disclaimer
This is an independent educational practice project. It is not affiliated with or endorsed by Microsoft. Microsoft Azure and AZ-104 are trademarks of Microsoft Corporation. Do not treat third-party practice questions as a substitute for the current official Microsoft Learn study guide.

## Maintainer
**Manav Jagtap**
