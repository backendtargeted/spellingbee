# Technical Context: Spelling Bee Adventure

## Core Technologies
- **Frontend Framework:** React (using Hooks: `useState`, `useEffect`, potentially `useReducer` or `useContext` if state complexity grows, though initially aiming for simplicity). Project initialized with `create-react-app`.
- **Language:** JavaScript (ES6+)
- **Styling:** CSS with consistent patterns for visual hierarchy, animations, and state feedback. Mobile-first responsive design with flexbox layouts and semantic color usage.
- **State Management:** 
  - Component-level state (`useState`) for UI interactions
  - Game state persistence between sessions using `localStorage`
  - Props for component communication with clear data flow
  - Potential future use of `useContext` for global state if needed
- **Browser APIs:**
    - **Web Speech API (`SpeechSynthesisUtterance`):** For Text-to-Speech pronunciation of words. Will use 'en-US' voice. Need to handle browser compatibility/availability checks.
    - **`localStorage`:** For persisting game state across sessions (current score, word list progress including attempts/correct counts/difficulty, user settings like light/dark mode). Data will be stored as JSON strings.
    - **Score breakdowns:** Each word attempt's score (base, speed, streak, total, word, time, streakCount, correctness) is now persisted for analytics/statistics.

## Development Environment
- **Package Manager:** npm (as used by `create-react-app`)
- **Build Tool:** `react-scripts` (from `create-react-app`)
- **Development Server:** `npm start`

## Data Structure
- **Word List:** Stored in `src/data/wordList.json`. Array of objects, each containing `word`, `category`, `attempts`, `correct`, `difficulty`.
- **Scoring Config:** All scoring rules (base, speed, streak) are defined in `src/config/scoringConfig.js` for easy adjustment.
- **Score Calculation:** Pure functions in `src/utils/scoreCalculator.js` handle all score logic, making the system modular and testable.
- **Score Breakdown Storage:** Each attempt's score breakdown is saved in localStorage via `src/utils/storageManager.js` for future analytics/statistics.
- **Runtime State:** Managed within React components.

## Key Technical Considerations
- **Browser Compatibility:** Ensure Web Speech API and `localStorage` work across modern browsers commonly used by the target audience. Provide fallbacks or informative messages if APIs are unavailable.
- **Performance:** Keep the application lightweight and responsive, especially important for a child's user experience. The word list size is manageable, so initial load should be fast.
- **Maintainability:** Use clear component structure, meaningful variable names, and comments where necessary. Keep components focused on specific tasks. Scoring logic is now config-driven and decoupled from UI.
- **Error Handling:** Implement basic checks (e.g., for speech synthesis availability, localStorage access).

## UI Patterns
- **Visual Hierarchy:**
  - Consistent spacing using CSS gap and margin
  - Clear component boundaries with subtle shadows
  - Mode indicators with distinct visual states
  - Interactive elements with hover and active states

- **Feedback Systems:**
  - ScoreDisplay Component: Animated, educational feedback for word attempts
  - Loading states with centered indicators
  - Error states with clear messaging
  - Mode transitions with visual cues
  - Button states (hover, active, disabled) with transitions

- **Layout Structure:**
  - Flexbox-based component organization
  - Responsive containers with max-width constraints
  - Consistent spacing patterns
  - Mobile-first breakpoints

- **Color System:**
  - Semantic color usage (success, error, info)
  - Interactive state colors
  - Consistent contrast ratios
  - Future support for dark mode
