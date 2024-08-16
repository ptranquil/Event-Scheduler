# Node.js Event Scheduler using Google Calendar API

This project is a Node.js-based event scheduler that utilizes the Google Calendar API to manage and schedule events.

## Features

- **Event Scheduling**: Schedule events on your Google Calendar.
- **Google Calendar Integration**: Seamless integration with Google Calendar API for event management.
- **Authentication**: Secure OAuth2 authentication with Google.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- A Google Cloud project with the Google Calendar API enabled.
- OAuth2 credentials set up in Google Cloud Console.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ptranquil/Event-Scheduler.git
    ```

2. **Navigate to the project directory:**
   ```bash
   cd Event-Scheduler
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Create Client Id, Client Secret & API Keys:**
    - Go to [Google Cloud Console](https://console.cloud.google.com/)
    - Create new project and enable **Google Calendar API** from **APIs and Services** > Enable APIs and Services
    - In OAuth consent screen, fill in the details (App Name, Support Email), add scopes as userinfo.email and userinfo.profile 
    - Add a test user
    - Go to **Credentials** and add OAuth Client ID, add redirect url as **http://localhost:3000/auth/redirect**
    - You will get the client ID and client Secret
    - Next Create API key and keep the same

5. **Update environment details**

6. **Start the project:**
    ```bash
    npm start
    ```

