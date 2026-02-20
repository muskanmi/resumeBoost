import React from "react";

const Contact = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or want to learn more? We’re here to help!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <form className="space-y-6">
            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                placeholder="What is this regarding?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center 
                           bg-black text-white px-8 py-3 rounded-full font-semibold
                           transition-transform duration-300 ease-out
                           hover:-translate-y-1 hover:shadow-lg
                           active:translate-y-0.5"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
