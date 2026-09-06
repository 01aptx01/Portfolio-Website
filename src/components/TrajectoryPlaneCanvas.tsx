"use client";

import React, { useEffect, useRef, useState } from "react";

// Exact 1152-byte Base64 Mesh Buffer from Trajectory.ai
const MESH_BASE64 =
  "KgAmACUAKQAkACIAJgAhAB8AKAAeABwAGQAbABgAJwAZABcAJgAfACUAJAAjACIAIQAgAB8AHgAdABwAGwAaABgAGQAYABcAFgALABUAFAAKABMAEgAJABEACAAHAAYABQAQAA0ABAAPAA4AAwANAAwAAQACAAAAAAAAACqSmj8AAGDA7FRlv2ZA2777VPO9AAAAAG79N74AAMA/7FRlv2ZA2777VPO9C8QpvyqSmj8AAMA/7FRlv2ZA2777VPO9Eab+vyqSmj8AAMA/AAAAAAAAgL8AAAAAC8QpPyqSmj8AAMA/7FRlP2ZA2777VPO9Eab+PyqSmj8AAMA/AAAAAAAAgL8AAAAAAAAAAFGrnz+mw1/AxaFmP6ci1j4cg+09AAAAAF2FEL5tXsE/xaFmP6ci1j4cg+097ewjvznCnj8mY8A/xaFmP6ci1j4cg+09Eab+v+Kwnz8AAMA/biGwO+r+fz/QNwk77ewjPznCnj8mY8A/xaFmv6ci1j4cg+09Eab+P+Kwnz8AAMA/biGwu+r+fz/QNwk7C8QpvyqSmj8AAMA/AAAAAAAAgL8AAAAAAAAAACqSmj8AAGDAAAAAAAAAgL8AAAAAAAAAACqSmj8AAGDA7FRlP2ZA2777VPO9AAAAAG79N74AAMA/7FRlP2ZA2777VPO9C8QpPyqSmj8AAMA/AAAAAAAAgL8AAAAA7ewjvznCnj8mY8A/biGwO+r+fz/QNwk7AAAAAFGrnz+mw1/AbiGwO+r+fz/QNwk7AAAAAFGrnz+mw1/AxaFmv6ci1j4cg+09AAAAAF2FEL5tXsE/xaFmv6ci1j4cg+09AAAAAFGrnz+mw1/AbiGwu+r+fz/QNwk77ewjPznCnj8mY8A/biGwu+r+fz/QNwk7AAAAAG79N74AAMA/GsGavlWiDb6QcXE/C8QpvyqSmj8AAMA/lbLdvBt3Lr2ArH8/7ewjvznCnj8mY8A/N0xPvgdr/L2/tHg/Eab+vyqSmj8AAMA/AAAAAAAAAAAAAIA/Eab+v+Kwnz8AAMA/TSGwuo3VOL0wvX8/Eab+vyqSmj8AAMA/OtFtv9rGizwjUL2+AAAAACqSmj8AAGDAiLltvyToCz35K72+AAAAAFGrnz+mw1/AOtFtv9rGizwjUL2+C8QpPyqSmj8AAMA/5DdJPtxa/L3WBHk/AAAAAG79N74AAMA/G+z5Pgnqbr5JTFc/AAAAAF2FEL5tXsE/gdWWPlGkDL5lGXI/AAAAACqSmj8AAGDAM9FtP18IjDwdUL2+Eab+PyqSmj8AAMA/59xtPwAAAAAVSb2+Eab+P+Kwnz8AAMA/M9FtP18IjDwdUL2+Eab+PyqSmj8AAMA/RV2POkTOPL1Nun8/7ewjPznCnj8mY8A/TwnsPLOmK70yq38/AAAAAF2FEL5tXsE/BNABv77xa76QnVQ/Eab+v+Kwnz8AAMA/ItdtvwAAAAAOZr2+AAAAAFGrnz+mw1/AAbNtP64IDD1wTL2+Eab+P+Kwnz8AAMA/hmkROwAAAADY/38/";

