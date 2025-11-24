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
  MUD_PIT: 6,
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

const square_collision_uv = new Float32Array(
  [
    0.000, 1.000,
    1.000, 0.000,
    0.000, 0.000,
    0.000, 1.000,
    1.000, 0.000,
    0.000, 0.000,
    1.000, 1.000,
    0.000, 0.000,
    1.000, 0.000,
    1.000, 1.000,
    0.000, 0.000,
    1.000, 0.000,
    1.000, 1.000,
    0.000, 0.000,
    0.000, 1.000,
    0.000, 1.000,
    1.000, 0.000,
    1.000, 1.000,
    0.000, 1.000,
    1.000, 1.000,
    1.000, 0.000,
    0.000, 1.000,
    1.000, 1.000,
    1.000, 0.000,
    1.000, 1.000,
    0.000, 1.000,
    0.000, 0.000,
    1.000, 1.000,
    0.000, 1.000,
    0.000, 0.000,
    1.000, 1.000,
    1.000, 0.000,
    0.000, 0.000,
    0.000, 1.000,
    0.000, 0.000,
    1.000, 0.000
  ]
);

const boom_plane_vertices = new Float32Array(
  [
    1.000, 0.000, -1.000,
    -1.000, -0.000, 1.000,
    -1.000, 0.000, -1.000,
    1.000, 0.000, -1.000,
    1.000, -0.000, 1.000,
    -1.000, -0.000, 1.000
  ]
)

const boom_plane_uv = new Float32Array(
  [
    0.000, 0.000,
    1.000, 1.000,
    0.000, 1.000,
    0.000, 0.000,
    1.000, 0.000,
    1.000, 1.000
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
  geometry.setAttribute("uv", new three.BufferAttribute(square_collision_uv, 2))
  geometry.computeVertexNormals()
  let tex, normal
  tex = (new three.TextureLoader()).load("images/wall.png")
  tex.wrapT = three.RepeatWrapping
  tex.wrapS = three.RepeatWrapping
  normal = (new three.TextureLoader()).load("images/wall_normalmap.png")
  normal.wrapT = three.RepeatWrapping
  normal.wrapS = three.RepeatWrapping
  material = new three.MeshStandardMaterial({map: tex, normalMap: normal})
  cube = new three.Mesh(geometry, material);
  cube.name = "collision box"
  cube.userData["collision_type"] = type.STOP_CAR
  cube.castShadow = true
  
  // return the finished object
  cube.position.z = 0.5
  return cube;
}

// cube collision that is actually destroyable
export const max_destroyed_time = 100
export function build_cube_collision_destroyable()
{
  let cube = build_cube_collision()
  let loader, texture
  loader = new three.TextureLoader()
  texture = loader.load("images/target.png")
  texture.colorSpace = three.SRGBColorSpace
  cube.material = new three.MeshStandardMaterial({map: texture})
  cube.material.normalMap = (new three.TextureLoader()).load("images/target_normalmap.png")
  cube.userData["collision_type"] = type.DAMAGE_CAR
  return cube
}

// build a mud pit
export function build_mud_pit()
{
  let geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(square_collision_visible_vertices, 3))
  geometry.setAttribute("uv", new three.BufferAttribute(square_collision_uv, 2))
  geometry.computeVertexNormals()
  let tex, normal
  tex = (new three.TextureLoader()).load("images/mud.png")
  tex.colorSpace = three.SRGBColorSpace
  tex.wrapT = three.RepeatWrapping
  tex.wrapS = three.RepeatWrapping
  normal = (new three.TextureLoader()).load("images/mud_normalmap.png")
  normal.wrapT = three.RepeatWrapping
  normal.wrapS = three.RepeatWrapping
  let material = new three.MeshStandardMaterial({map: tex, normalMap: normal})
  material.metalness = 1
  let mud = new three.Mesh(geometry, material);
  mud.userData["collision_type"] = type.MUD_PIT
  return mud
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
        || obj.userData["collision_type"] == type.PROJECTILE
        || obj.userData["collision_type"] == type.MUD_PIT)
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
      return bbox.intersectsBox(bbox2)
    }
  }
  return false
}

