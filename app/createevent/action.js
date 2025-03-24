
"use server";
import { neon } from "@neondatabase/serverless";





export async function CreateEvent(formData) {
    // console.log("formData back end", formData);
//    const data = Object.fromEntries(formData);
const data = formData
console.log('formData back end',data)
//   console.log("formData", data);
// const eventData = {
//     eventName,
//     eventDescription,
//     eventPrice,
//     startColor,
//     endColor,
//   };

  
  // console.log('formData',data)
  // Initialize the Neon SQL client using your DATABASE_URL
  const sql = neon(process.env.DATABASE_URL);

  // Static test data
  const eventName = data.eventName;
  const eventDescription = data.eventDescription;
  const eventPrice = data.eventPrice; 
  const startColor = data.startColor
  const endColor = data.endColor
  const email = data.email
  // Hash the password before storing it
  

  console.log("Before query");
//   const result = await sql`SELECT column_name 
//   FROM information_schema.columns
//   WHERE table_name = 'events';
//   `;
   const result = await sql`
   INSERT INTO events (even_name, event_description, event_price, start_color, end_color, email)
   VALUES (${eventName}, ${eventDescription}, ${eventPrice}, ${startColor}, ${endColor}, ${email})
   RETURNING *;
`;


//   await createSession(result.id);
  console.log("After query");
  console.log("Test insert result:", result);
  
  return result;
}
