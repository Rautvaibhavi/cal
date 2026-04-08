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
      report_chart_title: 'Performance Graph',
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
      chart_future: 'Future Value',
      chart_rent: 'Total Rent',
      chart_total: 'Total Return',
      chart_roi: 'ROI',
      chart_price_low: 'Price Low',
      chart_price_high: 'Price High',
      chart_time_min: 'Timeline Min',
      chart_time_max: 'Timeline Max',
      project_poem: 'Poem',
      project_velvet: 'Velvet Valley',
      project_violet: 'Violet',
    },
    hi: {
      report_brand: 'स्मार्ट प्रॉपर्टी फ्लो',
      report_back: 'वापस',
      report_title: 'निवेश रिपोर्ट',
      report_subtitle: 'आपके नवीनतम इनपुट से तैयार।',
      report_chart_title: 'परफॉर्मेंस ग्राफ',
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
      chart_future: 'भविष्य मूल्य',
      chart_rent: 'कुल किराया',
      chart_total: 'कुल रिटर्न',
      chart_roi: 'ROI',
      chart_price_low: 'न्यूनतम मूल्य',
      chart_price_high: 'अधिकतम मूल्य',
      chart_time_min: 'न्यूनतम अवधि',
      chart_time_max: 'अधिकतम अवधि',
      project_poem: 'पोएम',
      project_velvet: 'वेल्वेट वैली',
      project_violet: 'वायलेट',
    },
    gu: {
      report_brand: 'સ્માર્ટ પ્રોપર્ટી ફ્લો',
      report_back: 'પાછા',
      report_title: 'નિવેશ રિપોર્ટ',
      report_subtitle: 'તમારા નવા ઇનપુટ પરથી બનાવ્યું.',
      report_chart_title: 'પરફોર્મન્સ ગ્રાફ',
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
      chart_future: 'ભવિષ્ય મૂલ્ય',
      chart_rent: 'કુલ ભાડું',
      chart_total: 'કુલ રિટર્ન',
      chart_roi: 'ROI',
      chart_price_low: 'નીચું મૂલ્ય',
      chart_price_high: 'ઉચ્ચ મૂલ્ય',
      chart_time_min: 'ન્યૂનતમ સમય',
      chart_time_max: 'મહત્તમ સમય',
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
      bar.innerHTML = `\n        <div class="chart-bar-fill" style="height: ${height}%;"></div>\n        <div class="chart-bar-value">${item.display}</div>\n        <div class="chart-bar-label">${item.label}</div>\n      `;
      chartBars.appendChild(bar);

      const legend = document.createElement('div');
      legend.textContent = item.label;
      chartLegend.appendChild(legend);
    });
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

    const roiScaled = (roi_percent / 100) * Math.max(future_value, total_rent, total_return, 1);
    renderBars([
      { label: map.chart_future, display: formatINR(future_value), scale: future_value },
      { label: map.chart_rent, display: formatINR(total_rent), scale: total_rent },
      { label: map.chart_total, display: formatINR(total_return), scale: total_return },
      { label: map.chart_roi, display: `${roi_percent.toFixed(1)}%`, scale: roiScaled },
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
      { label: map.chart_price_low, display: formatINR(price_low), scale: price_low },
      { label: map.chart_price_high, display: formatINR(price_high), scale: price_high },
      { label: map.chart_time_min, display: `${timeline_min} yrs`, scale: timeline_min },
      { label: map.chart_time_max, display: `${timeline_max} yrs`, scale: timeline_max },
    ]);
  }
})();
