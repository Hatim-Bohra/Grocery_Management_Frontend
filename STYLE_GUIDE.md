# GrocerFlow Design System Style Guide

## Overview

This style guide documents the design system for GrocerFlow, a modern grocery management application. The design is inspired by Amazon's layout principles, featuring clear visual hierarchy, consistent spacing, strong typography, and a responsive 12-column grid system.

---

## Color Palette

### Neutral Grays

Used for backgrounds, borders, and text hierarchy.

- **Gray 50**: `#fafafa` - Lightest background
- **Gray 100**: `#f5f5f5` - Surface backgrounds
- **Gray 200**: `#e5e5e5` - Borders
- **Gray 300**: `#d4d4d4` - Subtle borders
- **Gray 400**: `#a3a3a3` - Disabled states
- **Gray 500**: `#737373` - Tertiary text
- **Gray 600**: `#525252` - Secondary text
- **Gray 700**: `#404040` - Dark text
- **Gray 800**: `#262626` - Header backgrounds
- **Gray 900**: `#171717` - Primary text, dark backgrounds

### Primary Blue (Accent)

Main brand color for interactive elements.

- **Primary 500**: `#3b82f6` - Default primary
- **Primary 600**: `#2563eb` - Primary buttons, links
- **Primary 700**: `#1d4ed8` - Hover states

### Success Green

For positive actions and success states.

- **Success 500**: `#22c55e` - Default success
- **Success 600**: `#16a34a` - Success buttons

### Warning Amber

For warnings and important notices.

- **Warning 500**: `#f59e0b` - Default warning
- **Warning 600**: `#d97706` - Warning emphasis

### Error Red

For errors and destructive actions.

- **Error 500**: `#ef4444` - Default error
- **Error 600**: `#dc2626` - Error buttons

### Semantic Colors

```css
--color-background: #ffffff --color-surface: var(--color-gray-50)
  --color-border: var(--color-gray-200) --color-text-primary: var(--color-gray-900)
  --color-text-secondary: var(--color-gray-600) --color-text-tertiary: var(--color-gray-500);
```

**Accessibility**: All color combinations meet WCAG AA standards for contrast (4.5:1 for normal text, 3:1 for large text).

---

## Spacing System

Based on a **4px base unit** for consistent spacing throughout the application.

| Token          | Value | Usage                            |
| -------------- | ----- | -------------------------------- |
| `--spacing-1`  | 4px   | Minimal spacing, badge padding   |
| `--spacing-2`  | 8px   | Small gaps, button padding       |
| `--spacing-3`  | 12px  | Medium gaps, input padding       |
| `--spacing-4`  | 16px  | Standard spacing, card padding   |
| `--spacing-6`  | 24px  | Section spacing                  |
| `--spacing-8`  | 32px  | Large spacing, component margins |
| `--spacing-12` | 48px  | Extra large spacing              |
| `--spacing-16` | 64px  | Section dividers                 |
| `--spacing-24` | 96px  | Hero sections                    |

**Usage Examples**:

```css
.card {
  padding: var(--spacing-4);
}
.section {
  margin-bottom: var(--spacing-8);
}
.hero {
  padding: var(--spacing-24) 0;
}
```

---

## Typography

### Font Family

```css
--font-family-base:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes (16px base)

| Token              | Size | Usage                         |
| ------------------ | ---- | ----------------------------- |
| `--font-size-xs`   | 12px | Labels, captions              |
| `--font-size-sm`   | 14px | Secondary text, small buttons |
| `--font-size-base` | 16px | Body text, default            |
| `--font-size-lg`   | 18px | Emphasized text               |
| `--font-size-xl`   | 20px | Card titles                   |
| `--font-size-2xl`  | 24px | Section headings              |
| `--font-size-3xl`  | 30px | Page titles                   |
| `--font-size-4xl`  | 36px | Hero headings                 |
| `--font-size-5xl`  | 48px | Large hero text               |

### Font Weights

| Token                    | Weight | Usage                    |
| ------------------------ | ------ | ------------------------ |
| `--font-weight-normal`   | 400    | Body text                |
| `--font-weight-medium`   | 500    | Emphasized text, buttons |
| `--font-weight-semibold` | 600    | Headings, labels         |
| `--font-weight-bold`     | 700    | Strong emphasis          |

### Line Heights

| Token                   | Value | Usage             |
| ----------------------- | ----- | ----------------- |
| `--line-height-tight`   | 1.25  | Headings          |
| `--line-height-normal`  | 1.5   | Body text         |
| `--line-height-relaxed` | 1.75  | Long-form content |

**Example**:

```css
h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}
```

---

## Border Radius

Based on **8px base** for consistent rounded corners.

| Token           | Value  | Usage                   |
| --------------- | ------ | ----------------------- |
| `--radius-sm`   | 4px    | Small elements, badges  |
| `--radius-base` | 8px    | Buttons, inputs, cards  |
| `--radius-lg`   | 12px   | Large cards             |
| `--radius-xl`   | 16px   | Modal dialogs           |
| `--radius-full` | 9999px | Pills, circular avatars |

---

## Shadows (Elevation)

Subtle shadow system for depth and hierarchy.

| Token           | Value                         | Usage               |
| --------------- | ----------------------------- | ------------------- |
| `--shadow-sm`   | `0 1px 2px rgba(0,0,0,0.05)`  | Subtle lift         |
| `--shadow-base` | `0 1px 3px rgba(0,0,0,0.1)`   | Cards at rest       |
| `--shadow-md`   | `0 4px 6px rgba(0,0,0,0.1)`   | Hover states        |
| `--shadow-lg`   | `0 10px 15px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| `--shadow-xl`   | `0 20px 25px rgba(0,0,0,0.1)` | Modals              |

