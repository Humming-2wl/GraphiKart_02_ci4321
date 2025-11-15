import * as three from "three"
import * as kart_funcs from "./kart_funcs.js"

// I assume all collisions are square shaped, in the XY plane
// nothing fancy, just so that it is easier to make

// types of collision
export const type = {
  NONE: 0,
  STOP_CAR: 1,
  DAMAGE_CAR: 2,
  CAR_PASSES_DESTROY: 3,
  PROJECTILE: 4,
  PROJECTILE_PASSES_DESTROY: 5,
}

// just a cube collision
const square_collision_visible_vertices = new Float32Array(
  [
    -0.500, -0.500, 0.500,
    -0.500, 0.500, -0.500,
    -0.500, -0.500, -0.500,
    -0.500, 0.500, 0.500,
    0.500, 0.500, -0.500,
    -0.500, 0.500, -0.500,
    0.500, 0.500, 0.500,
    0.500, -0.500, -0.500,
    0.500, 0.500, -0.500,
    0.500, -0.500, 0.500,
    -0.500, -0.500, -0.500,
    0.500, -0.500, -0.500,
    0.500, 0.500, -0.500,
    -0.500, -0.500, -0.500,
    -0.500, 0.500, -0.500,
    -0.500, 0.500, 0.500,
    0.500, -0.500, 0.500,
    0.500, 0.500, 0.500,
    -0.500, -0.500, 0.500,
    -0.500, 0.500, 0.500,
    -0.500, 0.500, -0.500,
    -0.500, 0.500, 0.500,
    0.500, 0.500, 0.500,
    0.500, 0.500, -0.500,
    0.500, 0.500, 0.500,
    0.500, -0.500, 0.500,
    0.500, -0.500, -0.500,
    0.500, -0.500, 0.500,
    -0.500, -0.500, 0.500,
    -0.500, -0.500, -0.500,
    0.500, 0.500, -0.500,
    0.500, -0.500, -0.500,
    -0.500, -0.500, -0.500,
    -0.500, 0.500, 0.500,
    -0.500, -0.500, 0.500,
    0.500, -0.500, 0.500,
  ]
);

// build an understroyable cube collision
export function build_cube_collision()
{
  // make the visual representation of the collision
  // then the actual collision vertices inside that as a children
  let cube, geometry, material
  
  // visible collision
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(square_collision_visible_vertices, 3))
  geometry.computeVertexNormals()
  material = new three.MeshStandardMaterial({color: 0x0})
  cube = new three.Mesh(geometry, material);
  cube.name = "collision box"
  cube.userData["collision_type"] = type.STOP_CAR
  
  // return the finished object
  cube.position.z = 0.5
  return cube;
}

// cube collision that is actually destroyable
export function build_cube_collision_destroyable()
{
  let cube = build_cube_collision()
  cube.material = new three.MeshStandardMaterial({color: 0xAA11FF})
  cube.userData["collision_type"] = type.DAMAGE_CAR
  return cube
}

// function to check if an object is inside a "collidable" object
let bbox = new three.Box3()
let vec3 = new three.Vector3()
export function is_kart_colliding_with_obj(kart, obj)
{
  // check if it is a collidable object first
  let collision_mesh
  if ("collision_type" in obj.userData)
  {
    // stop/damage motion collision
    if (obj.userData["collision_type"] == type.STOP_CAR
        || obj.userData["collision_type"] == type.DAMAGE_CAR
        || obj.userData["collision_type"] == type.CAR_PASSES_DESTROY
        || obj.userData["collision_type"] == type.PROJECTILE)
    {
      bbox.setFromObject(obj)
      vec3.setFromMatrixPosition(kart.matrixWorld)
      if (bbox.containsPoint(vec3))
        return true
    }
  }
  return false
}

// check if a projectile is colliding with something
let bbox2 = new three.Box3()
export function is_projectile_colliding_with_obj(projectile, obj)
{
  // check if it is a collidable object first
  if ("collision_type" in obj.userData)
  {
    // stop/damage motion collision
    if (obj.userData["collision_type"] == type.STOP_CAR
        || obj.userData["collision_type"] == type.DAMAGE_CAR
        || obj.userData["collision_type"] == type.PROJECTILE
        || obj.userData["collision_type"] == type.PROJECTILE_PASSES_DESTROY)
    {
      bbox.setFromObject(obj)
      bbox2.setFromObject(projectile)
      if (bbox.intersectsBox(bbox2))
        return true
    }
  }
  return false
}

// funtion to handle collision
let z_angle = 0
const up_axis = new three.Vector3(0, 0, 1)
export function update_kart_given_collision(kart, obj)
{
  // set the velocity to be opposite by a smaller amount
  // and substract the last position increment (the double of it)
  if (obj.userData["collision_type"] == type.STOP_CAR
      || obj.userData["collision_type"] == type.DAMAGE_CAR)
  {
    kart.position.x -= 2 * kart_funcs.vec_pos_inc.x;
    kart.position.y -= 2 * kart_funcs.vec_pos_inc.y;
    kart_funcs.set_velocity_to_opposite()
  }
  return obj.userData["collision_type"]
}
