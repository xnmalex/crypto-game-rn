# 💸 Crypto Game – Trader Simulation App

A gamified **crypto trading simulator** built in **React Native** with offline-first architecture, Zustand global state, and modern UI/UX design.

Users start with **$5,000 virtual balance**, trade real-time crypto data, and compete on a **leaderboard** based on their portfolio value. Perfect for learning or testing trading strategies without financial risk.

---

## 📸 Screenshots

| Username Input | Crypto List | Trade Screen | Leaderboard | Profile   |
|----------------|-------------|---------------|--------------|--------------|
| ![Username](./assets/screenshots/username.png) | ![Crypto List](./assets/screenshots/crypto-list.png) | ![Trade](./assets/screenshots/trade.png) | ![Leaderboard](./assets/screenshots/leaderboard.png) | ![Profile](./assets/screenshots/profile.png)

## 📱 Features

### 👤 Trader Setup
- Input custom **username**
- Persist profile and balance locally

### 📈 Crypto List
- Realtime **price and 24h change**
- Local + remote sync
- Search and filter functionality

### 💱 Trade Screen
- Trade via **Buy / Sell**
- Dropdown to select crypto
- Track balance 

### 🏆 Leaderboard
- View top traders by net worth

### 🧾 Profile & History
- Rounded profile image + fallback icon
- Account creation date
- List of all past transactions
- Logout function


## 🧠 Architecture

src/

```
├── api/
├── components/ 
├── features/ 
│ └── trade/ 
├── screens/ 
├── store/ 
├── utils/ 
├── navigation/ 
```


## ⚙️ Tech Stack

| Stack           | Description |
|------------------|-------------|
| React Native CLI | Core app framework |
| Zustand           | State management (with persistence) |
| React Navigation  | Tab + stack navigation |
| AsyncStorage      | Local offline storage |
| Axios             | API client |
| Jest + RTL        | Unit testing |
| Ionicons          | Icon set |
| TypeScript        | Type-safe everywhere |

---

## 🧪 Unit Testing

Key business logic like `handleTrade()` is tested with Jest:

- ✅ Valid buy/sell updates
- ✅ Balance enforcement
- ✅ ID and timestamp generation
- ✅ Zustand store state verification

Run tests:

```bash
npm test
```

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.


## Step 1: Build and run your app

Install dependencies from `package.json`
```sh
npm install
```

you can manually start the emulator from command line

```sh
 emulator -avd "your emulator name for eg: Pixel_9_Pro_XL"
```

open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```


### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

👨‍💻 Author

Made with ❤️ by [xnmalex](https://github.com/xnmalex)
