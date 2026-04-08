(() => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') || 'en';
  const type = params.get('type') || 'industrial';
  const summary = document.querySelector('[data-report-summary]');
  const chartBars = document.querySelector('[data-report-bars]');
  const chartLegend = document.querySelector('[data-report-legend]');
  const chip = document.querySelector('[data-report-type]');

  const translations = {
    en: {
      report_brand: 'Smart Property Flow',
      report_back: 'Back',
      report_title: 'Investment Report',
      report_subtitle: 'Generated from your latest inputs.',
      report_chart_title: 'Comparison View',
      report_type_ind: 'Industrial',
      report_type_res: 'Residential',
      summary_title: 'Summary',
      summary_down: 'Down Payment',
      summary_interest: 'Interest Rate',
      summary_tenure: 'Tenure',
      summary_rent: 'Monthly Rent',
      summary_future: 'Future Value',
      summary_total_rent: 'Total Rent',
      summary_total_return: 'Total Return',
      summary_roi: 'ROI',
      summary_project: 'Project',
      summary_price_range: 'Price Range',
      summary_timeline: 'Timeline',
      summary_config: 'Configuration',
      chart_down_return: 'Invested vs Returned',
      chart_rent_future: 'Rent vs Future Value',
      chart_roi: 'ROI (%)',
      chart_profit: 'Net Profit',
      roi_meaning: 'ROI (Return on Investment) shows how much gain you made compared to your total investment.',
      project_poem: 'Poem',
      project_velvet: 'Velvet Valley',
      project_violet: 'Violet',
    },
    hi: {
      report_brand: 'स्मार्ट प्रॉपर्टी फ्लो',
      report_back: 'वापस',
      report_title: 'निवेश रिपोर्ट',
      report_subtitle: 'आपके नवीनतम इनपुट से तैयार।',
      report_chart_title: 'तुलना दृश्य',
      report_type_ind: 'इंडस्ट्रियल',
      report_type_res: 'रेजिडेंशियल',
      summary_title: 'सारांश',
      summary_down: 'डाउन पेमेंट',
      summary_interest: 'ब्याज दर',
      summary_tenure: 'अवधि',
      summary_rent: 'मासिक किराया',
      summary_future: 'भविष्य मूल्य',
      summary_total_rent: 'कुल किराया',
      summary_total_return: 'कुल रिटर्न',
      summary_roi: 'ROI',
      summary_project: 'प्रोजेक्ट',
      summary_price_range: 'प्राइस रेंज',
      summary_timeline: 'टाइमलाइन',
      summary_config: 'कॉन्फ़िगरेशन',
      chart_down_return: 'निवेश बनाम रिटर्न',
      chart_rent_future: 'किराया बनाम भविष्य मूल्य',
      chart_roi: 'ROI (%)',
      chart_profit: 'शुद्ध लाभ',
      roi_meaning: 'ROI (रिटर्न ऑन इन्वेस्टमेंट) बताता है कि कुल निवेश की तुलना में आपको कितना लाभ हुआ।',
      project_poem: 'पोएम',
      project_velvet: 'वेल्वेट वैली',
      project_violet: 'वायलेट',
    },
    gu: {
      report_brand: 'સ્માર્ટ પ્રોપર્ટી ફ્લો',
      report_back: 'પાછા',
      report_title: 'નિવેશ રિપોર્ટ',
      report_subtitle: 'તમારા નવા ઇનપુટ પરથી બનાવ્યું.',
      report_chart_title: 'તુલના દૃશ્ય',
      report_type_ind: 'ઔદ્યોગિક',
      report_type_res: 'રહેણાંક',
      summary_title: 'સારાંશ',
      summary_down: 'ડાઉન પેમેન્ટ',
      summary_interest: 'વ્યાજ દર',
      summary_tenure: 'ટેન્યોર',
      summary_rent: 'માસિક ભાડું',
      summary_future: 'ભવિષ્ય મૂલ્ય',
      summary_total_rent: 'કુલ ભાડું',
      summary_total_return: 'કુલ રિટર્ન',
      summary_roi: 'ROI',
      summary_project: 'પ્રોજેક્ટ',
      summary_price_range: 'કિંમત રેન્જ',
      summary_timeline: 'ટાઇમલાઇન',
      summary_config: 'કોન્ફિગ્યુરેશન',
      chart_down_return: 'રોકાણ સામે રિટર્ન',
      chart_rent_future: 'ભાડું સામે ભવિષ્ય મૂલ્ય',
      chart_roi: 'ROI (%)',
      chart_profit: 'ચોખ્ખો નફો',
      roi_meaning: 'ROI (રિટર્ન ઑન ઈન્વેસ્ટમેન્ટ) બતાવે છે કે કુલ રોકાણ સામે તમને કેટલો લાભ થયો.',
      project_poem: 'પોયમ',
      project_velvet: 'વેલ્વેટ વેલી',
      project_violet: 'વાયલેટ',
    },
  };

  const map = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (map[key]) node.textContent = map[key];
  });

  const formatINR = (value) => {
    if (!Number.isFinite(value)) return 'INR 0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderBars = (items) => {
    if (!chartBars || !chartLegend) return;
    const maxValue = Math.max(...items.map((item) => item.scale), 1);
    chartBars.innerHTML = '';
    chartLegend.innerHTML = '';

    items.forEach((item) => {
      const height = Math.max(8, Math.round((item.scale / maxValue) * 100));
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.setProperty('--bar-height', `${height}%`);
      bar.innerHTML = `
        <div class="chart-bar-fill"></div>
        <div class="chart-bar-value">${item.display}</div>
        <div class="chart-bar-label">${item.label}</div>
      `;
      chartBars.appendChild(bar);

      const legend = document.createElement('div');
      legend.textContent = item.label;
      chartLegend.appendChild(legend);
    });
  };

  const renderRoiNote = () => {
    if (!summary) return;
    const note = document.createElement('div');
    note.className = 'roi-note';
    note.textContent = map.roi_meaning;
    summary.appendChild(note);
  };

  if (type === 'industrial') {
    const down_payment = parseFloat(params.get('down_payment') || '0');
    const interest_rate = parseFloat(params.get('interest_rate') || '0');
    const tenure_years = parseFloat(params.get('tenure_years') || '0');
    const monthly_rent = parseFloat(params.get('monthly_rent') || '0');
    const future_value = parseFloat(params.get('future_value') || '0');
    const total_rent = parseFloat(params.get('total_rent') || '0');
    const total_return = parseFloat(params.get('total_return') || '0');
    const roi_percent = parseFloat(params.get('roi_percent') || '0');
    const net_profit = total_return - down_payment;

    if (chip) chip.textContent = map.report_type_ind;

    if (summary) {
      summary.innerHTML = `
        <div class="section-title">${map.summary_title}</div>
        <div class="report-list">
          <div><span>${map.summary_down}</span><strong>${formatINR(down_payment)}</strong></div>
          <div><span>${map.summary_interest}</span><strong>${interest_rate.toFixed(2)}%</strong></div>
          <div><span>${map.summary_tenure}</span><strong>${tenure_years} yrs</strong></div>
          <div><span>${map.summary_rent}</span><strong>${formatINR(monthly_rent)}</strong></div>
          <div><span>${map.summary_future}</span><strong>${formatINR(future_value)}</strong></div>
          <div><span>${map.summary_total_rent}</span><strong>${formatINR(total_rent)}</strong></div>
          <div><span>${map.summary_total_return}</span><strong>${formatINR(total_return)}</strong></div>
          <div><span>${map.summary_roi}</span><strong>${roi_percent.toFixed(1)}%</strong></div>
        </div>
      `;
    }

    renderRoiNote();

    const roiScaled = (roi_percent / 100) * Math.max(down_payment, total_return, total_rent, future_value, 1);
    renderBars([
      { label: map.chart_down_return, display: `${formatINR(down_payment)} → ${formatINR(total_return)}`, scale: total_return },
      { label: map.chart_rent_future, display: `${formatINR(total_rent)} → ${formatINR(future_value)}`, scale: Math.max(total_rent, future_value) },
      { label: map.chart_roi, display: `${roi_percent.toFixed(1)}%`, scale: roiScaled },
      { label: map.chart_profit, display: formatINR(net_profit), scale: Math.max(net_profit, 1) },
    ]);
  } else {
    const project = params.get('project') || 'poem';
    const price_low = parseFloat(params.get('price_low') || '0');
    const price_high = parseFloat(params.get('price_high') || '0');
    const timeline_min = parseFloat(params.get('timeline_min') || '0');
    const timeline_max = parseFloat(params.get('timeline_max') || '0');
    const config = params.get('config') || '';

    if (chip) chip.textContent = map.report_type_res;
    const projectName = map[`project_${project}`] || project;

    if (summary) {
      summary.innerHTML = `
        <div class="section-title">${map.summary_title}</div>
        <div class="report-list">
          <div><span>${map.summary_project}</span><strong>${projectName}</strong></div>
          <div><span>${map.summary_price_range}</span><strong>${formatINR(price_low)} - ${formatINR(price_high)}</strong></div>
          <div><span>${map.summary_timeline}</span><strong>${timeline_min} - ${timeline_max} yrs</strong></div>
          <div><span>${map.summary_config}</span><strong>${config}</strong></div>
        </div>
      `;
    }

    renderBars([
      { label: map.chart_down_return, display: `${formatINR(price_low)} → ${formatINR(price_high)}`, scale: price_high },
      { label: map.chart_rent_future, display: `${timeline_min} → ${timeline_max} yrs`, scale: Math.max(timeline_min, timeline_max) },
      { label: map.chart_roi, display: map.report_type_res, scale: Math.max(price_high, 1) },
      { label: map.chart_profit, display: map.summary_config, scale: Math.max(price_high - price_low, 1) },
    ]);
  }
})();


