// import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';


// Initial setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#c"),
})

// const interaction = new Interaction(renderer, scene, camera);

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
// ------------------------------------------------------

// Configure some values here
scene.background = new THREE.TextureLoader().load('2k_stars_milky_way.jpg');
camera.position.setZ(20);

// Add lighting & grid helpers
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(ambientLight /*, gridHelper*/);

// Add scene controls
const controls = new OrbitControls(camera, renderer.domElement)

var domEvents = new THREEx.DomEvents(camera, renderer.domElement)




// Function for each blob being created.
function addBlob() {
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshNormalMaterial( /* { color: 0xff6347, wireframe: true} */ )
    const ball = new THREE.Mesh(geometry, material)
    ball.userData.draggable = true

    const [x, y] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread( 30 ) )  
    ball.position.set(x, y, 1);
    scene.add(ball);
    
    domEvents.addEventListener(ball, 'mousedown', function(event){
        controls.enabled = false;
        console.log('you clicked on the mesh')
    }, false)
    

}


// Instanciate them
let allBlobs = Array(5).fill().forEach(addBlob)
// ----------------- //


// Render everything in a Loop
function animate() {
    requestAnimationFrame( animate );

    //controls.update();
    renderer.render(scene, camera)
}

animate();