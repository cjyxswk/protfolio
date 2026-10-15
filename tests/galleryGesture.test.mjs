import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

const source = await readFile(new URL('../src/utils/galleryGesture.ts', import.meta.url), 'utf8')
const compiled = stripTypeScriptTypes(source)
const { createGalleryWheelGesture, galleryDragTarget } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('one trackpad gesture plus long momentum advances only one card', () => {
  const gesture = createGalleryWheelGesture()
  const steps = Array.from({ length: 120 }, (_, i) => gesture(i < 12 ? 30 : 3, i * 16))
  assert.equal(steps.reduce((sum, step) => sum + step, 0), 1)
  assert.equal(gesture(-40, 2400), -1)
})

test('small deltas accumulate, but noise never triggers a step', () => {
  const gesture = createGalleryWheelGesture()
  assert.equal(gesture(10, 0), 0)
  assert.equal(gesture(10, 16), 0)
  assert.equal(gesture(10, 32), 1)
  assert.equal(gesture(1000, 48), 0)
})

test('long or fast drags advance at most one card in either direction', () => {
  assert.equal(galleryDragTarget(3, 7, 8), 4)
  assert.equal(galleryDragTarget(3, -2, -8), 2)
  assert.equal(galleryDragTarget(3, 3.05, .1), 3)
  assert.equal(galleryDragTarget(3, 3.05, 2), 4)
  assert.equal(galleryDragTarget(3, 4, 8, true), 3)
})
