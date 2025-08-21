// EmailJS Configuration
// To set up the newsletter functionality:
// 1. Sign up for a free account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Replace the placeholder values below with your actual EmailJS credentials

const EMAIL_CONFIG = {
    publicKey: 'nR_-W_MJdmfJ87-Rp',     // Your EmailJS public key
    serviceId: 'service_koav5x5',       // Your EmailJS service ID
    templateId: 'template_2pxdjfy',     // Your EmailJS template ID
    adminEmail: 'verdancystoryworks@outlook.com' // Email to receive notifications
};

// Example template for EmailJS:
// Subject: New Newsletter Subscription - Verdancy Storyworks
// Body:
// Hello {{to_name}},
// 
// A new user has subscribed to the Verdancy Storyworks newsletter:
// 
// Email: {{user_email}}
// Time: {{current_time}}
// 
// {{message}}
// 
// Best regards,
// Verdancy Storyworks Website