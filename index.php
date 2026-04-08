<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Property Flow Calculator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Gujarati:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body data-lang="en">
  <div class="page">
    <header class="topbar">
      <div class="brand">
        <span class="brand-dot"></span>
        <span data-i18n="brand">Smart Property Flow</span>
      </div>
      <div class="badge" data-i18n="badge">Step-by-step Calculator</div>
    </header>

    <main class="container">
      <section class="intro">
        <h1 data-i18n="intro_title">Follow the flow, pick a project, and get your report.</h1>
        <p data-i18n="intro_subtitle">Start with language, choose residential or industrial, then finish with the project or calculator.</p>
      </section>

      <section class="stepper" aria-label="Calculator steps">
        <div class="step is-active" data-step="1">
          <div class="step-circle">1</div>
          <div>
            <div class="step-title" data-i18n="step1_title">Language Selection</div>
            <div class="step-subtitle" data-i18n="step1_subtitle">Choose the experience language.</div>
          </div>
        </div>
        <div class="step" data-step="2">
          <div class="step-circle">2</div>
          <div>
            <div class="step-title" data-i18n="step2_title">Residential or Industrial</div>
            <div class="step-subtitle" data-i18n="step2_subtitle">Pick the investment focus.</div>
          </div>
        </div>
        <div class="step" data-step="3">
          <div class="step-circle">3</div>
          <div>
            <div class="step-title" data-i18n="step3_title">Project + Report</div>
            <div class="step-subtitle" data-i18n="step3_subtitle">Compare or calculate ROI.</div>
          </div>
        </div>
      </section>

      <section class="card step-panel" data-panel="1">
        <h2 data-i18n="panel1_title">Step 1 - Language Selection</h2>
        <p data-i18n="panel1_subtitle">Select the language for the report output.</p>
        <div class="choice-grid" data-choice="language">
          <button class="choice is-selected" data-value="en">
            <span class="choice-title" data-i18n="lang_en">English</span>
            <span class="choice-sub" data-i18n="lang_en_sub">International numbers + INR</span>
          </button>
          <button class="choice" data-value="hi">
            <span class="choice-title" data-i18n="lang_hi">Hindi</span>
            <span class="choice-sub" data-i18n="lang_hi_sub">Hindi labels + INR</span>
          </button>
          <button class="choice" data-value="gu">
            <span class="choice-title" data-i18n="lang_gu">Gujarati</span>
            <span class="choice-sub" data-i18n="lang_gu_sub">Gujarati labels + INR</span>
          </button>
        </div>
        <div class="panel-actions">
          <button class="primary" data-next data-i18n="continue">Continue</button>
        </div>
      </section>

      <section class="card step-panel hidden" data-panel="2">
        <h2 data-i18n="panel2_title">Step 2 - Residential or Industrial Selection</h2>
        <p data-i18n="panel2_subtitle">Choose the type of investment you want to explore.</p>
        <div class="choice-grid" data-choice="segment">
          <button class="choice" data-value="residential">
            <span class="choice-title" data-i18n="segment_res">Residential</span>
            <span class="choice-sub" data-i18n="segment_res_sub">Project comparison chart</span>
          </button>
          <button class="choice" data-value="industrial">
            <span class="choice-title" data-i18n="segment_ind">Industrial</span>
            <span class="choice-sub" data-i18n="segment_ind_sub">Investment calculator + report</span>
          </button>
        </div>
        <div class="panel-actions">
          <button class="ghost" data-prev data-i18n="back">Back</button>
          <button class="primary" data-next data-i18n="continue">Continue</button>
        </div>
      </section>

      <section class="card step-panel hidden" data-panel="3">
        <div class="panel-head">
          <div>
            <h2 data-i18n="panel3_title">Step 3 - Project Wise Selection</h2>
            <p class="muted" data-i18n="panel3_subtitle">Residential shows a comparison chart. Industrial opens the investment calculator.</p>
          </div>
          <div class="chip" data-flow-chip data-i18n="chip_res">Residential</div>
        </div>

        <div class="flow-residential">
          <div class="section-title" data-i18n="res_title">Residential Comparison Chart</div>
          <div class="project-grid">
            <button class="project-card is-active" data-project="poem">
              <div class="project-name" data-i18n="project_poem">Poem</div>
              <div class="project-meta" data-i18n="res_years_1">2 / 5 / 7 Years</div>
              <div class="project-price">C.81 - 2 - 110</div>
            </button>
            <button class="project-card" data-project="velvet">
              <div class="project-name" data-i18n="project_velvet">Velvet Valley</div>
              <div class="project-meta" data-i18n="res_years_2">5 / 7 Years</div>
              <div class="project-price">C.85 - 2 - 125</div>
            </button>
            <button class="project-card" data-project="violet">
              <div class="project-name" data-i18n="project_violet">Violet</div>
              <div class="project-meta" data-i18n="res_years_3">2 / 7 Years</div>
              <div class="project-price">C.81 - 2 - 110</div>
            </button>
          </div>

          <div class="comparison">
            <div class="comparison-row header">
              <div data-i18n="table_project">Project</div>
              <div data-i18n="table_timeline">Timeline</div>
              <div data-i18n="table_config">Configuration</div>
              <div data-i18n="table_range">Indicative Range</div>
            </div>
            <div class="comparison-row">
              <div data-i18n="project_poem">Poem</div>
              <div data-i18n="res_years_1">2 / 5 / 7 Years</div>
              <div data-i18n="config_2bhk">2 BHK</div>
              <div>C.81 - 2 - 110</div>
            </div>
            <div class="comparison-row">
              <div data-i18n="project_velvet">Velvet Valley</div>
              <div data-i18n="res_years_2">5 / 7 Years</div>
              <div data-i18n="config_2bhk">2 BHK</div>
              <div>C.85 - 2 - 125</div>
            </div>
            <div class="comparison-row">
              <div data-i18n="project_violet">Violet</div>
              <div data-i18n="res_years_3">2 / 7 Years</div>
              <div data-i18n="config_2bhk">2 BHK</div>
              <div>C.81 - 2 - 110</div>
            </div>
          </div>
        </div>

        <div class="flow-industrial hidden">
          <div class="section-title" data-i18n="ind_title">Industrial Investment Calculator</div>
          <div class="form-grid">
            <label class="field">
              <span data-i18n="field_down">Down Payment</span>
              <input type="text" data-number="downpayment" placeholder="" data-i18n-placeholder="ph_down">
            </label>
            <label class="field">
              <span data-i18n="field_interest">Interest Rate (%)</span>
              <input type="text" data-number="interest" placeholder="" data-i18n-placeholder="ph_interest">
            </label>
            <label class="field">
              <span data-i18n="field_tenure">Tenure (Years)</span>
              <input type="text" data-number="tenure" placeholder="" data-i18n-placeholder="ph_tenure">
            </label>
            <label class="field">
              <span data-i18n="field_rent">Monthly Rent</span>
              <input type="text" data-number="rent" placeholder="" data-i18n-placeholder="ph_rent">
            </label>
          </div>

          <div class="results">
            <div class="result">
              <div class="result-label" data-i18n="result_future">Future Value</div>
              <div class="result-value" data-result="future">INR 0</div>
            </div>
            <div class="result">
              <div class="result-label" data-i18n="result_rent">Total Rent Earned</div>
              <div class="result-value" data-result="rent">INR 0</div>
            </div>
            <div class="result">
              <div class="result-label" data-i18n="result_total">Total Return</div>
              <div class="result-value" data-result="total">INR 0</div>
            </div>
            <div class="result">
              <div class="result-label" data-i18n="result_roi">ROI</div>
              <div class="result-value" data-result="roi">0%</div>
            </div>
          </div>

          <div class="note" data-i18n="ind_note">Report includes down payment, interest rate, tenure, and monthly rent.</div>

          <div class="chart-card">
            <div class="section-title" data-i18n="chart_title">Performance Graph</div>
            <div class="chart" data-chart>
              <div class="chart-bars" data-chart-bars></div>
              <div class="chart-legend" data-chart-legend></div>
            </div>
            <div class="save-note" data-save-note></div>
          </div>
        </div>

        <div class="panel-actions">
          <button class="ghost" data-prev data-i18n="back">Back</button>
          <button class="primary" data-finish data-i18n="finish">Generate Report</button>
        </div>
      </section>
    </main>
  </div>

  <script src="assets/app.js"></script>
</body>
</html>


