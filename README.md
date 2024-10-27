`

---

# Task Manager

This is a **Task Manager** application developed using **Next.js** with **TypeScript**. It incorporates **Supabase** for backend functionality, **Cypress** for testing, and **Tailwind CSS** for styling.

## Project Structure

The project is organized as follows:

```
.
├── .next                # Next.js build folder
├── cypress              # Cypress testing setup
├── node_modules         # Project dependencies
├── public               # Public assets
└── src
    ├── app              # App-wide components and logic
    ├── components       # Reusable components
    │   ├── Editable     # Editable components
    │   ├── Form         # Form components
    │   ├── Card.tsx     # Task card component
    │   ├── Filter.tsx   # Filter functionality
    │   ├── FilterBar.tsx
    │   ├── List.tsx     # Task list component
    │   ├── NewTask.tsx  # Component to add a new task
    │   ├── Pagination.tsx # Pagination logic
    │   ├── Sort.tsx     # Sort functionality
    │   └── Tag.tsx      # Tag component for tasks
    ├── hooks            # Custom hooks
    │   └── useFetch.ts  # Hook for data fetching
    ├── types            # TypeScript types and interfaces
    ├── utils            # Utility functions and modules
    │   ├── functions    # Generic utility functions
    │   └── supabase     # Supabase-specific utilities
    └── .env             # Environment variables
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pseelam45/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Add your Supabase keys and other environment variables in the `.env` file.

## Scripts

- **Development server**:

  ```bash
  npm run dev
  ```

  Starts the development server at `http://localhost:3000`.

- **Build**:

  ```bash
  npm run build
  ```

  Builds the project for production.

- **Run Cypress tests**:

  ```bash
  npm run test
  ```

  Runs Cypress for end-to-end testing, you can see the output on the console..

  - **Run Cypress tests**:

  ```bash
  npm run cypress:open
  ```

  Runs Cypress for end-to-end testing, with interactive dashboad for end-to-end testing.

## Tech Stack

- **Next.js** - for server-rendered React applications.
- **TypeScript** - for type-safe JavaScript development.
- **Supabase** - as the backend database and authentication provider.
- **Cypress** - for end-to-end testing.
- **Tailwind CSS** - for styling the application.
- **Moment.js** - for date manipulation.

## Dependencies

- **@supabase/ssr:** - This library facilitates Supabase integration in server-rendered applications like Next.js, enabling real-time data fetching, database management, and authentication. Supabase acts as an open-source alternative to Firebase, providing scalable backend services for web applications.

- **clsx:** - A utility for conditionally joining CSS class names, clsx is lightweight and extremely helpful for conditional styling in a React project. This is particularly useful in Tailwind CSS setups, allowing the addition or removal of classes based on component props or state.

- **hugeicons-react:** - icons.

- **moment:** - moment is a well-known library for date and time manipulation. Though it's relatively large compared to other libraries, it offers robust functionality for handling dates, such as formatting, parsing, and time zone manipulation. In a task manager, this can be useful for managing task deadlines and display timestamps.

- **Cypress:** - Cypress is an end-to-end testing framework designed to simplify browser-based testing. It allows you to test components and workflows in a way that mimics user interactions, ensuring application reliability. Cypress is widely used for UI testing in modern web applications, making it ideal for validating complex features like task creation, filtering, and sorting.

- **Tailwind CSS:** - Tailwind CSS is a utility-first CSS framework, making it easy to build responsive and customizable UIs. Its approach to styling with utility classes offers flexibility, especially when building a modular component structure like this project’s task manager. Tailwind's configuration can be customized extensively, which is helpful for creating a cohesive design across components.

- **Next.js:** - Next.js is a React-based framework that provides features like server-side rendering (SSR), static site generation (SSG), and API routes. For a task manager application, Next.js enables efficient data fetching, improved SEO, and high performance by pre-rendering pages on the server, making it a good fit for production-grade applications.

- **TypeScript:** - TypeScript adds static typing to JavaScript, reducing the risk of runtime errors by catching type-related bugs during development. TypeScript's integration with Next.js and React makes the codebase more maintainable and easier to scale, which is essential for a feature-rich application like a task manager.

## Features

- **Task Management** - Create, edit, filter, sort, and paginate tasks.
- **Real-Time Updates** - Built using Supabase for real-time task updates.
- **Responsive Design** - Styled with Tailwind CSS.
- **Testing** - End-to-end testing with Cypress.

## License

This project is licensed under the MIT License.
