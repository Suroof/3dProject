varying vec2 vUv; // we send this variable to the fragment using the varying and we already have the position, uv and other variables since we are dealing with a ShaderMaterial and not a RawShaderMaterial

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    // gl_Pointsize is not needed since we are not dealing with points but a classic geometry
    gl_Position = projectionPosition;

    vUv = uv; // as stated above, we already have the uv
}