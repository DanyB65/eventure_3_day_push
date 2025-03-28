
import { createClient } from "../../ultis/supabase/server";
import Link from "next/link";

export default async function MyEvents() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    // console.log('user',user.id)
    let { data: events, error } = await supabase.from("events").select("*").eq('user_id', user.id);
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
          {events.map((event) => (
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
                    padding: "25px",
                    width: "250px",
                    height: "320px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    alignItems: "flex-start",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    background: `linear-gradient(135deg, ${event.start_color}, ${event.end_color})`,
                  }}
                >
                  <h4
                    style={{
                      color: "black",
                      fontSize: "1.5rem",
                      margin: "0",
                      marginTop: "10px",
                      wordWrap: "break-word",
                    }}
                  >
                    {event.event_name || "Event Name"}
                  </h4>
                  <p
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      marginTop: "10px",
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
          ))}
        </div>
      );
    }
    