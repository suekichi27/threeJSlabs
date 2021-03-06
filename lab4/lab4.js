// применяем текстуру к планете
const applyTexture = (image) => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(image);
  texture.anisotropy = 16;
  return texture;
}

// создаем планету
const createPlanet = (rad, widthSeg, heightSeg, image) => {
  const texture = applyTexture(image);
  const geometry = new THREE.SphereGeometry(rad, widthSeg, heightSeg);
  let material;

  if (rad === 2300) {
    material = new THREE.MeshPhongMaterial( {map: texture, emissive: 0xff0000});
    return new THREE.Mesh(geometry, material);
  }

  material = new THREE.MeshPhongMaterial({map: texture});
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

// задаем вращение планете
const setDefaultRotation = (mesh, t, speed, distance) => {
  mesh.position.x = Math.sin(t * speed) * distance;
  mesh.position.z = Math.cos(t * speed) * distance;
}

// переход к планете
const navigateToPlanet = (mesh, camera) => {
  camera.position.z = mesh.position.z + 500;
  camera.position.x = mesh.position.x + 500;
  camera.lookAt(mesh.position);
}

window.onload = () => {

  // высота и ширина
  const width = window.innerWidth;
  const height = window.innerHeight;

  // по id получаем тег canv
  const canvas = document.getElementById('canvas');

  // растягиваем на весь экран
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  // создаем объект рендера для сцены
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0x000000);

  // создаем сцену
  const scene = new THREE.Scene();

  // создаем камеру
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000);
  camera.position.set(0, 0, 25000);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // создаем источники света
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const pointLight = new THREE.PointLight(0x222222, 3, 200000);
  pointLight.position.set(0,0,0);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  scene.add(pointLight);

  // наполняем солнечную систему
  const sun = createPlanet(2300, 80, 80, '../img/sun_2k.jpg');
  const earth = createPlanet(100, 40, 40, '../img/earth_2k.jpg');
  const mercury = createPlanet(60, 20, 20, '../img/mercury_2k.jpg');
  const venus = createPlanet(90, 20, 20, '../img/venus_2k.jpg');
  const mars = createPlanet(80, 20, 20, '../img/mars_2k.jpg');
  const jupiter = createPlanet(350, 20, 20, '../img/jupiter_2k.jpg');
  const saturn = createPlanet(230, 40, 40, '../img/saturn_2k.jpg');
  const uranus = createPlanet(150, 40, 40, '../img/uranus_2k.jpg');
  const neptune = createPlanet(140, 40, 40, '../img/neptune_2k.jpg');
  const pluto = createPlanet(40, 20, 20, '../img/pluto_2k.jpg');

  scene.add(sun);
  scene.add(earth);
  scene.add(mercury);
  scene.add(venus);
  scene.add(mars);
  scene.add(jupiter);
  scene.add(saturn);
  scene.add(uranus);
  scene.add(neptune);
  scene.add(pluto);

  let t = 0;

  // вызываем метод рендерера и передаем в него сцену и камеру
  let rendering = () => {
    requestAnimationFrame(rendering);

    sun.rotation.y += 0.001;

    setDefaultRotation(earth, t, 0.5, 7500);
    setDefaultRotation(mercury, t, 0.2, 4000);
    setDefaultRotation(venus, t, 0.2, 5500);
    setDefaultRotation(mars, t, 0.08, 8000);
    setDefaultRotation(jupiter, t, 0.08, 10700);
    setDefaultRotation(saturn, t, 0.03, 12000);
    setDefaultRotation(uranus, t, 0.02, 15000);
    setDefaultRotation(neptune, t, 0.01, 17000);
    setDefaultRotation(pluto, t, 0.01, 20000);

    t += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };

  rendering();
}