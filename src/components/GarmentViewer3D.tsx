import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Component,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
export interface GarmentViewer3DProps {
  modelPath: string;
  productName: string;
  requiresDraco?: boolean | undefined;
  selectedColorHex: string;
  defaultScale?: number | undefined;
  defaultRotY?: number | undefined;
  defaultRotX?: number | undefined;
  isHoodie?: boolean | undefined;
  className?: string | undefined;
  fallbackImage?: string | undefined;
}

// Check WebGL availability safely without leaking dummy contexts
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(
      window.WebGLRenderingContext ||
      ("WebGL2RenderingContext" in window && window.WebGL2RenderingContext),
    );
  } catch {
    return false;
  }
}

// Module-level shared Draco loader to avoid spawning duplicate Web Workers
let sharedDracoLoader: DRACOLoader | null = null;
function getSharedDracoLoader(): DRACOLoader {
  if (!sharedDracoLoader) {
    sharedDracoLoader = new DRACOLoader();
    sharedDracoLoader.setDecoderPath("/draco/");
  }
  return sharedDracoLoader;
}

// Module-level model cache to avoid re-fetching or re-decoding 1.5MB GLBs
const modelCache = new Map<string, Promise<THREE.Group>>();

function loadCachedModel(
  modelPath: string,
  requiresDraco: boolean,
): Promise<THREE.Group> {
  const existing = modelCache.get(modelPath);
  if (existing) return existing;

  const promise = new Promise<THREE.Group>((resolve, reject) => {
    const loader = new GLTFLoader();
    if (requiresDraco) {
      try {
        loader.setDRACOLoader(getSharedDracoLoader());
      } catch (e) {
        console.warn("Draco loader initialization warning:", e);
      }
    }

    loader.load(
      modelPath,
      (gltf) => {
        resolve(gltf.scene);
      },
      undefined,
      (error) => {
        console.warn(`Failed to load 3D model ${modelPath}:`, error);
        modelCache.delete(modelPath);
        reject(error);
      },
    );
  });

  modelCache.set(modelPath, promise);
  return promise;
}

// High-fidelity material color calibrator for realistic streetwear garment rendering
export function applyGarmentColor(
  mat: THREE.MeshStandardMaterial,
  hexColor: string,
  isHoodie: boolean,
) {
  const hex = hexColor.toUpperCase();

  if (hex === "#FFFFFF") {
    // Pure White — Crisp streetwear white preserving fabric texture, stitch details and realistic fold shadows
    if (isHoodie) {
      mat.color.setRGB(1.24, 1.26, 1.38);
    } else {
      mat.color.setRGB(1.0, 1.0, 1.0);
    }
  } else if (hex === "#111111") {
    // Jet Black — Deep rich charcoal-black with visible seams, stitching and wrinkle shadows
    mat.color.setRGB(0.068, 0.068, 0.068);
  } else if (hex === "#D71920") {
    // Racing Red — Saturated, bold streetwear red
    if (isHoodie) {
      mat.color.setRGB(0.92, 0.09, 0.12);
    } else {
      mat.color.setRGB(0.88, 0.08, 0.11);
    }
  } else if (hex === "#123B73") {
    // Royal Navy Blue — Deep royal navy with high saturation
    if (isHoodie) {
      mat.color.setRGB(0.08, 0.26, 0.62);
    } else {
      mat.color.setRGB(0.07, 0.24, 0.52);
    }
  } else if (hex === "#F47721") {
    // Vibrant Orange — Punchy, high-energy streetwear orange
    mat.color.setRGB(0.98, 0.45, 0.11);
  } else if (hex === "#A7A9AC") {
    // Heather Grey — Balanced neutral athletic grey
    if (isHoodie) {
      mat.color.setRGB(0.66, 0.68, 0.74);
    } else {
      mat.color.setRGB(0.66, 0.66, 0.68);
    }
  } else {
    mat.color.setStyle(hexColor);
  }

  mat.needsUpdate = true;
}

