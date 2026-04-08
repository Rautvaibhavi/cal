(() => {
  const stepPanels = Array.from(document.querySelectorAll('[data-panel]'));
  const stepItems = Array.from(document.querySelectorAll('.step'));
  const flowChip = document.querySelector('[data-flow-chip]');
  const residentialFlow = document.querySelector('.flow-residential');
  const industrialFlow = document.querySelector('.flow-industrial');
  const languageGroup = document.querySelector('[data-choice="language"]');

  let currentStep = 1;
  const storedLang = localStorage.getItem('calcLang');
  const selections = {
    language: storedLang || 'en',
    segment: null,
    project: 'poem',
  };

  const projectData = {
    poem: { price_low: 81, price_high: 110, timeline_min: 2, timeline_max: 7, config: '2 BHK' },
    velvet: { price_low: 85, price_high: 125, timeline_min: 5, timeline_max: 7, config: '2 BHK' },
    violet: { price_low: 81, price_high: 110, timeline_min: 2, timeline_max: 7, config: '2 BHK' },
  };

  const translations = {
    en: {
      brand: 'Smart Property Flow',
      badge: 'Step-by-step Calculator',
      intro_title: 'Follow the flow, pick a project, and get your report.',
      intro_subtitle: 'Start with language, choose residential or industrial, then finish with the project or calculator.',
      step1_title: 'Language Selection',
      step1_subtitle: 'Choose the experience language.',
      step2_title: 'Residential or Industrial',
      step2_subtitle: 'Pick the investment focus.',
      step3_title: 'Project + Report',
      step3_subtitle: 'Compare or calculate ROI.',
      panel1_title: 'Step 1 - Language Selection',
      panel1_subtitle: 'Select the language for the report output.',
      panel2_title: 'Step 2 - Residential or Industrial Selection',
      panel2_subtitle: 'Choose the type of investment you want to explore.',
      panel3_title: 'Step 3 - Project Wise Selection',
      panel3_subtitle: 'Residential shows a comparison chart. Industrial opens the investment calculator.',
      lang_en: 'English',
      lang_en_sub: 'International numbers + INR',
      lang_hi: 'Hindi',
      lang_hi_sub: 'Hindi labels + INR',
      lang_gu: 'Gujarati',
      lang_gu_sub: 'Gujarati labels + INR',
      continue: 'Continue',
      back: 'Back',
      finish: 'Generate Report',
      segment_res: 'Residential',
      segment_res_sub: 'Project comparison chart',
      segment_ind: 'Industrial',
      segment_ind_sub: 'Investment calculator + report',
      chip_res: 'Residential',
      chip_ind: 'Industrial',
      res_title: 'Residential Comparison Chart',
      res_years_1: '2 / 5 / 7 Years',
      res_years_2: '5 / 7 Years',
      res_years_3: '2 / 7 Years',
      project_poem: 'Poem',
      project_velvet: 'Velvet Valley',
      project_violet: 'Violet',
      table_project: 'Project',
      table_timeline: 'Timeline',
      table_config: 'Configuration',
      table_range: 'Indicative Range',
      config_2bhk: '2 BHK',
      ind_title: 'Industrial Investment Calculator',
      field_down: 'Down Payment',
      field_interest: 'Interest Rate (%)',
      field_tenure: 'Tenure (Years)',
      field_rent: 'Monthly Rent',
      result_future: 'Future Value',
      result_rent: 'Total Rent Earned',
      result_total: 'Total Return',
      result_roi: 'ROI',
      ind_note: 'Report includes down payment, interest rate, tenure, and monthly rent.',
      ph_down: 'e.g. 2000000',
      ph_interest: 'e.g. 7.5',
      ph_tenure: 'e.g. 5',
      ph_rent: 'e.g. 45000',
      save_ok: 'Saved to database.',
      save_fail: 'Save failed. Check DB config.',
    },
    hi: {
      brand: 'स्मार्ट प्रॉपर्टी फ्लो',
      badge: 'स्टेप-बाय-स्टेप कैलकुलेटर',
      intro_title: 'फ्लो फॉलो करें, प्रोजेक्ट चुनें और रिपोर्ट पाएं।',
      intro_subtitle: 'पहले भाषा चुनें, फिर रेजिडेंशियल या इंडस्ट्रियल और अंत में प्रोजेक्ट या कैलकुलेटर चुनें।',
      step1_title: 'भाषा चयन',
      step1_subtitle: 'अनुभव की भाषा चुनें।',
      step2_title: 'रेजिडेंशियल या इंडस्ट्रियल',
      step2_subtitle: 'निवेश का फोकस चुनें।',
      step3_title: 'प्रोजेक्ट + रिपोर्ट',
      step3_subtitle: 'तुलना करें या ROI कैलकुलेट करें।',
      panel1_title: 'स्टेप 1 - भाषा चयन',
      panel1_subtitle: 'रिपोर्ट आउटपुट के लिए भाषा चुनें।',
      panel2_title: 'स्टेप 2 - रेजिडेंशियल या इंडस्ट्रियल चयन',
      panel2_subtitle: 'आप किस प्रकार का निवेश देखना चाहते हैं, चुनें।',
      panel3_title: 'स्टेप 3 - प्रोजेक्ट वाइज चयन',
      panel3_subtitle: 'रेजिडेंशियल तुलना चार्ट दिखाता है। इंडस्ट्रियल निवेश कैलकुलेटर खोलता है।',
      lang_en: 'अंग्रेज़ी',
      lang_en_sub: 'इंटरनेशनल नंबर + INR',
      lang_hi: 'हिंदी',
      lang_hi_sub: 'हिंदी लेबल + INR',
      lang_gu: 'गुजराती',
      lang_gu_sub: 'गुजराती लेबल + INR',
      continue: 'आगे बढ़ें',
      back: 'वापस',
      finish: 'रिपोर्ट बनाएं',
      segment_res: 'रेजिडेंशियल',
      segment_res_sub: 'प्रोजेक्ट तुलना चार्ट',
      segment_ind: 'इंडस्ट्रियल',
      segment_ind_sub: 'निवेश कैलकुलेटर + रिपोर्ट',
      chip_res: 'रेजिडेंशियल',
      chip_ind: 'इंडस्ट्रियल',
      res_title: 'रेजिडेंशियल तुलना चार्ट',
      res_years_1: '2 / 5 / 7 वर्ष',
      res_years_2: '5 / 7 वर्ष',
      res_years_3: '2 / 7 वर्ष',
      project_poem: 'पोएम',
      project_velvet: 'वेल्वेट वैली',
      project_violet: 'वायलेट',
      table_project: 'प्रोजेक्ट',
      table_timeline: 'टाइमलाइन',
      table_config: 'कॉन्फ़िगरेशन',
      table_range: 'अनुमानित रेंज',
      config_2bhk: '2 BHK',
      ind_title: 'इंडस्ट्रियल निवेश कैलकुलेटर',
      field_down: 'डाउन पेमेंट',
      field_interest: 'ब्याज दर (%)',
      field_tenure: 'अवधि (वर्ष)',
      field_rent: 'मासिक किराया',
      result_future: 'भविष्य मूल्य',
      result_rent: 'कुल किराया',
      result_total: 'कुल रिटर्न',
      result_roi: 'ROI',
      ind_note: 'रिपोर्ट में डाउन पेमेंट, ब्याज दर, अवधि और मासिक किराया शामिल है।',
      ph_down: 'उदा. 2000000',
      ph_interest: 'उदा. 7.5',
      ph_tenure: 'उदा. 5',
      ph_rent: 'उदा. 45000',
      save_ok: 'डेटाबेस में सेव हुआ।',
      save_fail: 'सेव नहीं हुआ। DB कॉन्फ़िग देखें।',
    },
    gu: {
      brand: 'સ્માર્ટ પ્રોપર્ટી ફ્લો',
      badge: 'સ્ટેપ-બાય-સ્ટેપ કેલ્ક્યુલેટર',
      intro_title: 'ફ્લો ફોલો કરો, પ્રોજેક્ટ પસંદ કરો અને રિપોર્ટ મેળવો.',
      intro_subtitle: 'પ્રથમ ભાષા પસંદ કરો, પછી રહેણાંક અથવા ઔદ્યોગિક અને અંતમાં પ્રોજેક્ટ અથવા કેલ્ક્યુલેટર પસંદ કરો.',
      step1_title: 'ભાષા પસંદગી',
      step1_subtitle: 'અનુભવની ભાષા પસંદ કરો.',
      step2_title: 'રહેણાંક અથવા ઔદ્યોગિક',
      step2_subtitle: 'નિવેશનો ફોકસ પસંદ કરો.',
      step3_title: 'પ્રોજેક્ટ + રિપોર્ટ',
      step3_subtitle: 'તુલના કરો અથવા ROI ગણતરી કરો.',
      panel1_title: 'સ્ટેપ 1 - ભાષા પસંદગી',
      panel1_subtitle: 'રિપોર્ટ આઉટપુટ માટે ભાષા પસંદ કરો.',
      panel2_title: 'સ્ટેપ 2 - રહેણાંક અથવા ઔદ્યોગિક પસંદગી',
      panel2_subtitle: 'તમે કયા પ્રકારનું રોકાણ જોવું માંગો છો, પસંદ કરો.',
      panel3_title: 'સ્ટેપ 3 - પ્રોજેક્ટ વાઇઝ પસંદગી',
      panel3_subtitle: 'રહેણાંક તુલના ચાર્ટ બતાવે છે. ઔદ્યોગિક રોકાણ કેલ્ક્યુલેટર ખોલે છે.',
      lang_en: 'અંગ્રેજી',
      lang_en_sub: 'ઇન્ટરનેશનલ નંબરો + INR',
      lang_hi: 'હિન્દી',
      lang_hi_sub: 'હિન્દી લેબલ્સ + INR',
      lang_gu: 'ગુજરાતી',
      lang_gu_sub: 'ગુજરાતી લેબલ્સ + INR',
      continue: 'આગળ વધો',
      back: 'પાછા',
      finish: 'રિપોર્ટ બનાવો',
      segment_res: 'રહેણાંક',
      segment_res_sub: 'પ્રોજેક્ટ તુલના ચાર્ટ',
      segment_ind: 'ઔદ્યોગિક',
      segment_ind_sub: 'નિવેશ કેલ્ક્યુલેટર + રિપોર્ટ',
      chip_res: 'રહેણાંક',
      chip_ind: 'ઔદ્યોગિક',
      res_title: 'રહેણાંક તુલના ચાર્ટ',
      res_years_1: '2 / 5 / 7 વર્ષ',
      res_years_2: '5 / 7 વર્ષ',
      res_years_3: '2 / 7 વર્ષ',
      project_poem: 'પોયમ',
      project_velvet: 'વેલ્વેટ વેલી',
      project_violet: 'વાયલેટ',
      table_project: 'પ્રોજેક્ટ',
      table_timeline: 'ટાઇમલાઇન',
      table_config: 'કોન્ફિગ્યુરેશન',
      table_range: 'અનુમાનિત રેન્જ',
      config_2bhk: '2 BHK',
      ind_title: 'ઔદ્યોગિક રોકાણ કેલ્ક્યુલેટર',
      field_down: 'ડાઉન પેમેન્ટ',
      field_interest: 'વ્યાજ દર (%)',
      field_tenure: 'ટેન્યોર (વર્ષ)',
      field_rent: 'માસિક ભાડું',
      result_future: 'ભવિષ્ય મૂલ્ય',
      result_rent: 'કુલ ભાડું',
      result_total: 'કુલ રિટર્ન',
      result_roi: 'ROI',
      ind_note: 'રિપોર્ટમાં ડાઉન પેમેન્ટ, વ્યાજ દર, ટેન્યોર અને માસિક ભાડું સામેલ છે.',
      ph_down: 'ઉદા. 2000000',
      ph_interest: 'ઉદા. 7.5',
      ph_tenure: 'ઉદા. 5',
      ph_rent: 'ઉદા. 45000',
      save_ok: 'ડેટાબેસમાં સેવ થયું.',
      save_fail: 'સેવ નથી થયું. DB કન્ફિગ જુઓ.',
    },
  };

  const formatINR = (value) => {
    if (!Number.isFinite(value)) return 'INR 0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const applyTranslations = (lang) => {
    const map = translations[lang] || translations.en;
    document.body.dataset.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (map[key]) {
        node.textContent = map[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      if (map[key]) {
        node.setAttribute('placeholder', map[key]);
      }
    });

    if (flowChip) {
      flowChip.textContent = selections.segment === 'industrial' ? map.chip_ind : map.chip_res;
    }
  };

  const showStep = (step) => {
    currentStep = step;
    stepPanels.forEach((panel) => {
      panel.classList.toggle('hidden', Number(panel.dataset.panel) !== step);
    });
    stepItems.forEach((item) => {
      item.classList.toggle('is-active', Number(item.dataset.step) === step);
    });
  };

  const updateSegmentUI = () => {
    const isIndustrial = selections.segment === 'industrial';
    if (flowChip) {
      const map = translations[selections.language] || translations.en;
      flowChip.textContent = isIndustrial ? map.chip_ind : map.chip_res;
    }
    if (residentialFlow) residentialFlow.classList.toggle('hidden', isIndustrial);
    if (industrialFlow) industrialFlow.classList.toggle('hidden', !isIndustrial);
  };

  const readNumber = (value) => {
    if (!value) return 0;
    const cleaned = value.replace(/,/g, '').trim();
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const calcIndustrial = () => {
    if (!industrialFlow) return null;
    const downpayment = readNumber(industrialFlow.querySelector('[data-number="downpayment"]')?.value);
    const interest = readNumber(industrialFlow.querySelector('[data-number="interest"]')?.value);
    const tenure = readNumber(industrialFlow.querySelector('[data-number="tenure"]')?.value);
    const rent = readNumber(industrialFlow.querySelector('[data-number="rent"]')?.value);

    const futureValue = downpayment * Math.pow(1 + interest / 100, tenure || 0);
    const totalRent = rent * 12 * (tenure || 0);
    const totalReturn = futureValue + totalRent;
    const roi = downpayment > 0 ? ((totalReturn - downpayment) / downpayment) * 100 : 0;

    const data = {
      down_payment: downpayment,
      interest_rate: interest,
      tenure_years: tenure || 0,
      monthly_rent: rent,
      future_value: futureValue,
      total_rent: totalRent,
      total_return: totalReturn,
      roi_percent: roi,
    };

    const resultMap = {
      future: formatINR(futureValue),
      rent: formatINR(totalRent),
      total: formatINR(totalReturn),
      roi: `${roi.toFixed(1)}%`,
    };

    Object.entries(resultMap).forEach(([key, value]) => {
      const node = industrialFlow.querySelector(`[data-result="${key}"]`);
      if (node) node.textContent = value;
    });

    return data;
  };

  document.querySelectorAll('[data-choice="segment"]').forEach((group) => {
    group.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;
      const value = button.dataset.value;
      selections.segment = value;

      group.querySelectorAll('button').forEach((btn) => {
        btn.classList.toggle('is-selected', btn === button);
      });

      updateSegmentUI();
    });
  });

  if (languageGroup) {
    languageGroup.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;
      const value = button.dataset.value;
      selections.language = value;
      localStorage.setItem('calcLang', value);

      languageGroup.querySelectorAll('button').forEach((btn) => {
        btn.classList.toggle('is-selected', btn === button);
      });

      applyTranslations(value);
    });
  }

  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      if (currentStep === 1 && !selections.language) return;
      if (currentStep === 2 && !selections.segment) return;
      showStep(Math.min(3, currentStep + 1));
      if (currentStep === 3) updateSegmentUI();
    });
  });

  document.querySelectorAll('[data-prev]').forEach((button) => {
    button.addEventListener('click', () => {
      showStep(Math.max(1, currentStep - 1));
    });
  });

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const project = card.dataset.project || 'poem';
      selections.project = project;
      document.querySelectorAll('.project-card').forEach((item) => {
        item.classList.toggle('is-active', item === card);
      });
    });
  });

  if (industrialFlow) {
    industrialFlow.addEventListener('input', (event) => {
      if (event.target.matches('input')) {
        calcIndustrial();
      }
    });
  }

  document.querySelectorAll('[data-finish]').forEach((button) => {
    button.addEventListener('click', async () => {
      const lang = selections.language;
      if (selections.segment === 'industrial') {
        const data = calcIndustrial();
        const params = new URLSearchParams({
          type: 'industrial',
          lang,
          down_payment: data?.down_payment ?? 0,
          interest_rate: data?.interest_rate ?? 0,
          tenure_years: data?.tenure_years ?? 0,
          monthly_rent: data?.monthly_rent ?? 0,
          future_value: data?.future_value ?? 0,
          total_rent: data?.total_rent ?? 0,
          total_return: data?.total_return ?? 0,
          roi_percent: data?.roi_percent ?? 0,
        });

        if (data) {
          try {
            await fetch('save_calculation.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
          } catch (e) {
            // ignore save errors here
          }
        }

        window.location.href = `report.php?${params.toString()}`;
      } else if (selections.segment === 'residential') {
        const project = selections.project || 'poem';
        const projectInfo = projectData[project] || projectData.poem;
        const params = new URLSearchParams({
          type: 'residential',
          lang,
          project,
          price_low: projectInfo.price_low,
          price_high: projectInfo.price_high,
          timeline_min: projectInfo.timeline_min,
          timeline_max: projectInfo.timeline_max,
          config: projectInfo.config,
        });
        window.location.href = `report.php?${params.toString()}`;
      }
    });
  });

  showStep(currentStep);
  if (languageGroup) {
    languageGroup.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle('is-selected', btn.dataset.value === selections.language);
    });
  }
  applyTranslations(selections.language);
})();
