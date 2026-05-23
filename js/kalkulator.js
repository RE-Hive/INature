const form = document.getElementById('kalkulator-form');
const hasilDiv = document.getElementById('hasil-kalkulator');
const skorText = document.getElementById('skor-karbon');
const kategoriText = document.getElementById('kategori-karbon');
const tipsText = document.getElementById('tips-karbon');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const transport = Number.parseFloat(document.getElementById('transport').value) || 0;
        const kendaraan = document.getElementById('kendaraan').value;
        const energi = Number.parseFloat(document.getElementById('energi').value) || 0;
        const daging = Number.parseInt(document.getElementById('daging').value) || 0;
        const belanja = Number.parseFloat(document.getElementById('belanja').value) || 0;
        
        // Perhitungan sederhana jejak karbon (kg CO2 per bulan)
        let faktorKendaraan = 0;
        if (kendaraan === 'mobil') faktorKendaraan = 0.2;
        else if (kendaraan === 'motor') faktorKendaraan = 0.1;
        else if (kendaraan === 'umum') faktorKendaraan = 0.05;
        
        const karbonTransport = transport * 30 * faktorKendaraan;
        const karbonEnergi = energi * 0.8;
        const karbonDaging = daging * 4 * 5;
        const karbonBelanja = belanja / 100000 * 2;
        
        const totalKarbon = Math.round(karbonTransport + karbonEnergi + karbonDaging + karbonBelanja);
        
        skorText.textContent = `${totalKarbon} kg CO₂ / bulan`;
        
        hasilDiv.classList.remove('d-none');
        
        // Evaluasi
        let kategori = '';
        let warnaBadge = '';
        let tips = '';
        
        if (totalKarbon < 300) {
            kategori = 'Baik (Rendah)';
            warnaBadge = 'bg-success';
            tips = 'Luar biasa! Gaya hidupmu sudah sangat ramah lingkungan. Pertahankan terus kebiasaan baikmu ini.';
        } else if (totalKarbon < 700) {
            kategori = 'Sedang';
            warnaBadge = 'bg-warning text-dark';
            tips = 'Jejak karbonmu cukup wajar, namun masih ada ruang untuk perbaikan. Coba kurangi pemakaian kendaraan bermotor atau hemat listrik.';
        } else {
            kategori = 'Tinggi';
            warnaBadge = 'bg-danger';
            tips = 'Jejak karbonmu cukup tinggi! Mari mulai dari langkah kecil: gunakan transportasi umum, matikan lampu saat tidak dipakai, dan kurangi konsumsi daging.';
        }
        
        kategoriText.textContent = kategori;
        kategoriText.className = `badge ${warnaBadge} p-2 fs-6 mt-3`;
        tipsText.textContent = tips;
        
        // Scroll ke hasil
        hasilDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}
