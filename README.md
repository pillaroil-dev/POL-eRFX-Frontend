# Pillar Oil - POL eRFX

A comprehensive electronic Request for Quotation (eRFX) platform developed by Pillar Oil Limited for project bidding and real-time monitoring. This platform enables contractors and vendors to participate in tender bidding processes and foreign exchange (FX) bidding with an intuitive, modern interface.

## 🚀 Features

### Core Functionality
- **Tender Management**: Create, manage, and monitor tender processes with full lifecycle tracking
- **Bid Submission**: Secure bid placement system with document uploads and password protection
- **FX Bidding**: Foreign exchange bidding system for currency-related transactions
- **Real-time Monitoring**: Live status updates and notifications for all bidding activities
- **Multi-role Access**: Support for Admin, Contractor, Member, and FX Bidder roles
- **Document Management**: Secure file storage and retrieval using object storage (S3/MinIO)
- **Session Management**: Redis-based session handling with JWT authentication
- **Email & SMS Notifications**: Automated notifications for bidding events

### User Features
- **Contractor Dashboard**: View tenders, place bids, and track bid status
- **Member Management**: Contractors can add team members with role-based access
- **Bid History**: Complete audit trail of all bidding activities
- **OTP Verification**: Secure access control with OTP-based verification
- **Password Reset**: Self-service password recovery system
- **Google OAuth**: Alternative authentication via Google Sign-In

### Admin Features
- **Tender Administration**: Create, edit, and manage tender listings
- **Vendor Management**: Add and verify contractors/vendors
- **FX Management**: Create and manage FX bidding opportunities
- **Statistics Dashboard**: Comprehensive analytics and reporting
- **Settings Management**: Configure application settings and SMTP

## 🛠️ Tech Stack

### Frontend
- **Astro** (~5.3.0) - Modern web framework with server-side rendering
- **React** (^18.2.0) - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** (^3.4.17) - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Zustand** (^4.5.2) - State management
- **TanStack Table** (^8.12.0) - Data table component

### Backend
- **Node.js** (20+) - Runtime environment
- **Astro SSR** - Server-side rendering with Node adapter
- **Prisma** (^6.5.0) - Next-generation ORM
- **PostgreSQL** - Primary database
- **Redis** (ioredis ^5.5.0) - Session storage and caching

### Authentication & Security
- **JWT** (jsonwebtoken ^9.0.2) - Token-based authentication
- **bcryptjs** - Password hashing
- **Crypto-JS** (^4.2.0) - Additional encryption utilities
- **Google OAuth** (@googleapis/oauth2) - OAuth integration

### Storage & Services
- **AWS S3** (@aws-sdk/client-s3) - Object storage
- **MinIO** (^8.0.5) - S3-compatible object storage
- **Nodemailer** (^6.9.9) - Email service
- **Node-cron** (^3.0.3) - Scheduled tasks

### Development Tools
- **Vitest** (^1.6.0) - Testing framework
- **Vite** (^6.1.0) - Build tool
- **Docker** - Containerization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** (v12 or higher)
- **Redis** (v6 or higher)
- **Docker** (optional, for containerized deployment)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pillar-oil-bid
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/pillar_oil_bid?schema=public"

   # JWT Configuration
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="3600"
   JWT_REFRESH_EXPIRES_IN="86400"

   # Session Configuration
   SESSION_NAME="app-sessions"
   X_POL_RFX_SECRET="your-app-secret"

   # Redis Configuration
   REDIS_HOST="localhost"
   REDIS_PORT="6379"
   REDIS_PASSWORD=""

   # Object Storage (S3/MinIO)
   BUCKET_PUBLIC_DOMAIN="https://your-bucket-domain.com"
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="us-east-1"
   AWS_BUCKET_NAME="your-bucket-name"
   AWS_ENDPOINT="" # Leave empty for AWS S3, set for MinIO

   # Email Configuration (SMTP)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/google-auth-callback"

   # Application
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run database migrations
   npx prisma migrate deploy
   # or for development
   npx prisma migrate dev
   ```

5. **Start Redis server**
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:alpine

   # Or using local installation
   redis-server
   ```

## 🚀 Running the Project

### Development Mode
```bash
# Start development server
pnpm dev
# or with cache clearing
pnpm dev -c

# The application will be available at http://localhost:3000
```

### Production Build
```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

### Testing
```bash
# Run tests with UI
pnpm test
```

## 📁 Project Structure

```
pillar-oil-bid/
├── src/
│   ├── actions/              # Server actions
│   │   ├── bids/            # Bid-related actions
│   │   └── create-member.ts  # Member creation
│   ├── components/           # UI components
│   │   ├── ui/react/        # React components (Radix UI)
│   │   └── *.astro          # Astro components
│   ├── constants/            # Application constants
│   │   └── notifications/   # Email/SMS templates
│   ├── db/                   # Database
│   │   ├── migrations/      # Prisma migrations
│   │   └── schema.prisma    # Database schema
│   ├── layouts/              # Page layouts
│   │   ├── AdminLayout.astro
│   │   ├── UserLayout.astro
│   │   └── ...
│   ├── middleware/           # Route middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   └── checkUser.ts     # User validation
│   ├── pages/                # Application pages
│   │   ├── api/              # API endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   └── v1/           # Versioned API endpoints
│   │   ├── auth/             # Auth pages (login, signup)
│   │   └── u/                # User dashboard pages
│   ├── store/                # State management (Zustand)
│   ├── styles/               # Global styles
│   ├── tests/                # Test files
│   ├── types/                # TypeScript type definitions
│   └── utilities/            # Helper functions
│       └── helpers/          # Utility functions
├── public/                   # Static assets
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── Dockerfile                # Docker configuration
└── package.json              # Dependencies and scripts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/reset-password` - Password reset
- `POST /api/auth/generate-password-reset-otp` - Generate reset OTP
- `GET /api/auth/google/google-auth` - Google OAuth initiation
- `GET /api/auth/google/google-auth-callback` - Google OAuth callback

