import * as three from "three"

const item_layout_v = new Float32Array(
  [
    1.000, -1.000, 0.000,
    -1.000, 1.000, 0.000,
    -1.000, -1.000, 0.000,
    1.000, -1.000, 0.000,
    1.000, 1.000, 0.000,
    -1.000, 1.000, 0.000,
  ]
);

const item_layout_uv = new Float32Array(
  [
    0.9999, 0.0001,
    0.0001, 0.9999,
    0.0001, 0.0001,
    0.9999, 0.0001,
    0.9999, 0.9999,
    0.0001, 0.9999,
  ]
);

export let powerup_textures = [
  (new three.TextureLoader()).load("images/powerup0.png"),
  (new three.TextureLoader()).load("images/powerup1.png"),
  (new three.TextureLoader()).load("images/powerup2.png"),
  (new three.TextureLoader()).load("images/powerup3.png"),
  (new three.TextureLoader()).load("images/powerup4.png"),
  (new three.TextureLoader()).load("images/powerup5.png")
];

const score_board_v = new Float32Array(
  [
    // lower/upper triangle
      
    // digit 1 
    -1, 1, 0,
    -1, -1, 0,
    1, -1, 0,
    
    1, -1, 0,
    1, 1, 0,
    -1, 1, 0,
    
    // digit 2
    1, 1, 0,
    1, -1, 0,
    3, -1, 0,
    
    3, -1, 0,
    3, 1, 0,
    1, 1, 0,
    
    // digit 3
    3, 1, 0,
    3, -1, 0,
    5, -1, 0,
    
    5, -1, 0,
    5, 1, 0,
    3, 1, 0,
    
    // digit 4
    5, 1, 0,
    5, -1, 0,
    7, -1, 0,
    
    7, -1, 0,
    7, 1, 0,
    5, 1, 0,
    
    // digit 5
    7, 1, 0,
    7, -1, 0,
    9, -1, 0,
    
    9, -1, 0,
    9, 1, 0,
    7, 1, 0,
    
    // digit 6
    9, 1, 0,
    9, -1, 0,
    11, -1, 0,
    
    11, -1, 0,
    11, 1, 0,
    9, 1, 0,
    
    // digit 7
    11, 1, 0,
    11, -1, 0,
    13, -1, 0,
    
    13, -1, 0,
    13, 1, 0,
    11, 1, 0,
    
    // digit 8
    13, 1, 0,
    13, -1, 0,
    15, -1, 0,
    
    15, -1, 0,
    15, 1, 0,
    13, 1, 0,
  ]
);

