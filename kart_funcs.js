import * as three from "three"
import * as powerup_funcs from "./powerup_funcs.js"

// body vertices pos
const body_vertices = new Float32Array(
  [
    0.552, 1.864, 0.372,
    -0.552, -1.000, 0.372,
    -0.552, 1.864, 0.372,
    0.559, 1.000, 1.372,
    -0.559, -1.864, 1.372,
    0.559, -1.864, 1.372,
    0.559, 1.000, 1.372,
    0.552, -1.000, 0.372,
    0.552, 1.864, 0.372,
    0.552, -1.000, 0.372,
    -0.559, -1.864, 1.372,
    -0.552, -1.000, 0.372,
    -0.552, -1.000, 0.372,
    -0.559, 1.000, 1.372,
    -0.552, 1.864, 0.372,
    0.552, 1.864, 0.372,
    -0.559, 1.000, 1.372,
    0.559, 1.000, 1.372,
    0.552, 1.864, 0.372,
    0.552, -1.000, 0.372,
    -0.552, -1.000, 0.372,
    0.559, 1.000, 1.372,
    -0.559, 1.000, 1.372,
    -0.559, -1.864, 1.372,
    0.559, 1.000, 1.372,
    0.559, -1.864, 1.372,
    0.552, -1.000, 0.372,
    0.552, -1.000, 0.372,
    0.559, -1.864, 1.372,
    -0.559, -1.864, 1.372,
    -0.552, -1.000, 0.372,
    -0.559, -1.864, 1.372,
    -0.559, 1.000, 1.372,
    0.552, 1.864, 0.372,
    -0.552, 1.864, 0.372,
    -0.559, 1.000, 1.372
  ]
);

