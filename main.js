import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, addTextMesh, addMatcap } from './addMeshes'
import { addLight, addHLight } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { imageHandler } from './imageUpload'
import Model from './Model'
import gsap from 'gsap'
import { post } from './post'

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)

//audio 
const listener = new THREE.AudioListener()
camera.add(listener)
const sound1 = new THREE.Audio(listener)
const sound2 = new THREE.Audio(listener)
const sound3 = new THREE.Audio(listener)

const audioLoader = new THREE.AudioLoader()

const clock = new THREE.Clock()

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.08
// controls.enablePan = false
// controls.enableZoom = false

const scene = new THREE.Scene()
// scene.background = new THREE.Color('#a7c4d1')
scene.background = new THREE.Color('#00ff00')

const meshes = {}
const mixers = []
const lights = {}
const lightsH = {}
const composer = post(scene, camera, renderer)
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let count = 0

const glbUrls = [
	// '/abstract_test.glb',
	//doesn't work^
	'/abstract.glb',
	'/flower.glb',
	'/sphere.glb',
	'/box.glb',
	'/inktober2020_-_rodent.glb',
	'/hyperqbs_folding_animation.glb',
	// '/plane.glb',
	//too big^
	'/throw.glb',
	'/cylinder.glb',
]

init()

function test(_texture) {

	const g = new THREE.PlaneGeometry(1, 1)
	const m = new THREE.MeshPhongMaterial({
		map: _texture,
	})

	//plane for image
	const mm = new THREE.Mesh(g, m)
	mm.position.set(count, -3.5, 2)
	mm.rotateX(-0.5 * Math.PI)
	mm.scale.set(10,10)
	mm.receiveShadow = true
	mm.userData.name = 'image'

	let randomPos = Math.random() * 4 - 2
	//-2~2

	// console.log(randomPos)
	const temp = new Model({
		scene: scene,
		meshes: meshes,
		name: `origami`,
		// name: `${count}`,
		mixers: mixers,
		animationState: true,
		url: glbUrls[count],
		replace: true,
		test: _texture,
		position: new THREE.Vector3(randomPos, randomPos, randomPos),
		scale: new THREE.Vector3(0.7, 0.7, 0.7),
		userData: {
			name: 'target3',
		},
	})

	temp.init()

	count++
	scene.add(mm)
}

function init() {
	imageHandler(test)
	//set up our renderer default settings, add scene/canvas to webpage
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	meshes.default = addMatcap()
	meshes.standard = addStandardMesh()

	lights.default = addLight()
	// lightsH.default = addHLight()
	scene.add(lights.default)
	// scene.add(meshes.standard)
	// scene.add(meshes.default)

	// window.addEventListener('click', () => {
	// 	sound1.play()
	// })

	camera.position.set(0, 3, 10)
	initAudio()
	raycast()
	resize()
	animate()
	instances()
	buttonPlay()

	
}

function buttonPlay() {
	const button1 = document.querySelector('#sound1')
	button1.addEventListener('click', () => {
		sound1.play()
		sound2.stop()
		sound3.stop()
	});


	const button2 = document.querySelector('#sound2')
	button2.addEventListener('click', () => {
		sound2.play()
		sound1.stop()
		sound3.stop()
	});

	const button3 = document.querySelector('#sound3')
	button3.addEventListener('click', () => {
		sound3.play()
		sound2.stop()
		sound1.stop()
	});
}

function initAudio() {
	audioLoader.load('/ASMR Origami Rabbit for Chinese New Year (No Talking  Crinkle).mp3', function (buffer) {
		sound1.setBuffer(buffer)
		sound1.setLoop(true)
		sound1.setVolume(0.6)
	})

	audioLoader.load('/Mr Rogers ASMR - Origami.mp3', function (buffer) {
		sound2.setBuffer(buffer)
		sound2.setLoop(true)
		sound2.setVolume(0.6)
	})

	audioLoader.load('/10:21.mp3', function (buffer) {
		sound3.setBuffer(buffer)
		sound3.setLoop(true)
		sound3.setVolume(0.4)
	})
}

function raycast() {
	window.addEventListener('click', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)
		const intersects = raycaster.intersectObjects(scene.children)
		console.log(intersects)
		for (let i = 0; i < intersects.length; i++) {

			//if clicked on eye -> glitch
			//also getting plane intersects
			if (intersects[i].object.name == 'Eye_Ball_Mat_0' ||'Cornea_Mat_0'||'Iris_Mat3_0') {
				gsap.to(composer.glitch, {
					enabled: true,
					onComplete: () => {
						gsap.to(composer.glitch, {
							enabled: false
						})
					},
				})
			}

			let randomPos = Math.random() * 4 - 2

			//does not work with current model; worked with a cube 
			// if (intersects[i].object.name == 'Eye_Ball_Mat_0' ||'2'||'Cornea_Mat_0') {
			// 	gsap.to(intersects[i].object.position, {
			// 		x: randomPos,
			// 		y: randomPos,
			// 		z: 3,
			// 		duration: 2,
			// 		ease: 'power3.inOut'
			// 	})
			// }

			//imageUpload plane gsap
			if (intersects[i].object.geometry.type == 'PlaneGeometry') {
				// gsap.to(intersects[i].object.animations, {
				gsap.to(intersects[i].object.scale, {
					x: 0,
					y: 0,
					z: 0,
					duration: 5,
					ease: 'power3.inOut',
					// onComplete: () => {
					// 	gsap.to(intersects[i].object.scale, {
					// 		x: 2,
					// 		y: 2,
					// 		z: 2,
					// 		duration: 5,
					// 		ease: 'power3.inOut',
					// 	})
					// }
				})
			// 	let randomPos = Math.random() * 4 - 2

				// gsap.to(intersects[i].object.position, {  
				// 	x: 0,
				// 	y: -3.6,
				// 	z: 0,
				// 	duration: 2,
				// 	ease: 'power3.inOut'
				// })
			}
		}

	})

}

function instances() {
	const eye = new Model({
		scene: scene,
		meshes: meshes,
		name: 'eye',
		url: '/eye_resized.glb',
		mixers: mixers,
		animationState: true,
		position: new THREE.Vector3(0, 1, 2),
		scale: new THREE.Vector3(0.2, 0.2, 0.2),
		rotation: new THREE.Euler(Math.PI / -2, 0, 0),
	})
	eye.init(instances)
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		composer.composer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	const delta = clock.getDelta()
	const elapsedTime = clock.getElapsedTime()

	for (const mixer of mixers) {
		mixer.update(delta)
	}
	controls.update()
	meshes.default.rotation.x += 0.01
	meshes.default.rotation.y -= 0.01
	// meshes.standard.rotation.x -= 0.01
	// meshes.standard.rotation.z -= 0.01
	// meshes.standard.position.y = Math.sin(elapsedTime)
	// meshes.default.position.y = Math.cos(elapsedTime)

	// renderer.render(scene, camera)
	composer.composer.render()

}
