import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Sparkles } from "lucide-react";
import mascot from "@/assets/mascot1.png";

type Msg = { role: "bot" | "user"; text: string };

const STARTER: Msg[] = [
  {
    role: "bot",
    text: "Hi, I'm Prox — your PROsmart assistant. Ask me about energy monitoring, automated billing, plans, or anything else!",
  },
];

const SUGGESTIONS = [
  "What does PROsmart do?",
  "How is billing automated?",
  "Pricing plans",
  "Book a demo",
];

// Lightweight rule-based replies. Replace `getReply` with a real API call later.
const getReply = (input: string): string => {
  const q = input.toLowerCase();
  if (/price|pricing|plan|cost/.test(q))
    return "We offer Starter, Lite, Pro and Enterprise tiers in INR. Visit the Pricing page for the full breakdown — or I can connect you with sales!";
  if (/demo|book/.test(q))
    return "You can book a personalised demo from the 'Book a Demo' button in the header — our team responds within 24 hours.";
  if (/billing|invoice|tenant/.test(q))
    return "PROsmart fully automates tenant billing — meters → tax engine → branded invoices. Zero manual entry, every cycle.";
  if (/energy|monitor|consumption/.test(q))
    return "We unify EB, DG, HVAC, water and gas into a single live dashboard with 30-second refresh and per-circuit AI disaggregation.";
  if (/contact|support|help/.test(q))
    return "Head to the Support page or email support@prosmart.energy. Enterprise customers get 4-hour SLA response.";
  if (/hi|hello|hey/.test(q))
    return "Hello! I'm Prox. How can I help you today?";
  return "Great question! Our team can give you a precise answer — try the Support page or book a demo, and I'll be standing by.";
};

export const ProxChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(STARTER);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const [tipDismissed, setTipDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show "Ask Prox" tooltip 2s after mount, hide after 8s, repeat every 30s
  // until the user dismisses it or opens the chat.
  useEffect(() => {
    if (tipDismissed || open) return;
    const showAt = window.setTimeout(() => setTipVisible(true), 2000);
    const cycle = window.setInterval(() => {
      setTipVisible((v) => !v);
    }, 12000);
    return () => {
      window.clearTimeout(showAt);
      window.clearInterval(cycle);
    };
  }, [tipDismissed, open]);

  // Hide tooltip while chat is open
  useEffect(() => {
    if (open) setTipVisible(false);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  // Lock body scroll while panel is open on small screens
  useEffect(() => {
    if (!open) return;
    if (window.innerWidth < 640) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getReply(t) }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating launcher + slide-in tooltip */}
      <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {!open && tipVisible && (
            <motion.button
              key="tip"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative hidden cursor-pointer items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2.5 text-sm font-medium text-foreground shadow-[0_10px_30px_-15px_hsl(0_0%_0%/0.35)] backdrop-blur-md sm:flex"
            >
              <span className="text-base">👋</span>
              <span>Ask Prox</span>
              {/* Little arrow pointing to the button */}
              <span
                className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-r border-border bg-background/90"
                aria-hidden
              />
              <button
                type="button"
                aria-label="Dismiss"
                onClick={(e) => {
                  e.stopPropagation();
                  setTipVisible(false);
                  setTipDismissed(true);
                }}
                className="ml-1 -mr-1 rounded-full p-0.5 text-muted-foreground opacity-60 transition-opacity hover:opacity-100"
              >
                <X size={12} />
              </button>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close Prox chat" : "Open Prox chat"}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/90 shadow-[0_12px_30px_-12px_hsl(0_0%_0%/0.35)] backdrop-blur-md transition-colors hover:bg-background sm:h-16 sm:w-16"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="text-foreground"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.img
                key="mascot"
                src={mascot}
                alt="Prox"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25 }}
                className="h-11 w-11 object-contain sm:h-12 sm:w-12"
              />
            )}
          </AnimatePresence>
          {/* Tiny online dot */}
          {!open && (
            <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
          )}
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-20 z-[59] flex flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-[0_30px_70px_-20px_hsl(0_0%_0%/0.5)] backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:w-[400px]"
            style={{ maxHeight: "min(78vh, 640px)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)/0.18) 0%, hsl(var(--blue-3)/0.18) 100%)",
              }}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background/70 ring-2 ring-primary/40 sm:h-12 sm:w-12">
                <img src={mascot} alt="Prox" className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-base font-semibold sm:text-lg">Prox</span>
                  <Sparkles size={14} className="text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">
                  PROsmart AI assistant · Online
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 sm:px-5"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "bot" && (
                      <img
                        src={mascot}
                        alt=""
                        className="mr-2 h-7 w-7 shrink-0 self-end object-contain"
                      />
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md border border-border bg-background/80 text-foreground"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <div className="flex items-center gap-2">
                    <img src={mascot} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex gap-1 rounded-2xl rounded-bl-md border border-border bg-background/80 px-3 py-2.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions only at the start */}
              {messages.length === 1 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-background/60 p-3 sm:p-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Prox anything..."
                className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