// Self-contained visual fallback card
export function GarmentFallbackCard({
  productName,
  fallbackImage,
  className = "",
}: {
  productName: string;
  fallbackImage?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-[#06080a] p-6 text-center ${className}`}
    >
      {fallbackImage ? (
        <img
          src={fallbackImage}
          alt={productName}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4A62A]/40 bg-[#0e1418] text-[#F4D477]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
            </svg>
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            {productName}
          </p>
          <span className="font-mono text-[10px] tracking-widest text-[#F4D477] uppercase bg-[#0e1418] border border-[#D4A62A]/30 px-2 py-0.5 rounded-sm">
            3D PRODUCT PREVIEW
          </span>
        </div>
      )}
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#06080a]/90 px-2.5 py-1 font-mono text-[9px] tracking-wider text-[#f4d477] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d4a62a]" />
        {productName} • PUDUCHERRY STUDIO
      </div>
    </div>
  );
}

// Dedicated Error Boundary around 3D viewports to guarantee complete website safety
interface ErrorBoundaryProps {
  children: ReactNode;
  productName: string;
  fallbackImage?: string | undefined;
  className?: string | undefined;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class Viewer3DErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: unknown) {
    console.warn(
      `3D Viewport error caught for ${this.props.productName}:`,
      error,
    );
  }

  override render() {
    if (this.state.hasError) {
      return (
        <GarmentFallbackCard
          productName={this.props.productName}
          fallbackImage={this.props.fallbackImage}
          className={this.props.className}
        />
      );
    }
    return this.props.children;
  }
}

