import { paginate } from 'graphql/utils'

const data = [
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
  'test6',
]

it('should return first 3 items with empty cursor', () => {
  const paginatedResults = paginate('', 3, data, i => i)

  expect(paginatedResults).toHaveLength(3)
  expect(paginatedResults[0]).toBe('test1')
  expect(paginatedResults[1]).toBe('test2')
  expect(paginatedResults[2]).toBe('test3')
})

it('should return next 3 items after cursor', () => {
  const paginatedResults = paginate('test3', 3, data, i => i)

  expect(paginatedResults).toHaveLength(3)
  expect(paginatedResults[0]).toBe('test4')
  expect(paginatedResults[1]).toBe('test5')
  expect(paginatedResults[2]).toBe('test6')
})

it('should return an empty array after the last item cursor', () => {
  const paginatedResults = paginate('test6', 3, data, i => i)

  expect(paginatedResults).toHaveLength(0)
})