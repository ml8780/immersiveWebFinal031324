import { 
	AmbientLight,
	DirectionalLight,
	HemisphereLight,
 } from 'three'



export const addLight = () => {

	const light = new DirectionalLight(0xffffff, 1)
	light.position.set(0, 10, 3)
	light.castShadow = true

	return light

}


export const addHLight = () => {

	const lightH = new HemisphereLight(
	'white', 
	'#00ff00', 
	1, 
  )
  lightH.position.set(0, 10, 0)

  
	return lightH
}
