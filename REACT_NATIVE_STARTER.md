# React Native Starter Implementation

## Quick Start Guide

### 1. Create React Native Project
```bash
# Create new project
npx react-native@latest init FlatShareMobile --template react-native-template-typescript

# Navigate to project
cd FlatShareMobile

# Install essential dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
npm install @react-native-async-storage/async-storage axios
npm install react-native-vector-icons react-native-maps
npm install react-native-image-picker react-native-websocket
```

### 2. Copy Existing Types
Create `src/types/` directory and copy your existing types:

```typescript
// src/types/user/index.ts
export interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNo: string;
  gender: 'Male' | 'Female' | 'Other';
  description: string | null;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  verified: boolean;
  isLoggedIn: boolean;
  requirementListed: boolean;
  connections: number[];
  propertySlug: string;
}

export interface ISendOTPPayLoad {
  phoneNo: string;
}

export interface IVerifyOTPPayLoad {
  phoneNo: string;
  otp: string;
}
```

### 3. Copy API Structure
```typescript
// src/api/auth/index.ts
import api from '../api';

export const sendOtpApi = (payload: ISendOTPPayLoad) => {
  return api.post('/auth/send-otp', payload);
};

export const verifyOtpApi = (payload: IVerifyOTPPayLoad) => {
  return api.post('/auth/verify-otp', payload);
};
```

### 4. Create API Configuration
```typescript
// src/api/index.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8080/api'; // Your API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### 5. Create Basic Screens

#### Authentication Screen
```typescript
// src/screens/AuthScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { sendOtpApi, verifyOtpApi } from '../api/auth';

const AuthScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await sendOtpApi({ phoneNo: phoneNumber });
      if (response.data.status) {
        setIsOtpSent(true);
        Alert.alert('Success', `OTP sent: ${response.data.data.otp}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtpApi({
        phoneNo: phoneNumber,
        otp: otp,
      });
      if (response.data.status) {
        // Navigate to main app
        Alert.alert('Success', 'Login successful!');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatShare</Text>
      
      {!isOtpSent ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendOtp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOtp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#6c5ce7',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6c5ce7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
```

### 6. Setup Navigation
```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'FlatShare' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

### 7. Update App.tsx
```typescript
// App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return <AppNavigator />;
};

export default App;
```

## Next Steps

### 1. Property Listing Screen
- Implement property search
- Add filters (location, price, gender)
- Show property details

### 2. User Profile Screen
- Display user information
- Edit profile functionality
- Upload profile image

### 3. Chat Screen
- Implement WebSocket connection
- Real-time messaging
- Message history

### 4. Maps Integration
- Show nearby properties
- Location-based search
- Property markers

## Testing Your Setup

1. **Run the app**:
   ```bash
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

2. **Test authentication**:
   - Enter a phone number
   - Verify OTP functionality
   - Check API integration

3. **Debug common issues**:
   - Metro bundler issues
   - iOS simulator problems
   - Android emulator setup

## Configuration Files

### iOS Configuration
```bash
# Install iOS dependencies
cd ios && pod install && cd ..
```

### Android Configuration
Update `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.flatshare.mobile"
        minSdkVersion 21
        targetSdkVersion 33
    }
}
```

## Environment Setup

### Required Tools
- Node.js (v16 or higher)
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- JDK 11

### Development Environment
```bash
# Install React Native CLI globally
npm install -g @react-native-community/cli

# Check environment
npx react-native doctor
```

This starter guide provides the foundation to begin developing your React Native app while leveraging your existing web application's APIs and data structures. 