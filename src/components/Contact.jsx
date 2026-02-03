import { useRef, useState, useEffect } from "react";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const formData = new FormData(form.current);
      const data = Object.fromEntries(formData.entries());
      data._subject = `Portfolio contact from ${data.name}`;
      data._captcha = "false";

      const response = await fetch("https://formsubmit.co/ericcapiz@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        form.current.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
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