---

## Grid System

**12-column responsive grid** with flexible breakpoints.

### Breakpoints

| Name    | Range      | Columns      |
| ------- | ---------- | ------------ |
| Mobile  | ≤640px     | 1-4 columns  |
| Tablet  | 641-1024px | 2-6 columns  |
| Desktop | ≥1025px    | 3-12 columns |

### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px; /* Mobile */
  padding: 0 24px; /* Tablet */
  padding: 0 32px; /* Desktop */
}
```

### Grid Usage

```html
<div class="grid">
  <div class="col-12 col-tablet-6 col-desktop-4">Column 1</div>
  <div class="col-12 col-tablet-6 col-desktop-4">Column 2</div>
  <div class="col-12 col-tablet-6 col-desktop-4">Column 3</div>
</div>
```

---

## Buttons

### Variants

#### Primary Button

```html
<button class="btn btn-primary">Primary Action</button>
```

- Background: `--color-primary-600`
- Hover: `--color-primary-700` with lift effect
- Use for: Main CTAs, submit actions

#### Secondary Button

```html
<button class="btn btn-secondary">Secondary Action</button>
```

- Border: `--color-border`
- Hover: Light background fill
- Use for: Alternative actions, cancel

#### Ghost Button

```html
<button class="btn btn-ghost">Ghost Action</button>
```

- Transparent background
- Hover: Light gray background
- Use for: Tertiary actions, navigation

#### Danger Button

```html
<button class="btn btn-danger">Delete</button>
```

- Background: `--color-error-600`
- Use for: Destructive actions

### Sizes

```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### States

- **Default**: Normal appearance
- **Hover**: Slight lift (`translateY(-1px)`) + shadow increase
- **Active**: Return to normal position
- **Disabled**: 50% opacity, no pointer events

---

## Form Controls

### Text Input

```html
<label class="label">Email Address</label>
<input type="email" class="input" placeholder="Enter your email" />
```

**Styling**:

- Border: `1px solid var(--color-border)`
- Focus: Blue border + subtle shadow
- Padding: `12px 16px`
- Border radius: `8px`

### Select Dropdown

```html
<label class="label">Category</label>
<select class="select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Textarea

```html
<label class="label">Description</label> <textarea class="textarea" rows="4"></textarea>
```

### States

- **Default**: Gray border
- **Focus**: Primary blue border with shadow ring
- **Disabled**: Gray background, reduced opacity
- **Error**: Red border (add `.input-error` class)

---

## Cards

### Basic Card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
</div>
```

**Features**:

- Border: `1px solid var(--color-border)`
- Border radius: `12px`
- Padding: `16px`
- Hover: Lift effect + shadow increase

---

## Badges

```html
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Sold Out</span>
```

**Styling**:

- Padding: `4px 8px`
- Font size: `12px`
- Border radius: Full (pill shape)
- Font weight: Medium

---

## Component Examples

### Product Card

```html
<div class="product-card">
  <div class="product-card-image">
    <img src="product.jpg" alt="Product" />
  </div>
  <div class="product-card-content">
    <div class="product-card-category">Fruits</div>
    <h3 class="product-card-title">Fresh Apples</h3>
    <div class="product-card-price">
      <span class="product-card-price-current">$3.99</span>
      <span class="product-card-unit">/ lb</span>
    </div>
    <button class="btn btn-primary product-card-btn">Add to Cart</button>
  </div>
</div>
```

### Navbar

The navbar features:

- Fixed positioning with sticky behavior
- Dark background (`--color-gray-900`)
- Prominent search bar (center on desktop)
- Secondary navigation bar for categories
- Mobile-responsive hamburger menu

---

## Responsive Design

### Mobile (≤640px)

- Single column layouts
- Stacked navigation
- Full-width buttons
- Hamburger menu

### Tablet (641-1024px)

- 2-3 column grids
- Condensed navigation
- Balanced layouts

### Desktop (≥1025px)

- 3-6 column grids
- Full navigation visible
- Optimal reading width (1280px max)

---

## Transitions & Animations

### Timing Functions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1) --transition-base: 200ms
  cubic-bezier(0.4, 0, 0.2, 1) --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations

**Hover Lift**:

```css
.card:hover {
  transform: translateY(-4px);
  transition: all var(--transition-base);
}
```

**Skeleton Loading**:

```css
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## Accessibility Guidelines

1. **Color Contrast**: All text meets WCAG AA standards (4.5:1 minimum)
2. **Focus States**: Visible focus rings on all interactive elements
3. **Keyboard Navigation**: All components accessible via keyboard
4. **ARIA Labels**: Proper labels on icon-only buttons
5. **Semantic HTML**: Use appropriate HTML5 elements

---

## Usage Tips

1. **Spacing**: Always use design tokens, never hardcode pixel values
2. **Colors**: Use semantic color variables for consistency
3. **Typography**: Maintain hierarchy with proper heading levels
4. **Grid**: Leverage the 12-column grid for all layouts
5. **Components**: Reuse existing components before creating new ones

---

## Resources

- **Design Tokens**: `src/styles/design-tokens.css`
- **Global Styles**: `src/index.css`
- **Component Styles**: Co-located with components (e.g., `Navbar.css`)

---

_Last Updated: December 2025_
