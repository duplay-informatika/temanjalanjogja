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
  CardDescription,
} from "@/components/ui/card";
import { User, Mail, Phone, Calendar, Users, MapPin } from "lucide-react";
import { SuccessAlert } from "@/components/ui/success-alert";

const paketList = [
  { id: "gondola", nama: "Gondola Timang Beach" },
  { id: "mount", nama: "Mount Merapi Adventure" },
  { id: "gumuk", nama: "Gumuk Pasir Parangtritis" },
  { id: "lobster", nama: "Lobster Pak Sis Timang" },
  { id: "pindul", nama: "Pindul Cave Tubing" },
];

export function BookingForm() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    paket: "",
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
    
    const selectedPaket = paketList.find(p => p.id === formData.paket);
    const namaPaket = selectedPaket ? selectedPaket.nama : "Tidak dipilih";
    
    // Format pesan WhatsApp tanpa harga
    const message = `*PEMESANAN PAKET WISATA*
    
📋 *DATA PEMESAN:*
• Nama Lengkap: ${formData.nama}
• Email: ${formData.email}
• Telepon: ${formData.telepon}

✈️ *DETAIL PERJALANAN:*
• Paket: ${namaPaket}
• Tanggal Keberangkatan: ${formData.tanggal}
• Jumlah Orang: ${formData.jumlahOrang}

📝 *CATATAN TAMBAHAN:*
${formData.catatan || "Tidak ada catatan"}

Terima kasih telah melakukan pemesanan! Tim kami akan segera menghubungi Anda untuk konfirmasi dan informasi harga.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi form
    if (!formData.nama || !formData.email || !formData.telepon || !formData.paket || !formData.tanggal || !formData.jumlahOrang) {
      alert("Harap lengkapi semua data yang diperlukan!");
      setIsSubmitting(false);
      return;
    }

    // Simpan data ke localStorage
    const bookingData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));
    
    // Simulasi proses singkat
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Kirim ke WhatsApp
    sendToWhatsApp();
    
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      paket: "",
      tanggal: "",
      jumlahOrang: "",
      catatan: "",
    });
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Pesan Paket Jelajah
          </CardTitle>
          <CardDescription>
            Isi formulir di bawah untuk memesan paket perjalanan
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nama Lengkap *
              </Label>
              <Input
                id="nama"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) => handleChange("nama", e.target.value)}
                required
              />
            </div>

            {/* Email & Telepon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telepon" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  No. Telepon *
                </Label>
                <Input
                  id="telepon"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={formData.telepon}
                  onChange={(e) => handleChange("telepon", e.target.value)}
                  pattern="[0-9]*"
                  minLength="10"
                  maxLength="13"
                  required
                />
              </div>
            </div>

            {/* Pilih Paket */}
            <div className="space-y-2">
              <Label htmlFor="paket" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Pilih Paket Perjalanan *
              </Label>
              <Select
                value={formData.paket}
                onValueChange={(value) => handleChange("paket", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih paket perjalanan" />
                </SelectTrigger>
                <SelectContent>
                  {paketList.map((paket) => (
                    <SelectItem key={paket.id} value={paket.id}>
                      {paket.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tanggal & Jumlah Orang */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggal" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal Keberangkatan *
                </Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => handleChange("tanggal", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="jumlahOrang"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Jumlah Orang *
                </Label>
                <Select
                  value={formData.jumlahOrang}
                  onValueChange={(value) => handleChange("jumlahOrang", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jumlah" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Orang
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div className="space-y-2">
              <Label htmlFor="catatan">Catatan Tambahan (Opsional)</Label>
              <Textarea
                id="catatan"
                placeholder="Permintaan khusus, alergi makanan, dll..."
                value={formData.catatan}
                onChange={(e) => handleChange("catatan", e.target.value)}
                rows={4}
              />
            </div>

            {/* Tombol Submit - tanpa indikator WhatsApp */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
              ) : (
                "Kirim Pemesanan"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Alert Modal */}
      <SuccessAlert
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Pemesanan Berhasil!"
        message="Data pemesanan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut."
        buttonText="TUTUP"
      />
    </>
  );
}