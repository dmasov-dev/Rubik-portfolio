import { useEffect, useRef } from "react";
import "./CubicGallery.css";

// Number of items on each cube face
const FACE_SIZE = 3;
const ITEM_SIZE = 240;
const ITEM_DISTANCE = 40;

const CubicGallery = (props:{imageData:string[]}) => {
  
  const el = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const animId = useRef<number>(0);
  let mouseX:number, mouseY:number, angleX:number, angleY:number;

  // Move handleMouseMove outside useEffect
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = -((e.clientX / innerWidth) - 0.5) * 1.25;
    mouseY = ((e.clientY / innerHeight) - 0.5) * 1.25;
  };

  useEffect(() => {
    if (props.imageData.length == 0) return;

    const gallery = el.current!;
    const items = el.current!.children;

    // Build cubic face and distribute the items in correct locations
    let count = 0;
    const cellSize = ITEM_SIZE + ITEM_DISTANCE;
    const cubeSize = cellSize * FACE_SIZE;
    let origin = -cubeSize * 0.5 + cellSize * 0.5;

    const buildFace = (faceId:number) => {
      for (let i = 0; i < FACE_SIZE; i++) {
        for (let j = 0; j < FACE_SIZE; j++) {
          const item = items[count++] as HTMLDivElement;
          switch (faceId) {
            case 0: // Front face
                item.style.transform = `translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            case 1: // Back face
                item.style.transform = `rotateY(180deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            case 2: // Left face
                item.style.transform = `rotateY(-90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            case 3: // Right face
                item.style.transform = `rotateY(90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            case 4: // Top face
                item.style.transform = `rotateX(90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            case 5: // Bottom face
                item.style.transform = `rotateX(-90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
          }
        }
      }
    }
    for (let i = 0; i < 6; i++) buildFace(i);
 
    // Reset transitional variables
    angleX = 0; angleY = 0; mouseX = mouseY = 0;

    // FIREFOX FIX: Using document-level event handling instead of direct element clicks
    // This bypasses issues with 3D transforms blocking click events in Firefox
    const handleGlobalClick = (e: MouseEvent) => {
      // FIREFOX FIX: Using elementsFromPoint to detect elements under cursor
      // This is more reliable than relying on event.target with 3D transforms
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const clickedGalleryItem = elements.find(el => el.classList.contains('cubic-gallery-item'));
      
      if (clickedGalleryItem && img.current) {
        const backgroundImage = (clickedGalleryItem as HTMLElement).style.backgroundImage;
        img.current.style.backgroundImage = backgroundImage;
        img.current.style.transform = 'scale(1, 1)';
      }
    };

    // FIREFOX FIX: Using capture phase (true) to intercept events before they get lost in 3D transforms
    document.addEventListener('mousedown', handleGlobalClick, true);

    // Detect mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    // Rotate and animate the gallery
    const updateFrame = () => {
      angleX += mouseX;
      angleY += mouseY;
      gallery.style.transform = `translateZ(-1200px) rotateY(${angleX}deg) rotateX(${angleY}deg)`;
      animId.current = requestAnimationFrame(updateFrame);
    }
    updateFrame();

    // FIREFOX FIX: Cleanup includes removing document-level listeners
    // Important to remove capture phase listeners to prevent memory leaks
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick, true);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId.current);
    };
  }, [props.imageData]);



  return (
    <div className="container my-4 position-relative" style={{ perspective: '1000px' }}>
      <div className="header-container">
        <div className="button-container-top">
          <a 
            href="/assets/CV_Masov_Darin_WEB_developer.pdf" 
            download
            className="download-button"
          >
            Download CV
          </a>
        </div>
        <div className="button-container-bottom">
          <button 
            onClick={() => {
              localStorage.removeItem('authToken');
              window.location.reload();
            }}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="cubic-gallery" ref={el} style={{ transformStyle: 'preserve-3d' }}>
        {props.imageData.map((it, index) => 
          <div 
              key={index} 
              // FIREFOX FIX: Simplified element structure - removed nested divs and complex event handlers
              // This reduces interference with 3D transform click detection
              style={{
                backgroundImage:`url(${it})`,
                position: 'absolute', 
                cursor: 'pointer' , zIndex: 1
              }}
              className='cubic-gallery-item'
              data-url={it} // FIREFOX FIX: Added data attribute for better element identification
          />
        )}
      </div>
      <div 
          onClick={() => {img.current!.style.transform = 'scale(0.0, 0.0)'}}
          className='image-display' 
          ref={img}>
      </div>
    </div>
  )
}

export default CubicGallery;
