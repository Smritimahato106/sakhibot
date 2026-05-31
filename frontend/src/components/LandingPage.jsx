const FEATURES = [
  {
    icon: '⚖️',
    title: 'Legal answers',
    desc: 'From real Indian laws — DV Act, POSH, IPC 498A',
  },
  {
    icon: '📄',
    title: 'FIR drafts',
    desc: 'Ready-to-print complaint documents',
  },
  {
    icon: '📍',
    title: 'Nearby shelters',
    desc: 'One Stop Centres and legal aid offices',
  },
  {
    icon: '🗺️',
    title: 'Safety plan',
    desc: 'Step-by-step personalised action guide',
  },
]

export default function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-6 space-y-6">

      {/* hero */}
      <div>
        <div className="inline-flex items-center gap-2 bg-emerald-50
                        border border-emerald-200 rounded-full px-3 py-1.5
                        text-xs text-emerald-700 font-medium mb-3">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/>
          Free · No login · Always available
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 leading-snug mb-2">
          Aapka haq,{' '}
          <span className="text-emerald-600">aapki bhasha mein</span>
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Know your legal rights in Hindi, Bengali, Tamil and 6 more
          Indian languages. Get answers from real Indian law — no guessing.
        </p>
      </div>

      {/* features grid */}
      <div className="grid grid-cols-2 gap-3">
        {FEATURES.map((f, i) => (
          <div key={i}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-3">
            <div className="text-xl mb-1.5">{f.icon}</div>
            <p className="text-xs font-semibold text-gray-800 mb-0.5">
              {f.title}
            </p>
            <p className="text-[11px] text-gray-500 leading-snug">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* how it works */}
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase
                      tracking-wide mb-3">
          How it works
        </p>
        <div className="space-y-3">
          {[
            ['1', 'Ask in your language', 'Type or speak — Hindi, Bengali, Tamil and more'],
            ['2', 'Get grounded answers', 'From real Indian laws — always cited'],
            ['3', 'Take action',          'Document draft, shelter map, safety plan'],
          ].map(([n, title, desc]) => (
            <div key={n} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-100 text-emerald-700
                              rounded-full flex items-center justify-center
                              text-xs font-bold shrink-0">
                {n}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

            {/* CTA buttons */}
      <div className="space-y-2.5 pb-2">
        <button
          onClick={onStart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white
                     font-medium rounded-2xl py-3.5 text-sm transition-colors
                     shadow-sm"
        >
          Start asking →
        </button>
        
        <a
          href="tel:181"
          className="w-full flex items-center justify-center gap-2
                     border border-red-200 text-red-600 rounded-2xl py-3
                     text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4
                     1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1
                     1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1
                     0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          I need help right now — Call 181
        </a>
      </div>
    </div>
    )
}