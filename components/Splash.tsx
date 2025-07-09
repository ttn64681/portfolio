'use client';
import { useState, useEffect } from 'react';

interface LayerConfig {
  id: string;
  maxX: number; // max pixels the layer should move horizontally
  maxY: number; // max pixels the layer should move vertically
  scale: number; // scale of the layer
  scrollYMult: number; // y pixelmultiplier for scroll parallax
}

export default function Splash() {
  useEffect(() => {
    // This IIFE (Immediately Invoked Function Expression) creates a closure to manage all parallax states
    const handleScrollAndMouse = (() => {
      // Set initial mouse position to center of screen
      let mouseX: number = window.innerWidth / 2;
      let mouseY: number = window.innerHeight / 2;

      let scrollY: number = window.scrollY;

      // Vars for delayed/smooth mouse movement
      let currentMouseX: number = mouseX; // represents mouse position following the actual mouse position
      let currentMouseY: number = mouseY;
      let actualMouseX: number = mouseX; // the actual mouse position
      let actualMouseY: number = mouseY;
      // console.log(`mouseX: ${mouseX}, mouseY: ${mouseY}`);

      // This is the fraction of distance the curr mouse pos should travel between it and the actual mouse pos
      const smoothingRatio: number = 0.065; // 6.5% of distance (between curr and actual mouse pos) is covered in each frame

      // (Linear Interpolation)
      // Calculates the position (X or Y) the current mouse should be based on smoothing ratio
      function lerp(start: number, end: number, smoothingRatio: number): number {
        return start + (end - start) * smoothingRatio;
        // lerp is run repeatedly, so the curr pos approaches the actual at an infinitely decaying rate
      }

      // This function calculates and updates layers to achieve parallax
      function updateTransforms(): void {
        // Initialize screen center coords
        const screenCenterX: number = window.innerWidth / 2;
        const screenCenterY: number = window.innerHeight / 2;

        // Layer parallax initialization
        const layers: LayerConfig[] = [
          { id: 'bg5', maxX: 30, maxY: 20, scale: 0.93, scrollYMult: 0.5 }, // sky (backmost - moves most)
          { id: 'bg4', maxX: 24, maxY: 16, scale: 0.91, scrollYMult: 0.4 }, // buildings
          { id: 'bg3', maxX: 18, maxY: 12, scale: 0.9, scrollYMult: 0.3 }, // midland
          { id: 'bg2', maxX: 12, maxY: 8, scale: 0.89, scrollYMult: 0.15 }, // water
          { id: 'bg1', maxX: 6, maxY: 4, scale: 0.88, scrollYMult: -0.1 }, // black (frontmost - moves least)
        ];

        // Convert currentmouse pos to relative coords (-1 to +1)
        // Ex: if currentMouseX = 1200 and screenCenterX = 960, relX = 0.25 (25% of the way to the right)
        const relX: number = (currentMouseX - screenCenterX) / screenCenterX; // -1 (left) to +1 (right)
        const relY: number = (currentMouseY - screenCenterY) / screenCenterY; // -1 (top) to +1 (bot)

        // Apply transforms to each layer
        layers.forEach(({ id, maxX, maxY, scale, scrollYMult }: LayerConfig) => {
          const el: HTMLElement | null = document.getElementById(id);
          if (el) {
            const isTabletOrSmaller: boolean = window.innerWidth <= 768;

            // The amount of pixels the layer should move horizontally or vertically
            // Ex: if relX = 0.5 and max pixels (x) = 30, layer moves 15px right
            const mouseXOffset: number = isTabletOrSmaller ? 0 : relX * maxX;
            const mouseYOffset: number = isTabletOrSmaller ? 0 : relY * maxY;

            el.style.transform = `
              translateX(calc(-50% - ${mouseXOffset}px))
              translateY(${scrollY * scrollYMult - mouseYOffset}px)
              scale(${scale})
            `;
          }
        });
      }

      // This function runs ~60 times per sec to create smooth animation movement for parallax
      function animate(): void {
        // Gradually move currentMouse toward actualMouse using lerp
        currentMouseX = lerp(currentMouseX, actualMouseX, smoothingRatio);
        currentMouseY = lerp(currentMouseY, actualMouseY, smoothingRatio);

        // Update all layer transforms with new smoothed mouse position
        updateTransforms();
        // Schedule the next browser renderingframe (creates 60fps loop)
        requestAnimationFrame(animate);
      }

      function onMouseMove(e: MouseEvent): void {
        // Update mouse coords
        actualMouseX = e.clientX;
        actualMouseY = e.clientY;
      }

      function onScroll(): void {
        // Updates layers' y pos for scroll parallax
        scrollY = window.scrollY;
        updateTransforms();
      }

      function onResize(): void {
        // For tablet/smaller devices
        updateTransforms();
      }

      updateTransforms(); // Initialize layer positions

      // Start smooth animation loop (60fps)
      // Schedules animate() to run on next browser rendering frame
      requestAnimationFrame(animate);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', onResize);

      return () => {
        // Cleanup
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    })();

    // Returns the cleanup
    return handleScrollAndMouse;
  }, []);

  return (
    <div className='animated-bg-container flex-col justify-center items-center'>
      <div id='bg5' className='sprite-layer' />
      <div id='bg4' className='sprite-layer' />
      <div id='bg3' className='sprite-layer' />
      <div id='bg2' className='sprite-layer' />
      <div id='bg1' className='sprite-layer' />
    </div>
  );
}
