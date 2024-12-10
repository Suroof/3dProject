void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5)); // vec2 will use 0.5 for both x and y
    float strength = 0.05 / distanceToCenter - 0.1; // - 0.1 is needed to remove the edges

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}