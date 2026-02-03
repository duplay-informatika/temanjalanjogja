import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Calendar, Users } from "lucide-react";
import { SuccessAlert } from "@/components/ui/success-alert";

const gelarList = [
  { id: "encik", nama: "Encik" },
  { id: "cik", nama: "Cik" },
  { id: "puan", nama: "Puan" },
  { id: "dr", nama: "Dr" },
  { id: "prof", nama: "Prof" },
  { id: "dato", nama: "Dato'" },
  { id: "datin", nama: "Datin" },
  { id: "tan-sri", nama: "Tan Sri" },
];

export function BookingForm() {
  const [formData, setFormData] = useState({
    gelar: "",
    nama: "",
    telepon: "",
    tanggal: "",
    jumlahOrang: "",
    catatan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fungsi untuk mengirim ke WhatsApp
  const sendToWhatsApp = () => {
    const phoneNumber = "6281255236356";

    // Mencari gelar yang dipilih
    const selectedGelar = gelarList.find(g => g.id === formData.gelar);
    const namaGelar = selectedGelar ? selectedGelar.nama : "";

    // Format pesan WhatsApp
    const message = `*PEMESANAN PAKEJ WISATA*
    
📋 *DATA PEMESAN:*
• Gelar: ${namaGelar}
• Nama Lengkap: ${formData.nama}
• Telepon: ${formData.telepon}

✈️ *DETAIL PERJALANAN:*
${formData.tanggal ? `• Tarikh Keberangkatan: ${formData.tanggal}` : ''}
• Bilangan Peserta: ${formData.jumlahOrang}

📝 *CATATAN TAMBAHAN:*
${formData.catatan || "Tidak ada catatan"}

Terima kasih telah melakukan pemesanan! Tim kami akan segera menghubungi Anda.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  const validateForm = () => {
    if (!formData.nama.trim()) return "Nama lengkap wajib diisi";
    if (!formData.telepon.trim()) return "Telepon wajib diisi";
    if (!formData.jumlahOrang) return "Jumlah peserta wajib diisi";
    
    // Validasi format telepon (minimal 8 digit)
    const cleanPhone = formData.telepon.replace(/\D/g, '');
    if (cleanPhone.length < 8) return "Nomor telepon tidak valid";
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simpan data ke localStorage
      const bookingData = {
        ...formData,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('lastBooking', JSON.stringify(bookingData));

      // Kirim ke WhatsApp
      sendToWhatsApp();

      // Tampilkan success alert
      setShowSuccess(true);

      // Reset form
      setFormData({
        gelar: "",
        nama: "",
        telepon: "",
        tanggal: "",
        jumlahOrang: "",
        catatan: "",
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="border shadow-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold">
            Pesan Pakej Jelajah
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Isi formulir di bawah untuk memesan pakej perjalanan
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Gelar dan Nama */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="gelar" className="text-xs font-medium text-gray-600">
                  Gelar
                </Label>
                <Select
                  value={formData.gelar}
                  onValueChange={(value) => handleChange("gelar", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {gelarList.map((gelar) => (
                      <SelectItem key={gelar.id} value={gelar.id}>
                        {gelar.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-9">
                <Label htmlFor="nama" className="text-xs font-medium text-gray-600">
                  Nama Lengkap *
                </Label>
                <Input
                  id="nama"
                  type="text"
                  placeholder="Nama lengkap"
                  value={formData.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Telepon */}
            <div className="space-y-2">
              <Label htmlFor="telepon" className="text-xs font-medium text-gray-600">
                No. Telepon *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="telepon"
                  type="tel"
                  placeholder="Contoh: +60 1234 5678"
                  value={formData.telepon}
                  onChange={(e) => handleChange("telepon", e.target.value)}
                  className="h-10 pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: +60 1234 5678
              </p>
            </div>

            {/* Tanggal & Jumlah Orang */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggal" className="text-xs font-medium text-gray-600">
                  Tarikh Keberangkatan (Pilihan)
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => handleChange("tanggal", e.target.value)}
                    className="h-10 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jumlahOrang" className="text-xs font-medium text-gray-600">
                  Bilangan Peserta *
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Select
                    value={formData.jumlahOrang}
                    onValueChange={(value) => handleChange("jumlahOrang", value)}
                    required
                  >
                    <SelectTrigger className="h-10 pl-10">
                      <SelectValue placeholder="Pilih bilangan" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} orang
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div className="space-y-2">
              <Label htmlFor="catatan" className="text-xs font-medium text-gray-600">
                Catatan Tambahan (Pilihan)
              </Label>
              <Textarea
                id="catatan"
                placeholder="Pesanan khas atau permintaan tambahan..."
                value={formData.catatan}
                onChange={(e) => handleChange("catatan", e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Tombol Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengirim...
                </span>
              ) : (
                "Hantar Tempahan"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Alert */}
      <SuccessAlert
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Tempahan Berjaya!"
        message="Data tempahan Anda telah berjaya dihantar. Pasukan kami akan segera menghubungi Anda untuk pengesahan."
        buttonText="TUTUP"
      />
    </>
  );
}