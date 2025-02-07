import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import supabase from "../../services/supabase";
import { useUser } from "./useUser";
import useUpdateUser from "./useUpdateUser";
function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const {isUpdating, updateUser} = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if(!fullName) return;
    updateUser({fullName,avatar},{
      onSuccess:() => {
        setFullName("");
        setAvatar(null);
      }
    });

  }
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"q
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel} disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating} type="submit">Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
export async function updateCurrentUser({password,fullName,avatar}) {
  let updateData;
  if(password) updateData = {password};
  if(fullName) updateData = {data:{fullName}};
  
  const {data,error} = await supabase.auth.updateUser(updateData);
  
  if(error) throw new Error(error.message);
  if(!avatar) return data;

  // 处理头像上传
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  
  const {error:avatarError} = await supabase.storage
    .from("avatars")
    .upload(fileName,avatar);
    
  if(avatarError) throw new Error(avatarError.message);

  // 更新用户头像URL
  const {data:updatedUser,error:avatarDataError} = await supabase.auth.updateUser({
    data:{
      avatar:`https://qmvrpspsflqyvclpjqpe.supabase.co/storage/v1/object/public/avatars/${fileName}`
    }
  });

  if(avatarDataError) throw new Error(avatarDataError.message);
  return updatedUser;
}