# Development Guidelines

## Project Overview
This is a **Next.js 14.2.3** TypeScript application for a flat-sharing platform with real-time chat functionality, user connections, and property listings.

## Tech Stack
- **Framework**: Next.js 14.2.3 with TypeScript 5
- **UI Library**: Material-UI 5.15.16 with custom theme
- **Styling**: Tailwind CSS 3.4.4 + Material-UI
- **Forms**: Formik 2.4.6 + Yup 1.4.0 validation
- **HTTP Client**: Axios 1.7.2
- **Real-time**: WebSocket with STOMP.js 7.1.1
- **Maps**: React Google Maps API 2.20.7
- **State Management**: React Context + useReducer

## Project Structure

### Directory Organization
```
src/
├── api/                    # API calls organized by feature
├── api-service/           # Core API configuration
├── component/             # Reusable UI components
├── custom-component/      # Specialized custom components
├── global-context/        # Global state management
├── hooks/                 # Custom React hooks
├── pages/                 # Next.js pages (file-based routing)
├── styles/                # CSS and styling files
├── theme/                 # Material-UI theme configuration
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

### Naming Conventions
- **Folders**: PascalCase for components (`/Chat/`, `/UserProfile/`)
- **Files**: 
  - Components: PascalCase (`ChatContainer.tsx`)
  - Hooks: camelCase with `use` prefix (`useChatWebSocket.ts`)
  - APIs: camelCase (`auth/index.ts`)
  - Types: camelCase (`user/index.ts`)
- **Interfaces**: PascalCase with `I` prefix (`IUserData`, `IChatMessage`)

## Component Development

### Component Structure
```typescript
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useGlobalContext } from '@/global-context';
import { IComponentProps } from '@/types/component';

interface ComponentNameProps {
    prop1: string;
    prop2?: number;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
    // State
    const [localState, setLocalState] = useState<string>('');
    
    // Context
    const { state, setState } = useGlobalContext();
    
    // Memoized values
    const computedValue = useMemo(() => {
        return expensiveComputation();
    }, [dependency]);
    
    // Callbacks
    const handleAction = useCallback(() => {
        // Action logic
    }, [dependencies]);
    
    // Effects
    useEffect(() => {
        // Effect logic
    }, [dependencies]);
    
    return (
        <Box>
            {/* Component JSX */}
        </Box>
    );
};

export default ComponentName;
```

### Component Organization
- Each component gets its own folder in `/src/component/`
- Main component file: `index.tsx`
- Export pattern: `export { default as ComponentName } from './ComponentName';`
- Related components in same folder (`ChatContainer/`, `ChatSidebar/`, etc.)

### Performance Optimization
- **Always use** `useCallback` for event handlers
- **Always use** `useMemo` for expensive computations
- **Always use** `React.memo` for pure components when needed
- Avoid inline functions in JSX props

## API Development

### API Structure
```typescript
// src/api/feature/index.ts
import { api } from "@/api-service";
import { IRequestPayload, IResponseType } from "@/types/feature";

const featureApi = (payload: IRequestPayload): Promise<IResponseType> => {
    return api.post("feature/endpoint", payload);
};

export { featureApi };
```

### API Organization
- Group APIs by feature in `/src/api/`
- Each feature folder has `index.ts` for exports
- Use TypeScript interfaces for all payloads and responses
- Import from `/src/api-service` for base configuration

## Type Definitions

### Type Organization
- Types organized by feature in `/src/types/`
- Each feature has its own folder with `index.ts`
- Use interfaces over types when possible
- Prefix interfaces with `I` (`IUserData`, `IConnection`)

### Common Patterns
```typescript
// API Payloads
export interface ISendOTPPayLoad {
    phoneNo: string;
}

// Component Props
export interface IComponentProps {
    data: IUserData[];
    onAction: (id: number) => void;
}

