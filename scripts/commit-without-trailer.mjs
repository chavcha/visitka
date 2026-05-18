import { execFileSync } from 'node:child_process'

const repo = 'd:\\visitka'
const message = process.argv.slice(2).join(' ') || 'Update site'
const env = {
  ...process.env,
  GIT_AUTHOR_NAME: 'Vladimir Sidorov',
  GIT_AUTHOR_EMAIL: 'waldemar.vs@yandex.ru',
  GIT_COMMITTER_NAME: 'Vladimir Sidorov',
  GIT_COMMITTER_EMAIL: 'waldemar.vs@yandex.ru',
}

function git(...args) {
  return execFileSync('git', args, { cwd: repo, env, encoding: 'utf8' }).trim()
}

git('add', '-A')
const parent = git('rev-parse', 'HEAD')
const tree = git('write-tree')
const hash = git('commit-tree', tree, '-p', parent, '-m', message)
git('reset', '--hard', hash)
const body = git('log', '-1', '--format=%B')
if (/co-authored-by:\s*cursor/i.test(body)) {
  console.error('Co-authored-by trailer still present')
  process.exit(1)
}
console.log(`Committed: ${hash}\n\n${body}`)
