var scene, renderer;
var stereoEffect;
var camera;
var controls;
var mixer;
var mix;
var mixdos;
var clock = new THREE.Clock();

var dir = new THREE.Vector3();
var speed = 40;
var rmapped = 0;
var frontLight = new THREE.DirectionalLight( 0xFFFFFF, 3 ); // soft white light
var sphereTexture = new THREE.ImageUtils.loadTexture( 'img/happySynthAssets/bg60.gif' );
sphereTexture.wrapS = sphereTexture.wrapT = THREE.RepeatWrapping;
sphereTexture.repeat.set( 8, 8 );
var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture, side: THREE.DoubleSide, transparent:true } );
var SphereGeometry = new THREE.SphereGeometry(2500, 2500, 1);
var sphere = new THREE.Mesh(SphereGeometry, sphereMaterial);

var loadingScreen = document.getElementById( 'loading-screen' );

var musicTexture = new THREE.ImageUtils.loadTexture( 'img/happySynthAssets/pinkmusicbar.gif' );
musicTexture.wrapS = musicTexture.wrapT = THREE.RepeatWrapping;
musicTexture.repeat.set( 6, 6 );
var musicMaterial = new THREE.MeshBasicMaterial( { map: musicTexture, side: THREE.DoubleSide, transparent:true } );
var musicGeometry = new THREE.SphereGeometry(1500, 1500, 1);
var music = new THREE.Mesh(musicGeometry, musicMaterial);


setUp();

function setUp() {
    setupWorld();
    animate();
    //loadCubeMap ('js/3dcubemap/eight/dark-s_' , '.png');
    lights();
   // textLyrics();
}



