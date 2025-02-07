import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export default function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {isLoading: isUpdating, error, mutate: updateSetting} = useMutation({
        mutationFn: (newSetting) => updateSettingApi(newSetting),
        onSuccess: () => {
            toast.success("Setting is updated");
            queryClient.invalidateQueries({queryKey: ["settings"]});
        },
        onError: (err) => toast.error(err.message)
    });
    return {isUpdating, updateSetting};
}
