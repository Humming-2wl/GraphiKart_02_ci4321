import * as three from "three"
import * as kart_funcs from "./kart_funcs.js"
import * as track_funcs from "./track_funcs.js"
import * as collision_funcs from "./collision_funcs.js"
import * as powerup_funcs from "./powerup_funcs.js"
import * as powerup_box_funcs from "./powerup_box_funcs.js"

const scene = new three.Scene()
scene.background = new three.Color(0x0000FF)
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)

const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// make the kart
const kart = kart_funcs.build_kart(scene)
scene.add(kart)
kart.add(camera)

// add the track
scene.add(track_funcs.build_track())

// walls
let wall
wall = collision_funcs.build_cube_collision()
wall.position.y = 100.5; wall.scale.z = 4; wall.scale.x = 202; wall.scale.y = 10; scene.add(wall)
wall = collision_funcs.build_cube_collision()
wall.position.y = -100.5; wall.scale.z = 4; wall.scale.x = 202; wall.scale.y = 10; scene.add(wall)
wall = collision_funcs.build_cube_collision()
wall.position.x = 100.5; wall.scale.z = 4; wall.scale.y = 202; wall.scale.x = 10; scene.add(wall)
wall = collision_funcs.build_cube_collision()
wall.position.x = -100.5; wall.scale.z = 4; wall.scale.y = 202; wall.scale.x = 10; scene.add(wall)

// some obstacles
let obstacle
for (let i = 0; i < 30; i++) {
  obstacle = collision_funcs.build_cube_collision_destroyable()
  obstacle.position.x = (Math.random() * 200) - 100
  obstacle.position.y = (Math.random() * 200) - 100
  obstacle.scale.x = 1 + Math.random() * 30
  obstacle.scale.y = 1 + Math.random() * 30
  obstacle.scale.z = 1 + Math.random() * 30
  scene.add(obstacle)
}

// powerup boxes
let powerup_box
for (let i = 0; i < 10; i++) {
  powerup_box = powerup_box_funcs.build_powerup_box()
  powerup_box.position.x = (Math.random() * 250) - 150
  powerup_box.position.y = (Math.random() * 250) - 150
  scene.add(powerup_box)
}

// light source
const dir_light = new three.DirectionalLight(0xFFFFFF, Math.PI)
dir_light.position.set(0, 0, 10)
dir_light.castShadow = true
scene.add(dir_light)
const ambient_light = new three.AmbientLight(0x303030, Math.PI)
scene.add(ambient_light)
const point_light = new three.PointLight(0xA0A0A0, 10, 100000)
point_light.castShadow = true
kart.add(point_light)
//~ const helper = new three.DirectionalLightHelper(light)
//~ scene.add(helper)

// react to keyboard input
let keyboard = {}
document.addEventListener("keydown", function(event) {keyboard[event.key] = true})
document.addEventListener("keyup", function(event) {keyboard[event.key] = false})

