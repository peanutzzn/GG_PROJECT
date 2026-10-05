# Fontend
ng new project
npm i 
node 21 
angular 13

app.modules -> imports HttpClientModule

create service api

## Backend 
สร้าง package.json
npm init -y 

ลง express
npm install express knex mysql2 dotenv
express  → ทำ REST API
knex     → Query Builder
mysql2   → เชื่อม MySQL
dotenv   → อ่าน .env
nodemon  → restart server อัตโนมัติ
cors  →       เรียก API ของ Backend

สร้าง server.js
mkdir src
touch src/server.js

สร้างไฟล์ .env / env.example
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=

สร้าง .gitignore
node_modules/
.env
.env.*
!.env.example

edit packet.json "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },

  ## Push

  git init in folder
  git remote add origin https:...
git remote -v
git commit -m "...
git add .
git status

ลบ entry fontend ออกจาก Git index -> git rm --cached fontend = rm 'fontend'
ตรวจสอบว่า fontend/.git ยังมีอยู่ไหม -> ls -la fontend = ถ้าเจอ .git -> rm -rf fontend/.git
git add fontend

## ของจริง
# GG

ระบบ Web Application สำหรับจัดการข้อมูลบุคคล

## Tech Stack

### Frontend

* Angular 13
* Bootstrap 5
* TypeScript
* RxJS

### Backend

* Node.js
* Express.js
* Knex.js
* MySQL
* dotenv
* CORS

## Project Structure

```text
GG/
├── frontend/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Requirements

ก่อนเริ่มต้นต้องติดตั้ง:

* Node.js
* npm
* MySQL

ตรวจสอบ version:

```bash
node -v
npm -v
```

## Installation

### 1. Clone Project

```bash
git clone <repository-url>
```

เข้าโปรเจกต์:

```bash
cd GG
```

---

## Frontend

เข้าโฟลเดอร์ frontend:

```bash
cd frontend
```

ติดตั้ง dependencies:

```bash
npm install
```

รัน Angular:

```bash
ng serve
```

เปิด Browser:

```text
http://localhost:4200
```

---

## Backend

เปิด Terminal อีกหน้าต่างหนึ่ง

เข้าโฟลเดอร์:

```bash
cd backend
```

ติดตั้ง dependencies:

```bash
npm install
```

สร้างไฟล์ `.env`

```env
PORT=30306

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
```

> ห้าม commit ไฟล์ `.env` ขึ้น Git เพราะมีข้อมูล username/password ของ Database

รัน Backend:

```bash
node src/server.js
```

หรือถ้าใช้ nodemon:

```bash
npm run dev
```

Backend จะทำงานที่:

```text
http://localhost:30306
```

---

## Database

สร้าง Database:

```sql
CREATE DATABASE your_database;
```

จากนั้นสร้างตาราง:

```sql
CREATE TABLE person (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

---

## API

### Get all persons

```http
GET /api/person
```

ตัวอย่าง:

```text
http://localhost:30306/api/person
```

### Get person by ID

```http
GET /api/person/:id
```

ตัวอย่าง:

```text
http://localhost:30306/api/person/1
```

### Create person

```http
POST /api/person
```

Request:

```json
{
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "birthDate": "1990-05-20",
  "gender": "M"
}
```

### Update person

```http
PUT /api/person/:id
```

ตัวอย่าง:

```text
http://localhost:30306/api/person/1
```

Request:

```json
{
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "birthDate": "1990-05-20",
  "gender": "M"
}
```

### Delete person

```http
DELETE /api/person/:id
```

ตัวอย่าง:

```text
http://localhost:30306/api/person/1
```

---

## Development

เปิด Terminal 2 หน้าต่าง

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend

```bash
cd frontend
ng serve
```

จากนั้นเปิด:

```text
http://localhost:4200
```

---

## Environment Variables

ตัวอย่างไฟล์ `.env.example`:

```env
PORT=30306

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=
```

ให้ copy:

```bash
cp .env.example .env
```

แล้วแก้ค่าตาม Database ของแต่ละเครื่อง

## Git

ตรวจสอบสถานะ:

```bash
git status
```

เพิ่มไฟล์:

```bash
git add .
```

Commit:

```bash
git commit -m "Update project"
```

Push:

```bash
git push
```

## Notes

* Frontend ไม่เชื่อมต่อ MySQL โดยตรง
* Frontend เรียก API ผ่าน Backend
* Backend เป็นตัวเชื่อมต่อระหว่าง Angular และ MySQL
* ไม่ควร commit `.env`
* ไม่ควร commit `node_modules`