const score_board_initial_uv = new Float32Array(
  [
    // zero
    0.9, 1.0,
    0.9, 0.0,
    1.0, 0.0,
    
    1.0, 0.0,
    1.0, 1.0,
    0.9, 1.0,
    
    // one
    0.0, 1.0,
    0.0, 0.0,
    0.1, 0.0,
    
    0.1, 0.0,
    0.1, 1.0,
    0.0, 1.0,
    
    // two
    0.1, 1.0,
    0.1, 0.0,
    0.2, 0.0,
    
    0.2, 0.0,
    0.2, 1.0,
    0.1, 1.0,
    
    // three
    0.2, 1.0,
    0.2, 0.0,
    0.3, 0.0,
    
    0.3, 0.0,
    0.3, 1.0,
    0.2, 1.0,
    
    // four
    0.3, 1.0,
    0.3, 0.0,
    0.4, 0.0,
    
    0.4, 0.0,
    0.4, 1.0,
    0.3, 1.0,
    
    // five
    0.4, 1.0,
    0.4, 0.0,
    0.5, 0.0,
    
    0.5, 0.0,
    0.5, 1.0,
    0.4, 1.0,
    
    // six
    0.5, 1.0,
    0.5, 0.0,
    0.6, 0.0,
    
    0.6, 0.0,
    0.6, 1.0,
    0.5, 1.0,
    
    // seven
    0.6, 1.0,
    0.6, 0.0,
    0.7, 0.0,
    
    0.7, 0.0,
    0.7, 1.0,
    0.6, 1.0,
  ]
);
const digits_uvs = new Float32Array(
  [
    // zero
    0.9, 1.0,
    0.9, 0.0,
    1.0, 0.0,
    
    1.0, 0.0,
    1.0, 1.0,
    0.9, 1.0,
    
    // one
    0.0, 1.0,
    0.0, 0.0,
    0.1, 0.0,
    
    0.1, 0.0,
    0.1, 1.0,
    0.0, 1.0,
    
    // two
    0.1, 1.0,
    0.1, 0.0,
    0.2, 0.0,
    
    0.2, 0.0,
    0.2, 1.0,
    0.1, 1.0,
    
    // three
    0.2, 1.0,
    0.2, 0.0,
    0.3, 0.0,
    
    0.3, 0.0,
    0.3, 1.0,
    0.2, 1.0,
    
    // four
    0.3, 1.0,
    0.3, 0.0,
    0.4, 0.0,
    
    0.4, 0.0,
    0.4, 1.0,
    0.3, 1.0,
    
    // five
    0.4, 1.0,
    0.4, 0.0,
    0.5, 0.0,
    
    0.5, 0.0,
    0.5, 1.0,
    0.4, 1.0,
    
    // six
    0.5, 1.0,
    0.5, 0.0,
    0.6, 0.0,
    
    0.6, 0.0,
    0.6, 1.0,
    0.5, 1.0,
    
    // seven
    0.6, 1.0,
    0.6, 0.0,
    0.7, 0.0,
    
    0.7, 0.0,
    0.7, 1.0,
    0.6, 1.0,

    // eight
    0.7, 1.0,
    0.7, 0.0,
    0.8, 0.0,
    
    0.8, 0.0,
    0.8, 1.0,
    0.7, 1.0,

    // nine
    0.8, 1.0,
    0.8, 0.0,
    0.9, 0.0,
    
    0.9, 0.0,
    0.9, 1.0,
    0.8, 1.0,
  ]
);

// speed meter arrow
const speed_meter_arrow_v = new Float32Array(
  [
    0.000, -1.865, 0.000,
    0.131, 0.027, 0.000,
    -0.131, 0.027, 0.000,
    -0.131, 0.027, 0.000,
    0.131, 0.027, 0.000,
    0.000, 0.135, 0.000
  ]
);

// score
export let total_score = 0
let score_board

export function update_total_score(add)
{
  total_score += add
}

