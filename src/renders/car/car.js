import * as THREE from "three";

export class Car3D {
  car;
  constructor() {
    this.car = new THREE.Group();
  }
  __createWheel() {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }

  _createWheels() {
    const backWheel = this.__createWheel();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    this.car.add(backWheel);

    const frontWheel = this.__createWheel();
    frontWheel.position.y = 6;
    frontWheel.position.x = 18;
    this.car.add(frontWheel);
  }

  _createBody() {
    const body = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 15, 30),
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    body.position.y = 12;
    this.car.add(body);
  }

  __getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);
  }

  __getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
  }

  _createCabin() {
    const carFrontTexture = this.__getCarFrontTexture();

    const carBackTexture = this.__getCarFrontTexture();

    const carRightSideTexture = this.__getCarSideTexture();

    const carLeftSideTexture = this.__getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
    ]);
    cabin.position.x = -6;
    cabin.position.y = 25.5;

    this.car.add(cabin);
  }

  buildCar() {
    this._createWheels();
    this._createBody();
    this._createCabin();

    return this.car;
  }
}
