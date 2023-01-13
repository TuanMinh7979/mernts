import { updateIf } from "typescript";

export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File does not exist");

  if (file.size > 1024 * 1024) {
    err = "size mustbe lt 1mb";
  }
  if (!types.includes(file.type)) err = "wrong format file";
  return err;
};

export const imageUpload = async (file: File) => {
  //name
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ifo999");
  formData.append("cloud_name", "djnekmzdf");

  const res = await fetch("https://api.cloudinary.com/v1_1/djnekmzdf/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return { public_id: data.public_id, url: data.secure_url };
};