// wheel vertices pos
const wheel_vertices = new Float32Array(
  [
    0.200, -0.500, 0.119,
    -0.200, -0.500, -0.119,
    0.200, -0.500, -0.119,
    0.200, -0.366, 0.359,
    0.200, 0.366, -0.359,
    0.200, 0.366, 0.359,
    -0.200, 0.119, 0.500,
    0.200, -0.119, 0.500,
    0.200, 0.119, 0.500,
    -0.200, 0.366, 0.359,
    -0.200, -0.366, -0.359,
    -0.200, -0.366, 0.359,
    -0.200, 0.500, 0.119,
    0.200, 0.500, -0.119,
    -0.200, 0.500, -0.119,
    -0.200, 0.119, -0.500,
    0.200, 0.366, -0.359,
    0.200, 0.119, -0.500,
    -0.200, 0.366, -0.359,
    0.200, 0.500, -0.119,
    0.200, 0.366, -0.359,
    0.200, 0.119, 0.500,
    -0.200, 0.366, 0.359,
    -0.200, 0.119, 0.500,
    0.200, 0.366, 0.359,
    -0.200, 0.500, 0.119,
    -0.200, 0.366, 0.359,
    0.200, -0.119, -0.500,
    -0.200, -0.366, -0.359,
    -0.200, -0.119, -0.500,
    0.200, -0.366, -0.359,
    -0.200, -0.500, -0.119,
    -0.200, -0.366, -0.359,
    -0.200, -0.119, 0.500,
    0.200, -0.366, 0.359,
    0.200, -0.119, 0.500,
    -0.200, -0.366, 0.359,
    0.200, -0.500, 0.119,
    0.200, -0.366, 0.359,
    0.200, 0.119, -0.500,
    -0.200, -0.119, -0.500,
    -0.200, 0.119, -0.500,
    0.200, -0.500, 0.119,
    -0.200, -0.500, 0.119,
    -0.200, -0.500, -0.119,
    0.200, -0.119, -0.500,
    0.200, 0.119, -0.500,
    0.200, 0.366, -0.359,
    0.200, 0.366, -0.359,
    0.200, 0.500, -0.119,
    0.200, 0.500, 0.119,
    0.200, 0.500, 0.119,
    0.200, 0.366, 0.359,
    0.200, 0.366, -0.359,
    0.200, 0.366, 0.359,
    0.200, 0.119, 0.500,
    0.200, -0.366, 0.359,
    0.200, 0.119, 0.500,
    0.200, -0.119, 0.500,
    0.200, -0.366, 0.359,
    0.200, -0.366, 0.359,
    0.200, -0.500, 0.119,
    0.200, -0.500, -0.119,
    0.200, -0.500, -0.119,
    0.200, -0.366, -0.359,
    0.200, -0.366, 0.359,
    0.200, -0.366, -0.359,
    0.200, -0.119, -0.500,
    0.200, 0.366, -0.359,
    0.200, -0.366, 0.359,
    0.200, -0.366, -0.359,
    0.200, 0.366, -0.359,
    -0.200, 0.119, 0.500,
    -0.200, -0.119, 0.500,
    0.200, -0.119, 0.500,
    -0.200, 0.119, -0.500,
    -0.200, -0.119, -0.500,
    -0.200, -0.366, -0.359,
    -0.200, -0.366, -0.359,
    -0.200, -0.500, -0.119,
    -0.200, -0.500, 0.119,
    -0.200, -0.500, 0.119,
    -0.200, -0.366, 0.359,
    -0.200, -0.366, -0.359,
    -0.200, -0.366, 0.359,
    -0.200, -0.119, 0.500,
    -0.200, 0.366, 0.359,
    -0.200, -0.119, 0.500,
    -0.200, 0.119, 0.500,
    -0.200, 0.366, 0.359,
    -0.200, 0.366, 0.359,
    -0.200, 0.500, 0.119,
    -0.200, 0.500, -0.119,
    -0.200, 0.500, -0.119,
    -0.200, 0.366, -0.359,
    -0.200, 0.366, 0.359,
    -0.200, 0.366, -0.359,
    -0.200, 0.119, -0.500,
    -0.200, -0.366, -0.359,
    -0.200, 0.366, 0.359,
    -0.200, 0.366, -0.359,
    -0.200, -0.366, -0.359,
    -0.200, 0.500, 0.119,
    0.200, 0.500, 0.119,
    0.200, 0.500, -0.119,
    -0.200, 0.119, -0.500,
    -0.200, 0.366, -0.359,
    0.200, 0.366, -0.359,
    -0.200, 0.366, -0.359,
    -0.200, 0.500, -0.119,
    0.200, 0.500, -0.119,
    0.200, 0.119, 0.500,
    0.200, 0.366, 0.359,
    -0.200, 0.366, 0.359,
    0.200, 0.366, 0.359,
    0.200, 0.500, 0.119,
    -0.200, 0.500, 0.119,
    0.200, -0.119, -0.500,
    0.200, -0.366, -0.359,
    -0.200, -0.366, -0.359,
    0.200, -0.366, -0.359,
    0.200, -0.500, -0.119,
    -0.200, -0.500, -0.119,
    -0.200, -0.119, 0.500,
    -0.200, -0.366, 0.359,
    0.200, -0.366, 0.359,
    -0.200, -0.366, 0.359,
    -0.200, -0.500, 0.119,
    0.200, -0.500, 0.119,
    0.200, 0.119, -0.500,
    0.200, -0.119, -0.500,
    -0.200, -0.119, -0.500
  ]
);

// fw -> front wheel
// bw -> back wheel
// rw -> right wheel
// lw -> left wheel
const fw_mat = new three.Matrix4(1, 0, 0, 0,
                                 0, 1, 0, 0.8,
                                 0, 0, 1, 0.2,
                                 0, 0, 0, 1);
const bw_mat = new three.Matrix4(1, 0, 0, 0,
                                 0, 1, 0, -0.8,
                                 0, 0, 1, 0.2,
                                 0, 0, 0, 1);
