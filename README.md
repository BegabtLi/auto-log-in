# Automated Game Login Script

This script automates the process of logging into a game website, selecting a region, and watching a live stream to earn rewards. It is scheduled to run at a specific time and for a specified duration.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- Google Chrome browser

## Setup Instructions

### Step 1: Install Node.js

If you do not have Node.js installed, download and install it from the [official website](https://nodejs.org/).

### Step 2: Clone the Repository

Clone the repository or download the script files.

### Step 3: Install Required Libraries

Open a terminal (or Command Prompt) and navigate to the directory containing the script files. Run the following command to install the necessary libraries:

npm install selenium-webdriver chromedriver
npm install node-schedule
npm install yargs

### Step 4: Running the script

To run the script, use the following command with the appropriate parameters:

```
node auto-login.js --start-time "YYYY-MM-DDTHH:mm:ssZ" --duration "HH:MM" --email "your_email@example.com" --password "your_password"

```
`--start-time`: Start time of the event in ISO format (UTC) (e.g., "2024-07-16T10:55:00Z")
`--duration`: Duration of the event in HH:MM format (e.g., "03:00" for 3 hours)
`--email`: Your email address for login
`--password`: Your password for login

#### Example
```
node auto-login.js --start-time "2024-07-16T10:55:00Z" --duration "03:00" --email "your_email@example.com" --password "your_password"
```
Make sure the start-time is in ISO format (YYYY-MM-DDTHH:mm:ssZ) and the duration is in HH:MM format.

#### Script Explanation
The script does the following:

1. Opens the game website.
2. Clicks the "Log In" button.
3. Selects the "North America" region.
4. Logs in using the provided email and password.
5. Handles the cookie consent banner if it appears.
6. Keeps the browser tab open for the specified duration to watch the live stream.

#### Debugging
If you encounter issues, run the script with the --verbose flag to get more detailed logging:
```
node auto-login.js --start-time "2024-07-16T10:55:00Z" --duration "03:00" --email "your_email@example.com" --password "your_password" --verbose
```

