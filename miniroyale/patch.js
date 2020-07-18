// The owner of the original script is https://github.com/alienoob
// The original script is https://github.com/alienoob/miniroyale-cheats/blob/master/index.js
// I just added feature, that shows distances to enemies.

const onPlayerCreate = PlayerManager.prototype.onPlayerCreate;
const onMovementUpdateAnimation = Movement.prototype.updateAnimation;
const onEnemyDamage = Enemy.prototype.damage;
const onTrackPoint = PlayerNames.prototype.trackPoint;

const DAMAGE_X = 50;
const HEAD_OFFSET = 0.4;
const RENDER_LINE_STEP = 0.001;
const RENDER_LINE_WIDTH = 0.03;
const RED_COLOR = new pc.Color(1, 0, 0);

let enemies = null;
let enemyDistances = new Map();

function renderLine(application, from, to, color) {
  for (let i = 0; i < RENDER_LINE_WIDTH; i += RENDER_LINE_STEP) {
    const fromOffset = new pc.Vec3(from.x + i, from.y, from.z + i);
    const toOffset = new pc.Vec3(to.x + i, (to.y - HEAD_OFFSET), to.z + i);

    application.renderLine(fromOffset, toOffset, color);
  }
}

function euclideanDistance(v1, v2){
  let x = v1.x - v2.x, y = v1.y - v2.y, z = v1.z - v2.z;
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
}

Enemy.prototype.damage = function () {
  for (let i = 0; i <= DAMAGE_X; i++) {
    onEnemyDamage.apply(this, arguments);
  }
};

PlayerManager.prototype.onPlayerCreate = function () {
  onPlayerCreate.apply(this, arguments);

  enemies = this.players;
};

Movement.prototype.updateAnimation = function () {
  onMovementUpdateAnimation.apply(this, arguments);

  if (!enemies) {
    return;
  }

  const position = this.entity.getPosition().clone();

  for (const enemy of enemies) {
    enemyDistances.set(enemy._guid, Math.round(euclideanDistance(position, enemy.localPosition)));
    renderLine(this.app, enemy.localPosition, position, RED_COLOR);
  }
}

PlayerNames.prototype.trackPoint = function () {
  onTrackPoint.apply(this, arguments);

  this.displays[arguments[2]].findByName("Username").element.text = (
    enemyDistances.get(arguments[2]) + ' ' + arguments[0].script.enemy.username
  );

  arguments[0].isDisplayed = true;
  arguments[0].display.enabled = true;

// There is original lines from the https://miniroyale2.io/__game-scripts.js?v=.1.0.128 start.

  var s = arguments[0].getPosition().clone().add(this.headVector);
  var r = new pc.Vec3;
  this.cameraEntity.camera.worldToScreen(s, r);
  var n = this.app.graphicsDevice.maxPixelRatio, y = this.screenEntity.screen.scale, p = this.app.graphicsDevice;
  Math.floor(this.cameraEntity.getPosition().clone().sub(s).length() * this.distanceFactor);
  r.x *= n, r.y *= n, arguments[0].enabled && r.x > 0 && r.x < this.app.graphicsDevice.width && r.y > 0 && r.y < this.app.graphicsDevice.height && r.z > 0 ? (arguments[0].display.setLocalScale(1, 1, 1), arguments[0].display.setLocalPosition(r.x / y, (p.height - r.y) / y, 0), arguments[0].display.enabled = !0) : arguments[0].enabled && r.y > 0 && r.y < this.app.graphicsDevice.height && r.z > 0 ? r.x > this.app.graphicsDevice.width ? ( arguments[0].display.setLocalScale(.8, .8, .8), arguments[0].display.setLocalPosition(this.app.graphicsDevice.width / y, (p.height - r.y) / y, 0), arguments[0].display.enabled = !0 ) : r.x < 0 ? ( arguments[0].display.setLocalScale(.8, .8, .8), arguments[0].display.setLocalPosition(0, (p.height - r.y) / y, 0), arguments[0].display.enabled = !0 ) : arguments[0].display.enabled = !1 : arguments[0].display && (arguments[0].display.enabled = !1)

// There is original lines from the https://miniroyale2.io/__game-scripts.js?v=.1.0.128 end.

}
