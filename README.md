# 🚀 Absensi App

Aplikasi absensi berbasis web modern menggunakan Laravel 11, React JS, Inertia.js, Vite, Tailwind CSS, dan MySQL.

---

## 📌 Tech Stack

- Laravel 11
- React JS
- Inertia.js
- Vite
- Tailwind CSS
- MySQL

---

## ✨ Features

- 🔐 Authentication Login
- 👨‍💼 Employee Management
- 🏢 Department Management
- 📅 Attendance System
- 📷 QR Code Attendance
- 📊 Dashboard Analytics
- 📱 Responsive Design
- ⚡ Fast Performance

---

## 📂 Project Structure

```bash
Absensi-app/
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
│   ├── css/
│   └── js/
│       ├── Components/
│       ├── Layouts/
│       ├── Pages/
│       └── app.jsx
│
├── routes/
├── storage/
├── tests/
├── vite.config.js
├── package.json
└── composer.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/username/Absensi-app.git
```

---

## 2️⃣ Masuk ke Folder Project

```bash
cd Absensi-app
```

---

## 3️⃣ Install Dependency Backend

```bash
composer install
```

---

## 4️⃣ Install Dependency Frontend

```bash
npm install
```

---

## 5️⃣ Copy File Environment

```bash
cp .env.example .env
```

---

## 6️⃣ Generate App Key

```bash
php artisan key:generate
```

---

# 🗄️ Database Configuration

Edit file `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=absensi_app
DB_USERNAME=root
DB_PASSWORD=
```

---

# 🧱 Migration Database

```bash
php artisan migrate
```

Jika menggunakan seeder:

```bash
php artisan db:seed
```

---

# ▶️ Running Application

## Jalankan Laravel Server

```bash
php artisan serve
```

---

## Jalankan Vite

```bash
npm run dev
```

---

## Akses Website

```bash
http://127.0.0.1:8000/
```

---

# 📦 Build Production

```bash
npm run build
```

---

# 🔑 Default Login

```bash
Email    : admin@example.com
Password : password
```

---

# 📸 Screenshots

Tambahkan screenshot aplikasi di sini.

```md
![Dashboard](public/images/dashboard.png)
```

---

# 📌 Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL
- NPM

---

# 🤝 Contributing

Kontribusi sangat terbuka.

1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push branch
5. Create Pull Request

---

# 📄 License

Project ini menggunakan lisensi MIT.

---

# 👨‍💻 Developer

Made with ❤️ using Laravel 11 & React JS.
