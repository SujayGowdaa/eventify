import InputText from '../ui/InputText';
import InputTextArea from '../ui/InputTextArea';

export default function EventHeader({}: Props) {
  return (
    <>
      <InputText
        id='name'
        label='name'
        placeholder='give your event a catchy name'
        // value={formData.name}
        // onChange={(e) => handleChange('name', e.target.value)}
      />

      <InputTextArea
        id='description'
        label='description'
        placeholder='event description'
        // value={formData.description}
        // onChange={(e) => handleChange('description', e.target.value)}
      />
    </>
  );
}
