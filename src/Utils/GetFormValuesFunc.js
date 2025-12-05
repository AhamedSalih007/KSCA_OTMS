export const getFormValuesAll = (jsonFields, apiData) => {
  const response = apiData[0];

  console.log('reslog', response?.Form_Desc_V1);

  let updated = [...jsonFields];

  const getValue = index => response[`Form_Desc_V${index}`];

  console.log('id', getValue(101));

  let counters = {
    text: 1,
    number: 51,
    date: 101,
    select: 126,
    radio: 151,
    checkbox: 226,
    textarea: 251,
  };

  updated = updated.map(field => {
    switch (field.type) {
      case 'text': {
        const v = getValue(counters.text++);
        return {...field, value: v ?? ''};
      }

      case 'number': {
        const v = getValue(counters.number++);
        return {...field, value: v ?? ''};
      }

      case 'textarea': {
        const v = getValue(counters.textarea++);
        return {...field, value: v ?? ''};
      }

      case 'date': {
        const raw = getValue(counters.date++);
        if (!raw) return field;

        const ms = raw.match(/\d+/g);
        const date = new Date(parseInt(ms[0]));

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        return {...field, value: `${yyyy}-${mm}-${dd}`};
      }

      case 'select': {
        const v = getValue(counters.select++);
        return {
          ...field,
          values: field.values.map(o => ({
            ...o,
            selected: o.label === v,
          })),
        };
      }

      case 'radio-group': {
        const v = getValue(counters.radio++);
        return {
          ...field,
          values: field.values.map(o => ({
            ...o,
            selected: o.label === v,
          })),
        };
      }

      case 'checkbox-group': {
        const raw = getValue(counters.checkbox++);
        const selectedValues = raw ? raw.split(',') : [];

        return {
          ...field,
          values: field.values.map(o => ({
            ...o,
            selected: selectedValues.includes(o.label),
          })),
        };
      }

      default:
        return field;
    }
  });

  return updated;
};
