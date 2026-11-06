import { createFileRoute } from "@tanstack/react-router";

import { RegistrationError, saveRegistration } from "@/lib/registrations.server";

export const Route = createFileRoute("/api/registrations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          await saveRegistration(formData);
          return Response.json({ success: true });
        } catch (error) {
          if (error instanceof RegistrationError) {
            return Response.json({ error: error.message }, { status: 400 });
          }
          console.error("registration failed", error);
          return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 },
          );
        }
      },
    },
  },
});
