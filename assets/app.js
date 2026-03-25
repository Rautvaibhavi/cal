(() => {
  const form = document.querySelector('[data-calc-form]');
  if (!form) return;

  form.addEventListener('submit', () => {
    const inputs = form.querySelectorAll('input[data-number]');
    inputs.forEach((input) => {
      input.value = input.value.replace(/,/g, '').trim();
    });
  });
})();