const rw_mat = new three.Matrix4(1, 0, 0, 0.8,
                                 0, 1, 0, 0,
                                 0, 0, 1, 0,
                                 0, 0, 0, 1);
const lw_mat = new three.Matrix4(1, 0, 0, -0.8,
                                 0, 1, 0, 0,
                                 0, 0, 1, 0,
                                 0, 0, 0, 1);

// just in case I try to build another kart
let kart_already_built = false
let kart

// build and return a kart object
// kart container
// |-- kart body mesh
// |-- front right wheel container
//     |-- front right wheel mesh
// |-- front left wheel container
//     |-- front left wheel mesh
// |-- back right wheel container
//     |-- back right wheel mesh
// |-- back left wheel container
//     |-- back left wheel mesh
export const kart_mesh_index = {
  BODY_MESH: 0,
  FRW_MESH: 1,
  FLW_MESH: 2,
  BRW_MESH: 3,
  BLW_MESH: 4,
  POWUP1: 5, // triple projectile
  POWUP2: 6, // single bomb
  POWUP3: 7, // mushroom
  POWUP4: 8, // triple mushroom
}

export function build_kart(scene) {
  // check if the kart was already built
  if (kart_already_built == true) return;
  
  // build the kart
  
  // kart container
  let temp, wheel_container, wheel, geometry, material
  kart = new three.Object3D(); kart.name = "kart container"
  kart.position.z = 0.5
  
  // kart mesh
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(body_vertices, 3))
  geometry.computeVertexNormals()
  material = new three.MeshStandardMaterial({color: 0xFF0000})
  temp = new three.Mesh(geometry, material); temp.name = "kart body mesh"
  temp.position.z = -0.5
  kart.add(temp)
  
  // single wheel geometry/material
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(wheel_vertices, 3))
  geometry.computeVertexNormals()
  material = new three.MeshStandardMaterial({color: 0x00FF00})
  
  // front/back wheels
  let container
  container = new three.Object3D(); container.name = "Front right wheel container"
  temp = new three.Mesh(geometry, material); temp.name = "Front right wheel mesh"
  container.add(temp); kart.add(container)
  container = new three.Object3D(); container.name = "Front left wheel container"
  temp = new three.Mesh(geometry, material); temp.name = "Front left wheel mesh"
  container.add(temp); kart.add(container)
  container = new three.Object3D(); container.name = "Back right wheel container"
  temp = new three.Mesh(geometry, material); temp.name = "Back right wheel mesh"
  container.add(temp); kart.add(container)
  container = new three.Object3D(); container.name = "Back left wheel container"
  temp = new three.Mesh(geometry, material); temp.name = "Back left wheel mesh"
  container.add(temp); kart.add(container)
  
  // setup the wheels first position
  let position = new three.Vector3()
  temp = fw_mat.clone().multiply(rw_mat)
  kart.children[kart_mesh_index.FRW_MESH].position.setFromMatrixPosition(temp)
  temp = fw_mat.clone().multiply(lw_mat)
  kart.children[kart_mesh_index.FLW_MESH].position.setFromMatrixPosition(temp)
  temp = bw_mat.clone().multiply(rw_mat)
  kart.children[kart_mesh_index.BRW_MESH].position.setFromMatrixPosition(temp)
  temp = bw_mat.clone().multiply(lw_mat)
  kart.children[kart_mesh_index.BLW_MESH].position.setFromMatrixPosition(temp)
  
  // add the powerup meshes
  
  // "triple shell"
  let mesh
  container = new three.Object3D(); container.name = "triple shell container"; kart.add(container)
  container.position.y = -0.9; container.visible = false
  // shell 1
  temp = new three.Object3D(); temp.name = "shell 1 container"; container.add(temp)
  temp.position.y = -2.5; temp.position.z = 0.7; 
  mesh = powerup_funcs.build_single_projectile(); temp.add(mesh)
  // shell 2
  temp = new three.Object3D(); temp.name = "shell 2 container"; container.add(temp)
  temp.position.x = -2.165; temp.position.y = 1.25; temp.position.z = 0.7; temp.rotation.z = - 2 * Math.PI / 3
  mesh = powerup_funcs.build_single_projectile(); temp.add(mesh)
  // shell 3
  temp = new three.Object3D(); temp.name = "shell 3 container"; container.add(temp)
  temp.position.x = 2.165; temp.position.y = 1.25; temp.position.z = 0.7; temp.rotation.z = 2 * Math.PI / 3
  mesh = powerup_funcs.build_single_projectile(); temp.add(mesh)
  
  // "bomb"
  mesh = powerup_funcs.build_bomb_projectile()
  mesh.position.y = -2.5; mesh.position.z = 0.5; 
  mesh.visible = false
  kart.add(mesh)
  
  // "mushroom"
  mesh = powerup_funcs.build_speedup_power()
  mesh.position.y = -2.5; mesh.position.z = 0.5;  mesh.rotation.z = Math.PI / 2; 
  mesh.visible = false
  kart.add(mesh)
  
  // "triple mushroom"
  container = new three.Object3D(); container.name = "triple speedup container"; kart.add(container)
  container.position.y = -0.9; container.visible = false
  // mushrrom 1
  temp = new three.Object3D(); temp.name = "speedup 1 container"; container.add(temp)
  temp.position.y = -2.5; temp.position.z = 0.7; temp.rotation.z = Math.PI / 2
  mesh = powerup_funcs.build_speedup_power(); temp.add(mesh)
  // mushrrom 2
  temp = new three.Object3D(); temp.name = "speedup 2 container"; container.add(temp)
  temp.position.x = -2.165; temp.position.y = 1.25; temp.position.z = 0.7
  temp.rotation.z = (- 2 * Math.PI / 3) + (Math.PI / 2)
  mesh = powerup_funcs.build_speedup_power(); temp.add(mesh);
  // mushrrom 3
  temp = new three.Object3D(); temp.name = "speedup 3 container"; container.add(temp)
  temp.position.x = 2.165; temp.position.y = 1.25; temp.position.z = 0.7
  temp.rotation.z = (2 * Math.PI / 3) + (Math.PI / 2)
  mesh = powerup_funcs.build_speedup_power(); temp.add(mesh);
  
  // done!
  kart.userData["powerup_active"] = 0
  kart.userData["powerup_uses_left"] = 0
  kart.position.z -= 0.2;
  return kart
}