// Data Models
export interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    // ... other fields
}
```

## State Management

### Global Context Pattern
- Use global context from `/src/global-context/`
- Access with `useGlobalContext()` hook
- State updates: `setState({ key: value })`
- Async operations: Use context methods (`fetchConnections`, `fetchProfile`)

### Local State
- Use `useState` for component-specific state
- Use `useReducer` for complex local state
- Always type state properly

## Styling Guidelines

### Material-UI + Tailwind
- **Primary**: Material-UI components and theming
- **Secondary**: Tailwind for utility classes
- Use `sx` prop for component-specific styling
- Custom theme in `/src/theme/index.ts`

### Styling Patterns
```typescript
// ✅ PREFERRED: Use defined theme values
<Box sx={{ 
    backgroundColor: 'background.paper',
    borderRadius: '16px',
    p: 3,
    color: 'primary.main',
    boxShadow: theme.shadows[1]
}}>

// ✅ Acceptable: Tailwind for simple utilities
<div className="flex items-center gap-2">

// ❌ AVOID: Inline styles and hardcoded values
<Box sx={{ 
    backgroundColor: '#ffffff',  // Use theme.palette.background.paper
    borderRadius: '16px',        // OK, but prefer theme.shape.borderRadius
    padding: '24px',            // Use theme.spacing() or 'p: 3'
    color: '#667eea'            // Use theme.palette.primary.main
}}>

// ❌ AVOID: Inline style attribute
<div style={{ color: 'red', padding: '10px' }}>
```

### Theme Usage Rules
- **ALWAYS** use theme values instead of hardcoded colors/spacing
- **ALWAYS** reference `theme.palette.*` for colors
- **ALWAYS** use `theme.spacing()` or shorthand (`p`, `m`, `px`, etc.)
- **NEVER** use inline `style` attribute
- **NEVER** hardcode hex colors, use theme colors
- **PREFER** `sx` prop over `makeStyles` or `styled`

## Error Handling

### API Error Handling
```typescript
try {
    const response = await apiCall(payload);
    snackbar.success(response.data.message);
} catch (error) {
    snackbar.error("Operation failed");
}
```

### Notification System
- Use `useGlobalSnackbar()` hook for all notifications
- Methods: `snackbar.success()`, `snackbar.error()`, `snackbar.info()`, `snackbar.warning()`
- Always provide user feedback for async operations

## Form Handling

### Formik + Yup Pattern
- Use Formik for all forms
- Yup schemas for validation
- Material-UI form components
- Proper TypeScript typing for form values

## WebSocket Integration

### Real-time Features
- Use custom hooks for WebSocket connections
- Pattern: `useChatWebSocket`, `useNotificationSocket`
- Handle connection states properly
- Implement proper cleanup in `useEffect`

## Development Best Practices

### Code Quality
1. **TypeScript**: Strict typing, no `any` types
2. **Imports**: Use absolute imports with `@/` alias
3. **Functions**: Prefer arrow functions for components
4. **Async/Await**: Use async/await over Promises
5. **Destructuring**: Destructure props and state
6. **Clean Code**: Remove unused variables, imports, and dead code

#### Unused Code Rules
```typescript
// ❌ AVOID: Unused variables and imports
import React, { useState, useEffect, useMemo } from 'react'; // useEffect, useMemo unused
import { Box, Typography, Button } from '@mui/material'; // Button unused

const Component = () => {
    const [data, setData] = useState([]); // setData unused
    const unusedVariable = 'test'; // unused variable
    
    return <Box><Typography>Content</Typography></Box>;
};

// ✅ PREFERRED: Clean, no unused code
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const Component = () => {
    const [data] = useState([]);
    
    return <Box><Typography>Content</Typography></Box>;
};
```

**ESLint Rules for Unused Code:**
- Enable `no-unused-vars` rule
- Enable `@typescript-eslint/no-unused-vars` for TypeScript
- Use `// eslint-disable-next-line` sparingly for intentional unused vars
- Remove unused imports automatically with IDE/editor settings

### Solution Architecture
- **ALWAYS** provide schema-based solutions when possible
- **PREFER** data-driven approaches over hardcoded implementations
- **USE** configuration objects and schemas for dynamic content
- **IMPLEMENT** reusable patterns through schema definitions

