# EmailJS Setup Guide (Modern API)

## Step 1: Create EmailJS Account
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up for a free account or log in

## Step 2: Create Email Service
1. In the dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Design your email template with these variables:
   - `{{user_name}}` - Sender's name
   - `{{user_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_email}}` - Your email (where messages will be sent)
4. Example template:
   ```
   Subject: New Contact Form Message: {{subject}}
   
   From: {{user_name}} ({{user_email}})
   
   Message:
   {{message}}
   
   ---
   This message was sent to: {{to_email}}
   ```
5. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abc123def456`)
   - This replaces the old "User ID" system

## Step 5: Update Environment Variables
1. Open the `.env.local` file in your project root
2. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123def456
   ```

## Step 6: Update Your Email in Code
1. Open `src/app/components/contact-form-demo.tsx`
2. Find this line:
   ```typescript
   to_email: 'your-email@example.com', // Replace with your email
   ```
3. Replace `your-email@example.com` with your actual email address

## Step 7: Test the Form
1. Restart your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email for the message

## Troubleshooting

### Common Issues:
1. **"Public key is required"** - Check that `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is set correctly
2. **"Service not found"** - Verify `NEXT_PUBLIC_EMAILJS_SERVICE_ID` matches your service
3. **"Template not found"** - Verify `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` matches your template
4. **CORS errors** - Make sure your domain is added to EmailJS allowed origins

### Environment Variables Not Loading:
- Make sure the file is named `.env.local` (not `.env`)
- Restart your development server after making changes
- Variables must start with `NEXT_PUBLIC_` to be available in the browser

### Email Not Sending:
- Check EmailJS dashboard for usage limits
- Verify your email service is properly configured
- Check browser console for detailed error messages
- Make sure you updated the `to_email` in the code

## Modern EmailJS Changes:
- ✅ Uses `@emailjs/browser` package (modern)
- ✅ Uses Public Key instead of User ID
- ✅ Uses `emailjs.init()` and `emailjs.send()` methods
- ✅ No longer requires User ID
- ✅ More secure and reliable

## Security Notes:
- The `.env.local` file is already in `.gitignore` and won't be committed
- EmailJS Public Key is safe to expose in client-side code
- For production, set these environment variables in your hosting platform (Vercel, Netlify, etc.)

## Free Tier Limits:
- EmailJS free tier allows 200 emails per month
- For higher volumes, consider upgrading to a paid plan