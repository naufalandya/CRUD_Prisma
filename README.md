1. Buat file .env terus masukin data yang sejajar sama index.js 

DATABASE_URL="postgresql://username:password@localhost:5432/prisma?schema=public"

2. Jalanin npm install 🎪

3. npx prisma migrate dev --name init

4. nodemon index.js
