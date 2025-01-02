import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000); // Clear after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <h2>Get In Touch</h2>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="contact-form"
          autoComplete="off"
        >
          <div className="form-group">
            <label htmlFor="from_name">Name</label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              required
              placeholder="Your name"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reply_to">Email</label>
            <input
              type="email"
              id="reply_to"
              name="reply_to"
              required
              placeholder="Your email"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              placeholder="Your message"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status && (
            <div className={`status-message ${status}`}>
              {status === "success" && "Message sent successfully!"}
              {status === "error" &&
                "Failed to send message. Please try again."}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
