# React Native App Development Guide for FlatShare

## Overview
This guide provides a comprehensive approach to creating a React Native app for your flat-sharing platform, leveraging your existing Next.js web application's architecture and APIs.

## Project Structure

### Recommended React Native Project Structure
```
flat-share-mobile/
├── src/
│   ├── api/                    # API calls (reuse from web)
│   ├── components/             # Reusable UI components
│   ├── screens/               # Screen components
│   ├── navigation/            # Navigation configuration
│   ├── hooks/                 # Custom React hooks
│   ├── context/               # Global state management
│   ├── types/                 # TypeScript definitions
│   ├── utils/                 # Utility functions
│   ├── theme/                 # Theme configuration
│   └── assets/                # Images, fonts, etc.
├── android/                   # Android-specific files
├── ios/                       # iOS-specific files
└── package.json
```

## Tech Stack Recommendations

### Core Dependencies
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "react-native-safe-area-context": "^4.7.0",
    "react-native-screens": "^3.25.0",
    "react-native-gesture-handler": "^2.12.0",
    "react-native-reanimated": "^3.5.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "axios": "^1.7.2",
    "react-native-vector-icons": "^10.0.0",
    "react-native-maps": "^1.7.0",
    "react-native-image-picker": "^5.6.0",
    "react-native-websocket": "^1.0.0",
    "react-native-push-notification": "^8.1.1",
    "react-native-splash-screen": "^3.3.0",
    "react-native-keyboard-aware-scroll-view": "^0.9.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.72.0",
    "typescript": "^5.0.0",
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0",
    "@babel/runtime": "^7.20.0",
    "@react-native/metro-config": "^0.72.0",
    "metro-react-native-babel-preset": "^0.76.0"
  }
}
```

## Key Components to Implement

### 1. Navigation Structure
```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

### 2. Global State Management
```typescript
// src/context/AppContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { IUserData } from '../types/user';

interface AppState {
  userData: IUserData | null;
  isAuthenticated: boolean;
  chatRooms: any[];
  connections: any[];
  notifications: any[];
}

const initialState: AppState = {
  userData: null,
  isAuthenticated: false,
  chatRooms: [],
  connections: [],
  notifications: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
```

### 3. API Integration
```typescript
// src/api/index.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-domain.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for authentication
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      // Navigate to login
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4. Authentication Screens
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
import { useAppContext } from '../context/AppContext';

const AuthScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();

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
        // Store token and user data
        await AsyncStorage.setItem('authToken', response.data.data.token);
        dispatch({ type: 'SET_USER_DATA', payload: response.data.data });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
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

### 5. Property Listing Screen
```typescript
// src/screens/SearchScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SearchPropertyCard } from '../types/property';
import { getPropertyListApi } from '../api/property';

const SearchScreen: React.FC = () => {
  const [properties, setProperties] = useState<SearchPropertyCard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getPropertyListApi({
        lat: 28.6139, // Default to Delhi
        lng: 77.2090,
        radiusKm: 10,
      });
      setProperties(response.data.data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPropertyCard = ({ item }: { item: SearchPropertyCard }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.userImage }}
        style={styles.userImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.rent}>₹{item.rent}/month</Text>
        <Text style={styles.distance}>{item.distance}km away</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.slug}
        refreshing={loading}
        onRefresh={fetchProperties}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginBottom: 5,
  },
  distance: {
    fontSize: 12,
    color: '#999',
  },
});

export default SearchScreen;
```

### 6. Chat Implementation
```typescript
// src/screens/ChatScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useChatWebSocket } from '../hooks/useChatWebSocket';

const ChatScreen: React.FC = () => {
  const { state } = useAppContext();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const userId = state.userData?.id?.toString() || '';
  const token = state.userData?.token || '';

  const { connected, sendMessage } = useChatWebSocket({ userId, token });

  const handleSendMessage = () => {
    if (message.trim() && connected) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.senderId === userId ? styles.myMessage : styles.otherMessage
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#6c5ce7',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
```

## Key Features to Implement

### 1. Location Services
- Use `react-native-maps` for property search
- Implement geolocation for nearby properties
- Add location-based filtering

### 2. Push Notifications
- Configure Firebase Cloud Messaging
- Handle chat notifications
- Property match notifications

### 3. Image Handling
- Use `react-native-image-picker` for profile photos
- Implement image upload for property listings
- Add image compression

### 4. Real-time Features
- WebSocket integration for chat
- Real-time property updates
- Live connection status

## Migration Strategy

### Phase 1: Core Features
1. Authentication (OTP-based)
2. Property listing and search
3. User profiles
4. Basic navigation

### Phase 2: Social Features
1. Chat functionality
2. Connection management
3. Notifications

### Phase 3: Advanced Features
1. Maps integration
2. Image uploads
3. Push notifications
4. Offline support

## API Reusability

Your existing Next.js API structure can be reused:
- Authentication endpoints
- Property management
- User profiles
- Chat WebSocket connections

## Development Commands

```bash
# Create new React Native project
npx react-native@latest init FlatShareMobile --template react-native-template-typescript

# Install dependencies
npm install

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android

# Start Metro bundler
npx react-native start
```

## Testing Strategy

1. **Unit Tests**: Jest for component testing
2. **Integration Tests**: Detox for E2E testing
3. **API Testing**: Mock API responses
4. **Device Testing**: Test on multiple devices

## Deployment

### iOS
- Configure App Store Connect
- Build with Xcode
- Submit for review

### Android
- Generate signed APK
- Upload to Google Play Console
- Configure Firebase for notifications

## Performance Optimization

1. **Image Optimization**: Use FastImage for better performance
2. **List Optimization**: Implement FlatList with proper keyExtractor
3. **Memory Management**: Proper cleanup in useEffect
4. **Bundle Size**: Use Hermes engine for smaller bundle

## Security Considerations

1. **API Security**: Use HTTPS for all API calls
2. **Token Storage**: Secure storage for authentication tokens
3. **Input Validation**: Validate all user inputs
4. **Certificate Pinning**: Implement SSL certificate pinning

This guide provides a solid foundation for creating a React Native app that maintains feature parity with your web application while leveraging mobile-specific capabilities. 