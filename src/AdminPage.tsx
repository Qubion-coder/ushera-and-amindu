import React, { useState } from 'react';
import { Copy, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { BRIDE_NAME, GROOM_NAME } from './config';
import { PREFIXES, PrefixKey, buildInviteLink, formatDisplayName } from './guest';

const buildMessage = (displayName: string, link: string) =>
  `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${GROOM_NAME} & ${BRIDE_NAME}`;

export function AdminPage() {
  const [prefix, setPrefix] = useState<PrefixKey>('mr');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ link: string; displayName: string } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setGenerated({
      link: buildInviteLink(window.location.origin, prefix, guestName),
      displayName: formatDisplayName(prefix, guestName),
    });
  };

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Could not copy — please copy manually.');
    }
  };

  const message = generated ? buildMessage(generated.displayName, generated.link) : '';

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800 flex items-center justify-center">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_8px_30px_rgba(176,137,104,0.15)] overflow-hidden border border-brand-beige/50">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display tracking-wide mb-2 text-stone-800">Link Generator</h2>
            <p className="text-stone-500 font-sans text-sm uppercase tracking-[0.2em]">
              {GROOM_NAME} & {BRIDE_NAME} — personalized invitations
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-stone-700 mb-1 tracking-wide">
                Select Prefix
              </label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value as PrefixKey)}
                className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans"
              >
                {PREFIXES.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1 tracking-wide">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-beige-deep text-white font-sans text-sm tracking-[0.2em] uppercase shadow-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LinkIcon className="w-5 h-5" />
              Generate Link
            </button>
          </form>

          {generated && (
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-brand-ivory rounded-xl border border-brand-beige/50">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-2">Generated Link</p>
                <a
                  href={generated.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-brand-beige-deep break-all underline underline-offset-2"
                >
                  {generated.link}
                </a>
              </div>

              <div className="p-4 bg-brand-ivory rounded-xl border border-brand-beige/50">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-2">Message Preview</p>
                <pre className="whitespace-pre-wrap break-words font-sans text-sm text-stone-700 leading-relaxed">{message}</pre>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.link, 'Link copied!')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-brand-beige-deep text-brand-beige-deep font-sans text-xs tracking-[0.15em] uppercase hover:bg-brand-beige-deep/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => copy(message, 'Message copied!')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-stone-800 text-white font-sans text-xs tracking-[0.15em] uppercase hover:bg-stone-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4" />
              Copy Full Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
