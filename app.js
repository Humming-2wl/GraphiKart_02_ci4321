import * as three from "three"
import * as kart_funcs from "./kart_funcs.js"
import * as track_funcs from "./track_funcs.js"
import * as collision_funcs from "./collision_funcs.js"
import * as powerup_funcs from "./powerup_funcs.js"
import * as powerup_box_funcs from "./powerup_box_funcs.js"
import * as skybox_funcs from "./skybox_funcs.js"
import * as layout_funcs from "./layout_funcs.js"
import * as falling_blocks_funcs from "./falling_blocks.js"

const scene = new three.Scene()
scene.background = new three.Color(0x0000FF)
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
// add to the camera the UI stuff
let ui_layout = layout_funcs.build_ui()
camera.add(ui_layout)

const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = three.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

// make the kart
const kart = kart_funcs.build_kart(scene)
scene.add(kart)
kart.add(camera)

// add the track
let track = track_funcs.build_track()
scene.add(track)

// walls
let wall
wall = collision_funcs.build_cube_collision()
wall.position.y = 100.5; wall.scale.z = 4; wall.scale.x = 202; wall.scale.y = 10; scene.add(wall)
wall.material.map.repeat = new three.Vector2(25, 0.5)
wall.material.normalMap.repeat = new three.Vector2(25, 0.5)
wall.material.map.needsUpdate = true
wall = collision_funcs.build_cube_collision()
wall.position.y = -100.5; wall.scale.z = 4; wall.scale.x = 202; wall.scale.y = 10; scene.add(wall)
wall.material.map.repeat = new three.Vector2(25, 0.5)
wall.material.normalMap.repeat = new three.Vector2(25, 0.5)
wall.material.map.needsUpdate = true
wall = collision_funcs.build_cube_collision()
wall.position.x = 100.5; wall.scale.z = 4; wall.scale.y = 202; wall.scale.x = 10; scene.add(wall)
wall.material.map.repeat = new three.Vector2(25, 0.5)
wall.material.normalMap.repeat = new three.Vector2(25, 0.5)
wall.material.map.needsUpdate = true
wall = collision_funcs.build_cube_collision()
wall.position.x = -100.5; wall.scale.z = 4; wall.scale.y = 202; wall.scale.x = 10; scene.add(wall)
wall.material.map.repeat = new three.Vector2(25, 0.5)
wall.material.normalMap.repeat = new three.Vector2(25, 0.5)
wall.material.map.needsUpdate = true

// some destroyable objects
let obstacle
const max_num_tetris_blocks = 100
let num_tetris_blocks = 0
for (let i = 0; i < 30; i++) {
  obstacle = falling_blocks_funcs.build_tetris_block()
  obstacle.position.x = (Math.random() * 200) - 100
  obstacle.position.y = (Math.random() * 200) - 100
  obstacle.position.z = 10 + (Math.random() * 20)
  obstacle.userData["collision_type"] = collision_funcs.type.DAMAGE_CAR
  scene.add(obstacle)
  num_tetris_blocks += 1
}

// some mud pits
for (let i = 0, tmp = 0; i < 15; i++, tmp += 0.001) {
  obstacle = collision_funcs.build_mud_pit()
  obstacle.position.x = (Math.random() * 200) - 100
  obstacle.position.y = (Math.random() * 200) - 100
  obstacle.scale.x = 15 + (Math.random() * 15)
  obstacle.scale.y = obstacle.scale.x
  obstacle.scale.z = 0.2 + tmp
  obstacle.position.z = obstacle.scale.z / 3
  obstacle.receiveShadow = true
  obstacle.name = "mud pit"
  obstacle.material.map.repeat = new three.Vector2(obstacle.scale.x / 10, obstacle.scale.x / 10)
  obstacle.material.normalMap.repeat = new three.Vector2(obstacle.scale.x / 10, obstacle.scale.x / 10)
  obstacle.material.map.needsUpdate = true
  scene.add(obstacle)
}

// powerup boxes
let powerup_box
for (let i = 0; i < 20; i++) {
  powerup_box = powerup_box_funcs.build_powerup_box()
  powerup_box.position.x = (Math.random() * 200) - 100
  powerup_box.position.y = (Math.random() * 200) - 100
  scene.add(powerup_box)
}

// skybox
let skybox = skybox_funcs.build_skybox()
scene.add(skybox)

