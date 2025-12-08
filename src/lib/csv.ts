export function downloadCsv(
  rows: Record<string, unknown>[],
  headers: string[],
  fileName: string,
) {
  if (!rows.length) return

  const lines = [headers.join(',')]
  rows.forEach((row) => {
    const values = headers.map((key) => {
      const val = row[key]
      if (val === undefined || val === null) return ''
      const str = String(val)
      return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
    })
    lines.push(values.join(','))
  })

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
