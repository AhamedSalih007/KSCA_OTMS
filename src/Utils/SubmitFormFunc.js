export function GenerateQueryForInsert(SetShowStatus, formRender) {
  let DataSet = {status: false};
  let formRenderInstance = formRender;

  // Arrays for each field type
  let textField = [];
  let SelectField = [];
  let HeaderField = [];
  let NumberField = [];
  let RadioField = [];
  let TextAreaField = [];
  let DateField = [];
  let CheckBoxField = [];
  let RatingField = [];

  // Categorize fields
  for (let key in formRenderInstance) {
    let item = formRenderInstance[key];

    switch (item.type) {
      case 'text':
        textField.push(item);
        break;
      case 'select':
        SelectField.push(item);
        break;
      case 'header':
        HeaderField.push(item);
        break;
      case 'number':
        NumberField.push(item);
        break;
      case 'date':
        DateField.push(item);
        break;
      case 'textarea':
        TextAreaField.push(item);
        break;
      case 'checkbox-group':
        CheckBoxField.push(item);
        break;
      case 'radio-group':
        RadioField.push(item);
        break;
      case 'starRating':
        RatingField.push(item);
        break;
    }
  }

  let data = '';
  let dataVal = '';

  // *****************************************
  // TEXT FIELDS (1 - 50)
  // *****************************************
  let count = 1;
  for (let i = 0; i <= 50; i++) {
    if (count <= 50) {
      if (i < textField.length) {
        let field = textField[i];
        let text = field.userData?.[0] || '';

        if (field.required && !text && SetShowStatus === 1) {
          alertify.error(field.label + ' FIELD IS MANDATORY');
          return;
        }

        text = text.replaceAll("'", "''");

        data += `Form_desc_V${count},`;
        dataVal += `'${text}',`;
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }
    }

    count++;
  }

  // *****************************************
  // NUMBER FIELDS (51 - 100)
  // *****************************************
  count = 51;
  for (let i = 0; i <= 50; i++) {
    if (count <= 100) {
      if (i < NumberField.length) {
        let field = NumberField[i];

        if (field.required && !field.userData?.[0] && SetShowStatus === 1) {
          alertify.error(field.label + ' FIELD IS MANDATORY');
          return;
        }

        data += `Form_desc_V${count},`;
        dataVal += `'${field.userData?.[0] || ''}',`;
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }
      count++;
    }
  }

  // *****************************************
  // DATE FIELDS (101 - 125)
  // *****************************************
  count = 101;
  for (let i = 0; i <= 25; i++) {
    if (count <= 125) {
      if (i < DateField.length) {
        let field = DateField[i];

        if (field.required && !field.userData?.[0] && SetShowStatus === 1) {
          alertify.error(field.label + ' FIELD IS MANDATORY');
          return;
        }

        data += `Form_desc_V${count},`;
        dataVal += `'${field.userData?.[0] || ''}',`;
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }
      count++;
    }
  }

  // *****************************************
  // SELECT FIELDS (126 - 150)
  // *****************************************
  count = 126;
  for (let i = 0; i <= 25; i++) {
    if (count <= 150) {
      if (i < SelectField.length) {
        let field = SelectField[i];

        let userdata = field.userData || [];
        let selected = userdata[0]?.replaceAll("'", "''");

        if (field.required && !selected && SetShowStatus === 1) {
          alertify.error(field.label + ' FIELD IS MANDATORY');
          return;
        }

        data += `Form_desc_V${count},`;

        if (!selected) {
          dataVal += `null,`;
        } else {
          let match = field.values.find(v => v.value === selected);
          dataVal += `'${match ? match.label.replaceAll("'", "''") : ''}',`;
        }
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }
      count++;
    }
  }

  // *****************************************
  // RADIO FIELDS (151 - 225)
  // *****************************************
  count = 151;
  for (let i = 0; i <= 75; i++) {
    if (count <= 225) {
      if (i < RadioField.length) {
        let field = RadioField[i];
        let userdata = field.userData || [];

        data += `Form_desc_V${count},`;

        if (userdata.length === 0) {
          dataVal += `null,`;
        } else {
          let match = field.values.find(v => v.value === userdata[0]);
          dataVal += `'${match ? match.label.replaceAll("'", "''") : ''}',`;
        }
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }

      count++;
    }
  }

  // *****************************************
  // CHECKBOX FIELDS (226 - 250)
  // *****************************************
  count = 226;
  for (let i = 0; i <= 25; i++) {
    if (count <= 250) {
      if (i < CheckBoxField.length) {
        let field = CheckBoxField[i];
        let userdata = field.userData || [];

        if (field.required && userdata.length === 0 && SetShowStatus === 1) {
          alertify.error(field.label + ' FIELD IS MANDATORY');
          return;
        }

        let labels = [];
        userdata.forEach(val => {
          let match = field.values.find(v => v.value === val);
          if (match) labels.push(match.label.replaceAll("'", "''"));
        });

        data += `Form_desc_V${count},`;
        dataVal += `'${labels.join(',')}',`;
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }

      count++;
    }
  }

  // *****************************************
  // TEXTAREA (251 - 275)
  // *****************************************
  count = 251;
  for (let i = 0; i <= 25; i++) {
    if (count <= 275) {
      if (i < TextAreaField.length) {
        let text = TextAreaField[i].userData?.[0] || '';
        text = text.replaceAll("'", "''");

        data += `Form_desc_V${count},`;
        dataVal += `'${text}',`;
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }

      count++;
    }
  }

  // *****************************************
  // RATING (276 - 300)
  // *****************************************
  count = 276;
  for (let i = 0; i <= 25; i++) {
    if (count <= 300) {
      if (i < RatingField.length) {
        let rating = $('#' + RatingField[i].name)
          .rateYo()
          .rateYo('rating');

        data += `Form_desc_V${count},`;
        dataVal += `'${rating}',`;
      } else {
        data += `Form_desc_V${count},`;
        dataVal += `null,`;
      }

      count++;
    }
  }

  DataSet.status = true;
  DataSet.data = data;
  DataSet.dataval = dataVal;

  return DataSet;
}

