# Environment Variables for Production

## Required Variables for Production

Set these environment variables in your deployment platform:

### Client-side (NEXT_PUBLIC_*)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### Server-side (keep secret)
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side operations (if needed)

## Deployment Platform Examples

### Vercel
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Netlify
Set in dashboard: Site settings > Environment variables

### Railway/DigitalOcean App Platform
Set in dashboard environment variables section

## Security Notes

- Never commit `.env.local` to git (it's already ignored)
- Only use `NEXT_PUBLIC_*` prefix for variables needed in browser
- Keep service role keys server-side only
- Rotate keys if compromised
- Use different keys for staging/production if needed