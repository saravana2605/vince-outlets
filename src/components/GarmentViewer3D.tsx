import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import heroFallback from "@/assets/hero.jpg";

export interface GarmentViewer3DProps {
  modelPath: string;
  productName: string;
  requiresDraco?: boolean;
  selectedColorHex: string;
  defaultScale?: number;
  defaultRotY?: number;
  defaultRotX?: number;
  isHoodie?: boolean;
  className?: string;
  fallbackImage?: string;
}

export function GarmentViewer3D({
  modelPath,
  productName,
  requiresDraco = false,
  selectedColorHex,
  defaultScale = 1.0,
  defaultRotY = (8 * Math.PI) / 180,
  defaultRotX = (2 * Math.PI) / 180,
  isHoodie = false,
  className = "",
  fallbackImage = heroFallback,
}: GarmentViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // References to keep mutable Three.js objects without re-triggering effects
  const targetMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
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

  // Effect to update material color dynamically without re-mounting or reloading GLB
  useEffect(() => {
    if (targetMaterialRef.current) {
      targetMaterialRef.current.color.setStyle(selectedColorHex);
      targetMaterialRef.current.needsUpdate = true;
      requestRenderRef.current();
    }
  }, [selectedColorHex]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDisposed = false;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isHoodie ? 1.05 : 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene & Environment
    const scene = new THREE.Scene();
    const pmremGen = new THREE.PMREMGenerator(renderer);
    pmremGen.compileEquirectangularShader();
    const envRoom = pmremGen.fromScene(new RoomEnvironment());
    scene.environment = envRoom.texture;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.05, 3.2);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.7);
    keyLight.position.set(3.2, 4.2, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Warm signature champagne-gold rim light
    const goldRim = new THREE.DirectionalLight(0xf4d477, 3.2);
    goldRim.position.set(-3.5, 2.5, -2.8);
    scene.add(goldRim);

    // Soft cool fill
    const fillLight = new THREE.DirectionalLight(0xd9e5f2, 1.2);
    fillLight.position.set(0, -2.5, 2.5);
    scene.add(fillLight);

    // Damped hierarchy
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

    // Loaders
    const gltfLoader = new GLTFLoader();
    if (requiresDraco) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      gltfLoader.setDRACOLoader(dracoLoader);
    }

    let loadedModel: THREE.Group | null = null;
    let modelHeight = 1.5;
    let modelWidth = 1.4;

    gltfLoader.load(
      modelPath,
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;
        loadedModel = model;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        modelHeight = Math.max(size.y, 0.001);
        modelWidth = Math.max(size.x, 0.001);

        // Center model pivot
        model.position.sub(center);

        // Configure and CLONE material for this independent viewer
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const origMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
              const clonedMat = (origMat as THREE.MeshStandardMaterial).clone();
              mesh.material = clonedMat;
              targetMaterialRef.current = clonedMat;

              if (clonedMat.map) {
                clonedMat.map.colorSpace = THREE.SRGBColorSpace;
                clonedMat.map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
                clonedMat.map.needsUpdate = true;
              }

              if (isHoodie) {
                // Tame raw hoodie emissive blowout
                if (clonedMat.emissive) {
                  clonedMat.emissive.setHex(0x000000);
                }
                clonedMat.roughness = 0.84;
                clonedMat.metalness = 0.04;
              } else {
                clonedMat.roughness = 0.88;
                clonedMat.metalness = 0.04;
              }

              // Apply the currently selected color tint immediately
              clonedMat.color.setStyle(selectedColorHex);
              clonedMat.side = THREE.DoubleSide;
              clonedMat.needsUpdate = true;
            }
          }
        });

        model.scale.setScalar(defaultScale);
        turnGroup.add(model);

        setLoading(false);
        handleResize();
      },
      undefined,
      (err) => {
        console.warn(`Error loading model ${modelPath}:`, err);
        if (!isDisposed) {
          setLoadError(true);
          setLoading(false);
        }
      }
    );

    // Resize math
    function handleResize() {
      if (!container || !canvas || isDisposed) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const halfFovRad = ((camera.fov / 2) * Math.PI) / 180;
      const distH = (modelHeight / 2) / (Math.tan(halfFovRad) * 0.85);
      const halfHorizFovRad = Math.atan(Math.tan(halfFovRad) * camera.aspect);
      const distW = (modelWidth / 2) / (Math.tan(halfHorizFovRad) * 0.85);

      camera.position.z = Math.max(distH, distW, 2.5);
    }

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    // IntersectionObserver to pause loop when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let isTabActive = !document.hidden;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Render loop
    let animId = 0;
    const SPRING_K = 0.07;
    const SPRING_D = 0.82;

    function renderLoop(time: number) {
      animId = requestAnimationFrame(renderLoop);

      if (!isVisible || !isTabActive) return;

      const p = pointerState.current;

      // Smooth return to default viewing angle when reset is clicked
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

      // Gentle vertical breath (NO continuous 360 spinning)
      const idleY = Math.sin(time / 2600) * 0.012;

      rollGroup.rotation.x = defaultRotX + p.userRotX + p.currentTiltX;
      rollGroup.rotation.z = -p.currentTiltY * 0.35;
      turnGroup.rotation.y = defaultRotY + p.userRotY + p.currentTiltY;
      rollGroup.position.set(0, idleY, 0);

      renderer.render(scene, camera);
    }

    animId = requestAnimationFrame(renderLoop);
    requestRenderRef.current = () => {
      renderer.render(scene, camera);
    };

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();

      if (loadedModel) {
        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.dispose();
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              (m as THREE.MeshStandardMaterial).map?.dispose();
              m.dispose();
            });
          }
        });
      }

      envRoom.dispose();
      pmremGen.dispose();
      renderer.dispose();
    };
  }, [modelPath, requiresDraco, defaultScale, defaultRotY, defaultRotX, isHoodie]);

  // Pointer interactions
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
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
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
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

  if (loadError) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-[#0d1115] ${className}`}
      >
        <img
          src={fallbackImage}
          alt={productName}
          width={1024}
          height={1024}
          className="h-full w-full object-cover object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
        />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#06080a]/85 px-3 py-1 font-mono text-[10px] tracking-wider text-[#f4d477] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4a62a]" />
          {productName} • PREVIEW
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