// =====================================================================
// ========================== UPDATE FUNCTION ===========================
// =====================================================================

export function GenerateQueryForUpdate2(formData) {
  let dataset = {status: false};

  //--------------------------------------------------------
  // Prepare 300 SQL fields
  //--------------------------------------------------------
  let updates = [];
  for (let i = 1; i <= 300; i++) {
    updates[i] = `Form_desc_V${i} = NULL`;
  }

  //--------------------------------------------------------
  // Group fields by type (Option A)
  //--------------------------------------------------------
  const TEXT = formData.filter(f => f.type === 'text');
  const NUMBER = formData.filter(f => f.type === 'number');
  const DATE = formData.filter(f => f.type === 'date');
  const SELECT = formData.filter(f => f.type === 'select');
  const RADIO = formData.filter(f => f.type === 'radio-group');
  const CHECKBOX = formData.filter(f => f.type === 'checkbox-group');
  const TEXTAREA = formData.filter(f => f.type === 'textarea');
  const RATING = formData.filter(f => f.type === 'starRating');

  //--------------------------------------------------------
  // Helper for SQL safe values
  //--------------------------------------------------------
  const safe = v => (v || '').replaceAll("'", "''");

  //--------------------------------------------------------
  // Filler function for update slots
  //--------------------------------------------------------
  function fillSlots(group, start, end, handler) {
    let slot = start;
    for (let i = 0; i < group.length && slot <= end; i++) {
      const field = group[i];
      const val = handler(field);

      updates[slot] =
        val === null
          ? `Form_desc_V${slot} = NULL`
          : `Form_desc_V${slot} = '${val}'`;

      slot++;
    }
  }

  //--------------------------------------------------------
  // TEXT 1–50
  //--------------------------------------------------------
  fillSlots(TEXT, 1, 50, field => safe(field.value));

  //--------------------------------------------------------
  // NUMBER 51–100
  //--------------------------------------------------------
  fillSlots(NUMBER, 51, 100, field => safe(field.value));

  //--------------------------------------------------------
  // DATE 101–125
  //--------------------------------------------------------
  fillSlots(DATE, 101, 125, field => safe(field.value));

  //--------------------------------------------------------
  // SELECT 126–150
  //--------------------------------------------------------
  fillSlots(SELECT, 126, 150, field => {
    let selected = field.values?.find(v => v.selected);
    return selected ? safe(selected.label) : null;
  });

  //--------------------------------------------------------
  // RADIO 151–225
  //--------------------------------------------------------
  fillSlots(RADIO, 151, 225, field => {
    let selected = field.values?.find(v => v.selected);
    return selected ? safe(selected.label) : null;
  });

  //--------------------------------------------------------
  // CHECKBOX 226–250
  //--------------------------------------------------------
  fillSlots(CHECKBOX, 226, 250, field => {
    const selected = field.values?.filter(v => v.selected) || [];
    if (selected.length === 0) return null;
    return selected.map(v => safe(v.label)).join(',');
  });

  //--------------------------------------------------------
  // TEXTAREA 251–275
  //--------------------------------------------------------
  fillSlots(TEXTAREA, 251, 275, field => safe(field.value));

  //--------------------------------------------------------
  // RATING 276–300
  //--------------------------------------------------------
  fillSlots(RATING, 276, 300, field => safe(field.value));

  //--------------------------------------------------------
  // Final Output
  //--------------------------------------------------------
  dataset.status = true;
  dataset.dataval = updates.slice(1).join(',');

  return dataset;
}

