import { execFileSync } from 'node:child_process'

const repo = 'd:/visitka'
const message = 'Remove separate portfolio stack block and ticker deploy labels'
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
process.stdout.write(git('log', '-1', '--format=%B'))
