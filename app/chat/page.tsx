"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  HeartPulse,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What does Stage 1A Hodgkin's Lymphoma mean for a child?",
  "What is the survival rate for pediatric Hodgkin's Stage 1A?",
  "What does my cancer stage mean — and what are my chances?",
  "What happens during chemotherapy — week by week?",
  "What is immunotherapy and how is it different from chemo?",
  "What questions should I ask my oncologist?",
  "How do I talk to my child about their cancer diagnosis?",
  "Are there clinical trials I should know about?",
  "What does ER+/HER2+ mean for breast cancer?",
  "What side effects should I expect from treatment?",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-hope-100 text-slate-400 hover:text-hope-600"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div className={clsx("flex gap-3 group", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
          <HeartPulse className="w-4 h-4 text-white heartbeat" />
        </div>
      )}

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 text-slate-600 font-bold text-xs">
          You
        </div>
      )}

      <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[75%]">
        <div className={clsx(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-hope-600 text-white rounded-tr-sm"
            : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm"
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{msg.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-hope-700 prose-headings:font-bold prose-strong:text-slate-800 prose-li:text-slate-700 prose-p:text-slate-700 prose-p:leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {!isUser && (
          <div className="flex items-center gap-1 px-1">
            <CopyButton text={msg.content} />
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
        <HeartPulse className="w-4 h-4 text-white heartbeat" />
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
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
        "Hello, I'm **HopePulse AI** — your compassionate cancer information companion.\n\nI'm here to help you understand diagnoses, treatment options, what to expect, and how to navigate this journey with clarity and hope — not fear.\n\nI'm especially here for **families like yours**. Ask me anything — about cancer stages, treatments, side effects, clinical trials, or even just how to talk to your child about what's happening.\n\n*What would you like to know?*",
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

  // Auto-resize textarea
  useEffect(() => {
    const ta = inputRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  }, [input]);

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
          { role: "assistant", content: "I'm sorry, something went wrong. Please try again in a moment." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I couldn't connect right now. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
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
        content: "Hello again! I'm ready to help. What would you like to know?",
      },
    ]);
    setShowSuggestions(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      {/* Chat header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-hope-500 to-hope-700 rounded-xl flex items-center justify-center shadow-md">
            <HeartPulse className="w-5 h-5 text-white heartbeat" />
          </div>
          <div>
            <div className="font-bold text-slate-800 flex items-center gap-2">
              HopePulse AI
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Online
              </span>
            </div>
            <div className="text-xs text-slate-500">Cancer information specialist · Available 24/7</div>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
          title="New conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          New chat
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {loading && <TypingIndicator />}

          {/* Suggested questions */}
          {showSuggestions && messages.length === 1 && (
            <div className="animate-fade-in pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-pulse-400" />
                Common questions — tap to ask
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl hover:bg-hope-50 hover:border-hope-300 hover:text-hope-700 transition-all text-left shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50/80 border-t border-amber-100 px-4 py-2 text-center">
        <p className="text-xs text-amber-700">
          Educational information only — not medical advice. Always consult your oncologist for treatment decisions.
        </p>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-slate-100 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className={clsx(
            "flex gap-3 items-end bg-white border rounded-2xl px-4 py-3 transition-all duration-200 shadow-sm",
            loading ? "border-slate-200" : "border-slate-200 focus-within:border-hope-400 focus-within:shadow-md focus-within:shadow-hope-100"
          )}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about cancer, treatment, or how to support your family..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 resize-none focus:outline-none min-h-[24px] max-h-[120px] leading-relaxed"
              rows={1}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className={clsx(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0",
                input.trim() && !loading
                  ? "bg-hope-600 hover:bg-hope-700 text-white shadow-md hover:shadow-lg active:scale-95"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
