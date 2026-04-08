# BhcJobs - React Native Job Portal

A modern, fast, and feature-rich job portal mobile application built with **React Native**, **Expo Router**, and **NativeWind** (Tailwind CSS).

## ✨ Features

- **Dynamic Landing Page**: Showcases trending jobs, featured companies, and top industries fetched directly from the backend API.
- **Modern User Interface**: Responsive and beautiful UI built from scratch using NativeWind (Tailwind styling).
- **Authentication Flow**:
  - Login securely.
  - Interactive smart registration.
  - OTP (One-Time Password) phone verification flow during sign-up.
- **In-App Notifications**: Uses `react-native-toast-message` to provide non-intrusive feedback for success and error conditions instead of native alerts.
- **Enhanced UI Components**: Fully customized components such as `JobCard`, `CompanyCard`, `IndustryCard`, `Button`, and `Input`.
- **Smooth Animations**: Integrated micro-interactions and screen transitions via `react-native-reanimated`.

## 🚀 Setup Steps

### Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js** 
- **npm** or **yarn** or **pnpm**
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go App** installed on your physical mobile device (Android or iOS), or an Android Emulator / iOS Simulator configured on your machine.

### Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone <your-repo-url>
   cd BhcJobs
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the Metro Bundler**:

   ```bash
   npx expo start -c
   ```


4. **Run the App**:
   - Open the **Expo Go** app on your phone and scan the QR code displayed in your terminal.