// directional light
const dir_light = new three.DirectionalLight(0x606060, 10)
dir_light.position.set(0, 0, 10)
dir_light.target.position.set(0, 0, 0);
//~ dir_light.castShadow = true
scene.add(dir_light)

// ambient light
const ambient_light = new three.AmbientLight(0x222222, Math.PI)
scene.add(ambient_light)

// point light (follows car)
const point_light = new three.PointLight(0xA0A0A0, 1200, 100000)
point_light.position.set(0, 0, 14)
point_light.castShadow = true
point_light.shadow.mapSize.width = 256
point_light.shadow.mapSize.height = 256
kart.add(point_light)
const point_light2= new three.PointLight(0x202020, 1, 100000)
point_light.position.set(0, -10, 10)
kart.add(point_light2)

//~ const helper = new three.DirectionalLightHelper(dir_light)
//~ scene.add(helper)

//~ let tmp = new three.Mesh(new three.TorusGeometry(), new three.MeshBasicMaterial())
//~ tmp.castShadow = true
//~ tmp.position.z = 2
//~ scene.add(tmp)

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
let do_damage_animation = false
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
  if (collision_type == collision_funcs.type.DAMAGE_CAR
      || collision_type == collision_funcs.type.PROJECTILE)
    do_damage_animation = true
  
  if (do_damage_animation == true) {
    if (spins3_angle <= 0) {
      spins3_angle = max_spin_angle
      angle_inc *= -1
      do_damage_animation = false
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
  if (keyboard[" "] == true && collision_type != collision_funcs.type.DAMAGE_CAR
      && kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] == false) {
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
      else if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP5)
        kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = true
    }
    keyboard[" "] = false
    if (kart.userData["powerup_uses_left"] == 0)
      ui_layout.children[0].material.map = layout_funcs.powerup_textures[0]
  }
  
  // hammer powerup animation
  if (kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] == true
      && kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] < 500) {
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.x = Math.PI / 2
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.y += 0.2
    kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] += 1
  } else {
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.x = 0
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.y = 0
    kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
  }
  
  // update powerup display
  //~ console.log(kart.userData["powerup_active"])
  //~ console.log(kart.userData["powerup_uses_left"])
  if (kart.userData["powerup_active"] >= kart_funcs.kart_mesh_index.POWUP1
      && kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] == false)
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
  if (kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] == false)
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.z += 0.05
  else
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.z = Math.PI / 2
  if (kart.children[kart_funcs.kart_mesh_index.POWUP1].rotation.z > Math.PI)
    kart.children[kart_funcs.kart_mesh_index.POWUP1].rotation.z = - Math.PI
  if (kart.children[kart_funcs.kart_mesh_index.POWUP4].rotation.z > Math.PI)
    kart.children[kart_funcs.kart_mesh_index.POWUP4].rotation.z = - Math.PI
  if (kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.z > Math.PI)
    kart.children[kart_funcs.kart_mesh_index.POWUP5].rotation.z = - Math.PI
    
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
    if (kart.children[0].material.emissive.r >= 1.0) kart.children[0].material.emissive.r = 0
    if (kart.children[0].material.emissive.g >= 1.0) kart.children[0].material.emissive.g = 0
    if (kart.children[0].material.emissive.b >= 1.0) kart.children[0].material.emissive.b = 0
    kart.children[0].material.emissive.r += 0.01
    kart.children[0].material.emissive.g += 0.03
    kart.children[0].material.emissive.b += 0.05
    if (keyboard["1"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP1
      kart.userData["powerup_uses_left"] = 3
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] = 0
      ui_layout.children[0].material.map = layout_funcs.powerup_textures[1]
    }
    else if (keyboard["2"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP2
      kart.userData["powerup_uses_left"] = 1
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] = 0
      ui_layout.children[0].material.map = layout_funcs.powerup_textures[2]
    }
    else if (keyboard["3"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP3
      kart.userData["powerup_uses_left"] = 1
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] = 0
      ui_layout.children[0].material.map = layout_funcs.powerup_textures[3]
    }
    else if (keyboard["4"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP4
      kart.userData["powerup_uses_left"] = 3
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] = 0
      ui_layout.children[0].material.map = layout_funcs.powerup_textures[4]
    }
    else if (keyboard["5"] == true) {
      kart.children[kart_funcs.kart_mesh_index.POWUP1].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP2].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP3].visible = false
      kart.children[kart_funcs.kart_mesh_index.POWUP4].visible = false
      kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP5
      kart.userData["powerup_uses_left"] = 1
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
      kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] = 0
      ui_layout.children[0].material.map = layout_funcs.powerup_textures[5]
    }
    else if (keyboard["p"] == true) {
      layout_funcs.update_total_score(1)
    }
  } else {
    kart.children[0].material.emissive.r = 0
    kart.children[0].material.emissive.g = 0
    kart.children[0].material.emissive.b = 0
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
    camera.position.y = -7
    camera.position.z = 2.5
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
let collision_type, is_there_collision
function update_collision()
{
  // with the kart
  let obj
  is_there_collision = false
  for (let i = 0; i < scene.children.length; i++)
    if (collision_funcs.is_kart_colliding_with_obj(kart, scene.children[i])) {
      is_there_collision = true
      if (collision_type != collision_funcs.type.DAMAGE_CAR || collision_type != collision_funcs.type.PROJECTILE)
        collision_type = collision_funcs.update_kart_given_collision(kart, scene.children[i])
      obj = scene.children[i]
      break
    }
  
  // is there any kind of collision
  if (is_there_collision == false)
    collision_type = collision_funcs.type.NONE
  
  // if on mud collision, set the respective kart variable
  if (collision_type == collision_funcs.type.MUD_PIT)
    kart.userData["dir_modifier"] = kart_funcs.kart_dir_modifier.MUD
  else
    kart.userData["dir_modifier"] = kart_funcs.kart_dir_modifier.NORMAL
  
  // destroy the projectile if it hits the car
  if (collision_type == collision_funcs.type.PROJECTILE) {
    let boom = collision_funcs.build_boom_plane()
    boom.position.x = kart.position.x
    boom.position.y = kart.position.y
    boom.position.z = kart.position.z
    boom.scale.x = 8; boom.scale.y = 8; boom.scale.z = 8
    boom.rotation.z = kart.rotation.z
    scene.add(boom)
    scene.remove(obj)
  }
    
  // check if a projectile collides with anything else, if so, destroy it
  for (let i = 0; i < scene.children.length; i++)
    if (scene.children[i].userData["collision_type"] == collision_funcs.type.PROJECTILE) {
      let projectile = scene.children[i]
      for (let j = 0; j < scene.children.length; j++) {
        if (i != j && collision_funcs.is_projectile_colliding_with_obj(projectile, scene.children[j]))
        {
          if (scene.children[j].userData["collision_type"] == collision_funcs.type.STOP_CAR)
          {
            let boom = collision_funcs.build_boom_plane()
            boom.position.x = projectile.position.x
            boom.position.y = projectile.position.y
            boom.position.z = projectile.position.z
            boom.scale.x = projectile.scale.x
            boom.scale.y = projectile.scale.y
            boom.scale.z = projectile.scale.z
            boom.rotation.z = kart.rotation.z
            scene.add(boom)
            scene.remove(projectile)
          }
          else
          {
            // show a boom plane for a few seconds
            let boom = collision_funcs.build_boom_plane()
            boom.position.x = scene.children[j].position.x
            boom.position.y = scene.children[j].position.y
            boom.position.z = scene.children[j].position.z
            boom.scale.x = scene.children[j].scale.x * 3
            boom.scale.y = scene.children[j].scale.y * 3
            boom.scale.z = scene.children[j].scale.z * 3
            boom.rotation.z = kart.rotation.z
            if (scene.children[j].name == "tetris") num_tetris_blocks -= 1
            scene.add(boom)
            scene.remove(projectile)
            scene.remove(scene.children[j])
            layout_funcs.update_total_score(5 + Math.floor(Math.random() * 5))
          }
          break
        }
      }
    }
    
  // check hammer
  let hammer = kart.children[kart_funcs.kart_mesh_index.POWUP5]
  if (hammer.userData["in_use"] == true) {
    for (let i = 0; i < scene.children.length; i++)
      if (scene.children[i].userData["collision_type"] != collision_funcs.type.STOP_CAR
          && collision_funcs.is_projectile_colliding_with_obj(hammer, scene.children[i]) == true) {
        let boom = collision_funcs.build_boom_plane()
        boom.position.x = scene.children[i].position.x
        boom.position.y = scene.children[i].position.y
        boom.position.z = scene.children[i].position.z
        boom.scale.x = scene.children[i].scale.x
        boom.scale.y = scene.children[i].scale.y
        boom.scale.z = scene.children[i].scale.z
        boom.rotation.z = kart.rotation.z
        scene.add(boom)
        scene.remove(scene.children[i])
        layout_funcs.update_total_score(5 + Math.floor(Math.random() * 10))
        break
      }
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
          kart.userData["powerup_active"] = kart_funcs.kart_mesh_index.POWUP1 + Math.floor(Math.random() * 4.9999)
          if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP1
              || kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP4)
            kart.userData["powerup_uses_left"] = 3
          else
            kart.userData["powerup_uses_left"] = 1
          if (kart.userData["powerup_active"] == kart_funcs.kart_mesh_index.POWUP5) {
            kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["in_use"] = false
            kart.children[kart_funcs.kart_mesh_index.POWUP5].userData["use_time"] = 0
          }
        
          // change the ui_layout item
          let tmp = kart.userData["powerup_active"] - kart_funcs.kart_mesh_index.POWUP1 + 1
          ui_layout.children[0].material.map = layout_funcs.powerup_textures[tmp]
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

// update skybox (moving uv)
const uv_vref = skybox.children[0].geometry.attributes.uv.getY(0)
function update_skybox()
{ 
  let uv = skybox.children[0].geometry.attributes.uv
  if (uv.getY(0) - uv_vref >= 1)
    for (let i = 0; i < uv.count; i++)
      uv.setY(i, uv.getY(i) - 1)
  else
    for (let i = 0; i < uv.count; i++)
      uv.setY(i, uv.getY(i) + 0.0005)
  uv.needsUpdate = true
}

// update the "boom" animation of destroyable objects
function update_destroyed_anim()
{
  for (let i = 0; i < scene.children.length; i++)
    if (scene.children[i].name == "boom plane") {
      if (scene.children[i].userData["show_time"] <= collision_funcs.max_destroyed_time) {
        collision_funcs.update_boom_anim(scene.children[i])
        scene.children[i].userData["show_time"] += 1
      } else
        scene.remove(scene.children[i])
    }
}

// add more tetris blocks!
const max_time = 100
let cur_max_time = 100
let timer = 0
const max_update_pos_time = 30
let cur_update_pos_time = 30
let created_tetris_blocks = 0
function update_tetris()
{
  // add new tetris block
  let tetris
  if (timer >= cur_max_time && num_tetris_blocks <= max_num_tetris_blocks) {
    timer = 0
    tetris = falling_blocks_funcs.build_tetris_block()
    tetris.position.x = (Math.random() * 200) - 100
    tetris.position.y = (Math.random() * 200) - 100
    tetris.position.z = 80
    tetris.userData["collision_type"] = collision_funcs.type.DAMAGE_CAR
    scene.add(tetris)
    created_tetris_blocks += 1
    num_tetris_blocks += 1
    //~ console.log("%d %d\n", cur_update_pos_time, num_tetris_blocks)
    if (created_tetris_blocks >= 10) {
      created_tetris_blocks = 0
      if (cur_max_time > 3)
        cur_max_time -= 3
      if (cur_update_pos_time > 1)
        cur_update_pos_time -= 1
    }
  }
  
  // update all tetris blocks positions (compare only agaisnt the ground)
  if (timer % cur_update_pos_time == 0 && timer != 0)
    for (let i = 0; i < scene.children.length; i++) {
      tetris = scene.children[i]
      if (tetris.name == "tetris" && collision_funcs.is_tetris_colliding_with_obj(tetris, track) == false)
        tetris.position.z -= 1
    }
  
  // increase timer
  timer += 1
}

// update ui stuff
function update_ui()
{
  // speed meter
  let speed_meter_mod = (kart_funcs.last_velocity / kart_funcs.max_velocity) * 0.25
  if (speed_meter_mod < 0) speed_meter_mod *= -1
  camera.children[0].children[1].children[0].material.map.offset.y = 0.5 - speed_meter_mod
  
  // score board
  layout_funcs.update_score_board_ui()
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
  // update destroyed animation
  update_destroyed_anim()
  // update skybox
  update_skybox()
  // update tetris
  update_tetris()
  // update the ui
  update_ui()
  // update scene
  renderer.render(scene, camera)
}

// set it so that mainloop is executed always
renderer.setAnimationLoop(mainloop)
