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
  geometry.computeVertexNormals()
  material = new three.MeshStandardMaterial({color: 0xFFFF00})
  mesh = new three.Mesh(geometry, material);
  mesh.name = "powerup box mesh"
  mesh.position.z = 1
  mesh.rotation.z = Math.random() * Math.PI
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
