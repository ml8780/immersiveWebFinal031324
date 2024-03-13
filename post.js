import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
//optional
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass'

export function post(scene, camera, renderer) {
	//
	const composer = new EffectComposer(renderer)
	composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	composer.setSize(window.innerWidth, window.innerHeight)

	const renderPass = new RenderPass(scene, camera)
	composer.addPass(renderPass)

    const pixelPass = new RenderPixelatedPass(6, scene, camera)
    // pixelPass.pixelSize = 6
    pixelPass.normalEdgeStrength = 2
    composer.addPass(pixelPass)
    pixelPass.enabled = false

    const glitchPass = new GlitchPass()
    glitchPass.enabled = false
    composer.addPass(glitchPass)

    const afterimagePass = new AfterimagePass()
    afterimagePass.uniforms.damp.value = 0.90
    composer.addPass(afterimagePass)

    const bloomPass = new UnrealBloomPass()
    bloomPass.strength = 0.2
    // bloomPass.radius = 3
    // bloomPass.threshold = 0.3
    composer.addPass(bloomPass)

    const outputPass = new OutputPass()
	composer.addPass(outputPass)

	return { composer: composer, after: afterimagePass, bloom: bloomPass, glitch: glitchPass }
    //i can target by returning

}