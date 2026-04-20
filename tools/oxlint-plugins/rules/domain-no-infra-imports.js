import path from 'node:path'

const MESSAGE =
  'src/domain must not import from src/infra — domain is the pure core. Move the shared code to src/domain/, or invert the dependency via an interface injected at the infra boundary.'

function isInfraSource(sourceValue, filename, cwd) {
  if (typeof sourceValue !== 'string' || sourceValue.length === 0) return false
  if (/^@infra(\/|$)/.test(sourceValue)) return true
  if (sourceValue.startsWith('.')) {
    const resolved = path.resolve(path.dirname(filename), sourceValue)
    const infraRoot = path.resolve(cwd, 'src/infra') + path.sep
    return (resolved + path.sep).startsWith(infraRoot)
  }
  return false
}

function isInsideDomain(filename, cwd) {
  const domainRoot = path.resolve(cwd, 'src/domain') + path.sep
  return (filename + path.sep).startsWith(domainRoot)
}

export default {
  meta: { type: 'problem' },
  create(context) {
    const filename = context.getFilename()
    const cwd = typeof context.getCwd === 'function' ? context.getCwd() : process.cwd()
    if (!isInsideDomain(filename, cwd)) return {}

    const check = (source) => {
      if (source && isInfraSource(source.value, filename, cwd)) {
        context.report({ message: MESSAGE, node: source })
      }
    }

    return {
      ImportDeclaration(node) {
        check(node.source)
      },
      ExportNamedDeclaration(node) {
        if (node.source) check(node.source)
      },
      ExportAllDeclaration(node) {
        check(node.source)
      },
      ImportExpression(node) {
        if (node.source?.type === 'Literal' && typeof node.source.value === 'string') {
          check(node.source)
        }
      },
    }
  },
}
