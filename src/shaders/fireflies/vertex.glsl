uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2; // the 100.0 is necessary as to add even more randomness

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    
    gl_PointSize = uSize * aScale * uPixelRatio; // uPixelRatio fixes the different devices' pixel density so 40 px is going to be 40 for all of the resolutions
    gl_PointSize *= (1.0 / - viewPosition.z); // particles now resize accordingly to camera distance
}