// some variables to handle the kart velocity and direction
const time_dif = 0.1
let last_velocity = 0
const max_velocity = 4
let powerup_speed = false
export let vec_pos_inc = new three.Vector3(0, 0, 0)
const velocity_dif = 0.02
export const actions = {
  FORWARDS: 0,
  BACKWARDS: 1,
  IDLE: 2,
  LEFT: 3,
  RIGHT: 4
}

export function get_last_velocity() {return last_velocity}

// for some collision operations
export function set_velocity_to_opposite() {
  let modifier = Math.abs(last_velocity)
  if (modifier < 1) modifier = 1
  if (last_velocity > 0) last_velocity = - modifier
  else if (last_velocity < 0) last_velocity = modifier
}

// for speed powerup
export function set_velocity_to_max_double() {
  last_velocity = 2 * max_velocity
}

// function to accelerate the kart in the direction it is facing
export function update_velocity(action_num) {
  // accelerate forwards/backwards
  // and stop motion slowly in idle
  if (action_num == actions.FORWARDS) {
    if (last_velocity < 0) last_velocity += 5 * velocity_dif
    else
      if (last_velocity < max_velocity)
        last_velocity += velocity_dif
      else
        last_velocity -= 0.01
  }
  else if (action_num == actions.BACKWARDS) {
    if (last_velocity > 0) last_velocity -= 5 * velocity_dif
    else
      if (last_velocity > -max_velocity)
        last_velocity -= velocity_dif
  }
  // reduce velocity to 0
  else if (action_num == actions.IDLE && last_velocity != 0) {
    if (last_velocity > 2 * velocity_dif)
      last_velocity -= velocity_dif
    else if (last_velocity < -2 * velocity_dif)
      last_velocity += velocity_dif
    else
      last_velocity = 0
  }
  
  // apply the XYZ position increment (only on XY)
  vec_pos_inc.x = Math.cos(kart.rotation.z + Math.PI / 2) * (last_velocity * time_dif)
  vec_pos_inc.y = Math.sin(kart.rotation.z + Math.PI / 2) * (last_velocity * time_dif)
  vec_pos_inc.z = 0
  
  // modify wheels rotation
  if (last_velocity != 0) {
    // front wheels
    kart.children[kart_mesh_index.FRW_MESH].children[0].rotation.x += -(last_velocity * time_dif)
    kart.children[kart_mesh_index.FLW_MESH].children[0].rotation.x += -(last_velocity * time_dif)    
    // back wheels
    kart.children[kart_mesh_index.BRW_MESH].children[0].rotation.x += -(last_velocity * time_dif)
    kart.children[kart_mesh_index.BLW_MESH].children[0].rotation.x += -(last_velocity * time_dif)
  }
  
  // update kart position
  kart.position.add(vec_pos_inc)
}

