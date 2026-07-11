"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, Mail, MapPin, Linkedin, Github, ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    let success = false;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "07460c7b-b62c-4c81-8ffa-9966e4de4ca1",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Parth Gohil Portfolio"
        }),
      });
      const data = await res.json();
      success = res.ok && data.success;
    } catch {
      success = false;
    }

    if (!success) {
      setErrorMsg("Failed to send message. Please check your connection and try again.");
      setIsSubmitting(false);
      return;
    }

    setErrorMsg("");
    setIsSubmitting(false);
    setIsSent(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setIsSent(false);
    setErrorMsg("");
  };

  return (
    <>
      {/* CTA Banner */}
      <section className="relative py-16 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-primary/30 via-[#1a0640] to-purple-dark/30 border border-purple-primary/20 p-10 md:p-16">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-lg">
              <p className="section-label mb-3">Let&apos;s Connect</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-slate-400 text-base mb-8">
                I&apos;m always open to discussing new projects and opportunities. Let&apos;s build something amazing together!
              </p>
              <button
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary flex items-center space-x-2 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-2">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Me</h2>
          </div>

          <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-purple-primary/15 border border-purple-primary/25 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-light" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <a href="mailto:parthsinhgohil01@gmail.com" className="text-white text-sm hover:text-purple-light transition-colors">
                    parthsinhgohil01@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-purple-primary/15 border border-purple-primary/25 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-light" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="text-white text-sm">Gir-Somnath, Gujarat, India</p>
                </div>
              </div>

              <div className="glass-card p-6">
                <p className="text-sm text-slate-500 mb-4">Connect with me</p>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/parthgohil1706"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-light hover:border-purple-primary/50 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/parthgohil1706"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-light hover:border-purple-primary/50 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-3">
              {!isSent ? (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 outline-none focus:border-purple-primary/50 focus:ring-1 focus:ring-purple-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 outline-none focus:border-purple-primary/50 focus:ring-1 focus:ring-purple-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 outline-none focus:border-purple-primary/50 focus:ring-1 focus:ring-purple-primary/30 transition-all resize-none"
                    />
                  </div>
                  
                  {errorMsg && (
                    <div className="text-red-400 text-xs font-medium px-1">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="glass-card p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  <button onClick={resetForm} className="btn-outline !text-sm !py-2.5 !rounded-full cursor-pointer">
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
