import emailjs from "@emailjs/browser";

let downloadCount = 0;

export const logPageView = () => {
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: "Portfolio Visitor",
      reply_to: "visitor@portfolio.com",
      message: `Page view logged at: ${new Date().toLocaleString()}\nTotal Resume Downloads: ${downloadCount}`,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};

// Add new function to track downloads
export const logResumeDownload = () => {
  downloadCount++;
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: "Resume Download",
      reply_to: "visitor@portfolio.com",
      message: `Resume downloaded at: ${new Date().toLocaleString()}\nTotal Downloads: ${downloadCount}`,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
