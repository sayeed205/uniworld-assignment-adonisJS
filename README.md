## Assignment submission for uniworld by Sayed Ahmed

## How to run the code

```bash
# 1. Clone the repository
git clone https://github.com/sayeed205/uniworld-assignment-adonisJS
cd uniworld-assignment-adonisJS

# 2. Install the dependencies
pnpm install

# 3. Fill the .env file from .env.example file
cp .env.example .env

# 4. Run the migrations
node ace migration:run

# 5. Start the dev server
pnpm dev

# 6. Visit the following URL
http://localhost:3333
```

## Details of the project

- The project is built using AdonisJS, InertiaJS, and ReactJS.

- AdonisJS starts the server and InertiaJS is used to render the ReactJS components.

- The project has several pages

  - Home page
  - Login page
  - Register page
  - Products page
  - Carts page
  - Orders page
  - Address page

- The project has the following features
  - User registration
  - User login
  - User logout
  - User authentication
  - Products listing
  - Product details
  - Add to cart
  - Remove from cart
  - Place order
  - Order history
  - Address management
  - Address selection

## Database schema

Database schema diagram is available at [drawsql](https://drawsql.app/teams/personal-908/diagrams/uniworld)

## Detailed tech stack

- [AdonisJS](https://adonisjs.com/) (for the backend)
- [InertiaJS](https://inertiajs.com) (for the frontend)
- [ReactJS](https://reactjs.org/) (for the frontend)
- [TailwindCSS](https://tailwindcss.com/) (for styling)
- [MariaDB](https://mariadb.org/) (for the database)
- [ShadcnUI](https://ui.shadcn.com/) (for the UI components)
- [Lucid ORM](https://lucid.adonisjs.com/) (for the database queries)
- Authentication using cookies and sessions
