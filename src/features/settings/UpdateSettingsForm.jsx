import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSetting from './useSetting';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';
function UpdateSettingsForm() {
  const {settings, isLoading, error} = useSetting();
  const {isUpdating, updateSetting} = useUpdateSetting();
  if(isLoading) return <Spinner />;
  function handleUpdate(e, field) {
    const {value} = e.target;
    if(!value) return;
    updateSetting({[field]: Number(value)});
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' 
        defaultValue={settings.minBookingLength} 
        onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' 
        defaultValue={settings.maxBookingLength}  
        onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' 
        defaultValue={settings.maxGuestsPerBooking}
        onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' 
        defaultValue={settings.breakfastPrice}
        onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
