// 1. adım: Gerekli değişkenleri tanımla
const createAcc = document.getElementById("createAcc");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const infoBtn = document.getElementById("infoBtn");
const output = document.getElementById("output");

// localStorage’dan hesapları al, yoksa boş dizi oluştur
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

// 2. + 3. + 4. adımlar: Yeni hesap oluşturma
createAcc.addEventListener("click", function() {
  const name = prompt("Hesap sahibinin adını girin:");
  if (!name) {
    output.innerHTML += "❌ İsim girilmedi, işlem iptal edildi.<br>";
    return;
  }

  // aynı isimde hesap var mı kontrol et
  const varMi = accounts.find(acc => acc.name === name);
  if (varMi) {
    output.innerHTML += `⚠️ "${name}" adlı bir hesap zaten var!<br>`;
    return;
  }

  // Yeni hesabı oluştur ve kaydet
  const yeniHesap = { name: name, balance: 0 };
  accounts.push(yeniHesap);

  // localStorage’a kaydet
  localStorage.setItem("accounts", JSON.stringify(accounts));

  output.innerHTML += `✅ "${name}" adlı yeni hesap oluşturuldu.<br>`;
});

// 5. adım: Para yatırma işlemi
depositBtn.addEventListener("click", () => {
  const depositName = prompt("Hesap sahibinin adını girin:");
  const varMideposit = accounts.find(acc => acc.name === depositName);

  if (!varMideposit) {
    output.innerHTML += `⚠️ "${depositName}" adlı bir hesap bulunamadı!<br>`;
    return;
  }

  const depositBal = Number(prompt("Yatırmak istediğiniz tutarı girin:"));
  if (depositBal <= 0 || isNaN(depositBal)) {
    output.innerHTML += `⚠️ Yatırmak istediğiniz tutar uygun değil!<br>`;
    return;
  }

  // Bakiyeye ekle
  varMideposit.balance += depositBal;

  // localStorage’ı güncelle
  localStorage.setItem("accounts", JSON.stringify(accounts));

  // Ekrana bilgi yaz
  output.innerHTML += `💰 ${depositName} hesabına ${depositBal}₺ yatırıldı. Yeni bakiye: ${varMideposit.balance}₺<br>`;
});

// 6. adım: Para çekme işlemi
withdrawBtn.addEventListener("click", () => {
  const withdrawName = prompt("Hesap sahibinin adını girin:");
  const varMiwithdraw = accounts.find(acc => acc.name === withdrawName);

  if (!varMiwithdraw) {
    output.innerHTML += `⚠️ "${withdrawName}" adlı bir hesap bulunamadı!<br>`;
    return;
  }

  const withdrawBal = Number(prompt("Çekmek istediğiniz tutarı girin:"));
  if (withdrawBal <= 0 || isNaN(withdrawBal)) {
    output.innerHTML += `⚠️ Çekmek istediğiniz tutar uygun değil!<br>`;
    return;
  }

  // Bakiye yeterli mi kontrol et
  if (varMiwithdraw.balance < withdrawBal) {
    output.innerHTML += `❌ Yetersiz bakiye! Mevcut bakiye: ${varMiwithdraw.balance}₺<br>`;
    return;
  }

  // Bakiyeden çıkar
  varMiwithdraw.balance -= withdrawBal;

  // localStorage’ı güncelle
  localStorage.setItem("accounts", JSON.stringify(accounts));

  // Ekrana bilgi yaz
  output.innerHTML += `💸 ${withdrawName} hesabından ${withdrawBal}₺ çekildi. Yeni bakiye: ${varMiwithdraw.balance}₺<br>`;
});

// 7. adım: Hesap bilgilerini görüntüleme
infoBtn.addEventListener("click", () => {
  const infoName = prompt("Bilgisini görmek istediğiniz hesabın adını girin:");
  const varMiInfo = accounts.find(acc => acc.name === infoName);

  if (!varMiInfo) {
    output.innerHTML += `⚠️ "${infoName}" adlı bir hesap bulunamadı!<br>`;
    return;
  }

  output.innerHTML += `📋 Hesap Sahibi: ${varMiInfo.name} | Bakiye: ${varMiInfo.balance}₺<br>`;
});


// 8. adım: Tüm işlemlerden sonra
// - Her değişiklikten sonra localStorage’ın güncellendiğinden emin ol.
// - Ekrandaki bilgiler okunabilir şekilde görünsün.
// - Kullanıcı sayfayı yenilese bile bilgiler kaybolmamalı (localStorage sayesinde kalıcı olmalı).