// function to calculate the object's velocity
function calc_angle_dif(velocity) {
  if (velocity < 0) return
  return 0.1 * Math.sqrt(velocity) * Math.pow(Math.E, -velocity)
}

// function to change the kart's direction
export function update_direction(action_num) {
  // turn the kart right/left if there is a velocity diferent than 0
  // function to be used to change the turning depending on the velocity will be
  // 0.1 * sqrt(|vel|) * e^(-|vel|)
  const const1 = 0.1
  let angle_dif = 0 
  if (action_num == actions.RIGHT || action_num == actions.LEFT) {
    if (action_num == actions.RIGHT) {
      // turn right if velocity is positive, else turn left
      if (last_velocity > 0) angle_dif = - calc_angle_dif(last_velocity)
      else if (last_velocity < 0) angle_dif = calc_angle_dif(-last_velocity)
      // turn right
      if (kart.children[kart_mesh_index.FRW_MESH].rotation.z > -Math.PI / 8) {
        kart.children[kart_mesh_index.FRW_MESH].rotation.z -= const1
        kart.children[kart_mesh_index.FLW_MESH].rotation.z -= const1
      }
    }
    if (action_num == actions.LEFT) {
      // turn left if velocity is positive, else turn right
      if (last_velocity > 0) angle_dif = calc_angle_dif(last_velocity)
      else if (last_velocity < 0)  angle_dif = - calc_angle_dif(-last_velocity)
      // turn left
      if (kart.children[kart_mesh_index.FRW_MESH].rotation.z < Math.PI / 8) {
        kart.children[kart_mesh_index.FRW_MESH].rotation.z += const1
        kart.children[kart_mesh_index.FLW_MESH].rotation.z += const1
      }
    }
  } else {
    // rotate the wheels (turn angle * spin angle * base position)
    if (kart.children[kart_mesh_index.FRW_MESH].rotation.z > const1) {
      kart.children[kart_mesh_index.FRW_MESH].rotation.z -= const1
      kart.children[kart_mesh_index.FLW_MESH].rotation.z -= const1
    } else if (kart.children[kart_mesh_index.FRW_MESH].rotation.z < -const1) {
      kart.children[kart_mesh_index.FRW_MESH].rotation.z += const1
      kart.children[kart_mesh_index.FLW_MESH].rotation.z += const1
    }
  }
  
  // rotate the kart
  kart.rotation.z += angle_dif
}

// get the front vector of the kart
export function get_front_vector() {
  return (new three.Vector3(Math.cos(kart.rotation.x), Math.sin(kart.rotation.y), 0)).add(kart.position)
}
