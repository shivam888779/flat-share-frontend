# React Native App Deployment Guide

## Overview
This guide covers the complete deployment process for your FlatShare React Native app to both iOS App Store and Google Play Store, including preparation, building, and submission steps.

## Pre-Deployment Checklist

### 1. App Configuration
- [ ] Update app version in `package.json`
- [ ] Configure app icons and splash screens
- [ ] Set up app signing certificates
- [ ] Configure bundle identifiers
- [ ] Update app metadata (name, description, keywords)
- [ ] Test on multiple devices and screen sizes
- [ ] Ensure all features work offline/online
- [ ] Complete security audit
- [ ] Performance optimization

### 2. Required Assets
- [ ] App icon (1024x1024 for iOS, 512x512 for Android)
- [ ] Screenshots for different device sizes
- [ ] App description and keywords
- [ ] Privacy policy URL
- [ ] Support contact information
- [ ] Marketing materials

## iOS Deployment (App Store)

### 1. Prerequisites
```bash
# Install Xcode from Mac App Store
# Install iOS Simulator
# Install Command Line Tools
xcode-select --install

# Install React Native CLI
npm install -g @react-native-community/cli
```

### 2. App Configuration

#### Update iOS Bundle Identifier
```xml
<!-- ios/FlatShareMobile/Info.plist -->
<key>CFBundleIdentifier</key>
<string>com.flatshare.mobile</string>
```

#### Configure App Icons
```bash
# Generate icons using react-native-vector-icons or similar
# Place icons in ios/FlatShareMobile/Images.xcassets/AppIcon.appiconset/
```

#### Update App Name and Version
```xml
<!-- ios/FlatShareMobile/Info.plist -->
<key>CFBundleDisplayName</key>
<string>FlatShare</string>
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

### 3. Code Signing Setup

#### Create Apple Developer Account
1. Sign up at [developer.apple.com](https://developer.apple.com)
2. Enroll in Apple Developer Program ($99/year)
3. Create App ID in Developer Portal

#### Configure Certificates
```bash
# Open Xcode
# Go to Preferences > Accounts
# Add your Apple ID
# Download certificates automatically
```

#### Create Provisioning Profile
1. Go to Apple Developer Portal
2. Create App ID for your bundle identifier
3. Create Development and Distribution certificates
4. Create Provisioning Profile

### 4. Build Configuration

#### Update Podfile
```ruby
# ios/Podfile
platform :ios, '13.0'

target 'FlatShareMobile' do
  config = use_native_modules!
  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true
  )
  
  # Add your pods here
  pod 'react-native-maps', :path => '../node_modules/react-native-maps'
  pod 'react-native-vector-icons', :path => '../node_modules/react-native-vector-icons'
  
  target 'FlatShareMobileTests' do
    inherit! :complete
  end
end
```

#### Install Dependencies
```bash
cd ios
pod install
cd ..
```

### 5. Build Process

#### Development Build
```bash
# Clean build
cd ios
xcodebuild clean -workspace FlatShareMobile.xcworkspace -scheme FlatShareMobile

# Build for simulator
npx react-native run-ios

# Build for device
npx react-native run-ios --device
```

#### Production Build
```bash
# Archive for App Store
cd ios
xcodebuild -workspace FlatShareMobile.xcworkspace \
  -scheme FlatShareMobile \
  -configuration Release \
  -archivePath FlatShareMobile.xcarchive \
  archive

# Export IPA
xcodebuild -exportArchive \
  -archivePath FlatShareMobile.xcarchive \
  -exportPath ./build \
  -exportOptionsPlist ExportOptions.plist
```

#### Create ExportOptions.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
</dict>
</plist>
```

### 6. App Store Connect Setup

#### Create App Record
1. Log in to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps" > "+" > "New App"
3. Fill in app information:
   - Name: FlatShare
   - Bundle ID: com.flatshare.mobile
   - SKU: flatshare-mobile-ios
   - User Access: Full Access

#### Configure App Information
```yaml
App Information:
  - Name: FlatShare
  - Subtitle: Find Your Perfect Roommate
  - Category: Lifestyle
  - Content Rights: No
  - Age Rating: 4+
  
Description:
  "Find your perfect roommate and share amazing living spaces. 
   Connect with verified users, search properties by location, 
   and chat in real-time. Join thousands of happy flatmates today."
  
Keywords:
  - roommate finder
  - flat sharing
  - property search
  - housing
  - roommates
```

