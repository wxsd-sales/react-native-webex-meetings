# React Native App with Webex Meetings

This is a proof-of-concept application that enables users to join into a video call meeting using Webex JS SDK, facilitating a connection between the requester and the agent.

</br >

# Table Of Contents

- [Overview](#overview)
- [Setup](#setup)
- [License](#license)
- [Contact](#contact)

<br />

# Overview

This react native application creates a meeting, create start and join links, sends access token and start link to finesse using task routing APIs and then joins Webex Meeting using Web View.

# Setup

## Prerequisites

Make sure you follow these [setup instructions](https://reactnative.dev/docs/set-up-your-environment) before you run the project.

## Installation

Open a new terminal window and follow the instructions below to setup the project locally
1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/react-native-webex-meetings && cd react-native-webex-meetings
   ```

2. Copy `.env.example` file as `.env`:

   ```
   cp .env.example .env
   ```
   - ACCESS_TOKEN: Please follow these [instructions](https://developer.webex.com/docs/service-apps-as-g2g-meeting-facilitator-guide) to create a service app and obtain access token. Then add this access token to the env file.
   - SERVER_URL: This is the URL of the web server containing Webex JS SDK which renders Webex Meetings

3. Start the application using:
   For android:
   ```
   npx react-native run-android
   ```
   For IOS:
   ```
   npx react-native run-ios
   ```
   Make sure you have emulators or physical device connected to run these.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?cc=ashessin@cisco.com&subject=Azure%20Group%20Sync).
