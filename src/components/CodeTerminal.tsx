import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { useLocale } from '../i18n/LocaleContext'

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
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    (raw: string): TerminalLine[] => {
      const cmd = raw.trim().toLowerCase()

      if (!cmd) return []

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

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return

      if (trimmed.toLowerCase() === 'clear') {
        setLines([
          nextLine('in', `> ${trimmed}`),
          nextLine('out', t.terminal.cleared),
          nextLine('system', t.terminal.hint),
        ])
        setInput('')
        return
      }

      const output = runCommand(trimmed)
      setLines((prev) => [
        ...prev,
        nextLine('in', `> ${trimmed}`),
        ...output,
      ])
      setInput('')
    },
    [runCommand, t.terminal.cleared, t.terminal.hint],
  )

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(input)
  }

  const onBodyKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      return
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key !== 'Enter') return
    e.preventDefault()
    submit(input)
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
        <form className="code-terminal__form" onSubmit={onSubmit}>
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
          />
        </form>
      </div>
    </div>
  )
}
