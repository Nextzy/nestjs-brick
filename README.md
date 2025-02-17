# 🚀 NestJS Project Structure with Domain-Driven Design (DDD) & API Versioning

## 📌 Project Overview
This project follows the **Domain-Driven Design (DDD)** principles with **NestJS**, ensuring a scalable and maintainable backend architecture. It also supports **API Versioning** to handle multiple API versions efficiently.

---

## 📂 Project Structure
```plaintext
📂 src/
 ├── 📂 application/          # Business Use Cases (Application Layer)
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
 │   ├── 📂 repositories/    # Repository Implementations
 │   ├── 📂 orm/             # ORM Configurations (TypeORM, Prisma, etc.)
 │   ├── 📂 messaging/       # Event-driven messaging (Kafka, RabbitMQ)
 │   ├── 📂 cache/           # Redis Caching
 │   ├── 📂 config/          # Configuration Settings
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
 │   ├── 📂 ws/              # WebSocket Handlers
 │   ├── 📂 cli/             # CLI Commands
 │   └── interface.module.ts
 │
 ├── main.ts                 # Entry Point
 ├── app.module.ts           # Root Application Module
 ├── config.ts               # Configuration Loader
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

## 🛠️ Technologies Used
- **NestJS** - Scalable Node.js Framework
- **TypeORM/Prisma** - Database ORM
- **Kafka / RabbitMQ** - Event-Driven Messaging
- **Redis** - Caching Layer
- **GraphQL / REST API** - API Layer

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

## 📌 Summary
✅ **Modular Structure** - Scalable & Maintainable
✅ **DDD Principles** - Focusing on Business Logic
✅ **API Versioning** - Supports multiple API versions
✅ **Event-Driven Architecture** - Kafka/RabbitMQ ready



Users Feature:
user.service.ts: บริการสำหรับการจัดการบัญชีผู้ใช้
user.controller.ts: คอนโทรลเลอร์ที่จัดการ API ที่เกี่ยวกับผู้ใช้
create-user.dto.ts: DTO สำหรับการสร้างผู้ใช้ใหม่
user.commands.ts: Commands สำหรับการดำเนินการที่เกี่ยวกับผู้ใช้ (เช่น สร้างผู้ใช้, ลบบัญชีผู้ใช้)
user.queries.ts: Queries สำหรับการดึงข้อมูลผู้ใช้ (เช่น การค้นหาผู้ใช้)