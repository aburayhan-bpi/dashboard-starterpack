# Professional Dashboard

A complete professional dashboard built using **only Tailwind CSS** and **React/Next.js**. It can be easily integrated into any React or Next.js project.

## ✨ Features

### 🎨 Design & UI
- **Fully responsive** for mobile, tablet, and desktop
- **Light/Dark/System themes** with a theme switcher
- **Professional design** with a modern and clean interface
- **100% Tailwind CSS** – no external UI libraries

### 🔐 Authentication
- **Login system** with email and password
- **Forgot password flow** with OTP verification
- **Reusable OTP input component** with paste support across devices

### 📊 Dashboard Features
- **Sidebar navigation** with collapse/expand support
- **Responsive header** with user profile dropdown
- **Mobile menu** with blur background
- **Data table** with search and pagination

### 🔍 Search & Pagination
- **URL-based search** for server-side pagination
- **Reusable pagination component** for multiple pages
- **Debounced search** for better performance

### 👥 Role-Based Access
- Customizable **Admin, Manager, and User** roles
- **Permission system** for page-level access
- **Protected routes** to prevent unauthorized access

### 📱 Mobile Optimization
- **Touch-friendly interactions**
- **Responsive layout**
- **Fast loading with minimal bundle size**

## 🚀 Quick Start

### Installation

```bash
# Clone or download
git clone <repository-url>
cd professional-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

### Demo Credentials

```
Email: demo@example.com
Password: password123
```

## 📁 Project Structure

```
professional-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   ├── forgot-password/
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── users/
│       ├── analytics/
│       ├── reports/
│       ├── settings/
│       ├── profile/
│       └── unauthorized/
├── components/
│   └── dashboard/
│       ├── layout.tsx
│       ├── sidebar.tsx
│       ├── header.tsx
│       ├── pagination.tsx
│       ├── search-bar.tsx
│       ├── data-table.tsx
│       └── protected-route.tsx
├── providers/
│   └── theme-provider.tsx
├── lib/
│   └── auth.ts
├── app/
│   └── globals.css
└── README.md
```

## 🎯 Core Components

### 1. Sidebar (`components/dashboard/sidebar.tsx`)
- Expand/Collapse functionality
- Nested menu support
- Active link highlighting
- Mobile drawer mode

### 2. Header (`components/dashboard/header.tsx`)
- Theme switcher (Light/Dark/System)
- User profile dropdown
- Logout option
- Mobile menu toggle

### 3. Pagination (`components/dashboard/pagination.tsx`)
- URL-based pagination
- Smart page numbers
- First/Last page jump
- Responsive layout

### 4. SearchBar (`components/dashboard/search-bar.tsx`)
- Debounced searches
- URL parameter sync
- Clear button
- Real-time filtering

### 5. DataTable (`components/dashboard/data-table.tsx`)
- Generic type support
- Custom render functions
- Loading and empty states

### 6. ProtectedRoute (`components/dashboard/protected-route.tsx`)
- Role-based access checks
- Automatic redirects
- Loading state

## 🎨 Theme Customization

Theme variables are defined in `app/globals.css`:

```css
@theme inline {
  --color-primary: #3b82f6;
  --color-primary-dark: #1e40af;
  --color-primary-light: #60a5fa;

  --color-background: var(--background);
  --color-background-secondary: #f9fafb;
  --color-foreground: var(--foreground);

  /* Dark mode */
  --color-dark-background: #0f172a;
  --color-dark-background-secondary: #1e293b;
  --color-dark-foreground: #f1f5f9;

  /* Accent colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

## 🔐 Authentication Flow

### Login
1. Enter email and password
2. User data is stored in `localStorage`
3. Redirected to dashboard

### Forgot Password
1. Enter email
2. Receive OTP (demo: any 6 digits)
3. Set new password
4. Redirect to login

## 👥 Role-Based Access

### Admin
- Full access
- User management
- Settings

### Manager
- Dashboard, Users, Analytics, Reports
- No settings access

### User
- Dashboard only

## 📱 Responsive Breakpoints

```
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
```

## 🚀 Deployment

### Deploy to Vercel

```bash
npm run build
vercel deploy
```

### Other platforms

```bash
npm run build
# Output: .next folder
```

## 📦 Dependencies

- **Next.js 15+**
- **React 19+**
- **Tailwind CSS 4**
- **Lucide React**

## 🎓 Code Quality

- ✅ TypeScript support
- ✅ ESLint configured
- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Performance optimized

## 🔧 Customization Guide

### Add a New Page

```tsx
// app/dashboard/new-page/page.tsx
"use client"

import { ProtectedRoute } from "@/components/dashboard/protected-route"

export default function NewPage() {
  return (
    <ProtectedRoute requiredRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">New Page</h1>
      </div>
    </ProtectedRoute>
  )
}
```

### Add a Navigation Item

In `components/dashboard/sidebar.tsx` update `navItems`:

```tsx
const navItems: NavItem[] = [
  // ...existing items
  {
    label: "New Page",
    href: "/dashboard/new-page",
    icon: <Icon className="w-5 h-5" />,
  },
]
```

### Customize Role Permissions

In `lib/auth.ts` edit `rolePermissions`:

```tsx
export const rolePermissions: Record<UserRole, string[]> = {
  admin: ["view_dashboard", "manage_users", "new_permission"],
  manager: ["view_dashboard", "view_users"],
  user: ["view_dashboard"],
}
```

## 🐛 Troubleshooting

### Stuck on Login?
- Check `localStorage`: `localStorage.getItem('user')`
- Inspect browser console errors

### Theme Not Updating?
- Check `localStorage.getItem('theme')`
- Refresh browser

### Pagination Issues?
- Confirm URL params: `?page=1&search=query`
- Verify dataset length

## 📝 License

This project is open-source and free to use.

## 🤝 Contribution

Suggestions and pull requests are welcome.

---

**Happy Coding! 🚀**