function decodeMeshBuffer(b64: string): ArrayBuffer {
  if (typeof window === "undefined") {
    const buf = Buffer.from(b64, "base64");
    const ab = new ArrayBuffer(buf.length);
    const u8 = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) u8[i] = buf[i];
    return ab;
  }
  const bin = window.atob(b64);
  const buf = new ArrayBuffer(bin.length);
  const u8 = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return buf;
}

const rawBuffer = decodeMeshBuffer(MESH_BASE64);
const indices = new Uint16Array(rawBuffer, 0, 60);
const vertices = new Float32Array(rawBuffer, 120, 258);

let minX = Infinity, maxX = -Infinity,
    minY = Infinity, maxY = -Infinity,
    minZ = Infinity, maxZ = -Infinity;

for (let i = 0; i < 43; i++) {
  const x = vertices[6 * i + 0];
  const y = vertices[6 * i + 1];
  const z = vertices[6 * i + 2];
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
  if (z < minZ) minZ = z;
  if (z > maxZ) maxZ = z;
}

const center = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];
const maxSpan = Math.max(maxX - minX, maxY - minY, maxZ - minZ);

let tailIndex = 0;
let maxZVal = -Infinity;
for (let i = 0; i < 43; i++) {
  const z = vertices[6 * i + 2];
  if (z > maxZVal) {
    maxZVal = z;
    tailIndex = i;
  }
}

