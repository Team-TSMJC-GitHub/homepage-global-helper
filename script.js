// デフォルト言語を日本語に設定[cite: 1]
let currentLang = 'ja';

document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(currentLang);
});

function switchLanguage(lang) {
  currentLang = lang;
  
  // ボタンのアクティブ状態切り替え
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  loadLanguage(lang);
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang}.json`);
    }
    const data = await response.json();
    
    // データテキストの置換
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (data[key]) {
        if (element.tagName === 'TITLE') {
          document.title = data[key];
        } else {
          element.innerHTML = data[key];
        }
      }
    });

    // テンプレートプレーンテキストの置換
    const templateElem = document.getElementById('template-text');
    if (templateElem && data.contact_template) {
      templateElem.textContent = data.contact_template;
    }

  } catch (error) {
    console.error('Error loading language file:', error);
  }
}