"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="bg-[#003737] text-gray-200 py-10 px-6" 
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* شعار + وصف */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-light)]">
            عيادتك
          </h2>
          <p className="mt-3 text-sm text-gray-300 leading-7">
            منصّة احترافية لإدارة العيادات الطبية، تمكّنك من متابعة الحجوزات،
            المرضى، الأطباء، السجلات الطبية، والعمليات اليومية بسهولة وسلاسة.
          </p>
        </div>

        {/* روابط */}
        <div>
          <h3 className="text-xl font-bold text-[var(--color-primary-light)] mb-3">
            روابط مهمة
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                href="/landing"
                className="hover:text-[var(--color-primary-light)] transition"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-[var(--color-primary-light)] transition"
              >
                الخدمات
              </Link>
            </li>
            <li>
              <Link
                href="/doctors"
                className="hover:text-[var(--color-primary-light)] transition"
              >
                الأطباء
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[var(--color-primary-light)] transition"
              >
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h3 className="text-xl font-bold text-[var(--color-primary-light)] mb-3">
            تواصل معنا
          </h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[var(--color-primary-light)]" />
              info@clinic-system.com
            </li>

            <li className="flex items-center gap-2">
              <Phone size={18} className="text-[var(--color-primary-light)]" />
              059-0000000
            </li>

            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-[var(--color-primary-light)]" />
              فلسطين – غزة
            </li>
          </ul>
        </div>
      </div>

      {/* الخط السفلي */}
      <div className="border-t border-white/10 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} جميع الحقوق محفوظة – نظام إدارة العيادات 🩺
      </div>
    </footer>
  );
};

export default Footer;