### 7. Upload and Submit

#### Using Xcode
1. Open project in Xcode
2. Select "Any iOS Device" as target
3. Product > Archive
4. Click "Distribute App"
5. Select "App Store Connect"
6. Upload and submit for review

#### Using Command Line
```bash
# Upload using altool
xcrun altool --upload-app \
  --type ios \
  --file "path/to/your/app.ipa" \
  --username "your-apple-id@email.com" \
  --password "@env:APP_SPECIFIC_PASSWORD"
```

### 8. App Store Review Process
- **Review Time**: 1-7 days typically
- **Common Rejection Reasons**:
  - Missing privacy policy
  - Incomplete app functionality
  - Poor user experience
  - Missing required metadata
  - App crashes or bugs

## Android Deployment (Google Play Store)

### 1. Prerequisites
```bash
# Install Android Studio
# Install Android SDK
# Install Java Development Kit (JDK 11)
# Set up ANDROID_HOME environment variable
```

### 2. App Configuration

#### Update Android Manifest
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.flatshare.mobile">
    
    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme">
        
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustResize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### Configure App Icons
```bash
# Generate icons using Android Asset Studio
# Place icons in android/app/src/main/res/mipmap-*
```

#### Update App Name and Version
```xml
<!-- android/app/src/main/res/values/strings.xml -->
<resources>
    <string name="app_name">FlatShare</string>
</resources>

<!-- android/app/build.gradle -->
android {
    defaultConfig {
        applicationId "com.flatshare.mobile"
        versionCode 1
        versionName "1.0.0"
        minSdkVersion 21
        targetSdkVersion 33
    }
}
```

### 3. Signing Configuration

#### Generate Keystore
```bash
# Generate release keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore flatshare-release-key.keystore \
  -alias flatshare-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
```

#### Configure Gradle Signing
```gradle
// android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file('flatshare-release-key.keystore')
            storePassword 'your-store-password'
            keyAlias 'flatshare-key-alias'
            keyPassword 'your-key-password'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Store Passwords Securely
```gradle
// android/gradle.properties
MYAPP_RELEASE_STORE_FILE=flatshare-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=flatshare-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

### 4. Build Process

#### Development Build
```bash
# Build debug APK
npx react-native run-android

# Build debug bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

#### Production Build
```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Generate release AAB (recommended for Play Store)
./gradlew bundleRelease
```

### 5. Google Play Console Setup

#### Create Developer Account
1. Sign up at [Google Play Console](https://play.google.com/console)
2. Pay one-time $25 registration fee
3. Complete account verification

#### Create App Record
1. Click "Create app"
2. Fill in app information:
   - App name: FlatShare
   - Default language: English
   - App or game: App
   - Free or paid: Free

#### Configure App Information
```yaml
App Information:
  - App name: FlatShare
  - Short description: Find your perfect roommate
  - Full description: "Find your perfect roommate and share amazing living spaces. 
                      Connect with verified users, search properties by location, 
                      and chat in real-time. Join thousands of happy flatmates today."
  - Category: Lifestyle
  - Content rating: 3+ (Teen)
  
Privacy Policy:
  - URL: https://your-domain.com/privacy-policy
  
App Access:
  - Testing: Internal testing track
  - Release: Production track
```

### 6. Upload and Release

#### Upload AAB/APK
1. Go to "Production" track
2. Click "Create new release"
3. Upload your AAB file
4. Add release notes
5. Save and review release

#### Internal Testing
1. Create internal testing track
2. Upload AAB to internal testing
3. Add testers by email
4. Test thoroughly before production

#### Staged Rollout
1. Start with 10% of users
2. Monitor crash reports and feedback
3. Gradually increase to 100%
4. Monitor key metrics

### 7. Play Store Review Process
- **Review Time**: 1-3 days typically
- **Common Issues**:
  - Missing privacy policy
  - Incomplete app functionality
  - Poor performance
  - Missing required permissions
  - App crashes

## Continuous Deployment

### 1. Automated Build Pipeline

#### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy App

on:
  push:
    tags:
      - 'v*'

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Setup Java
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      
      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.gradle/caches
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
      
      - name: Build Android Release
        run: |
          cd android
          ./gradlew bundleRelease
      
      - name: Upload AAB
        uses: actions/upload-artifact@v2
        with:
          name: app-release
          path: android/app/build/outputs/bundle/release/app-release.aab
```

