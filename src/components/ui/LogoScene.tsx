"use client";

/**
 * LogoScene — a cinematic 3D rendering of the OperPath "op" monogram.
 *
 * Aesthetic target: glossy chrome sculpture floating in a warm-navy night
 * sky, lit from below by an ember point light and from above-right by a
 * cool mint rim — matching the landing page's SigmaAi-inspired palette.
 *
 * Approach: two torus geometries (the "o" and the head of the "p") plus
 * a short cylinder (the descender of the "p"), grouped into a single
 * monogram. This reproduces the geometric / industrial feel of the 2D
 * logo far more faithfully than extruded text would, and it responds to
 * lighting the way a chromed metal object should.
 */

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

// ────────────────────────────────────────────────────────────────────────────
// Monogram geometry
// ────────────────────────────────────────────────────────────────────────────

type MonogramProps = {
  /** Reduces tessellation for small screens. */
  isMobile: boolean;
  /** Honors prefers-reduced-motion. */
  reduceMotion: boolean;
};

/**
 * The "op" mark.
 *
 * Coordinate convention:
 * - The two rings sit in the XY plane; tube points along +Z.
 * - "o" is centered at (-R, 0, 0), "p" head at (+R * 0.9, 0, 0),
 *   slight overlap so the shapes link the way the real logo does.
 */
function Monogram({ isMobile, reduceMotion }: MonogramProps) {
  const group = useRef<THREE.Group>(null);

  // Geometry parameters. Ring radius (R) is the outer edge of each glyph
  // circle; tube is thickness. Segments dropped on mobile for framerate.
  const R = 1.0;
  const tube = 0.32;
  const radialSeg = isMobile ? 24 : 48;
  const tubularSeg = isMobile ? 96 : 160;

  // Shared chrome material — dark base, high metalness, low roughness,
  // physical clearcoat gives the wet-chrome highlight seen in the PNG.
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#424852"), // medium graphite — picks up light better without env map
        metalness: 0.92,
        roughness: 0.22,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      }),
    []
  );

  // Position constants. Slight overlap (0.85 * 2R rather than 2R) makes
  // the two glyphs visually link, echoing the logo's ∞-like loop.
  const oCenter: [number, number, number] = [-R * 0.85, 0, 0];
  const pCenter: [number, number, number] = [R * 0.85, 0, 0];

  // The "p" has a descender — a short rounded bar hanging below the ring.
  const descenderHeight = R * 1.15;
  const descenderCenter: [number, number, number] = [
    pCenter[0] + R - tube / 2, // flush with the right edge of the p's ring
    -R - descenderHeight / 2 + tube / 2, // hangs below the ring
    0,
  ];

  // Rotation + float. Skipped if the user prefers reduced motion.
  useFrame((_state, delta) => {
    if (!group.current || reduceMotion) return;
    // 20 s per full revolution → 2π / 20 rad/s.
    group.current.rotation.y += (Math.PI * 2 * delta) / 20;
    // Gentle float: ±0.05, 6 s cycle.
    const t = performance.now() / 1000;
    group.current.position.y = Math.sin((t * Math.PI * 2) / 6) * 0.05;
  });

  return (
    <group ref={group}>
      {/* "o" — a full torus */}
      <mesh
        position={oCenter}
        material={chromeMaterial}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[R, tube, radialSeg, tubularSeg]} />
      </mesh>

      {/* "p" head — another full torus, offset to the right */}
      <mesh
        position={pCenter}
        material={chromeMaterial}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[R, tube, radialSeg, tubularSeg]} />
      </mesh>

      {/* "p" descender — a vertical rounded capsule-ish cylinder.
          Three.js has no built-in capsule with end caps that we control
          precisely, so we use a cylinder and hide the caps inside the
          torus / scene. It reads correctly at normal viewing angles. */}
      <mesh
        position={descenderCenter}
        material={chromeMaterial}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[
            tube / 2, // radiusTop
            tube / 2, // radiusBottom
            descenderHeight, // height
            isMobile ? 16 : 32, // radialSegments
            1,
            false,
          ]}
        />
      </mesh>

      {/* Rounded cap at the bottom of the descender */}
      <mesh
        position={[
          descenderCenter[0],
          descenderCenter[1] - descenderHeight / 2,
          descenderCenter[2],
        ]}
        material={chromeMaterial}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[tube / 2, isMobile ? 16 : 32, isMobile ? 12 : 24]} />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Scene wrapper (camera, lights, env, animated mount)
