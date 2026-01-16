import { useParams } from "react-router-dom";

export default function ServiceRequestPage() {
  const { service } = useParams();


  const providers = mockData[service] || [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        {service?.charAt(0).toUpperCase() + service?.slice(1)} Service Providers
      </h1>

      {providers.length === 0 && <p>No providers available.</p>}

      <div className="flex flex-col gap-4">
        {providers.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded flex items-center gap-4"
          >
          </div>
        ))}
      </div>
    </div>
  );
}
