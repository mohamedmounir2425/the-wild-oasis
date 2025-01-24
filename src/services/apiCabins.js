import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
  return data;
}

// CREATE & EDIT
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  // 1- image name & path
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://iimjbvdskmlpuhofgmcn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Base
  let query = supabase.from("cabins");

  //create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created");
  }

  // 2- create cabin

  if (hasImagePath) return data;
  // 3- upload image and delete cabin if upload error happen
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);

    throw new Error(
      "Cabin image could not be  uploaded and the cabin was not created"
    );
  }

  return data;
}