export function GenerateQueryForInsert3(formData) {
  let dataset = {status: false};
  let insertColumns = [];
  let insertValues = [];

  for (let i = 0; i < 300; i++) {
    insertColumns.push(`Form_desc_V${i + 1}`);
    insertValues.push('NULL'); // default
  }

  //   console.log('in', insertColumns.length, insertValues.length);

  let index = 0;

  for (let field of formData) {
    if (index >= 300) break;

    let val = null;

    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'date':
        val = field.value?.replaceAll("'", "''") || '';
        break;

      case 'select': {
        const selected = field.values?.find(v => v.selected);
        val = selected ? selected.label.replaceAll("'", "''") : '';
        break;
      }

      case 'radio-group': {
        const selected = field.values?.find(v => v.selected);
        val = selected ? selected.label.replaceAll("'", "''") : '';
        break;
      }

      case 'checkbox-group': {
        const selectedOptions = field.values?.filter(v => v.selected) || [];
        val = selectedOptions
          .map(v => v.label)
          .join(',')
          .replaceAll("'", "''");
        break;
      }
    }

    if (field.required && !val) {
      alert(field.label + ' is mandatory');
      return dataset;
    }

    insertValues[index] = `'${val}'`;
    index++;
  }

  dataset.status = true;
  dataset.data = insertColumns.join(',');
  dataset.dataval = insertValues.join(',');

  return dataset;
}

export function GenerateQueryForInsert2(formData) {
  let dataset = {status: false};

  // Prepare 300 SQL slots
  let columns = [];
  let values = [];
  for (let i = 1; i <= 300; i++) {
    columns.push(`Form_desc_V${i}`);
    values.push('NULL');
  }

  // Groups by type (Option A)
  const TEXT = formData.filter(f => f.type === 'text');
  const NUMBER = formData.filter(f => f.type === 'number');
  const DATE = formData.filter(f => f.type === 'date');
  const SELECT = formData.filter(f => f.type === 'select');
  const RADIO = formData.filter(f => f.type === 'radio-group');
  const CHECKBOX = formData.filter(f => f.type === 'checkbox-group');
  const TEXTAREA = formData.filter(f => f.type === 'textarea');
  const RATING = formData.filter(f => f.type === 'starRating');

  //--------------------------------------------------------
  // Helper for required field validation
  //--------------------------------------------------------
  let stopValidation = false;

  const checkRequired = (field, val) => {
    if (field.required && (!val || val === '')) {
      alert(field.label + ' is mandatory');
      stopValidation = true; // 👈 stop everything
      return false;
    }
    return true;
  };

  //--------------------------------------------------------
  // FILLER FUNCTION FOR EACH TYPE GROUP
  //--------------------------------------------------------
  function fillSlots(group, start, end, handler) {
    let slot = start;

    for (let i = 0; i < group.length && slot <= end; i++) {
      if (stopValidation) return false;

      const field = group[i];
      const val = handler(field);

      if (!checkRequired(field, val)) {
        dataset.status = false;
        return false;
      }

      values[slot - 1] = val === null ? 'NULL' : `'${val}'`;
      slot++;
    }

    return true;
  }

  //--------------------------------------------------------
  // TEXT (1–50)
  //--------------------------------------------------------
  fillSlots(TEXT, 1, 50, field => {
    return (field.value || '').replaceAll("'", "''");
  });

  //--------------------------------------------------------
  // NUMBER (51–100)
  //--------------------------------------------------------
  fillSlots(NUMBER, 51, 100, field => {
    return field.value || '';
  });

  //--------------------------------------------------------
  // DATE (101–125)
  //--------------------------------------------------------
  fillSlots(DATE, 101, 125, field => {
    return field.value || '';
  });

  //--------------------------------------------------------
  // SELECT (126–150)
  //--------------------------------------------------------
  fillSlots(SELECT, 126, 150, field => {
    const selected = field.values?.find(v => v.selected);
    return selected ? selected.label.replaceAll("'", "''") : '';
  });

  //--------------------------------------------------------
  // RADIO (151–225)
  //--------------------------------------------------------
  fillSlots(RADIO, 151, 225, field => {
    const selected = field.values?.find(v => v.selected);
    return selected ? selected.label.replaceAll("'", "''") : '';
  });

  //--------------------------------------------------------
  // CHECKBOX (226–250)
  //--------------------------------------------------------
  fillSlots(CHECKBOX, 226, 250, field => {
    const selected = field.values?.filter(v => v.selected) || [];
    return selected.map(v => v.label.replaceAll("'", "''")).join(',');
  });

  //--------------------------------------------------------
  // TEXTAREA (251–275)
  //--------------------------------------------------------
  fillSlots(TEXTAREA, 251, 275, field => {
    return (field.value || '').replaceAll("'", "''");
  });

  //--------------------------------------------------------
  // RATING (276–300)
  //--------------------------------------------------------
  fillSlots(RATING, 276, 300, field => {
    return field.value || '0';
  });

  //--------------------------------------------------------
  // DONE
  //--------------------------------------------------------
  dataset.status = !stopValidation ? true : false;
  dataset.data = columns.join(',');
  dataset.dataval = values.join(',');

  return dataset;
}
