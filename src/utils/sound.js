// Ses dosyalarının base64 kodları
const SOUND_FILES = {
  jump: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudAAAAABCZWVwIFNvdW5kIEVmZmVjdCBieSBTb3VuZEJpYmxlLmNvbQBURU5DAAAAHQAAA0xhdmY1OC4yOS4xMDAAAAAAAAAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAABAAABIAAPz8/Pz8/Pz8/X19fX19fX19ff39/f39/f39/n5+fn5+fn5+/v7+/v7+/v7/f39/f39/f3+/v7+/v7+/v7///////////',
  
  point: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudAAAAABCZWVwIFNvdW5kIEVmZmVjdCBieSBTb3VuZEJpYmxlLmNvbQBURU5DAAAAHQAAA0xhdmY1OC4yOS4xMDAAAAAAAAAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAABAAABIAAHh4eHh4eHh4eOjo6Ojo6Ojo6VlZWVlZWVlZWcnJycnJycnJyjIyMjIyMjIyMqKioqKioqKio',
  
  combo: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudAAAAABCZWVwIFNvdW5kIEVmZmVjdCBieSBTb3VuZEJpYmxlLmNvbQBURU5DAAAAHQAAA0xhdmY1OC4yOS4xMDAAAAAAAAAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAABAAABIAAMDAwMDAwMDAwUFBQUFBQUFBQcHBwcHBwcHBwkJCQkJCQkJCQsLCwsLCwsLCw0NDQ0NDQ0NDQ8PDw8PDw8PDw',
  
  gameOver: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudAAAAABCZWVwIFNvdW5kIEVmZmVjdCBieSBTb3VuZEJpYmxlLmNvbQBURU5DAAAAHQAAA0xhdmY1OC4yOS4xMDAAAAAAAAAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAABAAABIAAICAgICAgICAgQEBAQEBAQEBAYGBgYGBgYGBggICAgICAgICAoKCgoKCgoKCgwMDAwMDAwMDA4ODg4ODg4ODg'
};

class SoundManager {
  constructor() {
    // Ses dosyalarını oluştur
    this.sounds = {
      jump: new Audio(SOUND_FILES.jump),
      point: new Audio(SOUND_FILES.point),
      combo: new Audio(SOUND_FILES.combo),
      gameOver: new Audio(SOUND_FILES.gameOver)
    };

    // Sesleri önceden yükle
    Object.values(this.sounds).forEach(sound => {
      sound.load();
      sound.volume = 0.5; // Varsayılan ses seviyesi
    });

    this.enabled = true;
  }

  play(soundName) {
    if (this.enabled && this.sounds[soundName]) {
      // Sesi baştan başlat
      this.sounds[soundName].currentTime = 0;
      // Sesi çal
      this.sounds[soundName].play().catch(() => {
        // Hata durumunda sessizce devam et
      });
    }
  }

  // Sesi aç/kapat
  toggle() {
    this.enabled = !this.enabled;
  }

  // Ses seviyesini ayarla (0.0 - 1.0 arası)
  setVolume(volume) {
    const safeVolume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(sound => {
      sound.volume = safeVolume;
    });
  }

  // Belirli bir ses için ses seviyesini ayarla
  setSoundVolume(soundName, volume) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].volume = Math.max(0, Math.min(1, volume));
    }
  }
}

// Tek bir instance oluştur ve dışa aktar
export const soundManager = new SoundManager();