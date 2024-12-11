import {
  Text,
  Html,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";
// import { useControls } from "leva";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Experience() {
  // CC0 许可的免费模型，由 pmndrs market 制作
  const { camera } = useThree();
  const navigate = useNavigate();
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );
  const smallpeo = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cactus/model.gltf"
  );
  const hdrFilePath = "/assets/brown_photostudio_02_4k.hdr";
  const phone = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf"
  );

  // 使用 Leva 控制模型属性
  // const {
  //   computerPositionX,
  //   computerPositionY,
  //   computerPositionZ,
  //   computerRotationX,
  //   computerRotationY,
  //   computerRotationZ,
  //   phonePositionX,
  //   phonePositionY,
  //   phonePositionZ,
  //   phoneRotationX,
  //   phoneRotationY,
  //   phoneRotationZ,
  //   htmlPositionX,
  //   htmlPositionY,
  //   htmlPositionZ,
  //   htmlRotationX,
  //   htmlRotationY,
  //   htmlRotationZ,
  // } = useControls({
  //   computerPositionX: { value: 0, min: -5, max: 5 },
  //   computerPositionY: { value: -1.2, min: -5, max: 5 },
  //   computerPositionZ: { value: 0, min: -5, max: 5 },
  //   computerRotationX: { value: 0, min: -Math.PI, max: Math.PI },
  //   computerRotationY: { value: 0, min: -Math.PI, max: Math.PI },
  //   computerRotationZ: { value: 0, min: -Math.PI, max: Math.PI },
  //   phonePositionX: { value: -3.0, min: -5, max: 5 },
  //   phonePositionY: { value: -1.5, min: -5, max: 5 },
  //   phonePositionZ: { value: -1.0, min: -5, max: 5 },
  //   phoneRotationX: { value: 6, min: -Math.PI, max: Math.PI },
  //   phoneRotationY: { value: Math.PI / 0.5, min: -Math.PI, max: Math.PI },
  //   phoneRotationZ: { value: 0, min: -Math.PI, max: Math.PI },
  //   htmlPositionX: { value: 0, min: -5, max: 5 },
  //   htmlPositionY: { value: 1.56, min: -5, max: 5 },
  //   htmlPositionZ: { value: -1.4, min: -5, max: 5 },
  //   htmlRotationX: { value: 0, min: -Math.PI, max: Math.PI },
  //   htmlRotationY: { value: 0, min: -Math.PI, max: Math.PI },
  //   htmlRotationZ: { value: 0, min: -Math.PI, max: Math.PI },
  // });
  const computerPositionX = 0;
  const computerPositionY = -1.2;
  const computerPositionZ = 0;
  const computerRotationX = 0;
  const computerRotationY = 0;
  const computerRotationZ = 0;
  const phonePositionX = -3.0;
  const phonePositionY = -1.5;
  const phonePositionZ = -1.0;
  const phoneRotationX = 6;
  const phoneRotationY = Math.PI / 0.5;
  const phoneRotationZ = 0;
  const htmlPositionX = 0;
  const htmlPositionY = 1.56;
  const htmlPositionZ = -1.4;
  const htmlRotationX = 0;
  const htmlRotationY = 0;
  const htmlRotationZ = 0;

  // 计算手机模型的屏幕尺寸和中心位置
  const phoneScreenBox = new THREE.Box3().setFromObject(phone.scene);
  const phoneScreenSize = new THREE.Vector3();
  const phoneScreenCenter = new THREE.Vector3();
  phoneScreenBox.getSize(phoneScreenSize);
  phoneScreenBox.getCenter(phoneScreenCenter);

  console.log("Phone Screen Size:", phoneScreenSize);
  console.log("Phone Screen Center:", phoneScreenCenter);
  console.log("Phone Screen Size:", phoneScreenSize);

  useEffect(() => {
    let audio;

    const initAudio = () => {
      // 创建音频元素
      audio = new Audio('/assets/Glimpse.mp3');
      audio.loop = true;
      audio.volume = 0.5;
    };

    const startAudio = () => {
      if (audio) {
        audio.play()
          .then(() => {
            console.log("Audio started playing successfully");
            // 成功播放后移除事件监听器
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
          })
          .catch(error => {
            console.error("播放音频失败:", error);
          });
      }
    };

    // 初始化音频
    initAudio();

    // 添加用户交互事件监听器
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);

    // 清理函数
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, []);

  useEffect(() => {
    // 创建音频监听器 - 仅用于 Three.js 场景，不处理实际音频播放
    const listener = new THREE.AudioListener();
    camera.add(listener);

    return () => {
      camera.remove(listener);
    };
  }, [camera]);

  const handleClick = () => {
    navigate("/new");
  };

  return (
    <>
      {/*预设值已经为电脑模型提供了必要的光线，关闭时还会在屏幕上显示建筑物的反光效果。*/}
      {/* <Environment preset="city" /> */}
      <Environment files={hdrFilePath} />
      <color attach="background" args={["#241a1a"]} />

      {/*
                全局属性使用户可以在任何地方拖放模型，甚至可以在模型 "范围 "之外拖放模型
            */}
      <PresentationControls
        global
        rotation={[0.13, -0.3, 0.06]}
        polar={[-0.4, 0.2]} // 垂直拖放
        azimuth={[-0.25, 0.75]} //水平拖放
        config={{ mass: 2, tension: 400 }} // 这会更改您按住拖放操作时发生的情况，您提供的参数会使动画在您移动模型时感觉“有弹性”
        snap={{ mass: 4, tension: 400 }} // 这将使模型回到原来的位置
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"} // Macbook 的屏幕颜色
            rotation={[0.1, Math.PI, 0]} // 这使得屏幕光线向内移动
            position={[0, 0.55, -1.15]}
          />
          {/* 电脑 */}
          <primitive
            position={[computerPositionX, computerPositionY, computerPositionZ]}
            rotation={[computerRotationX, computerRotationY, computerRotationZ]}
            object={computer.scene}
          >
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17} // this makes the iframe smaller
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://extended-channels-730518.framer.app/" />
            </Html>
          </primitive>
          {/* 仙人掌 */}
          <primitive
            position-y={-1.0}
            position-x={3}
            position-z={-1.5}
            object={smallpeo.scene}
            scale={[0.5, 0.5, 0.5]}
            onClick={handleClick}
            onPointerOver={(e) => e.stopPropagation()}
            onPointerOut={(e) => e.stopPropagation()}
          />
          {/* 手机 */}
          <primitive
            position={[-3.5, -1.5, -1.8]}
            rotation={[2.96, 3.14, 3.14]}
            object={phone.scene}
          >
            <Html
              transform
              wrapperClass="phoneScreen"
              distanceFactor={3.98}
              position={[0.1, 1.3, -0.1]}
              rotation={[htmlRotationX, htmlRotationY, htmlRotationZ]}
            >
              <iframe src="https://img-baofun.zhhainiao.com/pcwallpaper_ugc_mobile/preview/c9d45c198c8ace7d482bf30468b0f890_preview_mid.jpg" />
            </Html>
          </primitive>
          {/* 文本 */}
          <Text
            position={[2, 0.75, 0.8]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
          >
            Sroof
            Web
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
