import { useEffect, useRef, type AnchorHTMLAttributes } from 'react'

// Adapted from the user-provided React Bits SpecularButton reference.
// The native anchor retains keyboard activation, hash navigation and scroll behavior.
const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uCenter;
uniform vec2 uHalf;
uniform float uRadius;
uniform float uPx;
uniform float uSpot;
uniform vec2 uEntry;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform vec2 uWindow;
uniform float uThickness;
uniform float uGlow;
out vec4 outColor;

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float loopPosition(vec2 p, vec2 b, float r) {
  vec2 inner = b - r;
  float arc = 1.5707963 * r;
  float quarter = inner.x + inner.y + arc;
  vec2 a = abs(p);
  vec2 q = a - inner;
  float s = q.x > 0.0 && q.y > 0.0
    ? inner.y + atan(q.y, q.x) * r
    : (q.x > q.y ? min(a.y, inner.y) : inner.y + arc + inner.x - min(a.x, inner.x));
  if (p.x < 0.0) s = p.y >= 0.0 ? 2.0 * quarter - s : 2.0 * quarter + s;
  else if (p.y < 0.0) s = 4.0 * quarter - s;
  return s / max(4.0 * quarter, 0.0001);
}

float lobe(float position, float center) {
  float gap = abs(fract(position - center + 0.5) - 0.5);
  return 1.0 - smoothstep(uWindow.x, uWindow.x + uWindow.y, gap);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = roundedBox(p, uHalf, uRadius);
  float position = loopPosition(p, uHalf, uRadius);
  float key = lobe(position, uSpot);
  float back = lobe(position, uSpot + 0.5);
  float streak = key + back * 0.45;
  float width = max(uThickness * uPx * mix(1.0, max(key, back), 0.6), 0.35);
  float band = smoothstep(-width - 0.6, -width + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float hair = smoothstep(-uPx - 0.6, -uPx + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float inside = 1.0 - smoothstep(-0.6, 0.6, d);
  vec2 pool = (p - uEntry) / (uHalf.y * vec2(1.6, 1.1));
  float glow = streak * 0.2 * exp(-abs(d + width * 0.5) / (5.0 * uPx)) + inside * 0.08 * exp(-dot(pool, pool));
  float light = clamp((band * streak + glow * uGlow) * uIntensity, 0.0, 1.0);
  vec4 base = vec4(uBaseColor, 1.0) * hair * 0.6;
  outColor = vec4(uLineColor, 1.0) * light + base * (1.0 - light);
}`;


const PAD = 24
const wrap = (v: number) => v - Math.floor(v)
function loopPosition(x: number, y: number, hx: number, hy: number, r: number) {
  const ix = hx - r, iy = hy - r, arc = Math.PI / 2 * r
  const quarter = ix + iy + arc, ax = Math.abs(x), ay = Math.abs(y)
  let s = ax - ix > 0 && ay - iy > 0
    ? iy + Math.atan2(ay - iy, ax - ix) * r
    : ax - ix > ay - iy ? Math.min(ay, iy) : iy + arc + ix - Math.min(ax, ix)
  if (x < 0) s = y >= 0 ? 2 * quarter - s : 2 * quarter + s
  else if (y < 0) s = 4 * quarter - s
  return wrap(s / Math.max(4 * quarter, .0001))
}
function rimPoint(position: number, hx: number, hy: number, r: number) {
  const ix = hx - r, iy = hy - r, arc = Math.PI / 2 * r, q = ix + iy + arc
  let s = wrap(position) * 4 * q, sx = 1, sy = 1
  if (s > 3 * q) { s = 4 * q - s; sy = -1 }
  else if (s > 2 * q) { s -= 2 * q; sx = -1; sy = -1 }
  else if (s > q) { s = 2 * q - s; sx = -1 }
  let x = ix - (s - iy - arc), y = hy
  if (s <= iy) { x = hx; y = s }
  else if (s <= iy + arc) { const a = (s - iy) / r; x = ix + Math.cos(a) * r; y = iy + Math.sin(a) * r }
  return [x * sx, y * sy]
}

export function SpecularButton({ children, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const anchor = anchorRef.current!, canvas = canvasRef.current!
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false })
    if (!gl) return
    const shaders: WebGLShader[] = []
    const program = gl.createProgram()
    if (!program) return
    for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
      const shader = gl.createShader(type)
      if (!shader) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return }
      gl.shaderSource(shader, source); gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader); shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return
      }
      shaders.push(shader); gl.attachShader(program, shader)
    }
    gl.bindAttribLocation(program, 0, 'aPosition'); gl.linkProgram(program)
    shaders.forEach(s => gl.deleteShader(s))
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return }
    const names = ['uCenter', 'uHalf', 'uRadius', 'uPx', 'uSpot', 'uEntry', 'uLineColor', 'uBaseColor', 'uIntensity', 'uWindow', 'uThickness', 'uGlow']
    const u = Object.fromEntries(names.map(n => [n, gl.getUniformLocation(program, n)]))
    const buffer = gl.createBuffer(), vao = gl.createVertexArray()
    gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let w = 1, h = 1, ratio = 1, raf = 0, last = 0, visible = true, focused = false
    let pointer: { x: number; y: number } | null = null
    let spot = .4, level = .25, press = 0
    const rest = () => loopPosition(-w / 2 + h / 2 * (1 - Math.SQRT1_2), h / 2 * Math.SQRT1_2, w / 2, h / 2, h / 2)
    const draw = () => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(program)
      gl.uniform2f(u.uCenter, (PAD + w / 2) * ratio, (PAD + h / 2) * ratio)
      gl.uniform2f(u.uHalf, w / 2 * ratio, h / 2 * ratio)
      gl.uniform1f(u.uRadius, h / 2 * ratio); gl.uniform1f(u.uPx, ratio)
      gl.uniform1f(u.uSpot, spot)
      const [x, y] = rimPoint(spot, w / 2, h / 2, h / 2)
      gl.uniform2f(u.uEntry, x * .9 * ratio, y * .9 * ratio)
      gl.uniform3f(u.uLineColor, 1, .906, .8)
      gl.uniform3f(u.uBaseColor, .87, .416, .16)
      gl.uniform1f(u.uIntensity, .95 * (level + press * .5))
      gl.uniform2f(u.uWindow, 10 / 360 + press * .04, 34 / 360)
      gl.uniform1f(u.uThickness, 1.2); gl.uniform1f(u.uGlow, .35)
      gl.bindVertexArray(vao); gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const tick = (now: number) => {
      raf = 0
      if (!visible || document.hidden || gl.isContextLost()) return
      const dt = last ? Math.min(.05, (now - last) / 1000) : 1 / 60
      last = now
      let target = rest(), near = focused ? 1 : 0
      if (pointer && !reduced.matches) {
        const rect = anchor.getBoundingClientRect(), scale = rect.width / w || 1
        const x = (pointer.x - rect.left - rect.width / 2) / scale
        const y = (rect.top + rect.height / 2 - pointer.y) / scale
        const distance = Math.hypot(Math.max(Math.abs(x) - w / 2, 0), Math.max(Math.abs(y) - h / 2, 0))
        const t = Math.max(0, 1 - distance / 250)
        near = Math.max(near, t * t * (3 - 2 * t))
        if (t > 0) target = loopPosition(x, y, w / 2, h / 2, h / 2)
      }
      let diff = target - spot; diff -= Math.round(diff)
      const targetLevel = .25 + .75 * near
      if (reduced.matches) { spot = target; level = targetLevel; press = 0 }
      else {
        spot = wrap(spot + diff * (1 - Math.exp(-dt * 8)))
        level += (targetLevel - level) * (1 - Math.exp(-dt * 7))
        press *= Math.exp(-dt * 5)
      }
      draw()
      if (!reduced.matches && (Math.abs(diff) > .0002 || Math.abs(targetLevel - level) > .001 || press > .002)) raf = requestAnimationFrame(tick)
      else last = 0
    }
    const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0; last = 0 }
    const measure = () => {
      w = Math.max(1, anchor.offsetWidth); h = Math.max(1, anchor.offsetHeight)
      ratio = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round((w + 2 * PAD) * ratio); canvas.height = Math.round((h + 2 * PAD) * ratio)
      wake()
    }
    const move = (e: PointerEvent) => { if (e.pointerType !== 'mouse' || reduced.matches || !visible || document.hidden) return; pointer = { x: e.clientX, y: e.clientY }; wake() }
    const leave = () => { pointer = null; wake() }
    const down = () => { if (!reduced.matches) press = 1; wake() }
    const focus = () => { focused = true; wake() }
    const blur = () => { focused = false; wake() }
    const visibility = () => { if (document.hidden) { stop(); pointer = null } else wake() }
    const contextLost = (e: Event) => { e.preventDefault(); stop(); anchor.dataset.specular = 'fallback' }
    const resize = new ResizeObserver(measure)
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) wake(); else { stop(); pointer = null } })
    resize.observe(anchor); intersection.observe(anchor)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', leave, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', visibility)
    anchor.addEventListener('pointerdown', down); anchor.addEventListener('focus', focus); anchor.addEventListener('blur', blur)
    reduced.addEventListener('change', leave); canvas.addEventListener('webglcontextlost', contextLost)
    anchor.dataset.specular = 'webgl'; measure()
    return () => {
      stop(); resize.disconnect(); intersection.disconnect()
      window.removeEventListener('pointermove', move); window.removeEventListener('scroll', leave)
      document.documentElement.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', visibility)
      anchor.removeEventListener('pointerdown', down); anchor.removeEventListener('focus', focus); anchor.removeEventListener('blur', blur)
      reduced.removeEventListener('change', leave); canvas.removeEventListener('webglcontextlost', contextLost)
      anchor.dataset.specular = 'fallback'
      gl.deleteBuffer(buffer); gl.deleteVertexArray(vao); gl.deleteProgram(program)
      // Keep the canvas context reusable during React StrictMode effect replay.
    }
  }, [])
  return <a {...props} ref={anchorRef} className={`specular-button ${className}`} data-specular="fallback">
    <canvas ref={canvasRef} className="specular-button__light" aria-hidden="true" />
    <span className="specular-button__label">{children}</span>
  </a>
}

