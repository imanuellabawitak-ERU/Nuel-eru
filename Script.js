
const tombolMasuk = document.getElementById("button");
const popup = document.getElementById("popup");
const popupBox = document.getElementById("popupBox");

const tombolYa = document.getElementById("ya");
const tombolTidak = document.getElementById("tidak");
const tombolUlang = document.getElementById("ulang");

const pertanyaan = document.getElementById("pertanyaan");
const deskripsi = document.getElementById("deskripsi");
const popupEmoji = document.getElementById("popupEmoji");
const buttonArea = document.getElementById("buttonArea");

let jumlahKabur = 0;

// Tombol MASUK: membuka popup
tombolMasuk.addEventListener("click", () => {
    popup.classList.add("aktif");
});

// Tombol TIDAK: kabur saat didekati
function tombolKabur() {
    if (!popup.classList.contains("aktif")) return;
    if (tombolUlang.classList.contains("tampil")) return;
    if (jumlahKabur >= 10) return;

    jumlahKabur++;

    const area = popupBox.getBoundingClientRect();
    const tombol = tombolTidak.getBoundingClientRect();

    const maxX = Math.max(0, (area.width - tombol.width) / 2 - 10);
    const maxY = Math.max(0, (area.height - tombol.height) / 2 - 10);

    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;

    tombolTidak.style.transform = `translate(${x}px, ${y}px)`;

    if (jumlahKabur === 3) {
        deskripsi.textContent = "Eh, kok mau pencet TIDAK?! 😭";
    } else if (jumlahKabur === 6) {
        deskripsi.textContent = "WKWKWK gak semudah itu! 🤣";
    } else if (jumlahKabur === 9) {
        deskripsi.textContent = "Oke, kesempatan terakhir! 😈";
    } else if (jumlahKabur === 10) {
        deskripsi.textContent = "Sekarang boleh pencet TIDAK 😂";
    }
}

tombolTidak.addEventListener("pointerenter", () => {
    if (jumlahKabur < 10) tombolKabur();
});

// Jawaban TIDAK
tombolTidak.addEventListener("click", () => {
    if (jumlahKabur < 10) {
        tombolKabur();
        return;
    }

    popupEmoji.textContent = "😭";
    pertanyaan.textContent = "Kok TIDAK?!";
    deskripsi.textContent = "Nuel sedang menangis di pojokan...";
    buttonArea.style.display = "none";
    tombolUlang.classList.add("tampil");
});

// Jawaban YA
tombolYa.addEventListener("click", () => {
	 window.location.href="Halaman-2.html";
});

// Main lagi
tombolUlang.addEventListener("click", () => {
    jumlahKabur = 0;

    popupEmoji.textContent = "😎";
    pertanyaan.textContent = "Nuel ganteng kan?";
    deskripsi.textContent = "Jawab yang jujur yaa! 🤨";

    buttonArea.style.display = "flex";
    tombolUlang.classList.remove("tampil");

    tombolTidak.style.transform = "none";

    popup.classList.remove("aktif");
});

// Klik area gelap untuk menutup popup
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.classList.remove("aktif");
    }
});

// Tekan Escape untuk menutup popup
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        popup.classList.remove("aktif");
    }
});