// build ui
export function build_ui()
{
  // make the visual representation of the collision
  // then the actual collision vertices inside that as a children
  let container, mesh, collision, geometry, material
  
  // container
  container = new three.Object3D()
  container.name = "ui"
  
  // current item panel
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(item_layout_v, 3))
  geometry.computeVertexNormals()
  geometry.setAttribute("uv", new three.BufferAttribute(item_layout_uv, 2))

  // load the initial texture
  material = new three.MeshBasicMaterial({map: powerup_textures[0]})
  mesh = new three.Mesh(geometry, material)
  mesh.name = "ui item"
  mesh.scale.set(0.1, 0.1, 0.1)
  let tmp = (window.innerWidth / window.innerHeight)
  mesh.position.set(-0.7 * tmp, 0.7 - 0.08, 0)
  container.add(mesh)
  
  // speed meter

  // mark
  let tex, alpha
  tex = (new three.TextureLoader()).load("images/speed_meter_mark.png")
  tex.colorSpace = three.SRGBColorSpace
  tex.repeat = new three.Vector2(1, 0.5)
  tex.offset.set(0.0, 0.5)
  alpha = (new three.TextureLoader()).load("images/speed_meter_alpha.png")
  material = new three.MeshBasicMaterial({map: tex, alphaMap: alpha, transparent: true})
  mesh = new three.Mesh(geometry, material)
  mesh.name = "ui speed meter"
  mesh.scale.set(0.3, 0.3, 0.3)
  mesh.position.set(0.57 * tmp, -0.58 + 0.18, 0)
  container.add(mesh)
  
  // words
  tex = (new three.TextureLoader()).load("images/speed_meter_words.png")
  tex.colorSpace = three.SRGBColorSpace
  alpha = (new three.TextureLoader()).load("images/speed_meter_words_alpha.png")
  material = new three.MeshBasicMaterial({map: tex, alphaMap: alpha, transparent: true})
  mesh = new three.Mesh(geometry, material)
  mesh.name = "ui speed meter"
  mesh.scale.set(0.28, 0.08, 0.3)
  mesh.rotation.z = Math.PI / 2
  mesh.position.set(0.73 * tmp, -0.58 + 0.18, 0)
  container.add(mesh)
  
  // scale
  tex = (new three.TextureLoader()).load("images/speed_meter_scale.png")
  tex.colorSpace = three.SRGBColorSpace
  alpha = (new three.TextureLoader()).load("images/speed_meter_scale_alpha.png")
  material = new three.MeshBasicMaterial({map: tex, alphaMap: alpha, transparent: true})
  mesh = new three.Mesh(geometry, material)
  mesh.name = "ui speed meter"
  mesh.scale.set(0.33, 0.34, 0.34)
  mesh.position.set(0.546 * tmp, -0.546 + 0.21, 0)
  container.add(mesh)
  
  
  // don't share the same array for UVs, always make a new one!
  // accessing a "shared" array makes the UV stuff to corrupt or something like
  
  // score board
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(score_board_v, 3))
  geometry.computeVertexNormals()
  geometry.setAttribute("uv", new three.BufferAttribute(score_board_initial_uv, 2))
  tex = (new three.TextureLoader()).load("images/sm64_numbers.png")
  tex.colorSpace = three.SRGBColorSpace
  tex.repeat = new three.Vector2(1, 1)
  tex.wrapS = three.RepeatWrapping
  tex.wrapT = three.RepeatWrapping
  alpha = (new three.TextureLoader()).load("images/sm64_numbers_alpha.png")
  material = new three.MeshBasicMaterial({map: tex, alphaMap: alpha, transparent: true})
  mesh = new three.Mesh(geometry, material)
  mesh.scale.set(0.07, 0.07, 0.07)
  mesh.position.set(0.7 * tmp - 1, 0.7 - 0.1, 0)
  mesh.name = "ui score board"
  score_board = mesh
  container.add(mesh)
  
  // return the object
  container.position.z = -1
  return container;
}

// a crazzy function
function set_digit_container_to_number(container_index, number)
{
  let uv = score_board.geometry.attributes.uv
  uv.setX((6 * container_index) + 0, digits_uvs[(12 * number) + 0])
  uv.setX((6 * container_index) + 1, digits_uvs[(12 * number) + 2])
  uv.setX((6 * container_index) + 2, digits_uvs[(12 * number) + 4])
  uv.setX((6 * container_index) + 3, digits_uvs[(12 * number) + 6])
  uv.setX((6 * container_index) + 4, digits_uvs[(12 * number) + 8])
  uv.setX((6 * container_index) + 5, digits_uvs[(12 * number) + 10])
}

// update the scoore board ui
export function update_score_board_ui()
{
  // be sure to not use an overflown total_score
  if (total_score > 99999999)
    total_score = 99999999
  
  // update each digit shown in the uv to show the total score
  let uv = score_board.geometry.attributes.uv
  let string = total_score.toString()
  let number_of_zeroes_ahead = 0
  if (string.length != 8)
    number_of_zeroes_ahead = 8 - string.length
  
  // force the digit 0 on the first numbers (most significant ones)
  for (let i = 0; i < number_of_zeroes_ahead; i++)
    set_digit_container_to_number(i, 0)
  // set the rest of the digits
  for (let i = number_of_zeroes_ahead, j = 0; i < 8; i++, j++)
    set_digit_container_to_number(i, string[j].charCodeAt(0) - '0'.charCodeAt(0))
  uv.needsUpdate = true
}
