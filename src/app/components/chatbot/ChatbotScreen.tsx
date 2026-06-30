import { useState } from "react";
import { MessageCircle, Send, Sprout, Bot } from "lucide-react";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "bot",
    text: "Magandang umaga! Ako si BukidGabay AI, ang iyong virtual agricultural assistant. Paano ako makakatulong sa iyong pagsasaka ngayong araw?",
    time: "6:00 AM",
  },
  {
    role: "user",
    text: "Anong pwedeng itanim ngayong buwan?",
    time: "6:05 AM",
  },
  {
    role: "bot",
    text: "Para sa buwan na ito, mainam na magtanim ng Pagasa rice varieties tulad ng NSIC Rc 222 at Tubigan 18. Angkop din ang pagtatanim ng mais at gulay dahil sa inaasahang pag-ulan. Bisitahin ang inyong lokal na MAO para sa libreng binhi.",
    time: "6:05 AM",
  },
];

export default function ChatbotScreen({ t }: { t: Record<string, string> }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      role: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString("fil-PH", { hour: "numeric", minute: "2-digit" }),
    };
    const botReply: ChatMessage = {
      role: "bot",
      text: "Salamat sa iyong tanong! Ang aking database ay patuloy na ina-update. Pakikipag-ugnayan sa inyong lokal na MAO para sa mas detalyadong impormasyon.",
      time: new Date().toLocaleTimeString("fil-PH", { hour: "numeric", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  }

  return (
    <div className="flex-1 flex flex-col bg-[#fafbfa] pb-20 md:pb-0">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-4 pt-5 pb-4 md:px-8 md:pt-6 md:pb-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white text-lg md:text-xl font-bold">BukidGabay AI</h2>
            <p className="text-green-200 text-xs md:text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2.5 max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[#0f6b3a]" />
                </div>
              )}
              <div>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] text-white rounded-tr-md"
                      : "bg-white border border-[#e5e7eb] text-[#111827] rounded-tl-md"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === "bot" && msg.text.includes("magtanim") && (
                      <Sprout className="w-4 h-4 shrink-0 mt-0.5 text-[#0f6b3a]" />
                    )}
                    <span>{msg.text}</span>
                  </div>
                </div>
                <p className={`text-[10px] text-[#9ca3af] mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#e5e7eb] bg-white px-4 py-3 md:px-8">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Magtanong tungkol sa pagsasaka..."
            className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#0f6b3a]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] text-white flex items-center justify-center disabled:opacity-40 hover:shadow-md transition-all active:scale-[0.95] shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
