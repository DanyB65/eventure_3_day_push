

import { createClient } from "../../ultis/supabase/client";

export default async function UploadPicture(file,eventId,userUid,eventName) {
  const supabase =  createClient();
  // console.log('file',file,'event id',eventId,'user id',userUid)

  // const eventId = "7e1fa250-ed67-48b2-8829-29f03387a008";
  // const userUid = "46b5b16c-1ba0-4e69-8ccc-b9ba0dcfd4d8";


  const filePath = `${userUid}/${eventId}/event.jpg`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file);
return {data,error}
  //   if (error) {
  //     console.error('Error uploading file:', error);
  //     return { error: error.message };
  //   }
    
  //   console.log('Data from file upload:', data);
  //   return data;
  // } catch (err) {
  //   console.error('Unexpected error during upload:', err);
  //   return { error: err.message };
  // }
  
}
