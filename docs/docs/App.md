# App.jsx Documentation

This file, `App.jsx`, is the main component of the Ekono landing page. It's built using React and leverages libraries like `framer-motion` for animations, `@tanstack/react-router` for navigation, and `react-icons` for visual elements. It presents information about the Ekono platform, its features, and benefits, incorporating interactive elements and visually appealing animations.

## Dependencies

This component relies on the following external libraries:

- **framer-motion:** For creating smooth and engaging animations.
- **@tanstack/react-router:** For handling client-side routing and navigation.
- **react-icons:** Provides a set of icons used throughout the interface.

## Inter-Module Interaction

- **Navigation:** Uses `@tanstack/react-router`'s `useNavigate` hook to navigate to the `/console` route when the "Console Access" button is clicked. This suggests the existence of a `console` route defined elsewhere in the application (likely in a routing configuration file not shown).
- **Styling:** Relies on styles defined in the `App.css` file. The specific content of this file is unknown, but it likely contains CSS rules to style the components.
- **Assets:** The component uses `grid.svg` and `circuit.png` likely located in the `/public` folder.

## Component: `Home`

The `Home` function is the primary component rendered in this file. It represents the entire landing page for the Ekono platform.

### State Variables

- `scrollY`: (from `useScroll`) Tracks the vertical scroll position of the page. Used to create parallax effects with `useTransform`.
- `mousePos`: (`{ x: 0, y: 0 }`) Stores the current mouse coordinates. Used to create a dynamic background glow effect.
- `mobileMenuOpen`: (`boolean`, initially `false`) Controls the visibility of the mobile navigation menu.
- `hovered`: (`boolean`, initially `false`) Unused state variable.
- `coreHovered`: (`boolean`, initially `false`) Tracks whether the user is hovering over the central core in the "Neural Network Visualization" section. Used to trigger animations.

### Hooks

- `useScroll()`: (from `framer-motion`) Tracks the page's scroll position.
- `useTransform()`: (from `framer-motion`) Transforms the scroll position (`scrollY`) into different output values for parallax effects.
  - `y1`: Transforms `scrollY` from `[0, 1000]` to `[0, 100]`.
  - `y2`: Transforms `scrollY` from `[0, 1000]` to `[0, -100]`.
- `useState()`: Manages the component's state.
- `useEffect()`: Used to add and remove the `mousemove` event listener to track mouse position.
- `useNavigate()`: (from `@tanstack/react-router`) Provides a function to programmatically navigate to different routes.
- `useRef()`: Used to store a reference to the array of nodes used in "Neural Network Visualization" section.

### Parallax Effects

The component uses `framer-motion`'s `useScroll` and `useTransform` hooks to create parallax scrolling effects in the `Features Section`. The vertical position of the background gradients on the left and right sides of this section are linked to the scroll position, creating the illusion of depth.

### Dynamic Background Glow

The component implements a dynamic background glow that follows the mouse cursor. This is achieved by:

1.  Tracking the mouse position using the `mousemove` event listener and storing it in the `mousePos` state variable.
2.  Using `framer-motion`'s `motion.div` to animate the `background` style based on the `mousePos`.

### Mobile Navigation

The component includes a mobile navigation menu that is toggled by a button in the top right corner of the screen. The menu is implemented as a full-screen overlay and provides links to the same sections as the desktop navigation.

### AI Core Visualization

The landing page contains AI Core Visualization that uses animated concentric rings, a pulsing core, neural connections, and floating nodes.
