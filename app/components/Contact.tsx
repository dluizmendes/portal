"use client"

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">📬 Get in Touch</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Let's discuss your infrastructure challenges, reliability initiatives, or opportunities.
        </p>
        


        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:douglas-mendes@live.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Send Email
          </a>
          <a
            href="https://linkedin.com/in/douglasmendes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-slate-600 text-slate-300 rounded hover:border-slate-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
