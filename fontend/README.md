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