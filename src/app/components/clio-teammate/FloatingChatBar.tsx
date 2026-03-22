import * as React from 'react';
import { Sparkles, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export interface FloatingChatBarProps {
  onOpen: () => void;
  onSubmitMessage?: (message: string) => void;
  notificationCount?: number;
  isVisible: boolean;
  onInboxClick?: () => void;
  /** Renders above suggested queries (e.g. global “Navigate to” results). */
  navigationSection?: React.ReactNode;
  suggestedQuestions: string[];
  chatInput: string;
  onChatInputChange: (value: string) => void;
  placeholder?: string;
  brandColor?: string;
}

export function FloatingChatBar({
  onOpen,
  onSubmitMessage,
  notificationCount = 0,
  isVisible,
  onInboxClick,
  navigationSection,
  suggestedQuestions,
  chatInput,
  onChatInputChange,
  placeholder = 'Search the product or ask your Ambient CFO…',
  brandColor = '#0069D1',
}: FloatingChatBarProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const showSuggestions = isFocused;

  const handleSparkleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
    onSubmitMessage?.('__sparkle__');
  };

  const submitText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onOpen();
    onSubmitMessage?.(trimmed);
  };

  const handleSendClick = () => {
    submitText(chatInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitText(chatInput);
    }
  };

  if (!isVisible) return null;

  const filteredSuggestions = suggestedQuestions.filter((q) =>
    q.toLowerCase().includes(chatInput.toLowerCase()),
  );

  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-40 flex flex-col items-center justify-end px-4 md:left-[239px] md:px-8">
      <div className="pointer-events-auto w-full max-w-3xl">
        <div className="relative z-10 rounded-full border border-gray-200 bg-white p-2 shadow-2xl">
          <div className="flex items-center px-2 py-1">
            {onInboxClick ? (
              <button
                type="button"
                aria-label="Open inbox"
                onClick={onInboxClick}
                className="relative mr-3 shrink-0 rounded-[8px] p-0.5 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              >
                <img
                  src="/clio-accounting-icon.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] shrink-0 rounded-[6px] object-cover"
                  aria-hidden
                />
                {notificationCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-0.5 text-[9px] font-bold text-white">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                ) : null}
              </button>
            ) : null}

            <button
              type="button"
              aria-label="Open teammate"
              onClick={handleSparkleClick}
              className="mr-2 shrink-0 rounded-[8px] p-2 text-blue-600 transition-colors hover:bg-blue-50"
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <input
              type="text"
              value={chatInput}
              onChange={(e) => onChatInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                window.setTimeout(() => setIsFocused(false), 200);
              }}
              placeholder={placeholder}
              className="flex-1 border-none bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />

            <div className="ml-3 flex items-center border-l border-gray-100 pl-3">
              <button
                type="button"
                onClick={handleSendClick}
                className="rounded-[8px] p-2 text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: brandColor }}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showSuggestions ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-auto absolute bottom-full left-0 z-50 mb-2 flex w-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl"
              >
                {navigationSection}

                <p className="mb-2 px-2 text-xs font-semibold text-gray-500">
                  {chatInput ? 'Ask Ambient CFO' : 'Suggested queries'}
                </p>
                <div className="custom-scrollbar flex max-h-[200px] flex-col gap-1 overflow-y-auto">
                  {chatInput.trim() ? (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => submitText(chatInput)}
                      className="flex w-full items-center rounded-[8px] bg-gray-50/50 py-2 pl-3 pr-3 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Sparkles className="mr-2 h-3.5 w-3.5 shrink-0 text-blue-500" />
                      <span className="mr-1 font-medium">Ask:</span>
                      <span className="truncate">&quot;{chatInput}&quot;</span>
                    </button>
                  ) : null}
                  {filteredSuggestions.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => submitText(q)}
                      className="flex w-full items-start gap-2 rounded-[8px] py-2 pl-3 pr-3 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
