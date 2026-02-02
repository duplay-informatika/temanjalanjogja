import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { memo } from "react";

const currentYear = new Date().getFullYear();

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-8 h-8 text-cyan-500" />
              <span className="text-xl font-bold">
                TemanJalan<span className="text-cyan-500">Jogja</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Partner perjalanan terpercaya untuk menjelajahi keindahan
              Indonesia. Pengalaman tak terlupakan, harga terjangkau.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/temanjalanjogja/"
                className="p-2 bg-gray-800 rounded-full hover:bg-cyan-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/TemanJalanJogja"
                className="p-2 bg-gray-800 rounded-full hover:bg-cyan-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#beranda"
                  className="text-gray-400 hover:text-cyan-500 transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#destinasi"
                  className="text-gray-400 hover:text-cyan-500 transition-colors"
                >
                  Destinasi
                </a>
              </li>
              <li>
                <a
                  href="/pesan"
                  className="text-gray-400 hover:text-cyan-500 transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-cyan-500" />
                +62 812-5523-6356
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-cyan-500" />
                temanjalan@gmail.com
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-500 mt-1" />
                Yogyakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} TemanJalanJogja 2026</p>
        </div>
      </div>
    </footer>
  );
});
