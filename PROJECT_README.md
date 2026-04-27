# My App Practice

A React practice project showcasing various components, hooks, and full-stack implementations.

## Project Overview

This is a collection of React components and features built for learning and practice purposes. The project includes UI components, hooks examples, authentication flows, and full-stack applications.

## Tech Stack

- **React 18.2.0** - Frontend framework
- **Storybook 7.0.20** - Component development and testing
- **Axios 1.7.2** - HTTP client
- **Jest** - Testing framework
- **React Icons** - Icon library

## Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run storybook  # Start Storybook
```

## Components

### UI Components

- **Autocomplete** - Search with suggestions
- **Carousel** - Image carousel component
- **ContactUsForm** - Contact form with validation
- **FilteredSearch** - Search with filtering capabilities
- **FolderStructureDesign** - Visual folder tree component
- **StarRating** - Interactive star rating
- **URLShortener** - URL shortening service
- **Pagination** - Pagination component

### Authentication & User Management

- **LoginOTP** - Login with OTP verification
- **PasswordGenerator** - Generate secure passwords
- **SessionTimeoutHandler** - Handle session timeouts
- **SharedUserContent** - Admin dashboard and user authentication flows
  - Login, Signup, Forgot Password
  - Reset Password, Verify Mobile
  - Admin Dashboard

### Hooks Examples

- **Colorizer** - Color manipulation with hooks
- **useEffectt** - useEffect hook demonstration

### Games & Interactive

- **SoloLevelingGame** - Interactive game component
- **PlayerScoreCard** - Display player scores

### Small Components

- Counter, Clock, Gallery, ToDoList
- Image Search, List, Prop Drilling
- Event handling examples

### Full Stack

- **Learning App** - Backend with Express.js
  - Hotel API with filtering, sorting, pagination

## Project Structure

```
src/
├── components/
│   ├── Autocomplete/
│   ├── Caraousel/
│   ├── ContactUsForm.tsx
│   ├── FilteredSearch/
│   ├── FolderStructureDesign/
│   ├── Hooks/
│   ├── LoginOTP/
│   ├── PasswordGenerator/
│   ├── SharedUserContent/
│   ├── SoloLevelingGame/
│   ├── StarRating/
│   ├── URLShortener/
│   ├── pagination/
│   └── smallJsComponents/
├── fullStack/
│   └── learningApp/
│       └── backend/
└── App.css
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## License

MIT
