# Admin Dashboard Structure

## Overview
This admin dashboard is built with a modular, clean architecture using Next.js App Router with Server and Client Components.

## Folder Structure

```
src/app/(admin)/
├── components/               # Reusable UI components
│   ├── Sidebar.jsx          # Navigation sidebar with active state
│   ├── TopBar.jsx           # Top navigation with search & profile
│   ├── StatCard.jsx         # Reusable stat card component (2 variants)
│   ├── BookingTable.jsx     # Bookings table with status badges
│   └── PageHeader.jsx       # Page title & action button component
├── layout.jsx               # Admin layout wrapper (Sidebar + TopBar + children)
├── dashboard/
│   └── page.jsx             # Overview page with stats & recent bookings
├── bookings/
│   └── page.jsx             # Bookings management with filtering
├── inventory/
│   └── page.jsx             # Equipment inventory tracking
├── customers/
│   └── page.jsx             # Customer list & management
├── finance/
│   └── page.jsx             # Revenue & financial reports
├── settings/
│   └── page.jsx             # System & business settings
├── support/
│   └── page.jsx             # Support center & FAQs
└── login/
    └── page.jsx             # Admin login page (already exists)
```

## Component Architecture

### Layout Components

**Sidebar** (`components/Sidebar.jsx`)
- Client Component with `usePathname` for active state
- Menu items configuration at top (easily extensible)
- Responsive (hidden on mobile, visible on md+)
- Active link highlighting with Material Icons fill

**TopBar** (`components/TopBar.jsx`)
- Search functionality with state
- Notification & profile buttons
- Fixed position header
- Responsive (hidden on mobile, visible on md+)

### Content Components

**PageHeader** (`components/PageHeader.jsx`)
- Reusable title + subtitle + action button
- Used on every page for consistency
- Accepts optional onClick handler for action buttons

**StatCard** (`components/StatCard.jsx`)
- Two variants: `default` (white) and `primary` (blue)
- Icon, title, value, and subtitle display
- Optional action button (primary variant)
- Animated hover glow effect
- Used for dashboard metrics

**BookingTable** (`components/BookingTable.jsx`)
- Displays booking data with responsive table
- Status badge with color coding
- Sample data included (replace with real data)
- Filter & view all buttons

### Page Structure

Each page follows this pattern:
1. Import components
2. Define page data/state
3. Return JSX with PageHeader + content
4. Modular and clean

Example:
```jsx
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

export default function Page() {
  return (
    <>
      <PageHeader ... />
      <div>...</div>
    </>
  );
}
```

## Styling System

- **Framework**: Tailwind CSS v4
- **Colors**: Material Design 3 custom tokens (defined in layout config)
- **Responsive**: Mobile-first (hidden on sm, visible on md+)
- **Components**: Built-in Tailwind plugins (forms, container-queries)

## Navigation

Sidebar menu items (easily extensible):
```javascript
const menuItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: 'dashboard' },
  { href: '/admin/bookings', label: 'Bookings', icon: 'calendar_month' },
  // ... more items
];
```

Active state detection with `usePathname()` hook.

## How to Extend

### Add a New Page
1. Create folder: `src/app/(admin)/new-page/`
2. Create page: `src/app/(admin)/new-page/page.jsx`
3. Add to sidebar in `components/Sidebar.jsx` menuItems array
4. Reuse PageHeader, StatCard, BookingTable components

### Add a New Component
1. Create in `src/app/(admin)/components/NewComponent.jsx`
2. Mark as Client Component if interactive (`'use client'`)
3. Keep it focused & reusable
4. Import in pages where needed

### Customize Styling
- Tailwind colors already configured in `layout.jsx`
- Material Design 3 tokens available in TailwindCSS
- Can add custom colors in Tailwind config

## Key Features

✅ Modular component structure  
✅ Responsive design (mobile-first)  
✅ Active navigation highlighting  
✅ Reusable stat cards with variants  
✅ Clean page layout with consistent headers  
✅ Sample data included (easy to replace)  
✅ Material Design 3 styling  
✅ Search functionality in TopBar  
✅ Status badge color coding  
✅ Fast, organized codebase  

## Next Steps

1. **Connect to Database**: Replace sample data in components with real data from Prisma
2. **Add Real Authentication**: Integrate with existing NextAuth setup
3. **Server Actions**: Create server actions for CRUD operations
4. **Forms**: Add form validation for settings/support pages
5. **Notifications**: Integrate real notification system
6. **Export Functions**: Implement PDF/CSV export for reports

---

Built with clean architecture principles & modular design patterns.
