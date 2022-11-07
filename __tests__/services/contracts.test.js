const { getById } = require('../../src/services/contracts')

describe('Service Contracts', () => {
  test('Get by id should return item', () => {
    const result = getById(1)
    expect(result).toBe(1)
  })
})
