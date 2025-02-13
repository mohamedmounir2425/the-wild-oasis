import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// update current user

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1- update fullname or password
  let updateUser;
  if (!fullName) updateUser = { password };
  if (!password) updateUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateUser);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2- upload avatar
  console.log(avatar);
  const avatarName = `avatar-${data.user.id}-${Math.random()}-${avatar.name}`;
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);
  if (uploadError) throw uploadError;
  // 3- update avatar
  const { data: updateAvatar, error: updateAvatarError } =
    await supabase.auth.updateUser({ data: { avatar: avatarUrl } });
  if (updateAvatarError) throw uploadError;
  return updateAvatar;
}
