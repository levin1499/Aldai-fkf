# FKF Aldai Team Management System

A comprehensive team management system for Football Kenya Federation - Aldai Branch, built with React, TypeScript, and Supabase.

## Features

- 🔍 Public player search and profiles
- 👥 Club management
- 🏃‍♂️ Player registration and verification
- 🔐 Secure admin dashboard
- 📱 Responsive design
- 🎨 FKF brand colors and styling

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Database & Authentication)
- React Router
- React Hook Form
- Zustand (State Management)
- Lucide React (Icons)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd team-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project at [Supabase](https://supabase.com)
   - Copy your project's URL and anon key
   - Create a `.env` file in the project root:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Initialize the database:
   - Navigate to the SQL editor in your Supabase dashboard
   - Copy the contents of `supabase/migrations/20250429050838_polished_cliff.sql`
   - Execute the SQL to create the necessary tables and policies

5. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Database Configuration

The system uses Supabase as its database. The schema includes:

### Tables
- `clubs`: Stores club information
- `players`: Stores player information

### Row Level Security (RLS)
- Public can read all data
- Only authenticated users can modify data

### Relationships
- Players belong to clubs (foreign key relationship)

## Deployment

### Supabase Setup

1. Create a new Supabase project
2. Execute the migration SQL from `supabase/migrations/`
3. Copy your project URL and anon key

### Netlify Deployment

1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Deploy!

## Environment Variables

Required environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Authentication

Default admin credentials:
- Username: `admin`
- Password: `password`

⚠️ Change these credentials in production!

## Project Structure

```
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── lib/           # Utility functions and configurations
│   ├── models/        # TypeScript types and interfaces
│   ├── pages/         # Page components
│   └── services/      # API and service functions
├── supabase/
│   └── migrations/    # Database migrations
└── public/           # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the FKF Aldai Branch administration.