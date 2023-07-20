import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/loaders/glTF';
import './bootstrap.min.css';

const Cube = ({ scene, isVisible, setIsVisible }) => {
  const cubeRef = useRef(null);

  useEffect(() => {
    // Create a 3D cube
    const newCube = MeshBuilder.CreateBox('cube', { size: 1 }, scene);
    newCube.position = new Vector3(0, 0, 0);
    cubeRef.current = newCube;

    return () => {
      if (cubeRef.current) {
        cubeRef.current.dispose();
        cubeRef.current = null;
      }
    };
  }, [scene]);

  useEffect(() => {
    // Set the visibility of the cube based on the isVisible prop
    if (cubeRef.current) {
      cubeRef.current.isVisible = isVisible;
    }
  }, [isVisible]);

  return null;
};

const ZoomSlider = ({ zoomValue, setZoomValue }) => {
  return (
    <input
      type="range"
      min="1"
      max="10"
      value={zoomValue}
      onChange={(e) => setZoomValue(Number(e.target.value))}
    />
  );
};

const MyScene = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isZoomSliderVisible, setIsZoomSliderVisible] = useState(false);
  const [zoomValue, setZoomValue] = useState(5);

  const handleSceneReady = () => {
   

    // Register the glTF loader
    // const gltfLoader = new GLTFFileLoader();
    // gltfLoader.initScene = null;
    // scene.useRightHandedSystem = true;
    // scene.useDelayedTextureLoading = true;

    // Load your glTF models using the glTF loader
    // Example:
    // gltfLoader.load('path/to/your/model.gltf', (gltfScene) => {
    //   // Process the loaded glTF scene
    //   // Add meshes, animations, etc.
    // });
  };

  const handleZoomButtonClick = () => {
    setIsZoomSliderVisible(!isZoomSliderVisible);
  };

  const handleHideButtonClick = () => {
    setIsVisible(false);
  };

  const handleShowButtonClick = () => {
    setIsVisible(true);
  };

  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      // Update the camera radius when zoomValue changes
      sceneRef.current.activeCamera.radius = zoomValue;
    }
  }, [zoomValue]);

  return (
    <div>
      {/* Update the inline styles for the "Hide" button */}
      <button style={{ width: '80px' ,height:'30px',marginRight:'30px'}}  onClick={handleHideButtonClick}>
        Hide
      </button>
      <button style={{ width: '100px' ,height:'30px',marginRight:'30px'}}  onClick={handleShowButtonClick}>Show</button>
      <button style={{ width: '100px' ,height:'30px',marginRight:'30px'}} onClick={handleZoomButtonClick}>
        {isZoomSliderVisible ? 'Hide Zoom' : ' Zoom'}
      </button>
      {isZoomSliderVisible && (
        <ZoomSlider zoomValue={zoomValue} setZoomValue={setZoomValue} />
      )}
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene onSceneReady={(scene) => { sceneRef.current = scene; handleSceneReady(scene); }}>
          <arcRotateCamera
            name="camera"
            target={Vector3.Zero()}
            alpha={-Math.PI / 2}
            beta={Math.PI / 2.5}
            radius={zoomValue}
            attachControl={true}
          />
          <hemisphericLight
            name="light"
            direction={new Vector3(0, 1, 0)}
            intensity={0.7}
          />
          <Cube
            scene={null}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </Scene>
      </Engine>
    </div>
  );
};

export default MyScene;
