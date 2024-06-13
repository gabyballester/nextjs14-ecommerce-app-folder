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

## Components and styling

This project uses tailwind, custom themes and **Shadcn** components which is a UI components source that provides a set of customizable high-quality React components, perfect for building responsive projects. It offers a range of components from basic buttons to complex navigation systems, all designed with customization and ease-of-use in mind.

## Authentication

Uses **Clerk** library, a comprehensive user management and authentication system, to simplify adding secure sign-in and sign-up functionalities to your application. Clerk offers features such as email and password authentication, social logins, multi-factor authentication, and more, with an easy integration process.

## Libraries for State Management

Zustand is a small, fast, and scalable state management solution with a comfortable API based on hooks. It is neither boilerplate-heavy nor opinionated but has enough convention to be explicit and flux-like.

## Form Handling

### Elements

**Shadcn** in combination with **React Hook Form** provides performant, flexible, and extensible form handling tools.

React Hook Form offers an intuitive API for building forms with minimal re-renders. It leverages existing HTML markup and validates forms using a constraint-based validation API.

### Form validation

**Zod** is a TypeScript-first schema declaration and validation library designed to eliminate duplicative type declarations. It allows developers to declare a validator once, and Zod will automatically infer the corresponding static TypeScript type.

These libraries are integral to providing a seamless and secure shopping experience for users.
