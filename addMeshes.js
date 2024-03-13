import {
	BoxGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Mesh,
	TextureLoader,
	MeshMatcapMaterial,
} from 'three'


import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

const loader = new TextureLoader()

export const addMatcap = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshMatcapMaterial({ matcap: loader.load('/matcap.png'), })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(-1, 0, 3)
	boxMesh.scale.set (0.2, 0.2, 0.2)
	boxMesh.userData.name = 'target1'
	return boxMesh
}

export const addBoilerPlateMeshes = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(-4.5, 0, 0)
	boxMesh.scale.set (0.5, 0.5, 0.5)
	boxMesh.userData.name = 'target1'
	return boxMesh
}

export const addStandardMesh = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(2, 0, 0)
	boxMesh.userData.name = 'target2'
	return boxMesh
}

export const addTextMesh = () => {
	const tloader = new FontLoader();
	tloader.load( 'fonts/droid/droid_sans_bold.typeface.json', function ( font ) {

		const geometry = new TextGeometry( 'Glitch', {
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5
		} );

		const textMat = new MeshMatcapMaterial({
			matcap: loader.load('/matcap.png'),

		})
		const textMesh = new THREE.Mesh (geometry, textMat)
		textMesh.userData.name = 'glitch'
		return textMesh

	} );


}
