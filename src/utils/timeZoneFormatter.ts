export const timeZoneFormatter = (time: string): string => {
  // Timezone based off browser
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formatter.format(new Date(time));
};
