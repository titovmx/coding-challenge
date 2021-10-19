export const paginate = <T>(
  cursor: string,
  pageSize = 20,
  results: T[],
  getItemCursor: (item: T) => string,
): T[] => {
  if (pageSize < 1) return []

  if (!cursor) return results.slice(0, pageSize)
  const cursorIndex = results.findIndex(item => {
    const itemCursor = getItemCursor(item)

    return itemCursor ? cursor === itemCursor : false
  })

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize)
}