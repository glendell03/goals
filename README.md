# Goals - React Native Goal Tracking App 🎯
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/29d20df2-849c-496e-9330-f9f98ea14b0b" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/73b7ca9c-5d12-4c4c-902d-b7e2e0186084" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/166f9298-f311-4110-8720-0241fde77df3" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/148341a1-03c9-49fd-bb2d-5d2d0794cc5e" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/565d125f-98a1-4030-8025-7fa51e631cfc" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/68457ddd-54a2-45d1-a5a3-49eade9700b9" />




## ✨ Features

- **📊 Dashboard** - Beautiful stats overview with completion rates and streaks
- **🎯 Goal Management** - Create, edit, delete, and track goal progress
- **📈 Analytics** - Visual progress tracking 
- **💫 Quote of the Day** - Daily inspiration from external API
- **👤 Profile & Subscription** - User profile with Stripe-ready subscription plans
- **🎨 Premium UI** - Dark theme with purple gradients and smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- iOS Simulator (for iOS development)
- Android Studio & Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/goals.git
   cd goals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Prebuild the project**
   ```bash
   npx expo prebuild --clean
   ```

4. **Run on iOS**
   ```bash
   npx expo run:ios
   ```

5. **Run on Android**
   ```bash
   npx expo run:android
   ```

### Development Mode

For faster development with hot reload:

```bash
npx expo start
```

Then press `i` for iOS simulator or `a` for Android emulator.

## 🛠️ Tech Stack

### Core Framework
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **TypeScript** - Type safety and better developer experience

### UI & Styling
- **NativeWind** - Tailwind CSS for React Native styling
- **Lucide React Native** - Beautiful, consistent icons
- **Custom Components** - Reusable UI component library

### State Management
- **Zustand** - Lightweight state management with persistence
- **React Hook Form** - Efficient form handling and validation

### Data & Storage
- **React Native MMKV** - High-performance key-value storage

### Navigation & Gestures
- **Expo Router** - File-based routing system
- **React Native Gesture Handler** - Native gesture recognition
- **React Native Reanimated** - Smooth animations and transitions
- **@gorhom/bottom-sheet** - Native bottom sheet modals


## 🎨 Design System

- **Color Scheme**: Dark theme with purple (#B794F6) accents
- **Typography**: Hierarchical text system with proper contrast
- **Components**: Consistent spacing, shadows, and border radius
- **Animations**: Smooth transitions and micro-interactions
- **Icons**: Lucide icon set for consistency

## ⚡ Performance Optimizations

- **MMKV Storage**: Lightning-fast native storage
- **Zustand State**: Minimal re-renders and efficient updates

## 🔧 Known Limitations

- **Mock Data**: Profile data is currently static
- **API Integration**: Quote API requires internet connection
- **Subscription**: Stripe integration is structured but not live
- **Notifications**: Push notification system not implemented
- **Offline Mode**: Limited offline functionality

