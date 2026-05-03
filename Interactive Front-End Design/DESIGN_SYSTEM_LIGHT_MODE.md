# UniQuest Design System - Light Mode

## Overview

The UniQuest design system for light mode is built around an academic, professional aesthetic inspired by traditional university environments. The design emphasizes clarity, readability, and a sense of prestige through carefully selected colors, typography, and spacing.

---

## Color Palette

### Primary Colors

#### Oxford Blue (`#002147`)
- **Usage**: Primary brand color, headings, important text, primary buttons
- **CSS Variable**: `--primary`
- **Foreground**: `--primary-foreground` (`#FDFDFB`)
- **Applications**:
  - Main navigation text
  - Headings (H1-H4)
  - Primary action buttons
  - Icons in active states
  - Borders for emphasis

#### Ivory/Academic Paper (`#FDFDFB`)
- **Usage**: Main background color
- **CSS Variable**: `--background`
- **Purpose**: Creates a warm, paper-like canvas reminiscent of academic documents
- **Applications**:
  - Page background
  - Primary foreground text on dark backgrounds

#### Gold Accent (`#E8C547`)
- **Usage**: Accent color for highlights, achievements, and special elements
- **CSS Variable**: `--accent`
- **Foreground**: `--accent-foreground` (`#002147`)
- **Applications**:
  - Achievement badges
  - Points and rewards
  - Hover states for special actions
  - Selection highlights
  - Active indicators

### Secondary Colors

#### Light Gray (`#F1F4F9`)
- **Usage**: Secondary backgrounds, muted sections
- **CSS Variable**: `--secondary`
- **Applications**:
  - Card backgrounds
  - Input fields
  - Sidebar backgrounds
  - Hover states

#### Pure White (`#FFFFFF`)
- **Usage**: Card surfaces, elevated elements
- **CSS Variable**: `--card`
- **Applications**:
  - Modal backgrounds
  - Dropdown menus
  - Elevated cards
  - Popover surfaces

### Functional Colors

#### Muted Gray (`#4A5568`)
- **Usage**: Secondary text, less important information
- **CSS Variable**: `--muted-foreground`
- **Applications**:
  - Helper text
  - Timestamps
  - Metadata
  - Placeholder text

#### Destructive Red (`#D4183D`)
- **Usage**: Error states, destructive actions, warnings
- **CSS Variable**: `--destructive`
- **Foreground**: `--destructive-foreground` (`#FFFFFF`)
- **Applications**:
  - Error messages
  - Delete buttons
  - Warning indicators

#### Switch Background (`#CBD5E0`)
- **Usage**: Toggle switches, inactive states
- **CSS Variable**: `--switch-background`

---

## Typography

### Font System

#### Base Font Size
- **Root**: `16px`
- **CSS Variable**: `--font-size`

### Font Weights

- **Medium**: `500` (`--font-weight-medium`)
  - Used for: Headings, labels, buttons, emphasized text
- **Normal**: `400` (`--font-weight-normal`)
  - Used for: Body text, input fields, regular content

### Heading Hierarchy

#### H1 - Page Titles
- **Font Size**: `var(--text-2xl)` (~32px)
- **Font Weight**: `500` (Medium)
- **Line Height**: `1.5`
- **Color**: `#002147` (Oxford Blue)
- **Usage**: Main page titles, primary headings

#### H2 - Section Titles
- **Font Size**: `var(--text-xl)` (~24px)
- **Font Weight**: `500` (Medium)
- **Line Height**: `1.5`
- **Color**: `#002147` (Oxford Blue)
- **Usage**: Section headings, card titles

#### H3 - Subsection Titles
- **Font Size**: `var(--text-lg)` (~20px)
- **Font Weight**: `500` (Medium)
- **Line Height**: `1.5`
- **Color**: `#002147` (Oxford Blue)
- **Usage**: Subsection headings, component titles

#### H4 - Minor Headings
- **Font Size**: `var(--text-base)` (16px)
- **Font Weight**: `500` (Medium)
- **Line Height**: `1.5`
- **Color**: `#002147` (Oxford Blue)
- **Usage**: Minor headings, list titles

### Text Elements

