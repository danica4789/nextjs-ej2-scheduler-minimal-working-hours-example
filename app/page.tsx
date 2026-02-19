import Schedule from "./schedule";

export default function Page() {
  const start = new Date();
  const end = new Date(2026, 2, 19); // 1 hour

  return (
    <div className="flex min-h-screen items-start justify-center">
      <Schedule
        data={[
          {
            Subject: "Paris",
            StartTime: start,
            EndTime: end,
            resourceId: 3,
          },
        ]}
        selectedDate={start}
      />
    </div>
  );
}