// update the kart's position/properties on keyboard input
const max_spin_angle = 4 * 2 * Math.PI
let spins3_angle = max_spin_angle
let og_z_angle = 0
let angle_inc = 0.6
let increase = false
function update_kart()
{
  // update the velocity
  if ((keyboard["w"] == true || keyboard["s"] == true) && collision_type != collision_funcs.type.DAMAGE_CAR) {
    if (keyboard["w"] == true) kart_funcs.update_velocity(kart_funcs.actions.FORWARDS);
    if (keyboard["s"] == true) kart_funcs.update_velocity(kart_funcs.actions.BACKWARDS);
  } else kart_funcs.update_velocity(kart_funcs.actions.IDLE);
  // update direction
  if ((keyboard["a"] == true || keyboard["d"] == true) && collision_type != collision_funcs.type.DAMAGE_CAR) {
    if (keyboard["a"] == true) kart_funcs.update_direction(kart_funcs.actions.LEFT);
    if (keyboard["d"] == true) kart_funcs.update_direction(kart_funcs.actions.RIGHT);
  } else kart_funcs.update_direction(kart_funcs.actions.IDLE);
  
  // update collision animation
  if (collision_type == collision_funcs.type.DAMAGE_CAR)
  {    
    if (spins3_angle <= 0) {
      spins3_angle = max_spin_angle
      angle_inc *= -1
      collision_type = collision_funcs.type.NONE
      kart.children[0].rotation.z = 0
      kart.children[1].rotation.z = 0
      kart.children[2].rotation.z = 0
      kart.children[3].rotation.z = 0
      kart.children[4].rotation.z = 0
    }
    else
    {
      if (spins3_angle > 0) {
        kart.children[0].rotation.z += angle_inc
        kart.children[1].rotation.z += angle_inc
        kart.children[2].rotation.z += angle_inc
        kart.children[3].rotation.z += angle_inc
        kart.children[4].rotation.z += angle_inc
        spins3_angle -= Math.abs(angle_inc)
      }
    }
  }
  
  // update powerup usage
  if (keyboard[" "] == true && collision_type != collision_funcs.type.DAMAGE_CAR) {
    kart.userData["powerup_uses_left"]--
    if (kart.userData["powerup_uses_left"] < 0) {
      kart.userData["powerup_uses_left"] = 0
    } else {    
      let obj
      if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP1) {
        obj = powerup_funcs.build_single_projectile_throw(kart)
        scene.add(obj)
      }
      else if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP2) {
        obj = powerup_funcs.build_bomb_projectile_throw(kart)
        scene.add(obj)
      }
      else if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP3
               || kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP4) {
        kart_funcs.set_velocity_to_max_double()
        camera.fov = 90
        camera.updateProjectionMatrix()
      }
    }
    keyboard[" "] = false
  }
  
  // update powerup display
  //~ console.log(kart.userData["powerup_active"])
  //~ console.log(kart.userData["powerup_uses_left"])
  if (kart.userData["powerup_active"] >= kart_funcs.kart_mesh_index.POWUP1)
  {
    if (kart.userData["powerup_uses_left"] <= 0) {
      kart.children[kart.userData["powerup_active"]].visible = false
      kart.userData["powerup_active"] = 0
    } else {
      kart.children[kart.userData["powerup_active"]].visible = true
    }
    if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP1
        || kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP4)
      for (let i = 0; i < 3; i++)
        if (i < kart.userData["powerup_uses_left"])
          kart.children[kart.userData["powerup_active"]].children[i].visible = true
        else
          kart.children[kart.userData["powerup_active"]].children[i].visible = false
  }
  
  // update projectile animation
  kart.children[kart_funcs.kart_mesh_index.POWUP1].rotation.z += 0.05
  kart.children[kart_funcs.kart_mesh_index.POWUP4].rotation.z += 0.05
  if (kart.children[kart_funcs.kart_mesh_index.POWUP1].rotation.z > Math.PI)
    kart.children[kart_funcs.kart_mesh_index.POWUP1].rotation.z = - Math.PI
  if (kart.children[kart_funcs.kart_mesh_index.POWUP4].rotation.z > Math.PI)
    kart.children[kart_funcs.kart_mesh_index.POWUP4].rotation.z = - Math.PI
    
  // small kart animation
  if (increase) {
    kart.children[0].scale.z += 0.002
    kart.children[1].scale.z += 0.002
    kart.children[2].scale.z += 0.002
    kart.children[3].scale.z += 0.002
    kart.children[4].scale.z += 0.002
    if (kart.children[0].scale.z >= 1.01)
      increase = false
  } else {
    kart.children[0].scale.z -= 0.002
    kart.children[1].scale.z -= 0.002
    kart.children[2].scale.z -= 0.002
    kart.children[3].scale.z -= 0.002
    kart.children[4].scale.z -= 0.002
    if (kart.children[0].scale.z <= 0.98)
      increase = true
  }
  
  // god mode
  if (keyboard["g"] == true)
  {
    if (kart.children[0].material.color.r >= 1.0) kart.children[0].material.color.r = 0
    if (kart.children[0].material.color.g >= 1.0) kart.children[0].material.color.g = 0
    if (kart.children[0].material.color.b >= 1.0) kart.children[0].material.color.b = 0
    kart.children[0].material.color.r += 0.01
    kart.children[0].material.color.g += 0.03
    kart.children[0].material.color.b += 0.05
    if (keyboard["1"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP1
      kart.userData["powerup_uses_left"] = 3
    }
    else if (keyboard["2"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP2
      kart.userData["powerup_uses_left"] = 1
    }
    else if (keyboard["3"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP3
      kart.userData["powerup_uses_left"] = 1
    }
    else if (keyboard["4"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP4
      kart.userData["powerup_uses_left"] = 3
    }
  } else {
    kart.children[0].material.color.r = 1.0
    kart.children[0].material.color.g = 0.0
    kart.children[0].material.color.b = 0.0
  }
}

// update the camera
const camera_type = {
  THIRD_PERSON: 0,
  FIRST_PERSON_FRONT: 1,
  FIRST_PERSON_BACK: 2,
}
let cam_type = camera_type.THIRD_PERSON
function update_camera()
{
  // the "n" key sets first person
  // the "m" key sets third person
  if (keyboard["b"] == true) cam_type = camera_type.THIRD_PERSON
  if (keyboard["n"] == true) cam_type = camera_type.FIRST_PERSON_FRONT
  if (keyboard["m"] == true) cam_type = camera_type.FIRST_PERSON_BACK
  
  // setup the camera
  let cam_mat = kart.matrix.clone()
  let rot_euler = (new three.Euler(0, 0, 0, "XYZ")).setFromRotationMatrix(cam_mat, "XYZ")
  let position = (new three.Vector3(0, 0, 0)).setFromMatrixPosition(cam_mat)
  if (cam_type == camera_type.THIRD_PERSON) {
    camera.position.x = 0
    camera.position.y = -5
    camera.position.z = 1.5
    camera.rotation.x = Math.PI / 2
    camera.rotation.z = 0
  }
  else if (cam_type == camera_type.FIRST_PERSON_FRONT) 
  {
    camera.position.x = 0
    camera.position.y = -1
    camera.position.z = 1.5
    camera.rotation.x = Math.PI / 1.9 
    camera.rotation.z = 0
  }
  else if (cam_type == camera_type.FIRST_PERSON_BACK) {
    camera.position.x = 0
    camera.position.y = 5
    camera.position.z = 1.4
    camera.rotation.x = -Math.PI / 1.9
    camera.rotation.z = Math.PI
  }
  
  // reduce the fov to 75
  if (camera.fov > 75) {
    camera.fov -= 0.1
    camera.updateProjectionMatrix()
  }
}

// function to check the kart's collision
let collision_type
function update_collision()
{
  // with the kart
  let obj
  for (let i = 0; i < scene.children.length; i++)
    if (collision_funcs.is_kart_colliding_with_obj(kart, scene.children[i])) {
      if (collision_type != collision_funcs.type.DAMAGE_CAR)
        collision_type = collision_funcs.update_kart_given_collision(kart, scene.children[i])
      obj = scene.children[i]
      break
    }
  //~ // destroy the projectile if it hits the car
  //~ if (collision_type == collision_funcs.type.PROJECTILE)
    //~ scene.remove(obj)
    
  // check if a projectile collides with anything else, if so, destroy it
  for (let i = 0; i < scene.children.length; i++)
    if (scene.children[i].userData["collision_type"] == collision_funcs.type.PROJECTILE) {
      let projectile = scene.children[i]
      for (let j = 0; j < scene.children.length; j++)
        if (i != j && collision_funcs.is_projectile_colliding_with_obj(projectile, scene.children[j]))
          if (scene.children[j].userData["collision_type"] == collision_funcs.type.STOP_CAR)
            scene.remove(projectile)
          else
            scene.remove(scene.children[j])
    }
}

// function to update the powerup boxes each frame
function update_powerup_boxes()
{
  for (let i = 0; i < scene.children.length; i++)
    if (scene.children[i].name == "powerup box") {
      // check if there is/was collision
      let collision_condition = collision_funcs.is_kart_colliding_with_obj(kart, scene.children[i].children[1])
      if (scene.children[i].userData["collected"] != true && collision_condition) {
        scene.children[i].userData["collected"] = true
        if (kart.userData["powerup_active"] < kart_funcs.kart_mesh_index.POWUP1) {
          kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP1 + Math.floor(Math.random() * 3.9999)
          if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP1
              || kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP4)
            kart.userData["powerup_uses_left"] = 3
          else
            kart.userData["powerup_uses_left"] = 1
        }
      }
      
      // scale until 0
      if (scene.children[i].userData["collected"] == true
          && scene.children[i].children[0].scale.x > 0)
      {
        scene.children[i].children[0].scale.x -= 0.05
        scene.children[i].children[0].scale.y -= 0.05
        scene.children[i].children[0].scale.z -= 0.05
      } // make it grow to normal scale
      else if (scene.children[i].userData["collected"] == false
          && scene.children[i].children[0].scale.x < 1
          && collision_condition == false)
      {
        scene.children[i].children[0].scale.x += 0.05
        scene.children[i].children[0].scale.y += 0.05
        scene.children[i].children[0].scale.z += 0.05
      }
      
      // it can re-grow
      if (scene.children[i].children[0].scale.x <= 0 && collision_condition == false)
        scene.children[i].userData["collected"] = false
      
      // rotate by a small amount the object
      scene.children[i].children[0].rotation.z += 0.1
    }
}

// update projectiles (trayectory)
function update_projectiles()
{
  for (let i = 0; i < scene.children.length; i++)
    if (scene.children[i].userData["collision_type"] == collision_funcs.type.PROJECTILE)
      powerup_funcs.update_single_projectile_vel(scene.children[i])
}

// update the scene for the first time
renderer.render(scene, camera)

// the main function, where the magic happens
function mainloop()
{
  // update kart
  update_kart()
  // update camera
  update_camera()
  // update normal collisions
  update_collision()
  // update powerup boxes
  update_powerup_boxes()
  // update projectiles
  update_projectiles()
  // update scene
  renderer.render(scene, camera)
}

// set it so that mainloop is executed always
renderer.setAnimationLoop(mainloop)
