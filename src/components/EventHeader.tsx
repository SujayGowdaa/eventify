import InputText from '../ui/InputText';
import InputTextArea from '../ui/InputTextArea';
import type { Event } from '../types/event';

type HandleChange = <T extends keyof Event, U extends Event[T]>(
  field: T,
  value: U
) => void;

type Props = {
  formData: Event;
  handleChange: HandleChange;
};

export default function EventHeader({ formData, handleChange }: Props) {
  return (
    <>
      <InputText
        id='name'
        label='name'
        placeholder='give your event a catchy name'
        value={formData.name ?? ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />

      <InputTextArea
        id='description'
        label='description'
        placeholder='event description'
        value={formData.description ?? ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </>
  );
}
