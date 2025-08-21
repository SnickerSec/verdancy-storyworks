# Newsletter Setup Instructions

The newsletter form is now functional and ready to be configured with EmailJS.

## Setup Steps

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Add a new service (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note down your **Service ID**

3. **Create Email Template**
   - Go to "Email Templates" in your dashboard
   - Create a new template with these parameters:
     - **Subject**: `New Newsletter Subscription - Verdancy Storyworks`
     - **Content**:
       ```
       Hello {{to_name}},

       A new user has subscribed to the Verdancy Storyworks newsletter:

       Email: {{user_email}}
       Time: {{current_time}}

       {{message}}

       Best regards,
       Verdancy Storyworks Website
       ```
   - Note down your **Template ID**

4. **Get Public Key**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Update Configuration**
   - Open `assets/js/config.js`
   - Replace the placeholder values:
     ```javascript
     const EMAIL_CONFIG = {
         publicKey: 'your_actual_public_key',
         serviceId: 'your_actual_service_id', 
         templateId: 'your_actual_template_id'
     };
     ```

6. **Test the Form**
   - Open the website
   - Try subscribing with a test email
   - Check your configured email for the subscription notification

## Current Status
- ✅ EmailJS SDK integrated
- ✅ Form validation active
- ✅ Error handling implemented
- ✅ Loading states working
- ⚠️ **Configuration required** - Update `assets/js/config.js` with your EmailJS credentials

## Free Tier Limits
EmailJS free tier allows:
- 200 emails per month
- 2 email services
- 1 email template per service

Perfect for getting started with newsletter functionality!