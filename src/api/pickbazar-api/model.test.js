import { PickbazarApi } from '.'

let pickbazarApi

beforeEach(async () => {
  pickbazarApi = await PickbazarApi.create({ title: 'test', content: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pickbazarApi.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pickbazarApi.id)
    expect(view.title).toBe(pickbazarApi.title)
    expect(view.content).toBe(pickbazarApi.content)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pickbazarApi.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pickbazarApi.id)
    expect(view.title).toBe(pickbazarApi.title)
    expect(view.content).toBe(pickbazarApi.content)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
