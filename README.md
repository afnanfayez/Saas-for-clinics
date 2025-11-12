# 🌐 Clinic Management SaaS System

A web-based **Clinic Management System (CMS)** designed to serve clinics across the **Gaza Strip** as a unified, cloud-hosted solution.  
The system is built following the **Software as a Service (SaaS)** model — each clinic operates in its own isolated environment within a central platform.

---

## 🚀 Project Overview

This system aims to digitalize and simplify clinic operations by managing patients, doctors, appointments, and medical records online.  
It allows clinics to access and manage data securely from any device, improving healthcare coordination and operational efficiency.

---

## 👥 Key Features

- 🏥 **Multi-Clinic Support** – Each clinic has its own isolated workspace and data.
- 👨‍⚕️ **Doctor Portal** – Manage appointments, patient medical histories, and records.
- 💁‍♀️ **Reception Portal** – Register new patients, schedule visits, and update records.
- 🧑‍💼 **Manager Portal** – Monitor staff activity, manage users, and generate reports.
- 👩‍💻 **Admin Portal** – Oversee all clinics, system metrics, and subscription management.
- 📱 **Patient Portal** – View upcoming appointments and medical history.
- 💸 **Flexible Subscription Plans** – Monthly and yearly options for clinics.
- ❤️ **Donation System (optional)** – Support hospitals in post-war Gaza through digital fundraising.

---

## 🧰 Tech Stack

**Backend:** Laravel (PHP)  
**Frontend:** React + Next.js  
**Database:** MySQL  
**Authentication:** Laravel Sanctum  
**Deployment:** SaaS-based multi-tenant architecture  

---

## 🎯 Project Goals

- Digitize healthcare operations across Gaza’s clinics.  
- Reduce operational costs via a shared cloud platform.  
- Enhance collaboration between doctors, receptionists, and management.  
- Provide patients easy access to their health data.  

---

## 👨‍💻 Team Members

- Yasser O. I. Hijazi 
- Afnan F. Alzeti
- Noor Al-Afifi
 


---

## 📦 Installation (for development)

```bash
# Clone repository
git clone [https://github.com/afnanfayez/Saas-for-clinics]

# Navigate to backend
cd backend
composer install
cp .env.example .env
php artisan migrate --seed

# Navigate to frontend
cd ../frontend
npm install
npm run dev
