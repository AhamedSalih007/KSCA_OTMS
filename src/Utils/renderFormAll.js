import FormCheckboxGroup from '../Components/Scouting/FormTypes/FormCheckboxGroup';
import FormDateField from '../Components/Scouting/FormTypes/FormDateField';
import FormHeaderField from '../Components/Scouting/FormTypes/FormHeaderField';
import FormNumberField from '../Components/Scouting/FormTypes/FormNumberField';
import FormRadioGroupField from '../Components/Scouting/FormTypes/FormRadioGroupField';
import FormSelectField from '../Components/Scouting/FormTypes/FormSelectField';
import FormTextAreaField from '../Components/Scouting/FormTypes/FormTextAreaField';
import FormTextField from '../Components/Scouting/FormTypes/FormTextField';

export const renderFormAll = (
  item,
  index,
  form,
  handleFormInput,
  getSelectedIndex,
) => {
  switch (item.type) {
    case 'text':
      return (
        <FormTextField
          label={item.label}
          value={form[index]?.value || ''}
          onChange={value => handleFormInput(item.type, item, index, value)}
        />
      );

    case 'date':
      return (
        <FormDateField
          key={item.name}
          label={item.label}
          value={item.value}
          onChange={value => handleFormInput(item.type, item, index, value)}
        />
      );

    case 'select':
      return (
        <FormSelectField
          label={item.label}
          options={form[index].values || []}
          value={form[index].values.find(d => d.selected)?.value || null}
          onChange={value => handleFormInput(item.type, item, index, value)}
        />
      );

    case 'header':
      return <FormHeaderField label={item.label} />;

    case 'radio-group':
      return (
        <FormRadioGroupField
          label={item.label}
          options={form[index]?.values || []}
          value={getSelectedIndex(item, index)}
          onChange={value => handleFormInput(item.type, item, index, value)}
        />
      );

    case 'textarea':
      return (
        <FormTextAreaField
          label={item.label}
          value={form[index]?.value || ''}
          onChange={value => handleFormInput(item.type, item, index, value)}
        />
      );

    case 'checkbox-group':
      return (
        <FormCheckboxGroup
          label={item.label}
          options={form[index].values}
          value={form[index].values.filter(v => v.selected).map(v => v.value)}
          onChange={values => handleFormInput(item.type, item, index, values)}
        />
      );

    case 'number':
      return (
        <FormNumberField
          label={item.label}
          value={form[index].value || ''}
          onChange={value => handleFormInput(item.type, item, index, value)}
        />
      );

    default:
      return null;
  }
};
