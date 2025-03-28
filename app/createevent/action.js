import { createClient } from "../../ultis/supabase/client";

export async function CreateEvent(formData) {
  // Create the server-side Supabase client with cookie context
  const supabase =  createClient();
  //   Retrieve the session to get the authenticated user's id

  const eventName = formData.eventName;
  const eventDescription = formData.eventDescription;
  const eventPrice = formData.eventPrice;
  const startColor = formData.startColor;
  const endColor = formData.endColor;
  const userId = formData.userId;
//   console.log(formData.preview_url)
//   console.log("server side user id ", userId);

  //   Include the user_id in your insert
  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        user_id: userId,
        event_name: eventName,
        event_description: eventDescription,
        event_price: eventPrice,
        start_color: startColor,
        end_color: endColor,
        event_picture: "",
      },
    ])
    .select();

//   console.log(data, error);

//   console.log("After query");
//   console.log("results:", data);

  return { data, error };
}
