"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  HeartPulse,
  RefreshCw,
  MessageCircle,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  // Diagnosis understanding
  "What does my cancer stage mean — and what are my chances?",
  "What is the difference between cancer types, stages, and grades?",
  "What does ER+/HER2+ mean for breast cancer?",
  "What does EGFR mutation mean for lung cancer?",
  // Pediatric
  "What does Stage 1A Hodgkin's Lymphoma mean for a child?",
  "What is the survival rate for pediatric Hodgkin's Stage 1A?",
  // Treatment
  "What happens during chemotherapy — week by week?",
  "What is immunotherapy and how is it different from chemotherapy?",
  "What are PARP inhibitors and who do they help?",
  "What side effects should I expect, and how can I manage them?",
  // Practical
  "What questions should I ask my oncologist at the next appointment?",
  "What can we do while waiting for treatment to start?",
  // Emotional
  "How do I talk to my child / parent / partner about their cancer diagnosis?",
  "How can I support a loved one going through cancer treatment?",
  // Trials
  "Are there clinical trials I should know about for my cancer type?",
];

function MessageBubble({ msg, isLast }: { msg: Message; isLast: boolean }) {
  const isUser = msg.role === "user";

  // Render markdown-like formatting
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return <h3 key={i} className="font-bold text-hope-700 mt-3 mb-1">{line.slice(3)}</h3>;
      }
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
        return <p key={i} className="font-semibold text-slate-800 mt-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        const content = line.slice(2);
        return (
          <li key={i} className="ml-4 list-disc text-slate-700">
            {/* Bold within list items */}
            {content.split(/\*\*(.*?)\*\*/g).map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
            )}
          </li>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className={i > 0 ? "mt-1" : ""}>
          {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className={clsx("flex gap-3 animate-slide-up", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-9 h-9 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
          <HeartPulse className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={clsx(
        "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
        isUser
          ? "bg-hope-600 text-white rounded-tr-sm ml-auto max-w-sm md:max-w-lg"
          : "bg-white border border-hope-100 text-slate-700 rounded-tl-sm max-w-2xl"
      )}>
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <div className="space-y-0.5">{renderContent(msg.content)}</div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
        <HeartPulse className="w-5 h-5 text-white heartbeat" />
      </div>
      <div className="bg-white border border-hope-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-hope-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm HopePulse AI — your compassionate cancer information companion.\n\nI'm here to help you understand diagnoses, treatment options, what to expect, and how to navigate this journey with clarity and hope — not fear.\n\n**I'm especially here for families like yours.** Ask me anything — about cancer stages, treatments, side effects, clinical trials, or even just how to talk to your child about what's happening.\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();

      if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm sorry, something went wrong. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I couldn't connect right now. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello again! I'm ready to help. What would you like to know?",
      },
    ]);
    setShowSuggestions(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Chat header */}
      <div className="bg-white border-b border-hope-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center shadow-md">
            <HeartPulse className="w-5 h-5 text-white heartbeat" />
          </div>
          <div>
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              HopePulse AI
              <span className="badge bg-emerald-100 text-emerald-700 text-xs">Online</span>
            </div>
            <div className="text-xs text-slate-500">Cancer information specialist • Available 24/7</div>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="New conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-hope-50/50 to-white">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} />
        ))}
        {loading && <TypingIndicator />}

        {/* Suggested questions — shown at start */}
        {showSuggestions && messages.length === 1 && (
          <div className="mt-6 animate-fade-in">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pulse-400" />
              Suggested questions to get started
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-white border border-hope-200 text-hope-700 px-3 py-1.5 rounded-full hover:bg-hope-50 hover:border-hope-300 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-100 px-4 py-2">
        <p className="text-xs text-amber-700 text-center">
          HopePulse AI provides educational information only — not medical advice. Always consult your oncologist for treatment decisions.
        </p>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-hope-100 p-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-hope-50 border border-hope-200 rounded-xl overflow-hidden focus-within:border-hope-400 focus-within:ring-2 focus-within:ring-hope-100 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about cancer, treatment, or how to cope..."
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-700 placeholder-slate-400 resize-none focus:outline-none min-h-[44px] max-h-32"
              rows={1}
              disabled={loading}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className={clsx(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0",
              input.trim() && !loading
                ? "bg-hope-600 hover:bg-hope-700 text-white shadow-md hover:shadow-lg active:scale-95"
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
