import * as three from "three"

const track_vertices = new Float32Array(
  [
    100.000, -100.000, 0.000,
    -100.000, 100.000, 0.000,
    -100.000, -100.000, 0.000,
    100.000, -100.000, 0.000,
    100.000, 100.000, 0.000,
    -100.000, 100.000, 0.000
  ]
);

export function build_track()
{
  let track, geometry, material
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(track_vertices, 3))
  geometry.computeVertexNormals()
  material = new three.MeshStandardMaterial({color: 0xA0A0A0})
  track = new three.Mesh(geometry, material);
  track.name = "track"
  return track;
}
