import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Zap, Check } from "lucide-react";
import { BookingForm } from "@/components/sections/BookingForm";

export function BookingPage() {
  // Hapus useEffect yang tidak perlu - scroll bisa di-handle oleh router
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/50 via-white to-orange-50/50">
      {/* Hero Section - Sederhanakan */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-cyan-700 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Pesan Perjalanan Anda
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mulai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-orange-500">
                Petualangan
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Isi borang di bawah dan team 
              menghubungi anda untuk merancang 
              perjalanan impian anda
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <BookingForm />
          </div>

          {/* Trust Indicators - Sederhanakan markup */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Respon Cepat</h3>
                <p className="text-sm text-gray-600">Konfirmasi dalam 24 jam</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Garansi Kepuasan</h3>
                <p className="text-sm text-gray-600">Pengalaman terbaik</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}