// another version of the function from above
export function is_tetris_colliding_with_obj(tetris, obj)
{
  bbox.setFromObject(obj)
  bbox2.setFromObject(tetris)
  return bbox.intersectsBox(bbox2)
}

// funtion to handle collision
let z_angle = 0
const up_axis = new three.Vector3(0, 0, 1)
export function update_kart_given_collision(kart, obj)
{
  // set the velocity to be opposite by a smaller amount
  // and substract the last position increment (the double of it)
  if (obj.userData["collision_type"] == type.STOP_CAR
      || obj.userData["collision_type"] == type.DAMAGE_CAR
      || obj.userData["collision_type"] == type.PROJECTILE)
  {
    kart.position.x -= 2 * kart_funcs.vec_pos_inc.x;
    kart.position.y -= 2 * kart_funcs.vec_pos_inc.y;
    kart_funcs.set_velocity_to_opposite()
  }
  return obj.userData["collision_type"]
}

const boom_images = [
  "images/boom1.png",
  "images/boom2.png",
  "images/boom3.png",
  "images/boom4.png",
]

const boom_texts = [
  "images/boom1_text.png",
  "images/boom2_text.png",
]

const boom_texts_alpha = [
  "images/boom1_text_alpha.png",
  "images/boom2_text_alpha.png",
]

// build a boom plane after an object gets destroyed
export function build_boom_plane()
{
  // create boom object
  let boom, geometry, material
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(boom_plane_vertices, 3))
  geometry.setAttribute("uv", new three.BufferAttribute(boom_plane_uv, 2))
  geometry.computeVertexNormals()
  let tex, alpha, rand = Math.floor(Math.random() * 4)
  tex = (new three.TextureLoader()).load(boom_images[rand]); tex.colorSpace = three.SRGBColorSpace
  material = new three.MeshBasicMaterial({map: tex, transparent: true})
  boom = new three.Mesh(geometry, material);
  boom.name = "boom plane"
  boom.userData["show_time"] = 0
  
  // add boom text
  let text
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(boom_plane_vertices, 3))
  geometry.setAttribute("uv", new three.BufferAttribute(boom_plane_uv, 2))
  geometry.computeVertexNormals()
  rand = Math.floor(Math.random() * 2)
  tex = (new three.TextureLoader()).load(boom_texts[rand]); tex.colorSpace = three.SRGBColorSpace
  alpha = (new three.TextureLoader()).load(boom_texts_alpha[rand]); alpha.colorSpace = three.SRGBColorSpace
  material = new three.MeshBasicMaterial({map: tex, alphaMap: alpha, transparent: true})
  text = new three.Mesh(geometry, material);
  text.scale.set(0.3, 0.1, 0.6)
  text.position.y = -0.1
  text.rotation.y = Math.PI / 2
  boom.add(text)
  
  // return the boom object
  return boom;
}

// update a boom plane animation
export function update_boom_anim(boom)
{
  if (boom.userData["show_time"] % 3 == 0) {
    // to the object
    boom.position.x += -1 + (Math.random() * 2)
    boom.position.x += -1 + (Math.random() * 2)
    boom.rotation.x += -0.1 + (Math.random() * 0.2)
    boom.rotation.y += -0.1 + (Math.random() * 0.2)
    boom.position.z += -0.5 + (Math.random() * 1)
    // to the text
    boom.children[0].position.x += -0.1 + (Math.random() * 0.2)
    boom.children[0].position.x += -0.1 + (Math.random() * 0.2)
    boom.children[0].rotation.x += -0.01 + (Math.random() * 0.02)
    boom.children[0].rotation.y += -0.01 + (Math.random() * 0.02)
    boom.children[0].position.z += -0.05 + (Math.random() * 0.1)
  }
}
