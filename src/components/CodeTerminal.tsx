import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useSound } from '../audio/SoundContext'
import { useLocale } from '../i18n/LocaleContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SKILL_NAMES = [
  'React',
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React Native',
  'Redux',
  'Node.js',
  'GraphQL',
  'Vite',
  'Effector',
  'FSD',
  'C# / .NET',
  'HTML & CSS',
  'SQL',
  'Express.js',
  'Apollo',
] as const

type LineKind = 'system' | 'in' | 'out' | 'err'

type TerminalLine = {
  id: number
  kind: LineKind
  text: string
}

let lineId = 0
function nextLine(kind: LineKind, text: string): TerminalLine {
  lineId += 1
  return { id: lineId, kind, text }
}

export function CodeTerminal() {
  const { t } = useLocale()
  const { playTerminal } = useSound()
  const reducedMotion = usePrefersReducedMotion()
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastCommandRef = useRef<{ text: string; at: number }>({ text: '', at: 0 })

  useEffect(() => {
    lineId = 0
    setLines([
      nextLine('system', t.terminal.welcome),
      nextLine('system', t.terminal.hint),
    ])
  }, [t.terminal.hint, t.terminal.welcome])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const runCommand = useCallback(
    (cmd: string): TerminalLine[] => {
      if (cmd === 'help') {
        return [
          nextLine('out', t.terminal.helpTitle),
          ...t.terminal.helpLines.map((line) => nextLine('out', line)),
        ]
      }

      if (cmd === 'skills') {
        return [
          nextLine('out', t.terminal.skillsTitle),
          nextLine('out', `  ${SKILL_NAMES.join(' · ')}`),
        ]
      }

      if (cmd === 'contact') {
        return [
          nextLine('out', t.terminal.contactTitle),
          nextLine('out', t.terminal.contactEmail),
          nextLine('out', t.terminal.contactTelegram),
          nextLine('out', t.terminal.contactGithub),
          nextLine('out', t.terminal.contactPhone),
        ]
      }

      if (cmd === 'github') {
        window.open('https://github.com/chavcha', '_blank', 'noopener,noreferrer')
        return [nextLine('out', t.terminal.githubOpen)]
      }

      return [nextLine('err', t.terminal.unknown)]
    },
    [t.terminal],
  )

  const execute = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return

      const now = Date.now()
      if (
        lastCommandRef.current.text === cmd &&
        now - lastCommandRef.current.at < 500
      ) {
        return
      }
      lastCommandRef.current = { text: cmd, at: now }

      if (cmd === 'clear') {
        setLines([
          nextLine('in', `> ${cmd}`),
          nextLine('out', t.terminal.cleared),
          nextLine('system', t.terminal.hint),
        ])
        setInput('')
        return
      }

      const output = runCommand(cmd)
      setLines((prev) => [...prev, nextLine('in', `> ${cmd}`), ...output])
      setInput('')
    },
    [runCommand, t.terminal.cleared, t.terminal.hint],
  )

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!reducedMotion) {
      if (e.key === 'Enter') playTerminal('enter')
      else if (e.key === 'Backspace') playTerminal('backspace')
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        playTerminal('key')
      }
    }

    if (e.key !== 'Enter') return
    e.preventDefault()
    e.stopPropagation()
    execute(e.currentTarget.value)
  }

  const onBodyKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLInputElement) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }

  return (
    <div
      className="code-terminal"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal"
    >
      <div className="code-terminal__chrome" aria-hidden="true">
        <span className="code-terminal__dot code-terminal__dot--red" />
        <span className="code-terminal__dot code-terminal__dot--yellow" />
        <span className="code-terminal__dot code-terminal__dot--green" />
        <span className="code-terminal__title">vs-terminal</span>
      </div>
      <div
        ref={bodyRef}
        className="code-terminal__body"
        tabIndex={0}
        onKeyDown={onBodyKeyDown}
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={`code-terminal__line code-terminal__line--${line.kind}`}
          >
            {line.text}
          </p>
        ))}
        <div className="code-terminal__form" role="group" aria-label="Command input">
          <label className="code-terminal__prompt" htmlFor="terminal-input">
            {'>'}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            className="code-terminal__input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onInputKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            enterKeyHint="send"
          />
        </div>
      </div>
    </div>
  )
}
