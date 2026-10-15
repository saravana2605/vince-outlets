import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import heroFallback from "@/assets/hero.jpg";

export interface GarmentConfig {
  id: "tshirt" | "longsleeve" | "hoodie";
  indexStr: string;
  name: string;
  shortLabel: string;
  spec: string;
  path: string;
  requiresDraco: boolean;
  defaultRotY: number;
  defaultRotX: number;
  targetScale: number;
}

export const GARMENTS: readonly [GarmentConfig, GarmentConfig, GarmentConfig] = [
  {
    id: "tshirt",
    indexStr: "01",
    name: "OVERSIZED T-SHIRT",
    shortLabel: "01 / T-SHIRT",
    spec: "240+ GSM COMBED COTTON • OVERSIZED DRAPE",
    path: "/models/tshirt.glb",
    requiresDraco: false,
    defaultRotY: (8 * Math.PI) / 180,
    defaultRotX: (2 * Math.PI) / 180,
    targetScale: 1.05,
  },
  {
    id: "longsleeve",
    indexStr: "02",
    name: "LONG SLEEVE TEE",
    shortLabel: "02 / LONG SLEEVE",
    spec: "260 GSM STRUCTURED JERSEY • RIBBED CUFFS",
    path: "/models/longsleeve.glb",
    requiresDraco: false,
    defaultRotY: (8 * Math.PI) / 180,
    defaultRotX: (2 * Math.PI) / 180,
    targetScale: 1.0,
  },
  {
    id: "hoodie",
    indexStr: "03",
    name: "HEAVY FLEECE HOODIE",
    shortLabel: "03 / HOODIE",
    spec: "430 GSM HEAVYWEIGHT FLEECE • STRUCTURED HOOD",
    path: "/models/hoodie.glb",
    requiresDraco: true,
    defaultRotY: (6 * Math.PI) / 180,
    defaultRotX: (3 * Math.PI) / 180,
    targetScale: 0.94,
  },
];

interface Garment3DProps {
  className?: string;
  interactive?: boolean;
  activeGarmentIndex?: number;
  onGarmentChange?: (index: number) => void;
  onLoaded?: () => void;
}

