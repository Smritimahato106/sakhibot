import { useState } from 'react'
import LandingPage     from './components/LandingPage'
import ChatWindow      from './components/ChatWindow'
import InputBar        from './components/InputBar'
import LanguageSelector from './components/LanguageSelector'
import { sendMessage } from './api'

export default function App() {
  const [screen,   setScreen]   = useState('landing') // 'landing' | 'chat'
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(false)
  const [lang,     setLang]     = useState('en')
  const [district,   setDistrict]   = useState('')   // eslint-disable-line
  const [stateName,  setStateName]  = useState('')   // eslint-disable-line

  // history for the API — role + content only
  const apiHistory = messages.map(m => ({
    role:    m.role,
    content: m.content,
  }))

  const handleSend = async text => {
    if (!text.trim() || loading) return

    // add user message instantly
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const data = await sendMessage({
        message:   text,
        language:  lang,
        history:   apiHistory,
        district,
        stateName,
      })

      // update detected language
      if (data.detected_lang) setLang(data.detected_lang)

      // add bot reply
      setMessages(prev => [
        ...prev,
        {
          role:            'assistant',
          content:         data.answer,
          sources:         data.sources         || [],
          resources:       data.resources       || [],
          helplines:       data.helplines       || [],
          safetyPlan:      data.safety_plan     || [],
          documentReady:   data.document_ready  || false,
          documentType:    data.document_type   || '',
          nextQuestion:    data.next_question   || '',
          isEmergency:     data.is_emergency    || false,
          severity:        data.severity        || 'none',
          activatedAgents: data.activated_agents|| [],
          detectedLang:    data.detected_lang   || 'en',
        }
      ])
    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev,
        {
          role:    'assistant',
          content: 'Sorry, I could not connect to the server. '
                 + 'Please check your connection and try again. '
                 + 'For immediate help, call 181.',
          sources:     [],
          isEmergency: false,
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white max-w-lg mx-auto
                    shadow-sm">
      {/* header */}
      <header className="flex items-center justify-between px-4 py-3
                         border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center
                          justify-center text-white text-sm font-bold">
            S
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900 leading-none">
              SakhiBot
            </h1>
            <p className="text-[10px] text-gray-400 leading-none mt-0.5">
              Women's legal rights assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector value={lang} onChange={setLang} />

          {screen === 'chat' && (
            <button
              onClick={() => setScreen('landing')}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Home"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2
                     2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0
                     011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* main content */}
      {screen === 'landing' ? (
        <LandingPage onStart={() => setScreen('chat')} />
      ) : (
        <>
          <ChatWindow
            messages={messages}
            loading={loading}
            history={apiHistory}
          />
          <InputBar
            onSend={handleSend}
            loading={loading}
            lang={lang}
          />
        </>
      )}
    </div>
  )
}