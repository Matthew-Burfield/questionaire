// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://burfield-questionaire-surver.now.sh"
    : "http://localhost:4000";
// export const perPage = 5;
// export const tabTitle = "Sick fits!";
