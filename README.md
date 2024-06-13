# Project: Next.js Ecomerce Platform (app folder version)

The primary objective of this project is to develop an E-commerce Platform designed for deep learning with Next.js 14 and associated technologies. It will feature robust authentication mechanisms and an extensive dashboard for efficient management of products and orders.

## Getting Started

1. Run the development server: You can start the development server using one of the following commands:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. Editing the Page: You can start editing the main page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

3. Font Optimization: This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load the Inter font (a custom Google Font).

## Code Quality and Best Practices

The platform ensures high code quality and follows best practices. It’s configured with ESLint, Jest, React Testing Library, Cypress, and Husky.

### Base libraries used

- **ESLint**: Maintains code quality and style guidelines.
- **Jest**: Provides testing capabilities for unit and integration tests.
  - **Unit Tests**: Test individual units of code, such as functions or methods.
  - **Integration Tests**: Test the interaction between different parts of the application.
- **React Testing Library**: Facilitates maintainable tests for React components, focusing on:
  - **Component Tests**: Test the rendering and behavior of React components.
  - **User Interaction Tests**: Simulate user interactions and test the UI response.
- **Cypress**: Offers end-to-end testing by simulating real user interactions.
- **Husky**: Runs linting and testing scripts before code commit.

## Other libraries used

The platform leverages several libraries for enhanced functionality.

- **Shadcn**: A versatile UI component library that provides a set of high-quality React components, perfect for building a responsive and accessible ecommerce interface. It offers a range of components from basic buttons to complex navigation systems, all designed with customization and ease-of-use in mind.

- **Clerk**: A comprehensive user management and authentication system that simplifies adding secure sign-in and sign-up functionalities to your application. It features email and password authentication, social logins, multi-factor authentication, and more, with an easy integration process.

These libraries are integral to providing a seamless and secure shopping experience for users.

