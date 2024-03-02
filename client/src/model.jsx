import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ objToRender = 'barack_obama' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a Three.JS Scene
    const scene = new THREE.Scene();

    // Create a new camera with positions and angles
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Instantiate a new renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Load the .gltf file
    const loader = new GLTFLoader();
    loader.load(
      `assets/${objToRender}/scene.gltf`,
      function (gltf) {
        const object = gltf.scene;
        scene.add(object);

        if (objToRender === "barack_obama") {
          document.onmousemove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Make the eye move
            object.rotation.y = -3 + mouseX / window.innerWidth * 3;
            object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
          };
        }
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    // Set camera position
    camera.position.z = objToRender === "dino" ? 25 : 500;

    // Add lights
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // OrbitControls
    let controls;
    if (objToRender === "dino") {
      controls = new OrbitControls(camera, renderer.domElement);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.onmousemove = null;
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [objToRender]); // Re-run the effect if objToRender changes

  return <div ref={containerRef} />;
}

export default Model;