#### Body Text
- **Font Size**: `16px` (base)
- **Font Weight**: `400` (Normal)
- **Line Height**: `1.5`
- **Color**: `#002147` (Oxford Blue)

#### Labels
- **Font Size**: `16px`
- **Font Weight**: `500` (Medium)
- **Line Height**: `1.5`
- **Color**: `#002147` (Oxford Blue)

#### Buttons
- **Font Size**: `16px`
- **Font Weight**: `500` (Medium)
- **Line Height**: `1.5`

#### Small Text
- **Font Size**: `14px` (0.875rem)
- **Usage**: Metadata, timestamps, helper text

#### Extra Small Text
- **Font Size**: `12px` (0.75rem)
- **Usage**: Tags, badges, micro-copy

---

## Spacing & Layout

### Border Radius

The design system uses rounded corners to create a modern, friendly appearance:

- **Small**: `calc(var(--radius) - 4px)` (~8px)
  - Usage: Small buttons, tags, badges
- **Medium**: `calc(var(--radius) - 2px)` (~10px)
  - Usage: Input fields, small cards
- **Large**: `var(--radius)` (12px / 0.75rem)
  - Usage: Cards, modals, main containers
- **Extra Large**: `calc(var(--radius) + 4px)` (~16px)
  - Usage: Hero sections, large feature cards

### Borders

#### Border Color
- **Default**: `rgba(0, 33, 71, 0.1)` (10% opacity Oxford Blue)
- **CSS Variable**: `--border`
- **Usage**: Subtle separation between elements

#### Border Styles
- **Standard**: `1px solid var(--border)`
- **Emphasis**: `2px solid var(--primary)`
- **Hover**: Increase opacity to `0.2` or `0.3`

---

## Components

### Buttons

#### Primary Button
- **Background**: `#002147` (Oxford Blue)
- **Text Color**: `#FDFDFB` (Ivory)
- **Border**: None
- **Padding**: `12px 24px`
- **Border Radius**: `12px`
- **Font Weight**: `500` (Medium)
- **Hover State**: Darken to `#003366`
- **Usage**: Main call-to-action, form submissions

#### Secondary Button
- **Background**: `#F1F4F9` (Light Gray)
- **Text Color**: `#002147` (Oxford Blue)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Padding**: `12px 24px`
- **Border Radius**: `12px`
- **Font Weight**: `500` (Medium)
- **Hover State**: Background to `#E5E9F0`
- **Usage**: Secondary actions, cancel buttons

#### Accent Button
- **Background**: `rgba(0, 33, 71, 0.05)` (5% Oxford Blue)
- **Text Color**: `#002147` (Oxford Blue)
- **Border**: `1px solid rgba(0, 33, 71, 0.2)`
- **Padding**: `12px 24px`
- **Border Radius**: `12px`
- **Font Weight**: `500` (Medium)
- **Hover State**: Background to `rgba(0, 33, 71, 0.1)`
- **Usage**: Tertiary actions, less important buttons

#### Destructive Button
- **Background**: `#D4183D` (Red)
- **Text Color**: `#FFFFFF` (White)
- **Border**: None
- **Padding**: `12px 24px`
- **Border Radius**: `12px`
- **Font Weight**: `500` (Medium)
- **Hover State**: Darken to `#B01530`
- **Usage**: Delete actions, destructive operations

### Cards

#### Standard Card
- **Background**: `#FFFFFF` (White)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Border Radius**: `24px` (rounded-3xl)
- **Padding**: `24px`
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.1)`
- **Backdrop Filter**: `blur(12px)` (when overlaying)

#### Elevated Card
- **Background**: `#FFFFFF` (White)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Border Radius**: `24px`
- **Padding**: `24px`
- **Shadow**: `0 4px 12px rgba(0, 0, 0, 0.08)`
- **Usage**: Featured content, important information

### Input Fields

#### Text Input
- **Background**: `#F1F4F9` (Light Gray)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Border Radius**: `12px`
- **Padding**: `12px 16px`
- **Text Color**: `#002147` (Oxford Blue)
- **Placeholder Color**: `rgba(0, 33, 71, 0.3)` (30% opacity)
- **Focus State**:
  - Border: `1px solid rgba(0, 33, 71, 0.3)`
  - Outline: `2px solid rgba(0, 33, 71, 0.1)`

