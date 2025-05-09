
## 3. learn.md

```markdown
# Creative Components & Technologies Guide

This document outlines the key technologies and techniques used to create the creative components in the portfolio website.

## Custom Cursor

### Technology Used
- React useState and useEffect hooks
- DOM event listeners
- CSS transitions and transforms

### How It Works
The custom cursor replaces the default browser cursor with two elements
1. A larger circle outline that follows the mouse movement
2. A smaller dot that moves precisely with the cursor

The component
- Tracks mouse position using event listeners
- Updates the position of both cursor elements
- Changes appearance when hovering over interactive elements
- Scales down when clicking

### Learning Resources
- [Custom Cursor in React](httpsdev.tostackfindovercustom-cursor-in-react-js-4cm3)
- [CSS Transforms](httpsdeveloper.mozilla.orgen-USdocsWebCSStransform)
- [React useEffect Hook](httpsreactjs.orgdocshooks-effect.html)

## Animated Background

### Technology Used
- HTML5 Canvas API
- RequestAnimationFrame
- JavaScript animation techniques

### How It Works
The animated background creates a subtle, moving gradient effect using
1. Canvas element positioned behind all content
2. Multiple gradient points that move slowly across the screen
3. A subtle grid pattern overlay

The animation
- Creates gradient points with random positions and velocities
- Updates positions on each animation frame
- Handles collision detection with screen edges
- Draws radial gradients and grid lines

### Learning Resources
- [HTML Canvas Basics](httpsdeveloper.mozilla.orgen-USdocsWebAPICanvas_APITutorial)
- [Creative Coding with Canvas](httpswww.youtube.comwatchv=vJNVramny9k)
- [Smooth Animations with RequestAnimationFrame](httpsdeveloper.mozilla.orgen-USdocsWebAPIwindowrequestAnimationFrame)

## Glass Morphism Effect

### Technology Used
- CSS backdrop-filter
- Tailwind CSS
- Border and shadow effects

### How It Works
Glass morphism creates a frosted glass effect using
1. Semi-transparent backgrounds
2. Blur effect on the background
3. Subtle borders and shadows

Implementation
- Uses `backdrop-filter blur()` CSS property
- Combines with rgba backgrounds for transparency
- Adds thin borders for definition

### Learning Resources
- [CSS Backdrop Filter](httpsdeveloper.mozilla.orgen-USdocsWebCSSbackdrop-filter)
- [Glass UI Effect Tutorial](httpscss-tricks.coma-complete-guide-to-backdrop-filter)
- [Implementing Glass Morphism with Tailwind CSS](httpstailwindcss.comdocsbackdrop-blur)

## 404 Page

### Technology Used
- Next.js custom error pages
- CSS animations
- Gradient text effects

### How It Works
The custom 404 page provides a user-friendly error experience
1. Large, animated 404 text with gradient effect
2. Helpful message explaining the error
3. Button to return to the home page
4. Consistent design with the rest of the site

Implementation
- Creates a `not-found.jsx` file in the app directory
- Uses the same animated background and styling as main pages
- Implements gradient text effect for visual interest

### Learning Resources
- [Custom Error Pages in Next.js](httpsnextjs.orgdocsadvanced-featurescustom-error-page)
- [CSS Text Gradients](httpsdeveloper.mozilla.orgen-USdocsWebCSSgradientlinear-gradient)
- [CSS Animations](httpsdeveloper.mozilla.orgen-USdocsWebCSSCSS_AnimationsUsing_CSS_animations)

## Timeline Layout

### Technology Used
- CSS Grid and Flexbox
- Pseudo-elements
- Responsive design techniques

### How It Works
The timeline layout creates a visual representation of chronological events
1. Vertical line connecting events
2. Alternating left and right positioning of content
3. Visual indicators for each event point

Implementation
- Uses CSS Grid for layout structure
- Creates vertical line with absolute positioning
- Adds circular points at each event with pseudo-elements
- Implements responsive behavior for mobile devices

### Learning Resources
- [CSS Grid Layout](httpsdeveloper.mozilla.orgen-USdocsWebCSSCSS_Grid_Layout)
- [Building a Timeline with CSS](httpswww.w3schools.comhowtohowto_css_timeline.asp)
- [Responsive Design Patterns](httpsdevelopers.google.comwebfundamentalsdesign-and-uxresponsive)

## Radar Chart for Skills

### Technology Used
- DOM manipulation
- SVG for polygon creation
- JavaScript calculations

### How It Works
The radar chart visualizes skills in a circular diagram
1. Points positioned around a circle based on skill values
2. Lines connecting points to form a polygon
3. Concentric circles for reference

Implementation
- Calculates point positions using trigonometry
- Creates SVG polygon element for the skill area
- Adds labels and reference circles
- Handles responsive sizing

### Learning Resources
- [SVG Basics](httpsdeveloper.mozilla.orgen-USdocsWebSVGTutorial)
- [Creating Data Visualizations with JavaScript](httpswww.freecodecamp.orgnewshow-to-create-a-data-visualization-with-javascript)
- [Math for Front-End Developers](httpswww.smashingmagazine.com202102useful-math-trigonometry-front-end-development)

## Gradient Text Animation

### Technology Used
- CSS background-clip
- CSS animations
- Keyframes

### How It Works
The gradient text animation creates moving color effects on text
1. Text filled with a gradient instead of solid color
2. Gradient that moves across the text
3. Smooth animation loop

Implementation
- Uses `background-clip text` with transparent text color
- Creates a gradient larger than the text
- Animates the background position

### Learning Resources
- [CSS Background Clip](httpsdeveloper.mozilla.orgen-USdocsWebCSSbackground-clip)
- [Animated Gradients with CSS](httpscss-tricks.comanimating-gradients-with-css)
- [CSS Animation Performance](httpsweb.devanimations-guide)

## Glow Effects

### Technology Used
- CSS box-shadow
- CSS text-shadow
- Multiple layered shadows

### How It Works
The glow effect creates a neon-like appearance
1. Multiple layers of colored shadows
2. Varying opacity and blur radius
3. Applied to both text and containers

Implementation
- Uses multiple box-shadow values with different sizes
- Combines with text-shadow for text elements
- Uses the brand color with varying opacity

### Learning Resources
- [CSS Box Shadow](httpsdeveloper.mozilla.orgen-USdocsWebCSSbox-shadow)
- [CSS Text Shadow](httpsdeveloper.mozilla.orgen-USdocsWebCSStext-shadow)
- [Creating Neon Effects with CSS](httpscss-tricks.comhow-to-create-neon-text-with-css)

## Page Transitions

### Technology Used
- Framer Motion library
- React component animation
- Exit animations

### How It Works
Page transitions create smooth movement between pages
1. Fade and slide effects when entering a page
2. Exit animations when navigating away
3. Consistent timing and easing

Implementation
- Wraps page content in Framer Motion components
- Defines initial, animate, and exit states
- Sets duration and easing functions

### Learning Resources
- [Framer Motion Documentation](httpswww.framer.commotion)
- [Page Transitions in Next.js](httpsnextjs.orgdocspagesbuilding-your-applicationroutingpages-and-layouts#with-framer-motion)
- [Animation Principles for Web](httpswww.smashingmagazine.com202102animation-design-principles-web)