import * as three from "three"
import * as collision_funcs from "./collision_funcs.js"

// just a cube
const powerup_box_vertices = new Float32Array(
  [
    -0.410, -0.707, 0.287,
    -0.410, 0.707, 0.287,
    -0.815, 0.000, -0.292,
    -0.004, 0.000, 0.866,
    0.410, 0.707, -0.287,
    -0.410, 0.707, 0.287,
    0.410, 0.707, -0.287,
    0.410, -0.707, -0.287,
    0.004, 0.000, -0.866,
    0.004, 0.000, -0.866,
    -0.410, -0.707, 0.287,
    -0.815, 0.000, -0.292,
    -0.410, 0.707, 0.287,
    0.004, 0.000, -0.866,
    -0.815, 0.000, -0.292,
    -0.004, 0.000, 0.866,
    0.410, -0.707, -0.287,
    0.815, 0.000, 0.292,
    -0.410, -0.707, 0.287,
    -0.004, 0.000, 0.866,
    -0.410, 0.707, 0.287,
    -0.004, 0.000, 0.866,
    0.815, 0.000, 0.292,
    0.410, 0.707, -0.287,
    0.410, 0.707, -0.287,
    0.815, 0.000, 0.292,
    0.410, -0.707, -0.287,
    0.004, 0.000, -0.866,
    0.410, -0.707, -0.287,
    -0.410, -0.707, 0.287,
    -0.410, 0.707, 0.287,
    0.410, 0.707, -0.287,
    0.004, 0.000, -0.866,
    -0.004, 0.000, 0.866,
    -0.410, -0.707, 0.287,
    0.410, -0.707, -0.287,
  ]
);

const powerup_box_uv = new Float32Array(
  [
    0.000, 0.994,
    0.997, -0.003,
    0.003, 0.002,
    0.992, 0.996,
    -0.006, 0.007,
    -0.006, 0.995,
    1.000, 0.994,
    0.008, -0.003,
    0.997, 0.002,
    0.994, 0.002,
    0.003, 0.998,
    0.003, 0.003,
    0.001, 0.996,
    0.999, -0.001,
    -0.006, 0.006,
    0.003, 0.996,
    0.997, 0.002,
    1.003, 0.994,
    0.000, 0.994,
    1.000, 0.996,
    0.997, -0.003,
    0.992, 0.996,
    0.994, -0.006,
    -0.006, 0.007,
    1.000, 0.994,
    0.003, 0.998,
    0.008, -0.003,
    0.994, 0.002,
    0.997, 0.997,
    0.003, 0.998,
    0.001, 0.996,
    0.994, 0.994,
    0.999, -0.001,
    0.003, 0.996,
    0.000, 0.003,
    0.997, 0.002
  ]
);

export function build_powerup_box()
{
  // make the visual representation of the collision
  // then the actual collision vertices inside that as a children
  let container, mesh, collision, geometry, material
  
  // container
  container = new three.Object3D()
  container.name = "powerup box"
  
  // mesh
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(powerup_box_vertices, 3))
  geometry.setAttribute("uv", new three.BufferAttribute(powerup_box_uv, 2))
  geometry.computeVertexNormals()
  let loader, texture
  loader = new three.TextureLoader()
  texture = loader.load("images/item_box.png")
  texture.colorSpace = three.SRGBColorSpace;
  material = new three.MeshBasicMaterial({map: texture})
  mesh = new three.Mesh(geometry, material);
  mesh.name = "powerup box mesh"
  mesh.position.z = 1
  mesh.rotation.z = Math.random() * Math.PI
  mesh.castShadow = true
  container.add(mesh)
  
  // collision
  collision = collision_funcs.build_cube_collision()
  collision.userData["collision_type"] = collision_funcs.type.CAR_PASSES_DESTROY
  collision.scale.x = 2.5
  collision.scale.y = 2.5
  collision.scale.z = 3
  collision.visible = false
  container.add(collision)

  // return the objects
  container.userData["powerup_active"] = false
  container.userData["powerup_uses_left"] = 0
  return container;
}
