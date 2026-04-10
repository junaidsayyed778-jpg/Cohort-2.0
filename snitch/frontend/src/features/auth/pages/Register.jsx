import { useState } from "react";

const InputField = ({ id, label, type = "text", placeholder }) => (
  <div className="relative group editorial-input">
    <label
      htmlFor={id}
      className="block text-[10px] tracking-widest uppercase text-[#999077] mb-2"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent border-0 border-b-2 border-[#4d4732] py-3 px-0 text-[#e5e2e1] focus:outline-none focus:border-[#4d4732] placeholder:text-[#353534] transition-all text-lg"
      style={{ fontFamily: "Inter, sans-serif" }}
    />
    {/* Golden underline that expands from center on focus */}
    <div className="input-line absolute bottom-0 h-[2px] bg-[#ffd700]" />
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="min-h-screen bg-[#131313] text-[#e5e2e1]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Ambient glow decorations */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-[#ffd700] opacity-[0.04] blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-[#ffd700] opacity-[0.04] blur-[160px] pointer-events-none -z-10" />

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1b1b] px-8 h-20 flex items-center justify-between">
        <div className="w-6" />
        <h1
          className="tracking-[-0.05em] uppercase font-black text-2xl text-[#ffd700]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          SNITCH
        </h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="min-h-screen pt-32 pb-24 px-8 flex flex-col max-w-md mx-auto">

        {/* Hero Header */}
        <section className="mb-16">
          <h2
            className="text-5xl font-extrabold tracking-tight text-[#ffd700] leading-none mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            CREATE<br />YOUR<br />ACCOUNT
          </h2>
          <p className="text-[#d0c6ab] text-lg leading-relaxed max-w-[80%]">
            Join the platform. Buy, sell, and discover.
          </p>
        </section>

        {/* Registration Form */}
        <form className="space-y-12" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="relative group editorial-input">
            <label
              htmlFor="fullName"
              className="block text-[10px] tracking-widest uppercase text-[#999077] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b-2 border-[#4d4732] py-3 px-0 text-[#e5e2e1] focus:outline-none placeholder:text-[#353534] text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <div className="input-line absolute bottom-0 h-[2px] bg-[#ffd700]" />
          </div>

          {/* Email */}
          <div className="relative group editorial-input">
            <label
              htmlFor="email"
              className="block text-[10px] tracking-widest uppercase text-[#999077] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b-2 border-[#4d4732] py-3 px-0 text-[#e5e2e1] focus:outline-none placeholder:text-[#353534] text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <div className="input-line absolute bottom-0 h-[2px] bg-[#ffd700]" />
          </div>

          {/* Contact Number */}
          <div className="relative group editorial-input">
            <label
              htmlFor="contactNumber"
              className="block text-[10px] tracking-widest uppercase text-[#999077] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="+91 00000 00000"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b-2 border-[#4d4732] py-3 px-0 text-[#e5e2e1] focus:outline-none placeholder:text-[#353534] text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <div className="input-line absolute bottom-0 h-[2px] bg-[#ffd700]" />
          </div>

          {/* Password */}
          <div className="relative group editorial-input">
            <label
              htmlFor="password"
              className="block text-[10px] tracking-widest uppercase text-[#999077] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b-2 border-[#4d4732] py-3 px-0 text-[#e5e2e1] focus:outline-none placeholder:text-[#353534] text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <div className="input-line absolute bottom-0 h-[2px] bg-[#ffd700]" />
          </div>

          {/* isSeller Checkbox */}
          <div className="flex items-start gap-4 pt-4">
            <div className="relative flex items-center justify-center w-6 h-6 mt-1 flex-shrink-0">
              <input
                id="isSeller"
                name="isSeller"
                type="checkbox"
                checked={formData.isSeller}
                onChange={handleChange}
                className="peer appearance-none w-6 h-6 border-2 border-[#4d4732] bg-transparent rounded-sm checked:bg-[#ffd700] checked:border-[#ffd700] transition-all cursor-pointer"
              />
              {/* Checkmark icon */}
              <svg
                className="absolute w-3.5 h-3.5 text-[#221b00] opacity-0 peer-checked:opacity-100 pointer-events-none"
                viewBox="0 0 12 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="1 5 4.5 8.5 11 1" />
              </svg>
            </div>
            <label
              htmlFor="isSeller"
              className="flex flex-col cursor-pointer"
            >
              <span
                className="font-bold text-[#e5e2e1] tracking-wide"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Register as Seller
              </span>
              <span className="text-xs text-[#d0c6ab] mt-0.5">
                List your products and manage your store.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-8 space-y-6">
            <button
              type="submit"
              className="w-full h-16 bg-[#ffd700] from-[#ffe16d] to-[#ffd700] text-[#221b00] font-extrabold uppercase tracking-[0.2em] rounded-md shadow-2xl active:scale-[0.98] transition-all hover:brightness-110 cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Create Account
            </button>
            <p
              className="text-center text-[10px] tracking-widest text-[#999077] uppercase"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Already have an account?{" "}
              <a href="/login" className="text-[#ffd700] hover:underline underline-offset-4">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto px-8 py-8 flex flex-col items-center gap-4">
        <div className="flex gap-8">
          {["Privacy", "Terms", "Legal"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] tracking-widest uppercase text-[#4d4732] hover:text-[#ffd700] transition-colors duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {link}
            </a>
          ))}
        </div>
        <p
          className="text-[10px] tracking-widest uppercase text-[#4d4732]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          © 2025 SNITCH
        </p>
      </footer>
    </div>
  );
}
