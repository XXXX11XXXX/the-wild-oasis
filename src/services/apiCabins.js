import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');
    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}
export async function deleteCabin(id) {
    const { data, error } = await 
    supabase.from('cabins')
    .delete()
    .eq('id', id);
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;
}

export async function createEditCabin(newCabin,id) {
    const hasImage = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);
    const imageName = hasImage ? newCabin.image : `${Math.random()}-${newCabin.image.name}`
    .replaceAll("/", "");
    const filePath = hasImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    
    let query = supabase.from('cabins');
    
    if (!id) {
        query = query.insert([{...newCabin, image: filePath}])
        .select().single();
    } else {
        query = query.update({...newCabin, image: filePath})
        .eq('id', id)
        .select().single();
    }
    
    const {data, error} = await query;
    
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be created");
    }
    if (hasImage) {
        return data;
    }
    // 只有在新建cabin且上传新图片时才需要这步
    if (!hasImage) {
        const {error: storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);
        
        if (storageError) {
            await supabase.from('cabins').delete().eq('id', data.id);
            throw new Error("Cabin image could not be uploaded and cabin was not created");
        }
    }
    
    return data;
}