// Inner 3D WebGL Canvas implementation
function GarmentViewer3DInner({
  modelPath,
  productName,
  requiresDraco = false,
  selectedColorHex,
  defaultScale = 1.0,
  defaultRotY = (8 * Math.PI) / 180,
  defaultRotX = (2 * Math.PI) / 180,
  isHoodie = false,
  className = "",
  fallbackImage,
}: GarmentViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Prioritize T-shirt for instant hero presentation, lazy-load Hoodie and Longsleeve
  const isTshirt = modelPath.includes("tshirt");
  const [isNearViewport, setIsNearViewport] = useState(isTshirt);

  const targetMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const resetViewRef = useRef<() => void>(() => {});
  const requestRenderRef = useRef<() => void>(() => {});

  const pointerState = useRef({
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastDragX: 0,
    lastDragY: 0,
    userRotX: 0,
    userRotY: 0,
    userRotVelX: 0,
    userRotVelY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    tiltVelX: 0,
    tiltVelY: 0,
    isHovered: false,
    isResetting: false,
  });

  // Observe viewport proximity so Hoodie and Longsleeve WebGL contexts are only allocated when needed
  useEffect(() => {
    if (isTshirt || isNearViewport) return;
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    const proximityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNearViewport(true);
          proximityObserver.disconnect();
        }
      },
      { rootMargin: "350px 0px" },
    );

    proximityObserver.observe(container);
    return () => proximityObserver.disconnect();
  }, [isTshirt, isNearViewport]);

  // Dynamically apply garment color to fabric materials
  useEffect(() => {
    targetMaterialsRef.current.forEach((mat) => {
      applyGarmentColor(mat, selectedColorHex, isHoodie);
    });
    requestRenderRef.current();
  }, [selectedColorHex, isHoodie]);

  // Main Three.js Scene Setup
  useEffect(() => {
    if (!isNearViewport) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (!isWebGLAvailable()) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    let isDisposed = false;
    let isContextLost = false;
    let renderer: THREE.WebGLRenderer | null = null;

    // Device Pixel Ratio & Mobile detection
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    // On iPhone/mobile devices, limit DPR to 1.5 to protect GPU memory and prevent context loss
    const maxDpr = isCoarse ? 1.5 : 2.0;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isCoarse,
        alpha: true,
        powerPreference: isCoarse ? "default" : "high-performance",
        stencil: false,
        depth: true,
      });
      renderer.setPixelRatio(dpr);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.shadowMap.enabled = false;
    } catch (err) {
      console.warn(
        `Could not initialize WebGL renderer for ${productName}:`,
        err,
      );
      if (!isDisposed) {
        setLoadError(true);
        setLoading(false);
      }
      return;
    }

    // Context loss handler
    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn(
        `WebGL context lost for ${productName}. Switching to high-res preview.`,
      );
      isContextLost = true;
      if (!isDisposed) {
        setLoadError(true);
      }
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.05, 3.2);

    // Studio 4-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.8);
    keyLight.position.set(3.2, 4.2, 3.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf4d477, 2.4);
    rimLight.position.set(-3.5, 2.5, -2.8);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xd9e5f2, 1.3);
    fillLight.position.set(0, -2.5, 2.5);
    scene.add(fillLight);

    // Damped hierarchy for smooth turn & tilt
    const rollGroup = new THREE.Group();
    const turnGroup = new THREE.Group();
    rollGroup.add(turnGroup);
    scene.add(rollGroup);

    turnGroup.rotation.y = defaultRotY;
    rollGroup.rotation.x = defaultRotX;

    resetViewRef.current = () => {
      const p = pointerState.current;
      p.isResetting = true;
      p.userRotVelX = 0;
      p.userRotVelY = 0;
      p.isDragging = false;
    };

    let loadedModel: THREE.Group | null = null;
    let modelHeight = 1.5;
    let modelWidth = 1.4;

    // Load or retrieve model from cache
    loadCachedModel(modelPath, requiresDraco)
      .then((sourceScene) => {
        if (isDisposed || isContextLost) return;

        const model = sourceScene.clone(true);
        loadedModel = model;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        modelHeight = Math.max(size.y, 0.001);
        modelWidth = Math.max(size.x, 0.001);

        model.position.sub(center);

        // Configure and clone materials for independent colour control
        const newMaterials: THREE.MeshStandardMaterial[] = [];

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const origMat = Array.isArray(mesh.material)
                ? mesh.material[0]
                : mesh.material;
              const clonedMat = (origMat as THREE.MeshStandardMaterial).clone();
              mesh.material = clonedMat;
              newMaterials.push(clonedMat);

              if (clonedMat.map) {
                clonedMat.map.colorSpace = THREE.SRGBColorSpace;
                clonedMat.map.needsUpdate = true;
              }

              if (isHoodie) {
                if (clonedMat.emissive) {
                  clonedMat.emissive.setHex(0x000000);
                }
                clonedMat.roughness = 0.82;
                clonedMat.metalness = 0.0;
              } else {
                clonedMat.roughness = 0.86;
                clonedMat.metalness = 0.0;
              }

              applyGarmentColor(clonedMat, selectedColorHex, isHoodie);
              clonedMat.side = THREE.DoubleSide;
              clonedMat.needsUpdate = true;
            }
          }
        });

        targetMaterialsRef.current = newMaterials;
        model.scale.setScalar(defaultScale);
        turnGroup.add(model);

        setLoading(false);
        handleResize();
        requestRenderRef.current();
      })
      .catch((err) => {
        console.warn(`Error loading model for ${productName}:`, err);
        if (!isDisposed) {
          setLoadError(true);
          setLoading(false);
        }
      });

    // Resize math
    function handleResize() {
      if (!container || !canvas || !renderer || isDisposed || isContextLost)
        return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const halfFovRad = ((camera.fov / 2) * Math.PI) / 180;
      const distH = modelHeight / 2 / (Math.tan(halfFovRad) * 0.85);
      const halfHorizFovRad = Math.atan(Math.tan(halfFovRad) * camera.aspect);
      const distW = modelWidth / 2 / (Math.tan(halfHorizFovRad) * 0.85);

      camera.position.z = Math.max(distH, distW, 2.5);
    }

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    // Active-only rendering loop: completely halt rAF when scrolled out of view to preserve mobile battery & GPU
    let isVisible = true;
    let animId = 0;
    const SPRING_K = 0.07;
    const SPRING_D = 0.82;

    function renderLoop(time: number) {
      if (!isVisible || !isTabActive || isContextLost || !renderer) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(renderLoop);

      const p = pointerState.current;

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

      p.tiltVelX += (p.targetTiltX - p.currentTiltX) * SPRING_K;
      p.tiltVelX *= SPRING_D;
      p.currentTiltX += p.tiltVelX;

      p.tiltVelY += (p.targetTiltY - p.currentTiltY) * SPRING_K;
      p.tiltVelY *= SPRING_D;
      p.currentTiltY += p.tiltVelY;

      const idleY = Math.sin(time / 2600) * 0.012;

      rollGroup.rotation.x = defaultRotX + p.userRotX + p.currentTiltX;
      rollGroup.rotation.z = -p.currentTiltY * 0.35;
      turnGroup.rotation.y = defaultRotY + p.userRotY + p.currentTiltY;
      rollGroup.position.set(0, idleY, 0);

      try {
        renderer.render(scene, camera);
      } catch (e) {
        console.warn("Render loop error:", e);
      }
    }

    function startLoopIfNeeded() {
      if (!animId && isVisible && isTabActive && !isContextLost && renderer) {
        animId = requestAnimationFrame(renderLoop);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = Boolean(entry?.isIntersecting);
        if (nowVisible !== isVisible) {
          isVisible = nowVisible;
          if (isVisible) {
            handleResize();
            startLoopIfNeeded();
          } else if (animId) {
            cancelAnimationFrame(animId);
            animId = 0;
          }
        }
      },
      { threshold: 0.02, rootMargin: "100px" },
    );
    observer.observe(container);

    let isTabActive = !document.hidden;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        startLoopIfNeeded();
      } else if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    startLoopIfNeeded();

    requestRenderRef.current = () => {
      if (renderer && !isContextLost && isVisible) {
        try {
          renderer.render(scene, camera);
        } catch {
          // ignore
        }
      }
    };

    // Cleanup
    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      observer.disconnect();

      if (loadedModel) {
        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            mats.forEach((m) => {
              m?.dispose();
            });
          }
        });
      }

      if (renderer) {
        try {
          renderer.dispose();
        } catch {
          // ignore
        }
      }
    };
    // selectedColorHex changes are reactively applied to cloned materials in the dedicated effect above to avoid tearing down the WebGL scene
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isNearViewport,
    modelPath,
    requiresDraco,
    defaultScale,
    defaultRotY,
    defaultRotX,
    isHoodie,
    productName,
  ]);

  // Pointer interactions with mobile touch scroll preservation
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const p = pointerState.current;

      if (p.isDragging) {
        const dx = e.clientX - p.lastDragX;
        const dy = e.clientY - p.lastDragY;
        p.lastDragX = e.clientX;
        p.lastDragY = e.clientY;

        p.userRotVelY = dx * 0.007;
        p.userRotVelX = dy * 0.007;
        p.userRotY += p.userRotVelY;
        p.userRotX = Math.max(-0.6, Math.min(0.6, p.userRotX + p.userRotVelX));

        if (Math.abs(p.userRotX) > 0.05 || Math.abs(p.userRotY) > 0.05) {
          setHasInteracted(true);
        }
      } else {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        p.targetTiltY = nx * 0.14;
        p.targetTiltX = -ny * 0.08;
        p.isHovered = true;
      }
    },
    [],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const p = pointerState.current;
      p.isResetting = false;
      p.isDragging = true;
      p.dragStartX = e.clientX;
      p.dragStartY = e.clientY;
      p.lastDragX = e.clientX;
      p.lastDragY = e.clientY;
      p.userRotVelX = 0;
      p.userRotVelY = 0;

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      pointerState.current.isDragging = false;
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    },
    [],
  );

  const handlePointerCancel = useCallback(() => {
    pointerState.current.isDragging = false;
  }, []);

  const handlePointerLeave = useCallback(() => {
    const p = pointerState.current;
    p.targetTiltX = 0;
    p.targetTiltY = 0;
    p.isHovered = false;
    p.isDragging = false;
  }, []);

  if (loadError) {
    return (
      <GarmentFallbackCard
        productName={productName}
        fallbackImage={fallbackImage}
        className={className}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      className={`relative select-none ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full block cursor-grab active:cursor-grabbing"
      />

      {/* Lightweight Loading State */}
      {loading && isNearViewport && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#06080a]/80 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#f4d477]">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#d4a62a]" />
            LOADING 3D {productName.toUpperCase()}
          </div>
        </div>
      )}

      {/* Floating Controls / Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
        <span className="font-mono text-[9px] text-[#F4D477] tracking-widest bg-[#06080a]/85 border border-[#D4A62A]/30 px-2 py-0.5 rounded-sm backdrop-blur-md uppercase">
          3D INTERACTIVE
        </span>
      </div>

      {/* Reset View Button and Drag Hint */}
      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-3 pointer-events-none z-10">
        <span className="font-mono text-[9px] tracking-widest text-[#a3a3a3] uppercase bg-[#06080a]/80 px-2 py-0.5 rounded-sm border border-white/10 backdrop-blur-md">
          DRAG TO ROTATE
        </span>

        {hasInteracted && (
          <button
            type="button"
            onClick={() => resetViewRef.current()}
            className="pointer-events-auto rounded-sm border border-white/15 bg-[#06080a]/90 px-2.5 py-1 font-mono text-[9px] tracking-wider text-[#f4d477] hover:border-[#f4d477] hover:text-white transition-colors uppercase backdrop-blur-md cursor-pointer"
          >
            [ RESET VIEW ]
          </button>
        )}
      </div>
    </div>
  );
}

// Exported GarmentViewer3D wrapped in safe Error Boundary
export function GarmentViewer3D(props: GarmentViewer3DProps) {
  return (
    <Viewer3DErrorBoundary
      productName={props.productName}
      fallbackImage={props.fallbackImage}
      className={props.className}
    >
      <GarmentViewer3DInner {...props} />
    </Viewer3DErrorBoundary>
  );
}
