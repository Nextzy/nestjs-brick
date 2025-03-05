# 🚀 NestJS Project Structure with Domain-Driven Design (DDD) & API Versioning

## 📌 Project Overview
This project follows **Domain-Driven Design (DDD)** principles with **NestJS**, ensuring a scalable and maintainable backend architecture. It also supports **API Versioning** to handle multiple API versions efficiently.

---

## 📂 Project Structure
```plaintext
📂 proto/                    # Protobuf definitions for gRPC communication
 ├──*.proto
📂 script/                   # For generating localized messages (i18n)
 ├── localization.js
📂 src/
 ├── 📂 application/         # Business Use Cases (Application Layer)
 │   ├── 📂 services/        # Application Services
 │   ├── 📂 dto/             # Data Transfer Objects (DTOs)
 │   ├── 📂 events/          # Domain Events
 │   ├── 📂 commands/        # Command Handlers (CQRS)
 │   ├── 📂 queries/         # Query Handlers (CQRS)
 │   └── app.module.ts
 │
 ├── 📂 domain/              # Core Business Logic (Domain Layer)
 │   ├── 📂 entities/        # Entities & Aggregate Roots
 │   ├── 📂 repositories/    # Repository Interfaces
 │   ├── 📂 value-objects/   # Value Objects
 │   ├── 📂 events/          # Domain Events
 │   └── domain.module.ts
 │
 ├── 📂 infrastructure/      # Data Persistence & External Services
 │   ├── 📂 cache/           # Redis Caching
 │   ├── 📂 config/          # Configuration Settings
 │   ├── 📂 messaging/       # Event-driven messaging (Kafka, RabbitMQ)
 │   ├── 📂 orm/             # ORM Configurations (TypeORM, Prisma, etc.)
 │   ├── 📂 repositories/    # Repository Implementations
 │   ├── 📂 utils/           # Utility functions and helper methods
 │   └── infrastructure.module.ts
 │
 ├── 📂 interfaces/          # API & External Interfaces
 │   ├── 📂 http/            # HTTP Controllers
 │   │   ├── 📂 v1/          # API Version 1
 │   │   │   ├── users.controller.ts
 │   │   │   ├── orders.controller.ts
 │   │   │   ├── v1.module.ts
 │   │   ├── 📂 v2/          # API Version 2
 │   │   │   ├── users.controller.ts
 │   │   │   ├── orders.controller.ts
 │   │   │   ├── v2.module.ts
 │   │   ├── http.module.ts
 │   ├── 📂 grpc/            # gRPC Handlers
 │   │   ├── grpc.module.ts
 │   │   ├── user.controller.ts
 │   │   ├── user.interface.ts
 │   ├── 📂 ws/              # WebSocket Handlers
 │   ├── 📂 cli/             # CLI Commands
 │   └── interface.module.ts
 │
 ├── 📂 common/              # Common utilities and shared functionalities
 │   ├── 📂 filters/         # Global and exception filters
 │   │   ├── all-exception.filter.ts
 │   ├── 📂 i18n/            # Localized messages (i18n)
 │   │   ├── 📂 locales/
 │   │   │   ├── en.json
 │   │   │   ├── th.json
 │   │   ├── i18n.service.ts
 │   ├── 📂 interceptors/    # Interceptors for modifying request/response behavior
 │   │   ├── logging.interceptor.ts
 │   ├── 📂 middleware/      # Middleware for request processing and validation
 │   │   ├── auth.middleware.ts
 │   │   ├── header-validation.middleware.ts
 │   │   ├── rate-limit.middleware.ts
 │
 ├── 📂 migrations/          # Database migrations
 │
 ├── main.ts                 # Entry Point
 ├── app.module.ts           # Root Application Module
 │
├── ormconfig.ts            # ORM Configurations for Migrations
├── Dockerfile              # Dockerfile
├── tsconfig.json           # TypeScript Configurations
```

---

## 🏗️ API Versioning Setup

### Enable Versioning in `main.ts`
```ts
import { VersioningType } from '@nestjs/common';

app.enableVersioning({
  type: VersioningType.URI, // Using /v1, /v2 in URLs
});
```

### Define Controllers for Different Versions
#### **Version 1** (`src/interfaces/http/v1/users.controller.ts`)
```ts
import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'users', version: '1' })
export class UsersV1Controller {
  @Get()
  getUsersV1() {
    return { message: 'User list from v1' };
  }
}
```

#### **Version 2** (`src/interfaces/http/v2/users.controller.ts`)
```ts
import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'users', version: '2' })
export class UsersV2Controller {
  @Get()
  getUsersV2() {
    return { message: 'User list from v2 with new features' };
  }
}
```

---

## 🛠️ Running Migrations
### Generate a New Migration
```sh
npm run migration:generate -- -n MigrationName
```

### Run Migrations
```sh
npm run migration:run
```

### Revert Last Migration
```sh
npm run migration:revert
```

---

## 🌍 Running Localization (i18n)
To generate localized messages:
```sh
npm run localize
```

This executes the script `localization.js` inside the `script/` directory, processing and updating i18n files in `common/i18n/locales/`.

---

## 🚀 Getting Started
### Install Dependencies
```sh
npm install
```

### Run the Project
```sh
npm run start
```

### API Example Calls
#### Get Users (V1)
```http
GET /v1/users
```
#### Get Users (V2)
```http
GET /v2/users
```

---

## 🛠️ Technologies Used
- **NestJS** - Scalable Node.js Framework
- **TypeORM/Prisma** - Database ORM
- **Kafka / RabbitMQ** - Event-Driven Messaging
- **Redis** - Caching Layer
- **GraphQL / REST API** - API Layer

---

## 📌 Summary
✅ **Modular Structure** - Scalable & Maintainable  
✅ **DDD Principles** - Focusing on Business Logic  
✅ **API Versioning** - Supports multiple API versions  
✅ **Event-Driven Architecture** - Kafka/RabbitMQ ready  
✅ **Internationalization (i18n)** - Multi-language support  
✅ **Database Migrations** - Easily manage schema changes