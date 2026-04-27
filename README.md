# GitHub Contact Finder

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-orange)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)

## 📝 Overview
**GitHub Contact Finder** is a powerful, streamlined tool designed to help recruiters, developers, and researchers bridge the gap between GitHub profiles and professional outreach. By leveraging the GitHub REST API and analyzing public commit metadata, this application uncovers public email addresses and comprehensive social data that are often hidden from the standard profile view.

Built with a focus on speed and user experience, the platform provides a centralized dashboard for developer intelligence, making networking and talent sourcing more efficient than ever.

## ✨ Features
- 🔎 **Deep Search:** Instantly fetch user data by GitHub username.
- 📧 **Email Discovery:** Extract public emails from recent commit history (where available).
- 👤 **Full Profile Insight:** View names, detailed bios, and high-resolution avatars.
- 🌐 **Web Presence:** Direct links to personal websites, portfolios, and blogs.
- 🐦 **Social Integration:** Quick access to Twitter (X) and other linked social handles.
- 📦 **Repository Metrics:** Real-time count of public repositories and gists.
- 👥 **Social Proof:** Track follower and following counts to gauge community impact.
- 📱 **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛠 Tech Stack
- **Framework:** ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
- **Styling:** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
- **Language:** ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
- **State Management:** ![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
- **API:** GitHub REST API


## ⚙️ Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [GitHub Personal Access Token](https://github.com/settings/tokens) (Optional, but recommended to avoid rate limiting)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-contact-finder.git
   cd github-contact-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **No need to Set up environment variables**
   <!-- Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ``` -->

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Usage
1. Enter a valid GitHub username into the search bar.
2. The application will fetch the user's general profile.
3. Simultaneously, the system scans the user's recent public push activities to find email addresses associated with their Git commits.
4. View the organized profile card with all available contact information and social links.

## 🔌 API Documentation
The application interacts primarily with the GitHub REST API.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users/{username}` | Fetches basic profile information. |
| `GET` | `/users/{username}/events/public` | Scans public activity for commit emails. |

### Example Response (Internal State)
```json
{
  "username": "octocat",
  "email": "octocat@github.com",
  "bio": "GitHub's mascot",
  "public_repos": 8,
  "followers": 5000,
  "links": {
    "twitter": "https://twitter.com/github",
    "blog": "https://github.blog"
  }
}
```

## 🔧 Configuration
To increase the API rate limit from 60 requests/hour to 5,000 requests/hour, configure your GitHub Token:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_GITHUB_TOKEN` | Personal Access Token for GitHub API | `null` |
| `NEXT_PUBLIC_API_URL` | Base URL for GitHub API | `https://api.github.com` |

## 📂 Folder Structure
```text
github-contact-finder/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── store/          # Redux Toolkit slices and store config
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API integration logic
│   ├── types/          # TypeScript interfaces/types
│   ├── utils/          # Helper functions
│   └── app/            # Next.js App Router (Pages & Layouts)
├── .env.example        # Template for env variables
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## ✉️ Contact
**Project Lead** - [@KrrishSR4](https://github.com/KrrishSR4)  
**Project Link:-** https://githubcontactfinder.web.app
