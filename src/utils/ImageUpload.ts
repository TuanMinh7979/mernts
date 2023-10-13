import { updateIf } from "typescript";

export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File does not exist");

  if (file.size > 1024 * 1024) {
    err = "size must be less than 1mb";
  }
  if (!types.includes(file.type)) err = "wrong format file";
  return err;
};

export const imageUpload = async (file: File) => {
  //name
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "simple");
  // formData.append("cloud_name", "djnekmzdf");



  const res = await fetch(`${process.env.REACT_APP_UPLOAD_LINK}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return { public_id: data.public_id, url: data.secure_url };
};