function setupWorld() {
    clock = new THREE.Clock();
    $container = $('#interface');
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');

  //  camera = new THREE.PerspectiveCamera(50, 1, 0.001, 10000);
   // camera = new THREE.PerspectiveCamera(80, 0.001, 0.01, 1000);
   camera = new THREE.PerspectiveCamera(50, 1, 0.01, 10000);


    //camera.target = new THREE.Vector3(0, 500, 200);
    camera.position.set(-86, 50, 300);
    //camera.position.set(0,0,0);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    element = renderer.domElement;
    $container.append(element);


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    //controls.maxZoom = 0.9;

    controls.rotateSpeed = 0.2;
    controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 1;
    controls.maxPolarAngle = Math.PI / 2;

    controls.target.set(-70, 50, 0);
    controls.update();

    var width  = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);



    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/notasmusicais2.gif' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -20;
    floor.position.z = 0;
    floor.position.x =-80;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
   scene.add(floor);

   sphere.position.y = 0;
   sphere.position.z = -220;
   sphere.rotation.x = Math.PI / 2;
   sphere.receiveShadow = true;
   scene.add(sphere);

   music.position.y = 0;
   music.position.z = -220;
   music.rotation.y = Math.PI / 2;
   music.receiveShadow = true;
   scene.add(music);

   var assetsTexture = new THREE.ImageUtils.loadTexture( 'img/happySynthAssets/disco.gif' );
   assetsTexture.wrapS = assetsTexture.wrapT = THREE.RepeatWrapping;
   assetsTexture.repeat.set( 1, 1 );
    var assetsMaterial = new THREE.MeshBasicMaterial( { map: assetsTexture, side: THREE.DoubleSide, transparent:true } );
    var assetsGeometry = new THREE.SphereGeometry(40, 40);
    var assets = new THREE.Mesh(assetsGeometry, assetsMaterial);

    assets.position.y = 300;
    assets.position.z = 60;
    assets.rotation.y = Math.PI / 2;
    assets.receiveShadow = true;
   // scene.add(assets);



   var checkbTexture = new THREE.ImageUtils.loadTexture( 'img/happySynthAssets/checkboard.jpg' );
   checkbTexture.wrapS = checkbTexture.wrapT = THREE.RepeatWrapping;
   checkbTexture.repeat.set( 1, 1 );
    var checkbMaterial = new THREE.MeshBasicMaterial( { map: checkbTexture, side: THREE.DoubleSide, transparent:true } );
    var checkbGeometry = new THREE.PlaneGeometry(70, 120);
    var checkb = new THREE.Mesh(checkbGeometry, checkbMaterial);

    checkb.position.y = 100;
    checkb.position.z = -200;
    checkb.rotation.z = Math.PI / 2;

    checkb.receiveShadow = true;
    scene.add(checkb);




    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = ('Cargando:'+ '<br>' +  url + '<br>' + 'Favor de esperar' );
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
       /* var mp3 = document.getElementById("myAudio");
        mp3.play();*/
    };
    
    manager.onLoad = function ( ) {
        loadingScreen.remove();
        console.log( 'Loading complete!');
    };
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = Math.floor((itemsLoaded / itemsTotal * 100)) + "%loaded";
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };

    var loader = new THREE.GLTFLoader(manager);
        loader.load('models/happysynth/moni3.glb', function ( gltf ) {
           /* const tloader = new THREE.TextureLoader();
            tloader.load("img/pl07_skin.png", function(tloader){
                gltf.scene.traverse( function ( child ) {
                    if ( child.isMesh ) {
                    child.material.map = tloader;
                    child.material.needsUpdate = true;
                    child.material.flipY = false;
                    }

                });
            });*/
            gltf.scene.traverse( function( object ) {

                object.frustumCulled = false;

            } );
            mixer = new THREE.AnimationMixer(gltf.scene);
            var action = mixer.clipAction(gltf.animations[0]);
            action.play();
            scene.add( gltf  );

           // scene.add( mesh );
            scene.add( gltf.scene );

        },

        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        function ( error ) {
            console.log( 'An error happened' );
        }
    );


    var loader = new THREE.GLTFLoader(manager);
    loader.load('models/happysynth/moni3pos2.glb', function ( gltf ) {
       /* const tloader = new THREE.TextureLoader();
        tloader.load("img/pl07_skin.png", function(tloader){
            gltf.scene.traverse( function ( child ) {
                if ( child.isMesh ) {
                child.material.map = tloader;
                child.material.needsUpdate = true;
                child.material.flipY = false;
                }

            });
        });*/

        gltf.scene.traverse( function( object ) {

            object.frustumCulled = false;

        } );

        mix = new THREE.AnimationMixer(gltf.scene);
        var actions = mix.clipAction(gltf.animations[0]);
        actions.play();
        scene.add( gltf  );

       // scene.add( mesh );
        scene.add( gltf.scene );

    },

    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    function ( error ) {
        console.log( 'An error happened' );
    }
);


    var loader = new THREE.GLTFLoader(manager);
    loader.load('models/happysynth/moni3pos3.glb', function ( gltf ) {
    /* const tloader = new THREE.TextureLoader();
        tloader.load("img/pl07_skin.png", function(tloader){
            gltf.scene.traverse( function ( child ) {
                if ( child.isMesh ) {
                child.material.map = tloader;
                child.material.needsUpdate = true;
                child.material.flipY = false;
                }

            });
        });*/

        gltf.scene.traverse( function( object ) {

            object.frustumCulled = false;
            object.encoding = THREE.sRGBEncoding;


        } );

        mixdos = new THREE.AnimationMixer(gltf.scene);
        var actions = mixdos.clipAction(gltf.animations[0]);
        actions.play();
        scene.add( gltf  );

    // scene.add( mesh );
        scene.add( gltf.scene );

    },

    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    function ( error ) {
        console.log( 'An error happened' );
    }
    );


    var murakit = new THREE.MTLLoader();
    murakit.load("models/happysynth/moni3.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/happysynth/moni3.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });


    var murakit = new THREE.MTLLoader();
    murakit.load("models/happysynth/moni4.mtl", function(materials) {
      materials.preload();
      console.log(materials);
    
      var murakit = new THREE.OBJLoader();
      murakit.setMaterials(materials);
    
      murakit.load("models/happysynth/moni4.obj", function(mesh) {
      scene.add(mesh);
        
      });
    });




    for( var i = 0; i < 36; i++ ){
        loadImgsTwo(manager);
    }


    function loadImgsTwo(){
        geometries = new THREE.PlaneGeometry(10, 10, 10);
        textures = THREE.ImageUtils.loadTexture('img/musicnotes/music' + i + '.gif' );
        textures.wrapS = THREE.RepeatWrapping;
        textures.wrapT= THREE.RepeatWrapping;
        textures.repeat.set( 1, 1 );
        materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
        var planes = new THREE.Mesh(geometries, materials);
        planes.material.side = THREE.DoubleSide;
        planes.position.x = Math.random() * -320;
        planes.position.y = Math.random() * 300;
        planes.position.z = Math.random() * 320;
        //cloud.add(planes);
        scene.add( planes );

    }

    for( var i = 0; i < 36; i++ ){
        loadImgsM(manager);
    }


    function loadImgsM(){
        geometries = new THREE.PlaneGeometry(10, 10, 10);
        textures = THREE.ImageUtils.loadTexture('img/musicnotes/music' + i + '.gif' );
        textures.wrapS = THREE.RepeatWrapping;
        textures.wrapT= THREE.RepeatWrapping;
        textures.repeat.set( 1, 1 );
        materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
        var planes = new THREE.Mesh(geometries, materials);
        planes.material.side = THREE.DoubleSide;
        planes.position.x = Math.random() * -360;
        planes.position.y = Math.random() * 600;
        planes.position.z = Math.random() * -2060;
        //cloud.add(planes);
        scene.add( planes );

    }

    for( var i = 0; i < 36; i++ ){
        loadImgsMThree(manager);
    }


    function loadImgsMThree(){
        geometries = new THREE.PlaneGeometry(10, 10, 10);
        textures = THREE.ImageUtils.loadTexture('img/musicnotes/music' + i + '.gif' );
        textures.wrapS = THREE.RepeatWrapping;
        textures.wrapT= THREE.RepeatWrapping;
        textures.repeat.set( 1, 1 );
        materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
        var planes = new THREE.Mesh(geometries, materials);
        planes.material.side = THREE.DoubleSide;
        planes.position.x = Math.random() * -160;
        planes.position.y = Math.random() * 100;
        planes.position.z = Math.random() * 160;
        //cloud.add(planes);
        scene.add( planes );

    }




        for( var i = 0; i < 36; i++ ){
            loadImgsMF(manager);
        }


        function loadImgsMF(){
            geometries = new THREE.PlaneGeometry(10, 10, 10);
            textures = THREE.ImageUtils.loadTexture('img/musicnotes/music' + i + '.gif' );
            textures.wrapS = THREE.RepeatWrapping;
            textures.wrapT= THREE.RepeatWrapping;
            textures.repeat.set( 1, 1 );
            materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
            var planes = new THREE.Mesh(geometries, materials);
            planes.material.side = THREE.DoubleSide;
            planes.position.x = Math.random() * -560;
            planes.position.y = Math.random() * 500;
            planes.position.z = Math.random() * 160;
            //cloud.add(planes);
            scene.add( planes );

        }


        for( var i = 0; i < 36; i++ ){
            loadImgsM(manager);
        }


        function loadImgsM(){
            geometries = new THREE.PlaneGeometry(10, 10, 10);
            textures = THREE.ImageUtils.loadTexture('img/musicnotes/music' + i + '.gif' );
            textures.wrapS = THREE.RepeatWrapping;
            textures.wrapT= THREE.RepeatWrapping;
            textures.repeat.set( 1, 1 );
            materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
            var planes = new THREE.Mesh(geometries, materials);
            planes.material.side = THREE.DoubleSide;
            planes.position.x = Math.random() * -560;
            planes.position.y = Math.random() * 500;
            planes.position.z = Math.random() * 160;
            //cloud.add(planes);
            scene.add( planes );

        }




}


    var audio = document.getElementById("but1");
    audio.addEventListener("touchstart", handleStart, false);
    audio.addEventListener("touchend", handleEnd, false);
    audio.addEventListener("touchcancel", handleCancel, false);
    audio.addEventListener("touchmove", handleMove, false);

    audio.addEventListener("click", onPlay, false);


    function onPlay() {
        var mp3 = document.getElementById("myAudio");
        mp3.play();

        if (!mp3.paused || myAudio.currentTime) {
            console.log("playiiii");
            textLyrics();

        setInterval(function() {
            camera.position.set(Math.random() * 900, Math.random() * 900, Math.random() * 900);
            controls.update();
        }, 1800);
        } else {
            //Not playing...maybe paused, stopped or never played.
        }
        controls.update();


        var play = document.getElementById("but1");
        play.remove();



        setInterval(function(){
            console.log("listopmiherma");
           // cameraChanges();
            textLyrics();
        }, 59000);


    }


    function handleStart(evt) {
        evt.preventDefault();

        var mp3 = document.getElementById("myAudio");
        mp3.loop=true;
        mp3.play();

        if (!mp3.paused || myAudio.currentTime) {
            console.log("playiiii");
            textLyrics();

        setInterval(function() {
            camera.position.set(Math.random() * 400, Math.random() * 600, Math.random() * 400);
            controls.update();
        }, 1800);
        } else {
            //Not playing...maybe paused, stopped or never played.
        }
        controls.update();

        var play = document.getElementById("but1");
        play.remove();
        setInterval(function(){
            console.log("listopmiherma");
            textLyrics();
        }, 59000);
    }

    function handleEnd(evt) {
        evt.preventDefault();

    }

    function handleCancel(evt) {
        evt.preventDefault();
    }

    function handleMove(evt) {
        evt.preventDefault();
    }



   /* for (let x=0; x< 2000; x++){
        cameraChanges(x);
        textLyrics(x);
    }*/


  /*
    random camera changes

  setInterval(function () {
        var rand =  Math.random()*2 - 1;
        camera.position.set(rand * camera.position.x, rand * camera.position.z, rand * camera.position.y);
    }, 3000);*/





    function animate() {

        sphere.rotation.z += 0.005;
        music.rotation.y += 0.005;


        requestAnimationFrame( animate );
        //var delta = clock.getDelta();
        var delta = clock.getDelta();
       /* var h = rmapped * 0.0200 % 1;
        var s = 0.5;
        var l = 0.5;
        frontLight.color.setHSL ( h, s, l );*/

        if (mix){
            mix.update(delta);
        }


        if (mixdos){
            mixdos.update(delta);
        }

        if (mixer) {
            mixer.update(delta);
        }

        renderer.render( scene, camera );
        /*if (mixer.lenght > 0){
            for (var i = 0 ; i < mixer.lenght; i ++) {
                mixer[i].update(delta);
            }
        }*/
       // rmapped ++;
        //mixer.update(this.clock.getDelta());
        //console.log(delta);

        controls.update();

    }



    function lights() {
        var light = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        light.position.y=600;
        //scene.add( light );

        var pointlight = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        pointlight.position.y=500;
        pointlight.position.x=600;
        scene.add( pointlight );

        var pointlight = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        pointlight.position.y=800;
        pointlight.position.z=1900;
        scene.add( pointlight );


        var pointlight = new THREE.PointLight( 0XFFFFFF , 1 ); // soft white light
        pointlight.position.y=600;
        pointlight.position.z=100;
        scene.add( pointlight );

        var pointlight = new THREE.SpotLight( 0XFFFFFF , 2 ); // soft white light
        pointlight.position.y=700;
        pointlight.position.z=0;
        scene.add( pointlight );

    }

   /* for (let x=0; x< 2000; x++){
        cameraChanges(x);
        textLyrics(x);
    }*/






    function textLyrics() {
        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="Me encanta compartir este sintetizador feliz, " + '<br>' + "que mis amigas de youtube me inspiraron a crear";
        }, 1750);


        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="SINTETIZADOR" + '<br>' +  "FELIZ X3";
        }, 16960);

        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="El d??a que escuche sus sintetizadores ya," + '<br>' + "me hipnorizaron a cantar, ??no lo pude resistir!";
        }, 24600);

        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="Ahora quiero compartir ese mismo feelin hacia ti," + '<br>' + "Amiga ponte a bailar, ??no lo dejes de sentir!";
        }, 32135);

        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="El d??a que entend?? que el mundo no era para m??" + '<br>' + "Solo quize escuchar un sintetizador feliz.";
        }, 39600);

        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="EN ESPA??OL LATINO"  + '<br>' + " YEAAAAAA";
        }, 47050);


        setTimeout(function() {
            document.getElementById("lyricsSynth").innerHTML="Solo quize escuchar un"  + '<br>' +  "SINTETIZADOR FELIZ";
        }, 50740);




    }



   /* setInterval(function(){
        console.log("listopmiherma");
        cameraChanges();
    }, 10000);*/
