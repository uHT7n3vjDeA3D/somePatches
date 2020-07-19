// The owner of the original script is https://github.com/alienoob
// The original script is https://github.com/alienoob/miniroyale-cheats/blob/master/index.js
// I just added some features.
// Input the script into browser console, or copy the script to any WebExtension, which provides userscripts support for browsers, like Violentmonkey.

(function() {
  'use strict';

  let TRACKING = true, INCREASED_DAMAGE = true, DAMAGE_MULTIPLIER = 4;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'z-index: 9999; width: 100%;display: flex;position: absolute;justify-content: center;flex-direction: column;align-items: center;';
  wrapper.innerHTML = `
    <div style="height: 36px;/*! display: none; */position: relative;">
      <div style="height: 100%;width: 100%;position: absolute;">
        <div style="width: 100%;height: 100%;background-color: white;opacity: 0.5;"></div>
      </div>
      <div style="width: 100%;height: 100%;display: flex;align-items: center;flex-direction: row;justify-content: center;z-index: 1;position: relative;">
        <div style="display: flex;margin: 2px;border: solid 1px black;">
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">Patch is loading...</div>
          </div>
        </div>
        <div style="display: flex;margin: 2px;border: solid 1px black;">
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">Damage</div>
          </div>
          <div style="min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;background-color: ${DAMAGE_MULTIPLIER > 0 ? "green" : "red"};">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">x${DAMAGE_MULTIPLIER}</div>
          </div>
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">G+↑/↓</div>
          </div>
        </div>
        <div style="display: flex;margin: 2px;border: solid 1px black;">
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">Damage</div>
          </div>
          <div style="min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;background-color: ${INCREASED_DAMAGE ? "green" : "red"};">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">${INCREASED_DAMAGE ? "ON" : "OFF"}</div>
          </div>
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">G+D</div>
          </div>
        </div>
        <div style="display: flex;margin: 2px;border: solid 1px black;">
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">Tracking</div>
          </div>
          <div style="min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;background-color: ${TRACKING ? "green" : "red"};">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">${TRACKING ? "ON" : "OFF"}</div>
          </div>
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">G+T</div>
          </div>
        </div>
        <div style="display: flex;margin: 2px;border: solid 1px black;">
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">show/hide</div>
          </div>
          <div style="min-width: 30px;min-height: 22px;padding: 3px;align-items: center;display: flex;border: solid 1px black;">
            <div style="font-size: 15px;font-weight: bold;max-height: 20px;">G+G</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 100%;display: flex;align-items: center;flex-direction: column;justify-content: center;z-index: 1;position: relative;"></div>`;

  document.body.appendChild(wrapper);

  function delayedAction(func, delay, ...paramN) {
    return window.setTimeout(func, delay, ...paramN);
  }
  function clearDelayedAction(timeout) {
    window.clearTimeout(timeout);
  }
  function loopedAction(func, delay, ...paramN) {
    return window.setInterval(func, delay, ...paramN);
  }
  function clearLoopedAction(interval) {
    window.clearInterval(interval);
  }

  function objectDefineProperty(obj, prop, set, get, enumerable, configurable, writable, value) {
    let descriptor = {};
    if(set){
      descriptor.set = set;
    } else if(get){
      descriptor.get = get;
    } else if(enumerable){
      descriptor.enumerable = enumerable;
    } else if(configurable){
      descriptor.configurable = configurable;
    } else if(writable){
      descriptor.writable = writable;
    } else if(value){
      descriptor.value = value;
    }
    Object.defineProperty(obj, prop, descriptor);
  }

  const interfaceBar = wrapper.children[0];
  objectDefineProperty(interfaceBar, 'patchStatus', (text)=>{
    wrapper.children[0].children[1].children[0].children[0].children[0].innerHTML = text;
  });
  const damageMultiplier = {};
  objectDefineProperty(damageMultiplier, 'color', (color)=>{
    wrapper.children[0].children[1].children[1].children[1].style.backgroundColor = color;
  });
  objectDefineProperty(damageMultiplier, 'text', (text)=>{
    wrapper.children[0].children[1].children[1].children[1].children[0].innerHTML = text;
  });
  const damageSwitcher = {};
  objectDefineProperty(damageSwitcher, 'color', (color)=>{
    wrapper.children[0].children[1].children[2].children[1].style.backgroundColor = color;
  });
  objectDefineProperty(damageSwitcher, 'text', (text)=>{
    wrapper.children[0].children[1].children[2].children[1].children[0].innerHTML = text;
  });
  const trackingSwitcher = {};
  objectDefineProperty(trackingSwitcher, 'color', (color)=>{
    wrapper.children[0].children[1].children[3].children[1].style.backgroundColor = color;
  });
  objectDefineProperty(trackingSwitcher, 'text', (text)=>{
    wrapper.children[0].children[1].children[3].children[1].children[0].innerHTML = text;
  });

  const interfaceNotifications = wrapper.children[1];
  const addNotification = (function () {
    const orphanage = [];
    const notification = function (message, color) {
      let container = document.createElement('div');
      container.style.cssText = 'max-height: 36px;overflow: hidden;position: relative;';
      container.innerHTML = `
      <div style="height: 100%;position: absolute;width: 100%;">
        <div style="width: 100%;height: 100%;background-color: ${color};opacity: 0.5;"></div>
      </div>
      <div style="min-width: 170px;min-height: 22px;padding: 3px;justify-content: center;display: flex;border: solid 2px black;align-items: center;margin: 2px;position: relative;">
        <div style="font-size: 15px;font-weight: bold;max-height: 20px;">${message}</div>
      </div>`;
      return container;
    };
    const clearOrphanage = (function () {
      let isRemoving = false;
      return function () {
        if (orphanage.length > 2 && !isRemoving) {
          isRemoving = true;
          try {
            interfaceNotifications.removeChild(orphanage[i]);
          } catch (e) {
          } finally {
            orphanage.splice(0, 1);
          }
          isRemoving = false;
          clearOrphanage();
        }
      };
    })();
    return function (message, color) {
      let child = notification(message, color);
      orphanage.push(child);

      delayedAction(()=>{
        let opacity = 1;
        let interval = loopedAction(()=>{
          if (opacity > 0.02) {
            try {
              child.style.opacity = opacity = opacity - 0.01;
            } catch (e) {
              clearLoopedAction(interval);
            }
          } else {
            try {
              child.style.display = 'none';
              interfaceNotifications.removeChild(child);
            } catch (e) {
            } finally {
              clearLoopedAction(interval);
            }
          }
        }, 13)
      }, 300);

      interfaceNotifications.appendChild(child);
      clearOrphanage();
    };
  })();

  const interfaceManager = {
    '71':function () {
      if(interfaceBar.style.display){
        interfaceBar.style.display = '';
        interfaceNotifications.style.display = 'none';
      } else {
        interfaceBar.style.display = 'none';
        interfaceNotifications.style.display = 'flex';
      }
    },
    '84':function () {
      TRACKING = !TRACKING;
      let container = {};
      if (TRACKING) {
        container.message = 'Tracking enabled.';
        container.color = 'green';
        trackingSwitcher.color = container.color;
        trackingSwitcher.text = 'ON';
      } else {
        container.message = 'Tracking disabled.';
        container.color = 'red';
        trackingSwitcher.color = container.color;
        trackingSwitcher.text = 'OFF';
      }
      addNotification(container.message, container.color);
    },
    '68':function () {
      INCREASED_DAMAGE = !INCREASED_DAMAGE;
      let container = {};
      if (INCREASED_DAMAGE) {
        container.message = 'Damage enabled.';
        container.color = 'green';
        damageSwitcher.color = container.color;
        damageSwitcher.text = 'ON';
      } else {
        container.message = 'Damage disabled.';
        container.color = 'red';
        damageSwitcher.color = container.color;
        damageSwitcher.text = 'OFF';
      }
      addNotification(container.message, container.color);
    },
    '38':function () {
      let container = {};
      ++DAMAGE_MULTIPLIER;
      container.message = `Damage factor is ${DAMAGE_MULTIPLIER}.`;
      container.color = 'green';
      damageMultiplier.color = container.color;
      damageMultiplier.text = 'x' + DAMAGE_MULTIPLIER;
      addNotification(container.message, container.color);
    },
    '40':function () {
      if(DAMAGE_MULTIPLIER <= 0){
        return;
      }
      let container = {};
      --DAMAGE_MULTIPLIER;
      container.message = `Damage factor is ${DAMAGE_MULTIPLIER}.`;
      container.color = 'red';
      if(DAMAGE_MULTIPLIER == 0){
        damageMultiplier.color = container.color;
        damageMultiplier.text = 'x0';
      }
      damageMultiplier.text = 'x' + DAMAGE_MULTIPLIER;
      addNotification(container.message, container.color);
    }
  };

  const keyHandler = (function () {
    let initKey = false;
    let keyTimeout;
    return function(e) {
      e.stopPropagation();
      if (e.keyCode == 71 && !initKey) {
        initKey = true;
        keyTimeout = delayedAction(()=>{initKey = false;}, 700);
      } else if (initKey) {
        let key = '' + e.keyCode;
        if (interfaceManager.hasOwnProperty(key)) {
          clearDelayedAction(keyTimeout);
          initKey = false;
          interfaceManager[key]();
        }
      }
    };
  })();

  window.addEventListener('keydown', keyHandler, false);

  let patch = loopedAction(()=>{
    try {
      let check1 = Movement.prototype.updateAnimation;
      let check2 = Enemy.prototype.damage;
      let check3 = PlayerNames.prototype.trackPoint;
    } catch (e) {
      return;
    }
    clearLoopedAction(patch);

    const onMovementUpdateAnimation = Movement.prototype.updateAnimation;
    const onEnemyDamage = Enemy.prototype.damage;
    const onTrackPoint = PlayerNames.prototype.trackPoint;

    let DAMAGE_X = DAMAGE_MULTIPLIER;
    const HEAD_OFFSET = 0.4;
    const RENDER_LINE_STEP = 0.001;
    const RENDER_LINE_WIDTH = 0.03;
    const RED_COLOR = new pc.Color(1, 0, 0);
    const enemyDistances = new Map();

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
      if (DAMAGE_X == 0 || !INCREASED_DAMAGE) {
        onEnemyDamage.apply(this, arguments);
        return;
      }
      for (let i = 0; i <= DAMAGE_X; i++) {
        onEnemyDamage.apply(this, arguments);
      }
    };

    Movement.prototype.updateAnimation = function () {
      onMovementUpdateAnimation.apply(this, arguments);

      if (!TRACKING) {
        return;
      }

      const position = this.entity.getPosition().clone();
      const enemies = this.playerManager.script.playerManager.players;

      for (const enemy of enemies) {
        enemyDistances.set(enemy._guid, Math.round(euclideanDistance(position, enemy.localPosition)));
        renderLine(this.app, enemy.localPosition, position, RED_COLOR);
      }
    };

    PlayerNames.prototype.trackPoint = function () {
      onTrackPoint.apply(this, arguments);

      if (!TRACKING) {
        return;
      }

      this.displays[arguments[2]].findByName('Username').element.text = (
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

    };

    interfaceBar.patchStatus = 'Patch is ready.'
  }, 100);
}());
