let currentLang = 'ja';

const templates = {
  ja: `【お名前】\n【ご連絡先（メールまたはお電話）】\n【ご相談内容の種類】（例：観光アテンド / 行政手続きサポート / IT・システム開発相談 / その他）\n【ご相談内容の領域・詳細】\n【ご希望の時期・納期】`,
  en: `[Your Name]\n[Contact Info (Email/Phone)]\n[Category] (e.g., Tourism / Administrative / IT Support / Other)\n[Details of Inquiry]\n[Preferred Schedule / Deadline]`,
  zh: `【姓名】\n【联系方式（邮箱或电话）】\n【咨询类别】（例：观光陪同 / 行政手续支援 / IT与系统开发咨询 / 其他）\n【具体咨询内容】\n【希望的时间/期限】`
};

async function switchLanguage(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const translations = await response.json();
    currentLang = lang;

    // data-i18n 要素のテキスト一括変更
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.innerHTML = translations[key];
      }
    });

    // 問い合わせテンプレート更新
    const templateElement = document.getElementById('template-text');
    if (templateElement && templates[lang]) {
      templateElement.textContent = templates[lang];
    }

    // セレクトボックスの選択状態を合わせる
    const select = document.getElementById('lang-select');
    if (select && select.value !== lang) {
      select.value = lang;
    }

    document.documentElement.lang = lang;

  } catch (error) {
    console.error('Failed to load language file:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  switchLanguage('ja');
});