### Tenders
- `GET /api/v1/tenders` - List all tenders
- `POST /api/v1/tenders/add-tender` - Create new tender
- `POST /api/v1/tenders/manage-tender` - Update tender
- `POST /api/v1/tenders/send-tender` - Send tender to vendors
- `POST /api/v1/tenders/extend-end-date` - Extend tender deadline
- `POST /api/v1/tenders/verify-otp` - Verify OTP for tender access

### Bids
- `GET /api/v1/bids` - List bids
- `POST /api/v1/bids/bid-placement` - Place a bid
- `POST /api/v1/bids/manage-bid` - Manage bid status
- `POST /api/v1/bids/manage-bid-placement` - Manage bid placement

### FX (Foreign Exchange)
- `GET /api/v1/fx` - List FX opportunities
- `POST /api/v1/fx/add-new-fx` - Create FX opportunity
- `POST /api/v1/fx/manage-fx` - Manage FX
- `POST /api/v1/fx/send-fx-bids` - Send FX to bidders
- `POST /api/v1/fx/send-fx-user-bid` - Submit FX bid
- `GET /api/v1/fx/fx-bidders` - List FX bidders
- `GET /api/v1/fx/fx-vendors` - List FX vendors

### Vendors
- `GET /api/v1/vendors` - List vendors
- `POST /api/v1/vendors/add-vendor` - Add vendor
- `POST /api/v1/vendors/manage-vendor` - Manage vendor
- `POST /api/v1/vendors/verify` - Verify vendor

### Settings
- `GET /api/v1/settings` - Get application settings
- `POST /api/v1/settings` - Update settings

### Cron Jobs
- `GET /api/v1/cron/check-tender-status` - Update tender statuses
- `GET /api/v1/cron/check-fx-status` - Update FX statuses

## 👥 User Roles

### Admin
- Full system access
- Manage tenders and FX opportunities
- Vendor management and verification
- System settings configuration
- View comprehensive statistics

### Contractor
- View available tenders
- Place and manage bids
- Add team members
- View bid history and status
- Access tender documents

### Member
- View contractor's tenders
- Assist with bid preparation
- Limited access based on contractor permissions

### FX Bidder
- View FX opportunities
- Place FX bids
- Track FX bid status
- View FX bid history

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User** - Base user authentication
- **Contractor** - Contractor/vendor profiles
- **Member** - Team members under contractors
- **Admin** - Administrator accounts
- **Fxbidder** - FX bidding participants
- **Tender** - Tender listings
- **Bid** - Bid submissions
- **BidPlacement** - Placed bids with documents
- **Fx** - FX opportunities
- **FxBid** - FX bid submissions
- **Item** - Tender line items
- **File** - Document storage references
- **Recipients** - Tender recipient mapping
- **Settings** - Application configuration

## 🐳 Docker Deployment

The project includes a Dockerfile for containerized deployment:

```bash
# Build the Docker image
docker build -t pillar-oil-bid .

# Run the container
docker run -p 3000:3000 --env-file .env pillar-oil-bid
```

The Dockerfile uses a multi-stage build:
1. **Builder stage**: Installs dependencies and builds the application
2. **Runner stage**: Runs the production server

## 🔐 Security Features

- JWT-based authentication with refresh tokens
- Password hashing using bcryptjs
- OTP verification for sensitive operations
- Session management with Redis
- Secure file uploads with password protection
- Role-based access control (RBAC)
- CORS and security headers configuration
- Environment variable protection

## 📝 Environment Variables

Key environment variables required:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `REDIS_HOST` | Redis server host | Yes |
| `REDIS_PORT` | Redis server port | Yes |
| `BUCKET_PUBLIC_DOMAIN` | Object storage public URL | Yes |
| `AWS_ACCESS_KEY_ID` | S3/MinIO access key | Yes |
| `AWS_SECRET_ACCESS_KEY` | S3/MinIO secret key | Yes |
| `SMTP_HOST` | SMTP server host | Yes |
| `SMTP_USER` | SMTP username | Yes |
| `SMTP_PASSWORD` | SMTP password | Yes |

## 🧪 Testing

The project uses Vitest for testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with UI
pnpm test --ui
```

Test structure:
- `src/tests/units/` - Unit tests
- `src/tests/integration/` - Integration tests
- `src/tests/e2e/` - End-to-end tests
- `src/tests/endpoints/` - API endpoint tests

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests |
| `pnpm astro` | Run Astro CLI commands |

## 🔄 Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

## 🌐 Production Deployment

1. **Set environment variables** in your hosting platform
2. **Build the application**: `pnpm build`
3. **Run database migrations**: `npx prisma migrate deploy`
4. **Start the server**: `pnpm preview` or use a process manager like PM2

### Recommended Production Setup
- Use a reverse proxy (Nginx/Traefik)
- Enable HTTPS/SSL certificates
- Set up Redis cluster for high availability
- Configure PostgreSQL connection pooling
- Use environment-specific configuration
- Set up monitoring and logging
- Configure automated backups

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Pillar Oil Limited.

## 📞 Support

For support and inquiries, please contact the development team.

## 🔗 Links

- **Production Site**: https://app.polrfx.ng
- **Documentation**: (Add documentation link if available)

---

**Version**: 1.0.1  
**Last Updated**: 2024
