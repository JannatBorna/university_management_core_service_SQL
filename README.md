# University Management Core Service

This guide will walk you through the process of setting up the University Management Core Service Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!

## Installation Steps

### Follow these steps to clone and set up starter project

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/Programming-Hero-Next-Level-Development/university-management-core-service-starter.git university-management-core-service
```

2.`Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd university-management-core-service
```

3.`Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
yarn install
```

4.Configure Prisma and the database connection:

- Add Prisma as a development dependency by running the following command:

```bash
yarn add prisma --save-dev
```

- Set up your Prisma project by creating the Prisma schema file using the following command:

```bash
npx prisma init
```

- Open the prisma/schema.prisma file and configure your database connection details.

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- Create a .env file in the project root directory and set the DATABASE_URL environment variable. Replace the placeholders with your database connection details:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

5.Creating the database schema
6.Migrate the database schema: Use the following command to create and apply the initial database schema:

```bash
npx prisma migrate dev --name init
```

This command creates a new migration file based on your schema changes and applies it to your database.

6.`Install Prisma Client:` Install the Prisma Client library by running the following command:

```bash
yarn add @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the University Management Core Service Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

Happy coding!

## ER Diagram 1 (module-35)

![My Remote Image 1](https://i.ibb.co/Ln2FttV/university-management-core-service-module-1.png?dl=0)

## ER Diagram 2 (module-36)

![My Remote Image 2](https://i.ibb.co/tJ4nt6T/Screenshot-2023-08-20-at-7-32-11-PM.png?dl=0)

## ER Diagram 3 (Module-37)

![My Remote Image 3](https://i.ibb.co/DV7Jwd8/university-management-core-service-Page-2-drawio.png?dl=0)

## ER Diagram 4 (Module-38)

![My Remote Image 4](https://i.ibb.co/x6yMTbh/module-38.png?dl=0)

## ER Diagram 5 (Module-39)

![My Remote Image 5](https://i.ibb.co/NVrkHG7/university-management-core-service-Page-1-drawio.png?dl=0)

## ER Diagram 6 (Module-41)

![My Remote Image 6](https://i.ibb.co/fN9SVSG/module-41-drawio.png?dl=0)

## ER Diagram 7 (Module-42)

![My Remote Image 7](https://i.ibb.co/bFmMStC/module-42-drawio.png?dl=0)

## ER Diagram 8 (Module-43)

![My Remote Image 8](https://i.ibb.co/ZJ1pZnh/module-43-drawio.png?dl=0)
