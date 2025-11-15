import * as three from "three"
import * as collision_funcs from "./collision_funcs.js"

// just a cube collision
export function build_wall()
{
  // make the visual representation of the collision
  // then the actual collision vertices inside that as a children
  let square, geometry, material
  
  // visible collision
  geometry = new three.BufferGeometry()
  geometry.setAttribute("position", new three.BufferAttribute(square_collision_visible_vertices, 3))
  geometry.computeVertexNormals()
  material = new three.MeshStandardMaterial({color: 0x0})
  square = new three.Mesh(geometry, material);
  square.name = "collision box"
  square.userData["collision_type"] = collision_funcs.type.STOP_CAR
  
  // return the finished object
  square.position.z = 0.5
  //~ console.log(new three.Box3().setFromObject(square))
  //~ square.scale.x = 100
  //~ console.log(new three.Box3().setFromObject(square))
  return square;
}
