const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file manually
function loadEnvFile() {
  // Try .env.local first (Next.js default), then .env
  const envPaths = [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env')
  ];
  
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      console.log(`Loading environment from: ${path.basename(envPath)}`);
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, ''); // Remove surrounding quotes
            process.env[key] = value;
          }
        }
      }
      break; // Stop after loading the first existing file
    }
  }
}

// Load environment variables
loadEnvFile();

// Check if Supabase environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set');
  console.error('This script requires Supabase credentials to create admin users.');
  process.exit(1);
}

// For creating users, we need the service role key (not anon key)
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('\nError: SUPABASE_SERVICE_ROLE_KEY is required to create users programmatically.');
  console.error('\nYou have two options:');
  console.error('1. Add SUPABASE_SERVICE_ROLE_KEY to your .env.local file');
  console.error('   (Get it from: Supabase Dashboard → Settings → API → service_role key)');
  console.error('\n2. Create the admin user manually:');
  console.error('   - Go to Supabase Dashboard → Authentication → Users');
  console.error('   - Click "Invite User" or "Add User"');
  console.error('   - Use email: admin@outsoor.com');
  console.error('   - Set a password');
  console.error('   - The user will automatically be an admin (based on ADMIN_EMAILS in middleware.ts)');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function createAdminUser() {
  const email = 'admin@outsoor.com';
  const password = 'admin123!@#'; // Change this to a secure password
  const name = 'Admin User';

  try {
    console.log(`\nCreating admin user: ${email}`);
    console.log('Note: This email is configured as admin in ADMIN_EMAILS (middleware.ts)\n');
    
    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const existingUser = existingUsers.users.find(u => u.email === email);

    if (existingUser) {
      console.log('✓ Admin user already exists!');
      console.log(`  Email: ${existingUser.email}`);
      console.log(`  ID: ${existingUser.id}`);
      console.log(`  Created: ${new Date(existingUser.created_at).toLocaleDateString()}`);
      console.log('\nThe user is already configured as admin via ADMIN_EMAILS.');
      return;
    }

    // Create new user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name
      }
    });

    if (error) {
      throw error;
    }

    console.log('✓ Admin user created successfully!');
    console.log(`  Email: ${data.user.email}`);
    console.log(`  ID: ${data.user.id}`);
    console.log(`  Password: ${password} (change this after first login!)`);
    console.log('\nYou can now login at /admin/login with these credentials.');
    console.log('The user is automatically an admin via ADMIN_EMAILS configuration.');

  } catch (error) {
    console.error('\n✗ Error creating admin user:', error.message);
    
    if (error.message.includes('service_role')) {
      console.error('\nMake sure you\'re using the SERVICE ROLE key, not the ANON key.');
    }
    
    process.exit(1);
  }
}

createAdminUser();