// Exact Trajectory Matrix Operations
const F = {
  identity() {
    const e = new Float32Array(16);
    e[0] = e[5] = e[10] = e[15] = 1;
    return e;
  },
  perspective(e: Float32Array, t: number, a: number, r: number, n: number) {
    const i = 1 / Math.tan(t / 2), s = 1 / (r - n);
    e[0] = i / a; e[1] = 0; e[2] = 0; e[3] = 0;
    e[4] = 0; e[5] = i; e[6] = 0; e[7] = 0;
    e[8] = 0; e[9] = 0; e[10] = (n + r) * s; e[11] = -1;
    e[12] = 0; e[13] = 0; e[14] = 2 * n * r * s; e[15] = 0;
    return e;
  },
  multiply(e: Float32Array, t: Float32Array, a: Float32Array) {
    const r = t[0], n = t[1], i = t[2], s = t[3],
          l = t[4], o = t[5], c = t[6], d = t[7],
          u = t[8], m = t[9], h = t[10], p = t[11],
          f = t[12], g = t[13], x = t[14], v = t[15];
    let y = a[0], w = a[1], A = a[2], b = a[3];
    e[0] = y*r + w*l + A*u + b*f;
    e[1] = y*n + w*o + A*m + b*g;
    e[2] = y*i + w*c + A*h + b*x;
    e[3] = y*s + w*d + A*p + b*v;
    y = a[4]; w = a[5]; A = a[6]; b = a[7];
    e[4] = y*r + w*l + A*u + b*f;
    e[5] = y*n + w*o + A*m + b*g;
    e[6] = y*i + w*c + A*h + b*x;
    e[7] = y*s + w*d + A*p + b*v;
    y = a[8]; w = a[9]; A = a[10]; b = a[11];
    e[8] = y*r + w*l + A*u + b*f;
    e[9] = y*n + w*o + A*m + b*g;
    e[10] = y*i + w*c + A*h + b*x;
    e[11] = y*s + w*d + A*p + b*v;
    y = a[12]; w = a[13]; A = a[14]; b = a[15];
    e[12] = y*r + w*l + A*u + b*f;
    e[13] = y*n + w*o + A*m + b*g;
    e[14] = y*i + w*c + A*h + b*x;
    e[15] = y*s + w*d + A*p + b*v;
    return e;
  },
  translation(e: Float32Array, t: number, a: number, r: number) {
    e[0]=1; e[1]=0; e[2]=0; e[3]=0;
    e[4]=0; e[5]=1; e[6]=0; e[7]=0;
    e[8]=0; e[9]=0; e[10]=1; e[11]=0;
    e[12]=t; e[13]=a; e[14]=r; e[15]=1;
    return e;
  },
  rotationY(e: Float32Array, t: number) {
    const a = Math.cos(t), r = Math.sin(t);
    e[0]=a; e[1]=0; e[2]=-r; e[3]=0;
    e[4]=0; e[5]=1; e[6]=0; e[7]=0;
    e[8]=r; e[9]=0; e[10]=a; e[11]=0;
    e[12]=0; e[13]=0; e[14]=0; e[15]=1;
    return e;
  },
  rotationX(e: Float32Array, t: number) {
    const a = Math.cos(t), r = Math.sin(t);
    e[0]=1; e[1]=0; e[2]=0; e[3]=0;
    e[4]=0; e[5]=a; e[6]=r; e[7]=0;
    e[8]=0; e[9]=-r; e[10]=a; e[11]=0;
    e[12]=0; e[13]=0; e[14]=0; e[15]=1;
    return e;
  },
  rotationZ(e: Float32Array, t: number) {
    const a = Math.cos(t), r = Math.sin(t);
    e[0]=a; e[1]=r; e[2]=0; e[3]=0;
    e[4]=-r; e[5]=a; e[6]=0; e[7]=0;
    e[8]=0; e[9]=0; e[10]=1; e[11]=0;
    e[12]=0; e[13]=0; e[14]=0; e[15]=1;
    return e;
  },
  scale(e: Float32Array, t: number, a: number, r: number) {
    e[0]=t; e[1]=0; e[2]=0; e[3]=0;
    e[4]=0; e[5]=a; e[6]=0; e[7]=0;
    e[8]=0; e[9]=0; e[10]=r; e[11]=0;
    e[12]=0; e[13]=0; e[14]=0; e[15]=1;
    return e;
  },
  lookAt(e: Float32Array, t: number[], a: number[], r: number[]) {
    const n = t[0], i = t[1], s = t[2];
    let l = n - a[0], o = i - a[1], c = s - a[2];
    let d = 1 / Math.hypot(l, o, c);
    l *= d; o *= d; c *= d;
    let u = r[1]*c - r[2]*o, m = r[2]*l - r[0]*c, h = r[0]*o - r[1]*l;
    d = 1 / Math.hypot(u, m, h);
    u *= d; m *= d;
    const p = o * (h *= d) - c * m,
          f = c * u - l * h,
          g = l * m - o * u;
    e[0]=u; e[1]=p; e[2]=l; e[3]=0;
    e[4]=m; e[5]=f; e[6]=o; e[7]=0;
    e[8]=h; e[9]=g; e[10]=c; e[11]=0;
    e[12]=-(u*n + m*i + h*s);
    e[13]=-(p*n + f*i + g*s);
    e[14]=-(l*n + o*i + c*s);
    e[15]=1;
    return e;
  },
};

const VS_SOURCE = `
  attribute vec3 aPos;
  attribute vec3 aNorm;
  uniform mat4 uProj;
  uniform mat4 uView;
  uniform mat4 uModel;
  varying vec3 vNorm;
  varying vec3 vWorld;
  varying vec3 vLocal;
  void main() {
    vec4 wp = uModel * vec4(aPos, 1.0);
    gl_Position = uProj * uView * wp;
    vNorm = mat3(uModel) * aNorm;
    vWorld = wp.xyz;
    vLocal = aPos;
  }
`;

