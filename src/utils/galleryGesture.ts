/** One step per wheel gesture, including its stream of momentum events. */
export function createGalleryWheelGesture() {
  let lastEvent = -Infinity
  let lastStep = -Infinity
  let distance = 0
  let consumed = false
  return (delta: number, now: number): -1 | 0 | 1 => {
    const quiet = now - lastEvent > 260
    lastEvent = now
    if (quiet && now - lastStep > 800) {
      consumed = false
      distance = 0
    }
    if (consumed) return 0
    distance += delta
    if (Math.abs(distance) < 28) return 0
    consumed = true
    lastStep = now
    return distance > 0 ? 1 : -1
  }
}

export function galleryDragTarget(origin: number, position: number, velocity: number, cancelled = false) {
  const start = Math.round(origin)
  if (cancelled) return start
  const distance = position - origin
  if (Math.abs(distance) < .12 && Math.abs(velocity) < .65) return start
  return start + (Math.abs(distance) >= .12 ? Math.sign(distance) : Math.sign(velocity))
}
