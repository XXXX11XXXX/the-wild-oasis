import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

const FormRow2 = styled.div`
display: grid;
align-items: center;
grid-template-columns: 24rem 1fr 1.2fr;
gap: 2.4rem;

padding: 1.2rem 0;

&:first-child {
  padding-top: 0;
}

&:last-child {
  padding-bottom: 0;
}

&:not(:last-child) {
  border-bottom: 1px solid var(--color-grey-100);
}

&:has(button) {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
}
`;

const Label = styled.label`
font-weight: 500;
`;

const Error = styled.span`
font-size: 1.4rem;
color: var(--color-red-700);
`;

 function CreateCabinForm({cabinToEdit,onCloseModal}) {
  const isEditSession = Boolean(cabinToEdit?.id);
  const {id: editId, ...editValues} = cabinToEdit || {};
  const {register, handleSubmit, formState:{errors}, reset, getValues} = useForm({defaultValues: isEditSession ? editValues : {}  });
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin(editId);
  const isWorking = isCreating || isEditing;
  const onSubmit = (data) => {
    const image = typeof data.image === "object" ? data.image[0] : data.image;
    if (isEditSession) {
      editCabin({...data, image}, editId,{
        onSuccess: (data) => {
          console.log(data);
          reset();
          onCloseModal?.();
        }
      });
    } else {
      createCabin({...data, image}, {
        onSuccess: (data) => {
         
          reset();
          onCloseModal?.();
        }
      });
    }
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal?"modal":"regular"}
    >
      
        <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" disabled={isCreating} id="name" {...register("name", {required: "This field is required"})} />
        </FormRow>
        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isCreating} id="maxCapacity" {...register("maxCapacity", {required: "This field is required", 
          min: {value: 1, message: "Minimum capacity is 1"}
        })} />
        </FormRow>
        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" disabled={isCreating} id="regularPrice" {...register("regularPrice", {required: "This field is required", 
          min: {value: 1, message: "Minimum price is 1"}
        })} />
        </FormRow>
          <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" disabled={isCreating} id="discount" {...register("discount", {
          required: "This field is required",
          validate: (value) => {
            const regularPrice = Number(getValues("regularPrice"));
            console.log({value, regularPrice, isValid: value <= regularPrice});
            return value <= regularPrice || "Discount must be less than regular price"
          }
        })} />
        </FormRow>
        <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" disabled={isCreating} id="description" {...register("description", {required: "This field is required"})} />
        </FormRow>
        <FormRow label="Cabin photo" error={errors?.image?.message}>
          <FileInput
           id="image" accept="image/*" disabled={isCreating} 
           type="file"
           {...register("image", {required:isEditSession ? false : "This field is required"})} />
        </FormRow>
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
    </Form>
  );
}

export default CreateCabinForm;
