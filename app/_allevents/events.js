import { createClient } from "../../ultis/supabase/client";
import Link from "next/link";
import Image from "next/image";

export default async function AllEvents() {
  const supabase = createClient();

  // Fetch events from your "events" table
  let { data: events, error } = await supabase.from("events").select("*");
  if (error) {
    // console.error("Error fetching events:", error);
    return <p>Error fetching events</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {events.map((event) => {
        // Construct the file path using the user_id and event_id.
        // For a single image per event, we fixed the image name as "event.jpg".
        const filePath = `${event.user_id}/${event.event_id}/event.jpg`;

        const { data, error } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);
        // console.log("data", data, "error", error);
        const publicURL = data.publicUrl;
        //   console.log('event_id',event.event_id,'public url ',publicURL)

        return (
          <Link key={event.event_id} href={`/events/${event.event_id}`}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "20px",
                textDecoration: "none", // Remove underline if needed
              }}
            >
              <div
                style={{
                  backgroundColor: "black",
                  border: "1px solid #ddd",
                  padding: "10px", // reduce padding
                  width: "250px",
                  height: "320px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start", // align content to top
                  borderRadius: "20px",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  background: `linear-gradient(135deg, ${event.start_color}, ${event.end_color})`,
                }}
              >
                {publicURL ? (
                  <Image
                    src={publicURL}
                    alt="Event image"
                    width={240}
                    height={180}
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "60%",
                      backgroundColor: "#ccc",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                    }}
                  >
                    No image
                  </div>
                )}
                <h4
                  style={{
                    color: "black",
                    fontSize: "1.5rem",
                    margin: "10px 0 0 0", // add margin-top if you want space
                    wordWrap: "break-word",
                  }}
                >
                  {event.event_name || "Event Name"}
                </h4>
                <p
                  style={{
                    margin: "marginTop",
                    fontSize: "1rem",
                    marginTop: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "normal",
                  }}
                >
                  {event.event_description || "Description of the event..."}
                </p>

                <p
                  style={{
                    fontWeight: "bold",
                    color: "#EB3B43",
                    fontSize: "1.5rem",
                    margin: "0",
                    wordWrap: "break-word",
                  }}
                >
                  ${event.event_price || "0"}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