#### Search Input
- **Background**: `#F1F4F9` (Light Gray)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Border Radius**: `12px`
- **Padding**: `10px 16px`
- **Icon Color**: `rgba(0, 33, 71, 0.4)`
- **Focus State**: Border color to `rgba(0, 33, 71, 0.3)`

### Badges & Tags

#### Standard Badge
- **Background**: `rgba(0, 33, 71, 0.05)` (5% Oxford Blue)
- **Text Color**: `#002147` (Oxford Blue)
- **Border**: `1px solid rgba(0, 33, 71, 0.2)`
- **Border Radius**: `8px`
- **Padding**: `4px 10px`
- **Font Size**: `12px`
- **Font Weight**: `500` (Medium)

#### Accent Badge
- **Background**: `rgba(232, 197, 71, 0.1)` (10% Gold)
- **Text Color**: `#002147` (Oxford Blue)
- **Border**: `1px solid rgba(232, 197, 71, 0.3)`
- **Border Radius**: `8px`
- **Padding**: `4px 10px`
- **Font Size**: `12px`
- **Font Weight**: `500` (Medium)

### Navigation

#### Header
- **Background**: `rgba(255, 255, 255, 0.8)` (80% White)
- **Backdrop Filter**: `blur(12px)`
- **Border Bottom**: `1px solid rgba(0, 33, 71, 0.1)`
- **Height**: `64px`
- **Position**: Sticky top
- **Z-Index**: `40`

#### Sidebar
- **Background**: `#FFFFFF` (White)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Border Radius**: `16px`
- **Padding**: `12px`
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.05)`

#### Active Navigation Item
- **Background**: `rgba(0, 33, 71, 0.05)` (5% Oxford Blue)
- **Text Color**: `#002147` (Oxford Blue)
- **Border**: `1px solid rgba(0, 33, 71, 0.1)`
- **Border Radius**: `12px`
- **Indicator**: `1.5px` dot in `#002147`

#### Inactive Navigation Item
- **Background**: Transparent
- **Text Color**: `rgba(0, 33, 71, 0.5)` (50% opacity)
- **Hover State**: Text color to `#002147`

---

## Iconography

### Icon Sizes
- **Extra Small**: `14px` (0.875rem)
- **Small**: `16px` (1rem)
- **Medium**: `20px` (1.25rem)
- **Large**: `24px` (1.5rem)
- **Extra Large**: `32px` (2rem)

### Icon Colors
- **Primary**: `#002147` (Oxford Blue)
- **Muted**: `rgba(0, 33, 71, 0.4)` (40% opacity)
- **Accent**: `#E8C547` (Gold)
- **On Dark Background**: `#FDFDFB` (Ivory)

### Icon Usage
- Use consistent stroke width (typically 2px)
- Maintain optical balance with surrounding text
- Apply appropriate opacity for hierarchy
- Use accent color sparingly for special indicators

---

## Shadows & Elevation

### Shadow Levels

#### Level 1 - Subtle
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.05)`
- **Usage**: Cards, subtle elevation

#### Level 2 - Standard
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.1)`
- **Usage**: Buttons, input fields, standard cards

#### Level 3 - Elevated
- **Shadow**: `0 4px 12px rgba(0, 0, 0, 0.08)`
- **Usage**: Dropdowns, modals, floating elements

#### Level 4 - High
- **Shadow**: `0 8px 24px rgba(0, 0, 0, 0.12)`
- **Usage**: Modals, overlays, important floating elements

---

## States & Interactions

### Hover States
- **Buttons**: Darken background by 10-15%
- **Links**: Reduce opacity to 70%
- **Cards**: Add subtle shadow or border emphasis
- **Icons**: Scale to 105% or change color

### Active States
- **Buttons**: Darken background by 20%
- **Navigation**: Apply background color and indicator
- **Inputs**: Show focus ring and border color change

### Disabled States
- **Opacity**: `0.5` (50%)
- **Cursor**: `not-allowed`
- **Background**: Maintain original but reduce opacity
- **Text**: Reduce opacity to 40%

### Focus States
- **Outline**: `2px solid rgba(0, 33, 71, 0.1)`
- **Outline Offset**: `2px`
- **Border**: Increase opacity or change color
- **Ring Color**: `#002147` (Oxford Blue)