#### iOS Build Pipeline
```yaml
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: |
          npm install
          cd ios && pod install && cd ..
      
      - name: Build iOS
        run: |
          cd ios
          xcodebuild -workspace FlatShareMobile.xcworkspace \
            -scheme FlatShareMobile \
            -configuration Release \
            -archivePath FlatShareMobile.xcarchive \
            archive
      
      - name: Export IPA
        run: |
          xcodebuild -exportArchive \
            -archivePath FlatShareMobile.xcarchive \
            -exportPath ./build \
            -exportOptionsPlist ExportOptions.plist
```

### 2. Environment Configuration

#### Environment Variables
```bash
# .env.production
API_BASE_URL=https://your-production-api.com
GOOGLE_MAPS_API_KEY=your-production-maps-key
FIREBASE_CONFIG=your-production-firebase-config
```

#### Build Scripts
```json
{
  "scripts": {
    "build:android:release": "cd android && ./gradlew assembleRelease",
    "build:android:bundle": "cd android && ./gradlew bundleRelease",
    "build:ios:archive": "cd ios && xcodebuild -workspace FlatShareMobile.xcworkspace -scheme FlatShareMobile -configuration Release -archivePath FlatShareMobile.xcarchive archive",
    "deploy:android": "npm run build:android:bundle && fastlane android deploy",
    "deploy:ios": "npm run build:ios:archive && fastlane ios deploy"
  }
}
```

### 3. Fastlane Integration

#### Install Fastlane
```bash
# Install Fastlane
gem install fastlane

# Initialize Fastlane
fastlane init
```

#### Android Fastfile
```ruby
# android/fastlane/Fastfile
default_platform(:android)

platform :android do
  desc "Deploy to Play Store"
  lane :deploy do
    gradle(
      task: "bundle",
      build_type: "Release"
    )
    
    upload_to_play_store(
      track: 'production',
      aab: '../app/build/outputs/bundle/release/app-release.aab'
    )
  end
end
```

#### iOS Fastfile
```ruby
# ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Deploy to App Store"
  lane :deploy do
    build_ios_app(
      workspace: "FlatShareMobile.xcworkspace",
      scheme: "FlatShareMobile",
      export_method: "app-store"
    )
    
    upload_to_app_store(
      skip_metadata: true,
      skip_screenshots: true
    )
  end
end
```

## Post-Deployment Monitoring

### 1. Analytics Setup
```typescript
// src/utils/analytics.ts
import analytics from '@react-native-firebase/analytics';

export const trackEvent = (eventName: string, parameters?: object) => {
  analytics().logEvent(eventName, parameters);
};

export const trackScreen = (screenName: string) => {
  analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
};
```

### 2. Crash Reporting
```typescript
// src/utils/crashlytics.ts
import crashlytics from '@react-native-firebase/crashlytics';

export const logError = (error: Error, context?: object) => {
  crashlytics().recordError(error);
  if (context) {
    crashlytics().setAttributes(context);
  }
};
```

### 3. Performance Monitoring
```typescript
// src/utils/performance.ts
import perf from '@react-native-firebase/perf';

export const startTrace = (traceName: string) => {
  return perf().startTrace(traceName);
};
```

## Troubleshooting Common Issues

### iOS Issues
```bash
# Certificate issues
security find-identity -v -p codesigning

# Clean build
cd ios && xcodebuild clean && cd ..

# Reset iOS Simulator
xcrun simctl erase all
```

### Android Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset Android emulator
adb shell pm clear com.flatshare.mobile

# Check signing
keytool -list -v -keystore flatshare-release-key.keystore
```

### General Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules && npm install
```

## Security Best Practices

### 1. API Security
- Use HTTPS for all API calls
- Implement certificate pinning
- Secure token storage
- Input validation

### 2. App Security
- Obfuscate code for release builds
- Implement root/jailbreak detection
- Secure local storage
- Regular security audits

### 3. Privacy Compliance
- GDPR compliance
- Privacy policy implementation
- Data encryption
- User consent management

## Cost Estimation

### Development Costs
- Apple Developer Program: $99/year
- Google Play Developer: $25 (one-time)
- CI/CD Services: $50-200/month
- Analytics Services: $50-200/month

### Maintenance Costs
- App updates and bug fixes
- Server infrastructure
- Customer support
- Marketing and user acquisition

This deployment guide provides a comprehensive approach to getting your React Native app live on both major app stores while maintaining security, performance, and user experience standards. 