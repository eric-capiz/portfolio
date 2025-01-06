import emailjs from "@emailjs/browser";

export const logPageView = () => {
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: "Portfolio Visitor",
      reply_to: "visitor@portfolio.com",
      message: `Page view logged at: ${new Date().toLocaleString()}`,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