#### Schema-Based Example:
```typescript
// ✅ PREFERRED: Schema-driven approach
const formSchema = [
    { field: 'firstName', type: 'text', required: true, label: 'First Name' },
    { field: 'email', type: 'email', required: true, label: 'Email Address' },
    { field: 'age', type: 'number', required: false, label: 'Age' }
];

// ✅ PREFERRED: Configuration-driven UI
const dashboardConfig = {
    cards: [
        { title: 'Users', icon: 'People', value: 150, color: 'primary' },
        { title: 'Revenue', icon: 'AttachMoney', value: '$45K', color: 'success' }
    ],
    layout: 'grid',
    responsive: true
};

// ❌ AVOID: Hardcoded repetitive components
<Card title="Users" icon={<People />} value={150} />
<Card title="Revenue" icon={<AttachMoney />} value="$45K" />
```

### Performance
1. **Lazy Loading**: Use dynamic imports for heavy components
2. **Memoization**: Use React.memo, useMemo, useCallback appropriately
3. **Bundle Size**: Avoid importing entire libraries

### File Organization
1. **Index Files**: Use index.ts for clean imports
2. **Feature Grouping**: Group related functionality together
3. **Separation**: Keep components, types, and APIs separate

### Git Workflow
- Feature branches: `feature/feature-name`
- Commit messages: Clear and descriptive
- Code review required before merge

## Testing (Future)
- Jest + React Testing Library (to be implemented)
- Component testing for all major components
- API testing for critical endpoints

## Environment Configuration
- Development: `npm run dev`
- Build: `npm run build`
- Production: `npm start`
- Linting: `npm run lint`

---

## Quick Reference

### Import Guidelines

#### Material-UI Icons
```typescript
// ✅ PREFERRED: Destructured imports
import { 
    People, 
    Schedule, 
    Send, 
    FiberNew, 
    Search, 
    Refresh, 
    PersonAdd 
} from '@mui/icons-material';

// ❌ AVOID: Individual default imports
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
```

#### Material-UI Component Imports
```typescript
// ✅ PREFERRED: Single-line imports for Material-UI components
import { Box, Typography, Paper, Stack, Fade, CircularProgress, Card, CardContent, Tabs, Tab, InputAdornment, TextField, IconButton, Tooltip, Chip } from "@mui/material";

// ✅ PREFERRED: Import from separate constants file when possible
import { MUI_COMPONENTS } from '@/constants/mui-imports';

// ❌ AVOID: Multi-line imports for Material-UI components
import {
    Box,
    Typography,
    Paper,
    Stack,
} from "@mui/material";
```

#### Import Organization Strategy
- **Material-UI Components**: Single-line imports or from constants file
- **Material-UI Icons**: Destructured imports in single line
- **Other imports**: Multi-line when needed for readability
- **Constants/Utils**: Import from dedicated files when possible

#### Separate Import Files (Recommended)
Create dedicated import files for commonly used components:

```typescript
// src/constants/mui-imports.ts
export {
    Box,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    Stack,
    Fade,
    CircularProgress,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';

export {
    People,
    Settings,
    Add,
    Edit,
    Search,
    Refresh,
    PersonAdd,
    Schedule,
    Send,
    FiberNew,
} from '@mui/icons-material';
```

```typescript
// Usage in components
import { Box, Typography, Button, Card } from '@/constants/mui-imports';
import { People, Search, Add } from '@/constants/mui-imports';
```

### Common Import Patterns
```typescript
// React & Hooks
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Material-UI Components (single-line)
import { Box, Typography, Button, Paper, Card, CardContent, Stack, Fade } from '@mui/material';

// Material-UI Icons (destructured single-line)
import { People, Settings, Add, Edit, Search, Refresh } from '@mui/icons-material';

// API calls
import { apiFunction1, apiFunction2 } from '@/api/feature';

// Global Context
import { useGlobalContext } from '@/global-context';

// Custom Hooks
import { useGlobalSnackbar } from '@/hooks/useSnackbar';

// Types
import { IUserData, IConnectionFilters } from '@/types/user';

// Components
import { CustomComponent1, CustomComponent2 } from '@/component/feature-components';
```

### Project Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
