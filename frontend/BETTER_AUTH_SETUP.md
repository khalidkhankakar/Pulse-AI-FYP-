# Better Auth Setup Guide - Pulse AI

## Issues Found & Fixed

### ✅ Fixed Issues:

1. **Dynamic Client Base URL** - Now uses environment variable `NEXT_PUBLIC_BASE_URL` or auto-detects from window.location
2. **Social Login Redirect** - Removed `disableRedirect: true` to let better-auth handle redirects properly
3. **Email Auth Redirect** - Added proper redirect to `/dashboard` after successful login/signup
4. **Loading States** - Added loading indicator and disabled buttons during authentication
5. **Error Handling** - Improved error handling with proper error messages
6. **Environment Variables** - Added validation and documentation

---

## Required Setup Steps

### 1. **Create `.env.local` file**

Copy from `.env.example` and fill in your actual values:

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your actual credentials
```

### 2. **Set Environment Variables**

You MUST have these in your `.env.local`:

```env
# Database Connection (Neon DB)
DATABASE_URL=postgresql://username:password@ep-xxxxx.region.neon.tech/database_name

# Better Auth Configuration
BETTER_AUTH_URL=http://localhost:3000/api/auth  # During dev
BETTER_AUTH_SECRET=your-32-character-random-secret  # Generate: openssl rand -base64 32

# GitHub OAuth (from github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth (from console.cloud.google.com)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Client-side URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. **Setup OAuth Providers**

#### GitHub OAuth:
1. Go to: https://github.com/settings/developers
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

#### Google OAuth:
1. Go to: https://console.cloud.google.com
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### 4. **Database Setup**

Ensure your PostgreSQL database is created:

```bash
# Create database tables from migrations
# Run migrations using drizzle
pnpm drizzle-kit push
```

Check that these tables exist:
- `user`
- `session`
- `account`
- `verification`

### 5. **Test the Setup**

```bash
# Start development server
pnpm dev

# Visit: http://localhost:3000/login
# Try email/password login first
# Then test social login buttons
```

---

## File Changes Summary

### Modified Files:

#### `src/utils/auth-client.ts`
- Now uses dynamic `baseURL` from `NEXT_PUBLIC_BASE_URL`
- Falls back to `window.location.origin` for client-side detection

#### `src/utils/auth.ts`
- Added `BETTER_AUTH_SECRET` configuration
- Added environment variable validation with warnings

#### `src/app/(auth)/_components/auth-form.tsx`
- Added `useRouter` for programmatic redirects
- Removed `disableRedirect` from social login
- Added proper async/await handling
- Added loading states to buttons
- Added redirects to `/dashboard` after success
- Improved error handling with try-catch

---

## Troubleshooting

### Social Login Not Working:
- ✅ Check `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- ✅ Verify callback URLs match in OAuth provider settings
- ✅ Ensure `BETTER_AUTH_URL` and `NEXT_PUBLIC_BASE_URL` are correct

### Email Login Failing:
- ✅ Check database connection: `DATABASE_URL`
- ✅ Verify tables exist: `pnpm drizzle-kit push`
- ✅ Check password is being hashed correctly

### Redirect Not Working:
- ✅ Check `NEXT_PUBLIC_BASE_URL` is set
- ✅ Verify `/dashboard` route exists and is protected properly
- ✅ Check browser console for errors

### Session Not Persisting:
- ✅ Check cookies are enabled
- ✅ Verify `BETTER_AUTH_SECRET` is set
- ✅ Check session cookie domain settings

---

## Next Steps

1. Copy `.env.local` and fill in all variables
2. Set up OAuth applications (GitHub & Google)
3. Run database migrations: `pnpm drizzle-kit push`
4. Start dev server: `pnpm dev`
5. Test at: `http://localhost:3000/login`

For production, remember to:
- Change `BETTER_AUTH_URL` to your production domain
- Change `NEXT_PUBLIC_BASE_URL` to your production URL
- Use strong `BETTER_AUTH_SECRET`
- Update OAuth callback URLs in provider settings
