import React from "react";
import { Fcard } from "./card";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <Fcard
        icon="🚀"
        title="Instant Setup"
        description="Generate a room link in seconds. No account required."
      />
      <Fcard
        icon="🔒"
        title="Secure"
        description="Password protection for your private conversations."
      />
      <Fcard
        icon="💻"
        title="Cross-Platform"
        description="Works on any device with a modern web browser."
      />
    </section>
  );
}