// ────────────────────────────────────────────────────────────────────────────

type SceneProps = {
  isMobile: boolean;
  reduceMotion: boolean;
};

/**
 * MountScaler — animates the group from scale 0.9 → 1.0 on mount with
 * a gentle elastic ease over ~1.8 s. Runs once; respects reduced motion.
 */
function MountScaler({
  reduceMotion,
  children,
}: {
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const startRef = useRef<number | null>(null);
  const duration = 1.8; // seconds

  useFrame(() => {
    if (!ref.current) return;
    if (reduceMotion) {
      ref.current.scale.setScalar(1);
      return;
    }
    if (startRef.current == null) startRef.current = performance.now() / 1000;
    const t = Math.min(1, (performance.now() / 1000 - startRef.current) / duration);
    // Soft elastic-out: overshoot a hair at ~0.7, settle to 1.
    // Formula chosen for a subtle "breathe in" rather than a bounce.
    const eased =
      t < 1
        ? 1 - Math.pow(1 - t, 3) + Math.sin(t * Math.PI * 2) * 0.015 * (1 - t)
        : 1;
    const s = 0.9 + 0.1 * eased;
    ref.current.scale.setScalar(s);
  });

  return <group ref={ref}>{children}</group>;
}

function Scene({ isMobile, reduceMotion }: SceneProps) {
  return (
    <>
      {/* Low ambient so fill light pulls cleanly out of the dark sky */}
      <ambientLight intensity={0.15} />

      {/* Warm ember key light from below-front — matches the ember ground glow */}
      <pointLight
        position={[0, -2.2, 2.2]}
        color="#ff7a3c"
        intensity={3.2}
        distance={14}
        decay={2}
      />

      {/* Secondary ember fill, warmer and further out */}
      <pointLight
        position={[-1.5, -0.6, 3]}
        color="#e85a1f"
        intensity={1.4}
        distance={10}
        decay={2}
      />

      {/* Cool celadon rim from upper-right — blueprint tint on chrome edges */}
      <directionalLight
        position={[3.5, 3.5, 2]}
        color="#9db8a6"
        intensity={1.4}
      />

      {/* Cream top light for the top specular highlight */}
      <directionalLight
        position={[0, 5, 3]}
        color="#ede2cc"
        intensity={0.8}
      />

      {/* Back rim — teal, pulls the silhouette from the navy sky */}
      <directionalLight
        position={[-2, 0.5, -3]}
        color="#5a7880"
        intensity={0.7}
      />

      <Suspense fallback={null}>
        <MountScaler reduceMotion={reduceMotion}>
          <Monogram isMobile={isMobile} reduceMotion={reduceMotion} />
        </MountScaler>
      </Suspense>

      {/* Soft contact shadow — skipped on mobile to save fillrate */}
      {!isMobile && (
        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.32}
          scale={8}
          blur={2.6}
          far={4}
          color="#000000"
        />
      )}
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Public component
// ────────────────────────────────────────────────────────────────────────────

export type LogoSceneProps = {
  className?: string;
};

/**
 * Full-bleed 3D logo canvas. Fills its parent (parent must have a
 * defined height). Transparent background — the starfield / gradient
 * behind the parent shows through.
 */
export function LogoScene({ className }: LogoSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;

  // SSR-safe mobile check. The Canvas mounts client-side, so this
  // evaluates at render time in the browser.
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        // Transparent backing buffer so the parent's atmospheric
        // backdrop (gradient + starfield) shows through.
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        // Scene background must be null (not a color) for true transparency.
        onCreated={({ scene }) => {
          scene.background = null;
        }}
      >
        <Scene isMobile={isMobile} reduceMotion={reduceMotion} />
      </Canvas>
    </motion.div>
  );
}

export default LogoScene;