const FS_SOURCE = `
  precision mediump float;
  varying vec3 vNorm;
  varying vec3 vWorld;
  varying vec3 vLocal;
  uniform vec3 uLightDir;
  uniform vec3 uLightColor;
  uniform vec3 uAmbient;
  uniform vec3 uBaseTail;
  uniform vec3 uBaseNose;
  uniform vec2 uBodyZRange;
  uniform vec3 uCamPos;
  uniform vec3 uRimColor;
  void main() {
    vec3 n = normalize(vNorm);
    vec3 L = normalize(uLightDir);
    vec3 V = normalize(uCamPos - vWorld);
    float d = dot(n, L);
    float lit = max(d, 0.0);
    float backlit = max(-d, 0.0);
    float diffuse = lit + backlit * 0.30;
    float g = clamp((vLocal.z - uBodyZRange.x) / (uBodyZRange.y - uBodyZRange.x), 0.0, 1.0);
    vec3 baseColor = mix(uBaseTail, uBaseNose, g);
    vec3 col = baseColor * (uAmbient + uLightColor * diffuse);
    float terminator = pow(1.0 - abs(d), 3.0);
    col += vec3(0.05, 0.035, 0.015) * terminator;
    float fresnel = pow(1.0 - max(abs(dot(n, V)), 0.0), 2.8);
    col += uRimColor * fresnel;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function TrajectoryPlaneCanvas() {
  const canvas3DRef = useRef<HTMLCanvasElement>(null);
  const canvasTrailRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const glCanvas = canvas3DRef.current;
    const trailCanvas = canvasTrailRef.current;
    if (!glCanvas || !trailCanvas) return;

    const gl =
      glCanvas.getContext("webgl", { antialias: true, alpha: true }) ||
      (glCanvas.getContext("experimental-webgl", { antialias: true, alpha: true }) as WebGLRenderingContext);
    if (!gl) {
      setHasError(true);
      return;
    }

    const trailCtx = trailCanvas.getContext("2d", { alpha: true });
    if (!trailCtx) return;

    function compileShader(src: string, type: number): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    }

    const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
    const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const locs = {
      aPos: gl.getAttribLocation(program, "aPos"),
      aNorm: gl.getAttribLocation(program, "aNorm"),
      uProj: gl.getUniformLocation(program, "uProj"),
      uView: gl.getUniformLocation(program, "uView"),
      uModel: gl.getUniformLocation(program, "uModel"),
      uLightDir: gl.getUniformLocation(program, "uLightDir"),
      uLightColor: gl.getUniformLocation(program, "uLightColor"),
      uAmbient: gl.getUniformLocation(program, "uAmbient"),
      uBaseTail: gl.getUniformLocation(program, "uBaseTail"),
      uBaseNose: gl.getUniformLocation(program, "uBaseNose"),
      uBodyZRange: gl.getUniformLocation(program, "uBodyZRange"),
      uCamPos: gl.getUniformLocation(program, "uCamPos"),
      uRimColor: gl.getUniformLocation(program, "uRimColor"),
    };

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Exact Trajectory Constants for Golden Particle Trail Field
    const h = 600, f = 600; // 3D Plane canvas size
    const w = 900, A_dim = 900; // Trail canvas size
    const b_off = -300, N_off = 300; // Trail offset
    const PARTICLE_COUNT = 8000;
    const trailLengthFactor = 0.82;
    const trailSpreadFactor = 0.16;
    const trailSpring = 0.1;
    const trailDamp = 0.82;
    const trailWindStrength = 0.3;
    const trailCursorRadius = 90;
    const trailCursorForce = 50;

    // Calculate tail coordinate in resting pose
    const uCam = [0, 1.95, 9.2];
    const mCam = [0, 0.05, 0];
    const projRest = F.identity();
    const viewRest = F.identity();
    F.perspective(projRest, (32 * Math.PI) / 180, 1.0, 0.1, 100);
    F.lookAt(viewRest, uCam, mCam, [0, 1, 0]);

    const pRest = F.identity();
    F.translation(pRest, -center[0], -center[1], -center[2]);
    const fRest = F.identity(), gRest = F.identity(), xRest = F.identity(), vRest = F.identity(), yRest = F.identity(), wRest = F.identity(), modelRest = F.identity();
    const ORest = 3.6 / maxSpan;
    F.scale(fRest, ORest, ORest, ORest);
    F.multiply(gRest, fRest, pRest);

    const V_rad = Math.PI / 180;
    const bodyAngleRest = -228 * V_rad;
    const barrelRollRest = Math.PI / 2 + 10 * V_rad;
    const yawRest = Math.PI / 2;
    const tiltAwayRest = -55 * V_rad;
    const tiltSideRest = -3 * V_rad;

    F.rotationZ(xRest, barrelRollRest);
    F.multiply(vRest, xRest, gRest);
    F.rotationX(xRest, bodyAngleRest);
    F.multiply(yRest, xRest, vRest);
    F.rotationY(xRest, yawRest);
    F.multiply(wRest, xRest, yRest);
    F.rotationX(xRest, tiltAwayRest);
    F.multiply(vRest, xRest, wRest);
    F.rotationZ(xRest, tiltSideRest);
    F.multiply(yRest, xRest, vRest);
    F.translation(xRest, 0, 0, 0);
    F.multiply(modelRest, xRest, yRest);

    const vpRest = F.identity();
    const mvpRest = F.identity();
    F.multiply(vpRest, projRest, viewRest);
    F.multiply(mvpRest, vpRest, modelRest);

    const txRest = vertices[6 * tailIndex + 0];
    const tyRest = vertices[6 * tailIndex + 1];
    const tzRest = vertices[6 * tailIndex + 2];

    const pwxR = mvpRest[0] * txRest + mvpRest[4] * tyRest + mvpRest[8] * tzRest + mvpRest[12];
    const pwyR = mvpRest[1] * txRest + mvpRest[5] * tyRest + mvpRest[9] * tzRest + mvpRest[13];
    const pwzR = mvpRest[3] * txRest + mvpRest[7] * tyRest + mvpRest[11] * tzRest + mvpRest[15];

    const restingTailX = (pwxR / pwzR + 1) * 0.5 * h;
    const restingTailY = (1 - pwyR / pwzR) * 0.5 * f;

    const ec = -(w / 2) + h / 2 + b_off; // -450 + 300 - 300 = -450
    const ed = -(A_dim / 2) + f / 2 + N_off; // -450 + 300 + 300 = 150
    const originX = restingTailX - ec;
    const originY = restingTailY - ed;

    // Golden stream orientation (225° = down and to the left)
    const eh = (225 * Math.PI) / 180;
    const ep = w * trailLengthFactor;
    const ef = w * trailSpreadFactor;
    const eg = Math.cos(eh);
    const ex = -Math.sin(eh);
    const ev = -ex;

    const trailRestX = new Float32Array(PARTICLE_COUNT);
    const trailRestY = new Float32Array(PARTICLE_COUNT);
    const trailCurrX = new Float32Array(PARTICLE_COUNT);
    const trailCurrY = new Float32Array(PARTICLE_COUNT);
    const trailVelX = new Float32Array(PARTICLE_COUNT);
    const trailVelY = new Float32Array(PARTICLE_COUNT);
    const trailR = new Uint8ClampedArray(PARTICLE_COUNT);
    const trailG = new Uint8ClampedArray(PARTICLE_COUNT);
    const trailB = new Uint8ClampedArray(PARTICLE_COUNT);
    const trailA = new Uint8ClampedArray(PARTICLE_COUNT);
    const trailSizes = new Float32Array(PARTICLE_COUNT);
    const trailSpeedWeights = new Float32Array(PARTICLE_COUNT);
    const trailSwirl = new Float32Array(PARTICLE_COUNT);

    let particleCount = 0;
    let attempts = 0;
    const maxAttempts = 4 * PARTICLE_COUNT;

    while (particleCount < PARTICLE_COUNT && attempts < maxAttempts) {
      attempts++;
      const e = Math.pow(Math.random(), 0.55);
      const t = e * ep;
      const a = Math.pow(e, 0.5) * (1 - 0.15 * Math.pow(e, 4)) * ef;
      const r = Math.sqrt(-2 * Math.log(Math.random() || 0.001)) * Math.cos(2 * Math.PI * Math.random()) * a * 0.45;
      const nx = originX + eg * t + ev * r;
      const ny = originY + ex * t + eg * r;
      if (nx < 0 || nx >= w || ny < 0 || ny >= A_dim) continue;

      const s = Math.min(1, Math.abs(r) / (a + 0.1));
      const l = 0.12 * Math.random();
      const o = 255 + (232 - 255) * s * 0.7 + 20 * l;
      const c = 223 + (168 - 223) * s * 0.7 + 8 * l;
      const d = 120 + (88 - 120) * s * 0.7 - 8 * l;
      const u = Math.max(0, Math.min(255, 255 * (1 - Math.pow(e, 1.8)) * (1 - Math.pow(s, 1.5)) * (0.55 + 0.45 * Math.random())));
      if (u < 10) continue;

      trailRestX[particleCount] = nx;
      trailRestY[particleCount] = ny;
      trailCurrX[particleCount] = nx;
      trailCurrY[particleCount] = ny;
      trailR[particleCount] = Math.min(255, Math.max(0, o));
      trailG[particleCount] = Math.min(255, Math.max(0, c));
      trailB[particleCount] = Math.min(255, Math.max(0, d));
      trailA[particleCount] = u;

      const m = e < 0.6 ? 1 : 1 - ((e - 0.6) / 0.4) * 0.4;
      trailSizes[particleCount] = (1.4 + 0.9 * Math.random()) * m;
      trailSpeedWeights[particleCount] = 0.55 + 0.9 * Math.random();
      trailSwirl[particleCount] = (Math.random() - 0.5) * 0.3;
      particleCount++;
    }

    let mouseX = 0, mouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let rawMouseClientX = -9999, rawMouseClientY = -9999;
    let hasMouseMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      rawMouseClientX = e.clientX;
      rawMouseClientY = e.clientY;
      hasMouseMoved = true;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animId = 0;
    let lastTime = performance.now() / 1000;
    let prevOffsetX = 0, prevOffsetY = 0;
    let lastCursorPlaneX = -9999, lastCursorPlaneY = -9999;

    // Scratchpad matrices for render loop
    const cProj = F.identity();
    const dView = F.identity();
    const pOrigin = F.identity();
    F.translation(pOrigin, -center[0], -center[1], -center[2]);
    const fMat = F.identity(), gMat = F.identity(), xMat = F.identity(), vMat = F.identity(), yMat = F.identity(), wMat = F.identity(), AMat = F.identity();
    const camPos = [0, 1.95, 9.2];
    const camTarget = [0, 0.05, 0];

    const render = () => {
      const now = performance.now() / 1000;
      let dt = now - lastTime;
      if (dt > 0.05) dt = 0.05;
      lastTime = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // WebGL Canvas DPI Sizing (600x600 fixed coordinate system)
      const glTargetW = 600 * dpr;
      const glTargetH = 600 * dpr;
      if (glCanvas.width !== glTargetW || glCanvas.height !== glTargetH) {
        glCanvas.width = glTargetW;
        glCanvas.height = glTargetH;
        gl.viewport(0, 0, glTargetW, glTargetH);
      }

      // Trail Canvas DPI Sizing (900x900 fixed coordinate system)
      const trailTargetW = 900 * dpr;
      const trailTargetH = 900 * dpr;
      if (trailCanvas.width !== trailTargetW || trailCanvas.height !== trailTargetH) {
        trailCanvas.width = trailTargetW;
        trailCanvas.height = trailTargetH;
      }

      // Smooth mouse interpolation
      const smoothFactor = 1 - Math.pow(0.001, dt);
      smoothMouseX += (mouseX - smoothMouseX) * smoothFactor;
      smoothMouseY += (mouseY - smoothMouseY) * smoothFactor;

      F.perspective(cProj, (32 * Math.PI) / 180, 1.0, 0.1, 100);
      F.lookAt(dView, camPos, camTarget, [0, 1, 0]);

      const O_scale = 3.6 / maxSpan;
      F.scale(fMat, O_scale, O_scale, O_scale);
      F.multiply(gMat, fMat, pOrigin);

      const V = Math.PI / 180;
      const U = 1.0;
      const W = 0.1 * Math.sin(1.6 * now) * U;
      const q = 0.05 * Math.sin(0.9 * now + 1.2) * U;
      const G = smoothMouseX;
      const H = -smoothMouseY;
      const bodyAngle = -228 * V + 0.025 * Math.sin(1.2 * now + 0.7) * U + 2 * V * H;
      const barrelRoll = Math.PI / 2 + 10 * V + 0.04 * Math.sin(0.8 * now) * U + 0.025 * G;
      const yaw = Math.PI / 2 + 0.02 * Math.sin(0.5 * now + 0.3) * U + 3 * V * G;
      const tiltAway = -55 * V;
      const tiltSide = -3 * V;

      F.rotationZ(xMat, barrelRoll);
      F.multiply(vMat, xMat, gMat);
      F.rotationX(xMat, bodyAngle);
      F.multiply(yMat, xMat, vMat);
      F.rotationY(xMat, yaw);
      F.multiply(wMat, xMat, yMat);
      F.rotationX(xMat, tiltAway);
      F.multiply(vMat, xMat, wMat);
      F.rotationZ(xMat, tiltSide);
      F.multiply(yMat, xMat, vMat);
      F.translation(xMat, q, W, 0);
      F.multiply(AMat, xMat, yMat);

      // Render WebGL Plane
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.disable(gl.CULL_FACE);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.enableVertexAttribArray(locs.aPos);
      gl.vertexAttribPointer(locs.aPos, 3, gl.FLOAT, false, 24, 0);
      gl.enableVertexAttribArray(locs.aNorm);
      gl.vertexAttribPointer(locs.aNorm, 3, gl.FLOAT, false, 24, 12);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

      gl.uniformMatrix4fv(locs.uProj, false, cProj);
      gl.uniformMatrix4fv(locs.uView, false, dView);
      gl.uniformMatrix4fv(locs.uModel, false, AMat);

      gl.uniform3f(locs.uLightDir, 0.55, 0.8, 0.45);
      gl.uniform3f(locs.uLightColor, 0.70, 0.57, 0.43);
      gl.uniform3f(locs.uAmbient, 0.55, 0.50, 0.65);
      gl.uniform3f(locs.uBaseTail, 1.0, 0.98, 0.93);
      gl.uniform3f(locs.uBaseNose, 0.99, 0.92, 0.79);
      gl.uniform2f(locs.uBodyZRange, minZ, maxZ);
      gl.uniform3f(locs.uCamPos, camPos[0], camPos[1], camPos[2]);
      gl.uniform3f(locs.uRimColor, 0.42, 0.28, 0.55);

      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      // Calculate Dynamic Tail Screen Position
      const mvpCur = F.identity();
      const vpCur = F.identity();
      F.multiply(vpCur, cProj, dView);
      F.multiply(mvpCur, vpCur, AMat);

      const curTailX = vertices[6 * tailIndex + 0];
      const curTailY = vertices[6 * tailIndex + 1];
      const curTailZ = vertices[6 * tailIndex + 2];

      const pwxC = mvpCur[0] * curTailX + mvpCur[4] * curTailY + mvpCur[8] * curTailZ + mvpCur[12];
      const pwyC = mvpCur[1] * curTailX + mvpCur[5] * curTailY + mvpCur[9] * curTailZ + mvpCur[13];
      const pwzC = mvpCur[3] * curTailX + mvpCur[7] * curTailY + mvpCur[11] * curTailZ + mvpCur[15];

      const screenTailX = (pwxC / pwzC + 1) * 0.5 * h;
      const screenTailY = (1 - pwyC / pwzC) * 0.5 * f;

      // Trajectory 2D Trail Dynamic Transform & Particle Physics
      const viewDir = F.identity();
      F.multiply(viewDir, dView, AMat);
      const angleFlight = Math.atan2(-viewDir[1], viewDir[0]);
      let angleDiff = angleFlight - Math.atan2(-viewRest[1], viewRest[0]);
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
      const angleDeg = (180 / Math.PI) * angleDiff;

      const offsetX = screenTailX - restingTailX;
      const offsetY = screenTailY - restingTailY;
      trailCanvas.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${angleDeg}deg)`;

      const deltaX = offsetX - prevOffsetX;
      const deltaY = offsetY - prevOffsetY;
      prevOffsetX = offsetX;
      prevOffsetY = offsetY;

      // Render 2D Stipple Particles
      trailCtx.setTransform(1, 0, 0, 1, 0, 0);
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trailCtx.globalCompositeOperation = "lighter";

      const trailRect = trailCanvas.getBoundingClientRect();
      let mouseTrailX = -9999, mouseTrailY = -9999;
      let mouseSpeed = 0;

      if (hasMouseMoved && trailRect.width > 0 && trailRect.height > 0) {
        const uX = (rawMouseClientX - trailRect.left) / trailRect.width;
        const uY = (rawMouseClientY - trailRect.top) / trailRect.height;
        mouseTrailX = uX * w;
        mouseTrailY = uY * A_dim;
        if (lastCursorPlaneX > -9000) {
          mouseSpeed = Math.min(1, Math.hypot(mouseTrailX - lastCursorPlaneX, mouseTrailY - lastCursorPlaneY) / 12);
        }
        lastCursorPlaneX = mouseTrailX;
        lastCursorPlaneY = mouseTrailY;
      }

      const TWO_PI = 2 * Math.PI;
      for (let i = 0; i < particleCount; i++) {
        if (deltaX !== 0 || deltaY !== 0) {
          trailVelX[i] += -deltaX * trailWindStrength * trailSpeedWeights[i];
          trailVelY[i] += -deltaY * trailWindStrength * trailSpeedWeights[i];
        }

        if (mouseSpeed > 0) {
          const dx = trailCurrX[i] - mouseTrailX;
          const dy = trailCurrY[i] - mouseTrailY;
          const distSq = dx * dx + dy * dy;
          const rLimit = trailCursorRadius * trailSpeedWeights[i];
          if (distSq < rLimit * rLimit && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / rLimit);
            const impulse = trailCursorForce * force * force * 0.05 * trailSpeedWeights[i] * mouseSpeed;
            trailVelX[i] += (dx / dist + (-dy / dist) * trailSwirl[i]) * impulse;
            trailVelY[i] += (dy / dist + (dx / dist) * trailSwirl[i]) * impulse;
          }
        }

        trailVelX[i] *= trailDamp;
        trailVelY[i] *= trailDamp;
        trailCurrX[i] += trailVelX[i];
        trailCurrY[i] += trailVelY[i];
        trailCurrX[i] += (trailRestX[i] - trailCurrX[i]) * trailSpring;
        trailCurrY[i] += (trailRestY[i] - trailCurrY[i]) * trailSpring;

        const alpha = trailA[i] / 255;
        if (alpha < 0.03) continue;

        trailCtx.fillStyle = `rgba(${trailR[i]}, ${trailG[i]}, ${trailB[i]}, ${alpha})`;
        trailCtx.beginPath();
        trailCtx.arc(trailCurrX[i], trailCurrY[i], trailSizes[i], 0, TWO_PI);
        trailCtx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (hasError) return null;

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        transform: "scale(var(--plane-scale, 0.72))",
        transformOrigin: "center center",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* 2D Golden Stipple Particle Trail Canvas (900x900 placed behind plane) */}
      <canvas
        ref={canvasTrailRef}
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: -450,
          top: 150,
          zIndex: 0,
          pointerEvents: "none",
          transformOrigin: "606px 308px",
        }}
      />
      {/* 3D WebGL Origami Paper Airplane Canvas (600x600 in front) */}
      <canvas
        ref={canvas3DRef}
        style={{
          position: "relative",
          width: 600,
          height: 600,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
