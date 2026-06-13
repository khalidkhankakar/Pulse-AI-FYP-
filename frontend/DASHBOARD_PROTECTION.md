# Dashboard Protection & Middleware Setup

## Overview

Your dashboard is now protected by a **3-layer authentication system**:

1. **Next.js Middleware** (Server-side) - `middleware.ts`
2. **Auth Guard Utilities** (Server-side) - `src/lib/auth-guard.ts`
3. **Protected Layout Component** (Client-side) - `src/components/protected-layout.tsx`

---

## How It Works

### Layer 1: Middleware (middleware.ts)

Intercepts **all requests** before they reach your app:
- Checks for valid session cookies (`better-auth.session_token` or `better-auth.session`)
- Unauthenticated users → Redirected to `/login` with callback URL
- Authenticated users on `/login` or `/signup` → Redirected to `/dashboard`

### Layer 2: Auth Guard (src/lib/auth-guard.ts)

Provides utility functions for server-side components:
- `checkAuth()` - Returns session or null
- `requireAuth()` - Throws redirect if not authenticated

### Layer 3: Protected Layout (src/components/protected-layout.tsx)

React component wrapper for client-side protection:
- Uses `useSession()` hook to verify authentication
- Shows loading spinner while checking session
- Redirects to login if session invalid
- Wraps entire dashboard layout

---

## Protected Routes

### Fully Protected (All subpaths):
- `/dashboard/*`

### Public Routes (No auth required):
- `/` (home)
- `/login`
- `/signup`
- `/api/auth/*` (authentication endpoints)

### Public Assets:
- `/_next/*`
- `/public/*`
- `/api/*` (unless you add specific protections)

---

## Environment Variables Required

Add these to your `.env.local`:

```env
# Better Auth
BETTER_AUTH_URL=http://localhost:3000/api/auth
BETTER_AUTH_SECRET=your-32-char-secret

# Client-side
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://...

# OAuth
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## Testing the Protection

### Test 1: Direct Access Without Auth
```bash
# Should redirect to login
curl -i http://localhost:3000/dashboard
```

### Test 2: Manual Test in Browser
1. Open DevTools → Application → Cookies
2. Clear all cookies
3. Try accessing `http://localhost:3000/dashboard`
4. Should redirect to `/login`

### Test 3: After Login
1. Login with email/password or social
2. Should redirect to `/dashboard`
3. Session cookie should be set
4. Can now access dashboard freely

### Test 4: Authenticated User on /login
1. Login and access `/dashboard`
2. Manually go to `/login`
3. Middleware should redirect you back to `/dashboard`

---

## Cookie Requirements

Better-auth stores session in cookies. Ensure:

✅ Browser cookies are **enabled**
✅ Cookie domain matches your app domain
✅ `BETTER_AUTH_SECRET` is set (for secure cookie signing)

For production, update cookie settings in `src/utils/auth.ts`:

```typescript
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    // ... other config
    // Optionally configure cookie settings:
    // session: {
    //   expiresIn: 7 * 24 * 60 * 60, // 7 days
    //   updateAge: 24 * 60 * 60, // Update every day
    // }
})
```

---

## File Structure

```
frontend/
├── middleware.ts                      # 🔐 Route protection (interceptor)
├── src/
│   ├── lib/
│   │   └── auth-guard.ts             # 🔐 Server-side auth utilities
│   ├── components/
│   │   └── protected-layout.tsx       # 🔐 Client-side auth wrapper
│   └── app/
│       └── dashboard/
│           └── layout.tsx            # 🔐 Wrapped with ProtectedLayout
```

---

## Troubleshooting

### "Redirected to /login infinitely"
- Check `BETTER_AUTH_SECRET` is set
- Clear browser cookies
- Verify session cookie is being set after login
- Check browser DevTools → Network tab for cookie headers

### "Dashboard shows loading forever"
- Check if `useSession()` is working
- Verify `Spinner` component exists at `/components/ui/spinner.tsx`
- Check console errors in browser DevTools

### "Session not persisting"
- Ensure `BETTER_AUTH_SECRET` matches between requests
- Check cookie domain/path settings
- Verify `baseURL` in auth-client.ts matches server

### "Middleware not working"
- Ensure `middleware.ts` is at project root (not in `src/`)
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `pnpm dev`

---

## Security Notes

🔒 **Best Practices:**
1. Always use `BETTER_AUTH_SECRET` in production
2. Use HTTPS in production (cookies require secure flag)
3. Add CSRF protection for forms
4. Validate all user inputs server-side
5. Keep dependencies updated

---

## Next Steps

1. Verify `.env.local` has all required variables
2. Test protection: Try accessing `/dashboard` without logging in
3. Test login: Login should redirect to `/dashboard`
4. Check browser cookies to see session token
5. Test logout: Should clear session and redirect to `/login`