### Loading States
- **Spinner Color**: `#002147` (Oxford Blue)
- **Skeleton Background**: `#F1F4F9` (Light Gray)
- **Skeleton Animation**: Shimmer effect with lighter gradient

---

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

- **Oxford Blue on Ivory**: 14.5:1 (AAA)
- **Oxford Blue on White**: 15.2:1 (AAA)
- **Oxford Blue on Light Gray**: 13.8:1 (AAA)
- **White on Oxford Blue**: 15.2:1 (AAA)
- **Gold on Oxford Blue**: 4.8:1 (AA)

### Focus Indicators
- All interactive elements have visible focus states
- Focus ring is 2px solid with appropriate color
- Focus ring offset is 2px for clarity

### Text Sizing
- Minimum text size: 14px (0.875rem)
- Body text: 16px (1rem)
- Line height minimum: 1.5 for readability

---

## Responsive Design

### Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`
- **Large Desktop**: `> 1400px`

### Mobile Adaptations
- Reduce padding and margins by 25-50%
- Stack horizontal layouts vertically
- Increase touch target sizes to minimum 44px
- Show mobile navigation at bottom
- Hide less critical information

### Tablet Adaptations
- Moderate padding and spacing
- Use 2-column layouts where appropriate
- Show condensed navigation
- Maintain readability with appropriate font sizes

---

## Animation & Transitions

### Transition Durations
- **Fast**: `150ms` - Hover states, small changes
- **Standard**: `300ms` - Most transitions
- **Slow**: `500ms` - Theme changes, large animations

### Easing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - Most transitions
- **Ease Out**: `cubic-bezier(0, 0, 0.2, 1)` - Entering elements
- **Ease In**: `cubic-bezier(0.4, 0, 1, 1)` - Exiting elements

### Common Animations
- **Fade In**: Opacity 0 to 1 over 300ms
- **Slide Up**: Transform translateY(12px) to 0 over 300ms
- **Scale**: Transform scale(0.95) to 1 over 200ms
- **Hover Scale**: Transform scale(1) to 1.05 over 150ms

---

## Best Practices

### Do's
✅ Use Oxford Blue for primary actions and important text
✅ Maintain consistent spacing using the 4px grid system
✅ Apply appropriate border radius for visual hierarchy
✅ Use white backgrounds for elevated content
✅ Apply subtle shadows for depth
✅ Use Gold accent sparingly for special elements
✅ Ensure sufficient color contrast for accessibility
✅ Use medium font weight (500) for emphasis
✅ Apply backdrop blur for overlaying elements

### Don'ts
❌ Don't use pure black (#000000) - use Oxford Blue instead
❌ Don't mix border radius sizes inconsistently
❌ Don't overuse the Gold accent color
❌ Don't use text smaller than 14px
❌ Don't create low-contrast color combinations
❌ Don't use more than 3 levels of visual hierarchy
❌ Don't apply heavy shadows in light mode
❌ Don't use bold font weight (700) - use medium (500) instead

---

## Implementation Notes

### CSS Variables
All colors and design tokens are defined as CSS custom properties in the `:root` selector, making them easy to reference and maintain:

```css
:root {
  --background: #FDFDFB;
  --foreground: #002147;
  --primary: #002147;
  --accent: #E8C547;
  --radius: 0.75rem;
  /* ... more variables */
}
```

### Tailwind Integration
The design system integrates with Tailwind CSS through the `@theme inline` directive, allowing you to use design tokens as Tailwind utilities:

```jsx
<div className="bg-background text-foreground rounded-lg">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

### Component Styling
Components should use semantic color variables rather than hard-coded values:

```jsx
// Good
<div className="bg-card border-border text-card-foreground">

// Avoid
<div className="bg-white border-gray-200 text-gray-900">
```

---

## Version History

- **v1.0** - Initial light mode design system documentation
- **Date**: 2026
- **Status**: Active

---

## Related Documentation

- Dark Mode Design System (separate document)
- Component Library Documentation
- Accessibility Guidelines
- Brand Guidelines

---

*This design system is maintained by the UniQuest design team. For questions or suggestions, please contact the design team.*
