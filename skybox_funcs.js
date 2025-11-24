import * as three from "three"

// just a icosphere
const skybox_vertices = new Float32Array(
  [
    -1.000, 1.000, -1.000,
    -1.000, -1.000, 1.000,
    -1.000, -1.000, -1.000,
    1.000, 1.000, -1.000,
    -1.000, 1.000, 1.000,
    -1.000, 1.000, -1.000,
    1.000, -1.000, -1.000,
    1.000, 1.000, 1.000,
    1.000, 1.000, -1.000,
    -1.000, -1.000, -1.000,
    1.000, -1.000, 1.000,
    1.000, -1.000, -1.000,
    -1.000, -1.000, -1.000,
    1.000, 1.000, -1.000,
    -1.000, 1.000, -1.000,
    1.000, -1.000, 1.000,
    -1.000, 1.000, 1.000,
    1.000, 1.000, 1.000,
    -1.000, 1.000, -1.000,
    -1.000, 1.000, 1.000,
    -1.000, -1.000, 1.000,
    1.000, 1.000, -1.000,
    1.000, 1.000, 1.000,
    -1.000, 1.000, 1.000,
    1.000, -1.000, -1.000,
    1.000, -1.000, 1.000,
    1.000, 1.000, 1.000,
    -1.000, -1.000, -1.000,
    -1.000, -1.000, 1.000,
    1.000, -1.000, 1.000,
    -1.000, -1.000, -1.000,
    1.000, -1.000, -1.000,
    1.000, 1.000, -1.000,
    1.000, -1.000, 1.000,
    -1.000, -1.000, 1.000,
    -1.000, 1.000, 1.000,
  ]
);

const skybox_uv = new Float32Array(
  [
    0.0000, 0.5000,
    1.0000, 1.0000,
    1.0000, 0.5000,
    0.0000, 0.5000,
    1.0000, 1.0000,
    1.0000, 0.5000,
    0.0000, 0.5000,
    1.0000, 1.0000,
    1.0000, 0.5000,
    0.0000, 0.5000,
    1.0000, 1.0000,
    1.0000, 0.5000,
    0.0004, 0.9956,
    0.0104, 1.0006,
    0.0104, 0.9956,
    0.0006, 0.9974,
    0.0056, 0.9999,
    0.0056, 0.9974,
    0.0000, 0.5000,
    0.0000, 1.0000,
    1.0000, 1.0000,
    0.0000, 0.5000,
    0.0000, 1.0000,
    1.0000, 1.0000,
    0.0000, 0.5000,
    0.0000, 1.0000,
    1.0000, 1.0000,
    0.0000, 0.5000,
    0.0000, 1.0000,
    1.0000, 1.0000,
    0.0004, 0.9956,
    0.0004, 1.0006,
    0.0104, 1.0006,
    0.0006, 0.9974,
    0.0006, 0.9999,
    0.0056, 0.9999,
  ]
);

export function build_skybox()
{
  // make the visual representation of the collision
  // then the actual collision vertices inside that as a children
  let container, mesh, collision, geometry, material
  
  // container
  container = new three.Object3D()
  container.name = "skybox"
  
  // mesh
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(skybox_vertices, 3))
  geometry.computeVertexNormals()
  geometry.setAttribute("uv", new three.BufferAttribute(skybox_uv, 2))
  let loader, texture
  loader = new three.TextureLoader()
  texture = loader.load("images/matrix2.png")
  texture.colorSpace = three.SRGBColorSpace
  texture.repeat = new three.Vector2(1, 1)
  texture.wrapS = three.RepeatWrapping
  texture.wrapT = three.RepeatWrapping
  material = new three.MeshBasicMaterial({map: texture})
  mesh = new three.Mesh(geometry, material)
  mesh.name = "skybox mesh"
  container.add(mesh)
  container.position.z = 100
  container.scale.x = 600
  container.scale.y = 600
  container.scale.z = 600

  // return the object
  return container;
}