export function Garment3D({
  className = "",
  interactive = true,
  activeGarmentIndex: externalIndex,
  onGarmentChange: externalOnChange,
  onLoaded,
}: Garment3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Sync external index if provided
  useEffect(() => {
    if (externalIndex !== undefined && externalIndex >= 0 && externalIndex < GARMENTS.length) {
      setCurrentIndex(externalIndex);
    }
  }, [externalIndex]);

  // Pointer & physics state
  const pointerState = useRef({
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    tiltVelX: 0,
    tiltVelY: 0,
    isHovered: false,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    userRotX: 0,
    userRotY: 0,
    userRotVelX: 0,
    userRotVelY: 0,
    lastDragX: 0,
    lastDragY: 0,
    isResetting: false,
  });

  const selectGarmentRef = useRef<(idx: number) => void>(() => {});
  const resetViewRef = useRef<() => void>(() => {});

  // Handle switching garments
  const handleSelectGarment = useCallback(
    (index: number) => {
      const safeIndex = (index + GARMENTS.length) % GARMENTS.length;
      setCurrentIndex(safeIndex);
      setIsPaused(true); // User manual selection pauses auto progression
      externalOnChange?.(safeIndex);
      selectGarmentRef.current(safeIndex);
    },
    [externalOnChange]
  );

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
        stencil: false,
      });
    } catch {
      setLoadError(true);
      setLoading(false);
      return;
    }

    renderer.setClearAlpha(0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.65;

    // Ambient light for rich fabric shadow definition
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Studio Key Light: Warm illumination front-left
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    keyLight.position.set(-2.4, 2.8, 3.2);

    // Vince Outlets Signature Champagne-Gold Rim Light: Back-right shoulder glow
    const goldRimLight = new THREE.DirectionalLight(0xf4d477, 3.2);
    goldRimLight.position.set(2.8, 1.4, -2.2);

    // Soft cool fill light from lower right
    const fillLight = new THREE.DirectionalLight(0xd9e5f2, 1.2);
    fillLight.position.set(2.0, -1.5, 2.5);

    scene.add(keyLight, goldRimLight, fillLight);

    // Two-pivot hierarchy for realistic streetwear tilt & turn
    const rollGroup = new THREE.Group();
    const turnGroup = new THREE.Group();
    rollGroup.add(turnGroup);
    scene.add(rollGroup);

    // Initial stable viewing angle for T-shirt
    turnGroup.rotation.y = GARMENTS[0].defaultRotY;
    rollGroup.rotation.x = GARMENTS[0].defaultRotX;

    // Reset view handler
    resetViewRef.current = () => {
      const p = pointerState.current;
      p.isResetting = true;
      p.userRotVelX = 0;
      p.userRotVelY = 0;
      p.isDragging = false;
    };

    const uLag = { value: 0 };

    // Draco loader configured to public /draco/
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Cache of loaded model groups
    const loadedGroups: (THREE.Group | null)[] = [null, null, null];
    const modelDimensions: { height: number; width: number }[] = [
      { height: 1.58, width: 1.38 },
      { height: 1.70, width: 1.43 },
      { height: 1.90, width: 1.38 },
    ];

    let activeIdx = 0;
    let targetCameraDist = 3.6;
    let isDisposed = false;

    // Setup material for luxury streetwear presentation
    function setupModelMaterials(model: THREE.Group, isHoodie: boolean, height: number) {
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const origMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            const stdMat = origMat as THREE.MeshStandardMaterial;

            if (stdMat.map) {
              stdMat.map.colorSpace = THREE.SRGBColorSpace;
              stdMat.map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
              stdMat.map.needsUpdate = true;
            }

            if (isHoodie) {
              // Tame white emissive blowout in raw hoodie gltf
              if (stdMat.emissive) {
                stdMat.emissive.setHex(0x000000);
              }
              stdMat.roughness = 0.82;
              stdMat.metalness = 0.04;
            } else {
              stdMat.roughness = 0.88;
              stdMat.metalness = 0.04;
            }

            stdMat.side = THREE.DoubleSide;
            stdMat.needsUpdate = true;

            // Organic fabric wave lag shader
            stdMat.onBeforeCompile = (shader) => {
              shader.uniforms["uLag"] = uLag;
              shader.vertexShader = shader.vertexShader
                .replace("#include <common>", `#include <common>\nuniform float uLag;`)
                .replace(
                  "#include <begin_vertex>",
                  `#include <begin_vertex>
                  float _ly = clamp(position.y / ${height.toFixed(4)} + 0.5, 0.0, 1.0);
                  float _a = uLag * (1.0 - _ly) * (1.0 - _ly);
                  transformed.xy = mat2(cos(_a), -sin(_a), sin(_a), cos(_a)) * transformed.xy;`
                );
            };
          }
        }
      });
    }

    // Load individual model into scene
    function loadModel(index: number, onComplete?: () => void) {
      const config = GARMENTS[index];
      if (!config) return;

      gltfLoader.load(
        config.path,
        (gltf) => {
          if (isDisposed) return;
          const model = gltf.scene;

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          const dims = {
            height: Math.max(size.y, 0.001),
            width: Math.max(size.x, 0.001),
          };
          modelDimensions[index] = dims;

          // Center model pivot
          model.position.sub(center);

          setupModelMaterials(model, config.id === "hoodie", dims.height);

          const group = new THREE.Group();
          group.add(model);

          if (index === 0) {
            group.scale.setScalar(config.targetScale);
            group.visible = true;
          } else {
            group.scale.setScalar(config.targetScale * 0.92);
            group.visible = false;
          }

          turnGroup.add(group);
          loadedGroups[index] = group;

          if (onComplete) onComplete();
        },
        undefined,
        (err) => {
          console.warn(`Error loading model ${config.id}:`, err);
          if (index === 0 && !isDisposed) {
            setLoadError(true);
            setLoading(false);
          }
        }
      );
    }

    // Step 1: Prioritize loading T-SHIRT first for instant hero presentation
    loadModel(0, () => {
      setLoading(false);
      handleResize();
      onLoaded?.();

      // Step 2: Progressively load Long Sleeve and Hoodie in the background
      setTimeout(() => {
        if (!isDisposed) {
          loadModel(1, () => {
            if (!isDisposed) {
              loadModel(2);
            }
          });
        }
      }, 400);
    });

    // Dynamic camera framing
    function handleResize() {
      if (!container || !canvas || !renderer) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const activeDims = modelDimensions[activeIdx] ?? modelDimensions[0] ?? { height: 1.5, width: 1.4 };
      const halfFovRad = ((camera.fov / 2) * Math.PI) / 180;
      const distH = (activeDims.height / 2) / (Math.tan(halfFovRad) * 0.85);
      const halfHorizFovRad = Math.atan(Math.tan(halfFovRad) * camera.aspect);
      const distW = (activeDims.width / 2) / (Math.tan(halfHorizFovRad) * 0.85);

      targetCameraDist = Math.max(distH, distW, 2.5);
    }

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    // Select garment handler
    selectGarmentRef.current = (idx: number) => {
      activeIdx = idx;
      handleResize();
      // Reset drag rotation so incoming garment faces beautifully
      const p = pointerState.current;
      p.isResetting = true;
      p.userRotVelX = 0;
      p.userRotVelY = 0;
    };

    // IntersectionObserver: halts rendering when scrolled past the hero section
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab visibility handling
    let isTabActive = !document.hidden;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Render loop with smooth model cross-transitions
    let animId = 0;
    let jig = 0;
    let prevTurnY = GARMENTS[0].defaultRotY;
    const SPRING_K = 0.07;
    const SPRING_D = 0.82;

    function renderLoop(time: number) {
      animId = requestAnimationFrame(renderLoop);

      if (!isVisible || !isTabActive) return;

      const p = pointerState.current;

      // Smooth camera push/pull transition between garments
      camera.position.z += (targetCameraDist - camera.position.z) * 0.08;

      // Smooth crossfade / scale transition between models
      loadedGroups.forEach((group, i) => {
        if (!group) return;
        const config = GARMENTS[i];
        if (!config) return;
        if (i === activeIdx) {
          group.visible = true;
          const currentS = group.scale.x;
          const s = THREE.MathUtils.lerp(currentS, config.targetScale, 0.12);
          group.scale.setScalar(s);
        } else {
          const currentS = group.scale.x;
          const s = THREE.MathUtils.lerp(currentS, config.targetScale * 0.9, 0.16);
          group.scale.setScalar(s);
          if (s < config.targetScale * 0.92) {
            group.visible = false;
          }
        }
      });

      // Smooth return to default viewing angle when reset is triggered
      if (p.isResetting) {
        p.userRotX += (0 - p.userRotX) * 0.12;
        p.userRotY += (0 - p.userRotY) * 0.12;
        p.targetTiltX = 0;
        p.targetTiltY = 0;
        if (Math.abs(p.userRotX) < 0.002 && Math.abs(p.userRotY) < 0.002) {
          p.userRotX = 0;
          p.userRotY = 0;
          p.isResetting = false;
          setHasInteracted(false);
        }
      } else if (!p.isDragging) {
        p.userRotVelX *= 0.88;
        p.userRotVelY *= 0.88;
        p.userRotX += p.userRotVelX;
        p.userRotY += p.userRotVelY;
      }

      // Smooth hover spring tilt
      p.tiltVelX += (p.targetTiltX - p.currentTiltX) * SPRING_K;
      p.tiltVelX *= SPRING_D;
      p.currentTiltX += p.tiltVelX;

      p.tiltVelY += (p.targetTiltY - p.currentTiltY) * SPRING_K;
      p.tiltVelY *= SPRING_D;
      p.currentTiltY += p.tiltVelY;

      // Gentle vertical breath (ZERO continuous 360° rotation)
      const idleY = Math.sin(time / 2600) * 0.012;

      const activeConfig = GARMENTS[activeIdx] ?? GARMENTS[0];
      rollGroup.rotation.x = activeConfig.defaultRotX + p.userRotX + p.currentTiltX;
      rollGroup.rotation.z = -p.currentTiltY * 0.35;
      turnGroup.rotation.y = activeConfig.defaultRotY + p.userRotY + p.currentTiltY;
      rollGroup.position.set(0, idleY, 0);

      // Fabric wave lag
      const currentTurn = turnGroup.rotation.y;
      const turnVel = currentTurn - prevTurnY;
      prevTurnY = currentTurn;

      jig += (((p.tiltVelY + p.tiltVelX) * 4 + turnVel * 1.5) - jig) * 0.18;
      const limit = (18 * Math.PI) / 180;
      uLag.value = limit * Math.tanh((jig * 1.5) / limit);

      renderer.render(scene, camera);
    }

    animId = requestAnimationFrame(renderLoop);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      dracoLoader.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              (m as THREE.MeshStandardMaterial).map?.dispose();
              m.dispose();
            });
          } else if (mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).map?.dispose();
            mesh.material.dispose();
          }
        }
      });
      scene.clear();
    };
  }, [onLoaded]);

  // Gentle auto-progression: switches every 8 seconds when user is not actively interacting
  useEffect(() => {
    if (isPaused || loading || loadError) return;
    const timer = setInterval(() => {
      handleSelectGarment(currentIndex + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, loading, loadError, handleSelectGarment]);

  // Pointer event handlers
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const p = pointerState.current;
      if (p.isDragging) {
        const dx = e.clientX - p.lastDragX;
        const dy = e.clientY - p.lastDragY;
        p.lastDragX = e.clientX;
        p.lastDragY = e.clientY;

        p.userRotVelY = dx * 0.007;
        p.userRotVelX = dy * 0.005;
        p.userRotY += p.userRotVelY;
        p.userRotX = Math.max(-0.4, Math.min(0.4, p.userRotX + p.userRotVelX));

        if (!hasInteracted) setHasInteracted(true);
      } else {
        const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));

        p.targetTiltY = (nx * 10 * Math.PI) / 180;
        p.targetTiltX = (ny * 6 * Math.PI) / 180;
        p.isHovered = true;
      }
    },
    [interactive, hasInteracted]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsPaused(true); // Pause auto-rotation on touch/click
    const p = pointerState.current;
    p.isResetting = false;
    p.isDragging = true;
    p.dragStartX = e.clientX;
    p.dragStartY = e.clientY;
    p.lastDragX = e.clientX;
    p.lastDragY = e.clientY;
    p.userRotVelX = 0;
    p.userRotVelY = 0;
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerState.current.isDragging = false;
  }, []);

  const handlePointerLeave = useCallback(() => {
    const p = pointerState.current;
    p.targetTiltX = 0;
    p.targetTiltY = 0;
    p.isHovered = false;
    p.isDragging = false;
  }, []);

  const activeGarment = GARMENTS[currentIndex] ?? GARMENTS[0];

  if (loadError) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-[#0d1115] ${className}`}
      >
        <img
          src={heroFallback}
          alt="Vince Outlets Heavyweight Streetwear Collection"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
        />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#06080a]/85 px-3 py-1 font-mono text-[10px] tracking-wider text-[#f4d477] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4a62a]" />
          VINCE OUTLETS LUXURY STREETWEAR • 240+ GSM
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className={`relative select-none ${className}`}
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full block cursor-grab active:cursor-grabbing"
      />

      {/* Lightweight Loading State */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#06080a]/75 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#f4d477]">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#d4a62a]" />
            LOADING 3D GARMENT SEQUENCE
          </div>
        </div>
      )}

      {/* Top Interactive Selector Pill Tabs: 01 / T-SHIRT • 02 / LONG SLEEVE • 03 / HOODIE */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {GARMENTS.map((g, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => handleSelectGarment(idx)}
                className={`px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#D4A62A] text-[#04070a] shadow-[0_0_12px_rgba(212,166,42,0.4)]"
                    : "bg-[#06080a]/80 text-[#a3a3a3] hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-md"
                }`}
              >
                {g.shortLabel}
              </button>
            );
          })}
        </div>

        <span className="hidden sm:inline-block font-mono text-[9px] text-[#F4D477] tracking-widest bg-[#06080a]/80 px-2 py-1 rounded-sm border border-white/10 backdrop-blur-md">
          THREE.JS // 3D
        </span>
      </div>

      {/* Subtle Side Navigation Arrows */}
      <button
        type="button"
        aria-label="Previous Garment"
        onClick={() => handleSelectGarment(currentIndex - 1)}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-sm bg-[#06080a]/60 text-white/70 hover:text-white hover:bg-[#06080a]/90 border border-white/10 backdrop-blur-md transition-colors cursor-pointer z-10"
      >
        <span className="font-mono text-sm">‹</span>
      </button>

      <button
        type="button"
        aria-label="Next Garment"
        onClick={() => handleSelectGarment(currentIndex + 1)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-sm bg-[#06080a]/60 text-white/70 hover:text-white hover:bg-[#06080a]/90 border border-white/10 backdrop-blur-md transition-colors cursor-pointer z-10"
      >
        <span className="font-mono text-sm">›</span>
      </button>

      {/* Bottom Information & Control Bar */}
      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-3 pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-sm bg-[#06080a]/85 border border-white/10 px-2.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A]" />
            <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold tracking-wider">
              {activeGarment.name}
            </span>
            <span className="text-white/30 font-mono text-[9px] hidden sm:inline">|</span>
            <span className="font-mono text-[9px] text-[#F4D477] hidden sm:inline">
              {activeGarment.spec}
            </span>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {hasInteracted && (
            <button
              type="button"
              onClick={() => resetViewRef.current()}
              className="rounded-sm border border-white/15 bg-[#06080a]/90 px-2 py-1 font-mono text-[9px] tracking-wider text-[#f4d477] hover:border-[#f4d477] hover:text-white transition-colors uppercase backdrop-blur-md cursor-pointer"
            >
              [ RESET ]
            </button>
          )}
          <span className="font-mono text-[9px] tracking-widest text-[#a3a3a3] uppercase hidden md:inline bg-[#06080a]/80 px-2 py-1 rounded-sm border border-white/10 backdrop-blur-md">
            DRAG TO TURN 360°
          </span>
        </div>
      </div>
    </div>
  );
}
