import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ code, language = 'javascript', tabs = null }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0].label : null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCode = tabs
    ? tabs.find(t => t.label === activeTab)?.code || code
    : code;

  const currentLanguage = tabs
    ? tabs.find(t => t.label === activeTab)?.language || language
    : language;

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {tabs && (
        <div className="flex items-center gap-1 bg-gray-900 border-b border-gray-800 px-2 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3 py-1.5 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.label
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div className="relative bg-gray-900">
        <button
          onClick={() => copyToClipboard(currentCode)}
          className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <SyntaxHighlighter
          language={currentLanguage}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#111827',
            fontSize: '0.875rem',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'JetBrains Mono, monospace',
            }
          }}
        >
          {currentCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
