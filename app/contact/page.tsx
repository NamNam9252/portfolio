"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconBrandX, IconMail, IconPhone } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import GlareHover from "@/components/GlareHover";
import ShinyText from "@/components/ShinyText";
import { useTheme } from "next-themes";

const quotes = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });

  const [quote, setQuote] = useState(quotes[0]);
  const { theme } = useTheme();

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (min 10 digits)";
    }

    // Message validation
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", reason: "", message: "" });
        setErrors({});
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const contactLinks = [
    { icon: IconMail, label: "Email", href: "mailto:gnaman180@gmail.com", value: "gnaman180@gmail.com" },
    { icon: IconPhone, label: "Phone", href: "tel:+916377992203", value: "+91 6377992203" },
    { icon: IconBrandGithub, label: "Github", href: "https://github.com/namnam9252", value: "namnam9252" },
    { icon: IconBrandLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/naman-goyal-ba12b1333", value: "Naman G" },
    { icon: IconBrandInstagram, label: "Instagram", href: "https://www.instagram.com/naman.xd__/", value: "@naman" },
    { icon: IconBrandX, label: "Twitter", href: "https://x.com/NGoyal99728", value: "@naman" },
  ];


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-gray-50 dark:bg-neutral-950 transition-colors font-[family-name:var(--font-noto-serif)] duration-500">
      <div className="w-full max-w-7xl flex justify-start items-end mt-5 px-4">
        <div className="ml-15">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Contact Me</h1>
            <p className="text-gray-500 dark:text-gray-400 font-[family-name:var(--font-patrick-hand)]">Let&apos;s Catch up</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-10"></div>
      <div className="relative">
        {/* Main Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMouseMove}
          className="w-full max-w-6xl bg-gray-200 dark:bg-neutral-900 rounded-[3rem] p-4 md:p-6 shadow-2xl overflow-hidden relative group z-10"
        >

          {/* Border Glow Effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              border: '2px solid transparent',
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.3), transparent 40%) border-box`,
              mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
            }}
          />

          <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px] relative z-10">

            {/* Left Panel - Dark Info Section */}
            <GlareHover
              width="100%"
              height="100%"
              borderRadius="2.5rem"
              background="rgb(39 39 42)" // bg-zinc-800
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="w-full lg:!w-[40%] text-white"
            >
              <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold uppercase tracking-wider mb-8">
                    LET'S WORK TOGETHER
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed font-[family-name:var(--font-patrick-hand)]">
                    Building digital products, brands, and experiences. Let's create something extraordinary together.
                  </p>
                </div>

                <div className="relative z-10 mt-12 space-y-4">
                  {contactLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        className="flex items-center gap-4 text-gray-300 hover:text-white  font-[family-name:var(--font-patrick-hand)] transition-colors group/link"
                      >
                        <div className="p-2 bg-white/10 rounded-full group-hover/link:bg-white/20 transition-colors">
                          <Icon size={20} />
                        </div>
                        <span className="font-medium">{link.label}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Random Quote Section */}
                <div className="relative z-10 mt-8 p-6 bg-white/5 font-[family-name:var(--font-patrick-hand)] rounded-2xl backdrop-blur-sm border border-white/10 group/quote transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                  <ShinyText
                    text={`"${quote.text}"`}
                    speed={3}
                    delay={0}
                    color="#d4d4d8" // zinc-300
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    className="text-lg font-medium italic block mb-2 leading-relaxed"
                  />
                  <div className="text-sm text-gray-400 font-light text-right tracking-wide">— {quote.author}</div>

                  {/* Subtle aesthetic accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-tr-2xl pointer-events-none" />
                </div>

                {/* Decorative Circle */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl rounded-full pointer-events-none" />
              </div>
            </GlareHover>

            {/* Right Panel - Form Section */}
            <div className="w-full lg:w-[60%] bg-gray-100 dark:bg-neutral-800/50 rounded-[2.5rem] p-8 md:p-12 flex flex-col relative overflow-hidden">

              <div className="relative z-10 mb-8 pl-2">
                <h2 className="text-2xl text-gray-800 dark:text-white font-bold uppercase mb-2">
                  GET IN TOUCH
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-[family-name:var(--font-patrick-hand)]">
                  Have a project in mind? Fill out the form below.
                </p>
                <div className="w-12 h-1 bg-indigo-500 rounded-full" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow relative z-10">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Tyler"
                      type="text"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Durden"
                      type="text"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </LabelInputContainer>
                </div>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </LabelInputContainer>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9999999999"
                      type="tel"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="reason">Reason</Label>
                    <Input
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Collaboration"
                      type="text"
                    />
                  </LabelInputContainer>
                </div>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className={cn(
                      "flex w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition duration-400 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:placeholder-text-neutral-600 dark:focus-visible:ring-neutral-600",
                      errors.message ? 'border-red-500 ring-2 ring-red-500' : ''
                    )}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </LabelInputContainer>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full md:w-auto md:min-w-[160px] text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] px-6"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'} &rarr;
                    <BottomGradient />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
