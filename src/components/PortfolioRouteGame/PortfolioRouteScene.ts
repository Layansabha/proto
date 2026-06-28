import Phaser from "phaser";
import { gameMilestones, type GameMilestone } from "./milestones";

type SceneEvents = {
  onMilestoneNearby: (milestone: GameMilestone | null) => void;
  onOpenMilestone: (milestone: GameMilestone) => void;
  onRouteComplete: () => void;
  onProgressChange: (progress: number) => void;
};

type Controls = {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  a: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
  w: Phaser.Input.Keyboard.Key;
  space: Phaser.Input.Keyboard.Key;
  e: Phaser.Input.Keyboard.Key;
};

const WORLD_WIDTH = 6200;
const WORLD_HEIGHT = 540;
const FLOOR_Y = 430;

const FLOOR_ART_OFFSET = 10;
const PLATFORM_ART_OFFSET = 8;
const TREE_GROUND_OFFSET = 14;
const TILE_OVERLAP = 4;

const PLAYER_DISPLAY_WIDTH = 78;
const PLAYER_DISPLAY_HEIGHT = 108;

const PLAYER_START_X = 120;
const PLAYER_START_Y = FLOOR_Y - PLAYER_DISPLAY_HEIGHT / 2 - 10;

export default class PortfolioRouteScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private controls!: Controls;
  private platformGroup!: Phaser.Physics.Arcade.StaticGroup;
  private nearbyMilestone: GameMilestone | null = null;
  private milestoneZones: {
    milestone: GameMilestone;
    zone: Phaser.GameObjects.Zone;
  }[] = [];
  private inspected = new Set<number>();
  private eventsBridge: SceneEvents;
  private hintText!: Phaser.GameObjects.Text;
  private lastProgress = 0;
  public isFrozen = true;

  private mobileInput = {
    left: false,
    right: false,
    jump: false,
  };

  constructor(eventsBridge: SceneEvents) {
    super("PortfolioRouteScene");
    this.eventsBridge = eventsBridge;
  }

  public startGame() {
    this.isFrozen = false;
    this.hintText.setVisible(true);
  }


  preload() {
    this.load.image("worldBg", "/assets/game/world-bg.png");

    this.load.spritesheet(
      "layan",
      "/assets/game/player/layan-spritesheet.png",
      {
        frameWidth: 160,
        frameHeight: 220,
      },
    );

    this.load.image("grassBlock", "/assets/game/tiles/grass-block.png");
    this.load.image("dirtBlock", "/assets/game/tiles/dirt-block.png");
    this.load.image("platformLong", "/assets/game/tiles/platform-long.png");
    this.load.image("platformMid", "/assets/game/tiles/platform-mid.png");
    this.load.image("platformSmall", "/assets/game/tiles/platform-small.png");

    this.load.image("signpost", "/assets/game/props/signpost.png");
    this.load.image("flag", "/assets/game/props/flag.png");
    this.load.image("coinBlock", "/assets/game/props/coin-block.png");
    this.load.image("bridge", "/assets/game/props/bridge.png");

    this.load.image("treeOak", "/assets/game/props/tree-oak.png");
    this.load.image("treePine", "/assets/game/props/tree-pine.png");
    this.load.image("bushBig", "/assets/game/props/bush-big.png");
    this.load.image("bushSmall", "/assets/game/props/bush-small.png");

    this.load.image("flowerWhite", "/assets/game/props/flower-white.png");
    this.load.image("flowerPurple", "/assets/game/props/flower-purple.png");
    this.load.image("flowerPink", "/assets/game/props/flower-pink.png");

    this.load.image("mushroomRed", "/assets/game/props/mushroom-red.png");
    this.load.image("mushroomPurple", "/assets/game/props/mushroom-purple.png");

    this.load.image("rockBig", "/assets/game/props/rock-big.png");
    this.load.image("rockSmall", "/assets/game/props/rock-small.png");

    this.load.image("cloudBig", "/assets/game/props/cloud-big.png");
    this.load.image("cloudSmall", "/assets/game/props/cloud-small.png");
  }

  create() {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBackgroundColor("#83c9ff");

    this.createBackground();
    this.createCloudLayer();
    this.createBackDecorations();
    this.createPlatforms();
    this.createForegroundDecorations();
    this.createMilestones();
    this.createPlayer();
    this.createControls();
    this.createHud();

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(170, 110);

    this.eventsBridge.onProgressChange(0);
  }

  update() {
    if (this.isFrozen) {
      this.player.setVelocity(0);
      this.player.setAcceleration(0);
      this.player.play("layan-idle", true);
      return;
    }
    this.updateMovement();
    this.updateNearbyMilestone();
    this.updateProgress();
  }

  public setMobileInput(input: Partial<typeof this.mobileInput>) {
    this.mobileInput = { ...this.mobileInput, ...input };
  }

  public stopPlayer() {
    this.mobileInput = { left: false, right: false, jump: false };
    this.input?.keyboard?.resetKeys();

    if (!this.player?.body) return;

    this.player.setVelocity(0, 0);
    this.player.setAcceleration(0, 0);
    this.player.play("layan-idle", true);
  }

  public inspectNearby() {
    if (!this.nearbyMilestone) return;
    this.openMilestone(this.nearbyMilestone);
  }

  private createControls() {
    const keyboard = this.input.keyboard;

    if (!keyboard) return;

    this.controls = {
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      a: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      d: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      w: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      space: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      e: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    };

    keyboard.on("keydown-E", () => {
      if (this.nearbyMilestone) {
        this.openMilestone(this.nearbyMilestone);
      }
    });
  }

  private createPlayer() {
    this.player = this.physics.add.sprite(
      PLAYER_START_X,
      PLAYER_START_Y,
      "layan",
      0,
    );

    this.player.setDisplaySize(PLAYER_DISPLAY_WIDTH, PLAYER_DISPLAY_HEIGHT);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(60);
    this.player.setGravityY(1280);
    this.player.setDragX(1300);
    this.player.setMaxVelocity(320, 780);

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(72, 170);
    body.setOffset(44, 42);

    this.createPlayerAnimations();
    this.physics.add.collider(this.player, this.platformGroup);
  }

  private createPlayerAnimations() {
    if (!this.anims.exists("layan-idle")) {
      this.anims.create({
        key: "layan-idle",
        frames: this.anims.generateFrameNumbers("layan", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("layan-run")) {
      this.anims.create({
        key: "layan-run",
        frames: this.anims.generateFrameNumbers("layan", { start: 4, end: 9 }),
        frameRate: 12,
        repeat: -1,
      });
    }

    if (!this.anims.exists("layan-jump")) {
      this.anims.create({
        key: "layan-jump",
        frames: [{ key: "layan", frame: 10 }],
        frameRate: 1,
      });
    }

    if (!this.anims.exists("layan-fall")) {
      this.anims.create({
        key: "layan-fall",
        frames: [{ key: "layan", frame: 11 }],
        frameRate: 1,
      });
    }

    this.player.play("layan-idle");
  }

  private updateMovement() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    const left =
      this.controls.left.isDown ||
      this.controls.a.isDown ||
      this.mobileInput.left;

    const right =
      this.controls.right.isDown ||
      this.controls.d.isDown ||
      this.mobileInput.right;

    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.controls.up) ||
      Phaser.Input.Keyboard.JustDown(this.controls.w) ||
      Phaser.Input.Keyboard.JustDown(this.controls.space) ||
      this.mobileInput.jump;

    const isTryingToMove = left || right;

    if (left) {
      this.player.setAccelerationX(-1050);
      this.player.setFlipX(true);
    } else if (right) {
      this.player.setAccelerationX(1050);
      this.player.setFlipX(false);
    } else {
      this.player.setAccelerationX(0);
    }

    if (jumpPressed && body.blocked.down) {
      this.player.setVelocityY(-640);
    }

    if (!body.blocked.down && body.velocity.y < 0) {
      this.player.play("layan-jump", true);
    } else if (!body.blocked.down && body.velocity.y > 0) {
      this.player.play("layan-fall", true);
    } else if (isTryingToMove && Math.abs(body.velocity.x) > 22) {
      this.player.play("layan-run", true);
    } else {
      this.player.play("layan-idle", true);
    }

    this.player.setAngle(0);
    this.mobileInput.jump = false;
  }

  private createBackground() {
    if (this.textures.exists("worldBg")) {
      this.add
        .tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, "worldBg")
        .setOrigin(0)
        .setScrollFactor(0.28)
        .setDepth(-40);
    }

    const haze = this.add.graphics();
    haze.setDepth(-35);
    haze.fillStyle(0xffffff, 0.07);
    haze.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  }

  private createCloudLayer() {
    const clouds = [
      { key: "cloudBig", x: 420, y: 86, scale: 0.46, scroll: 0.32 },
      { key: "cloudSmall", x: 980, y: 125, scale: 0.38, scroll: 0.38 },
      { key: "cloudBig", x: 1650, y: 78, scale: 0.5, scroll: 0.32 },
      { key: "cloudSmall", x: 2450, y: 126, scale: 0.38, scroll: 0.38 },
      { key: "cloudBig", x: 3260, y: 84, scale: 0.48, scroll: 0.32 },
      { key: "cloudSmall", x: 4100, y: 116, scale: 0.38, scroll: 0.38 },
      { key: "cloudBig", x: 5060, y: 88, scale: 0.48, scroll: 0.32 },
    ];

    clouds.forEach((cloud, index) => {
      if (!this.textures.exists(cloud.key)) return;

      this.add
        .image(cloud.x, cloud.y, cloud.key)
        .setScale(cloud.scale)
        .setScrollFactor(cloud.scroll)
        .setDepth(-20)
        .setAlpha(index % 2 ? 0.55 : 0.68);
    });
  }

  private createBackDecorations() {
    const trees = [
      { key: "treePine", x: 610, y: FLOOR_Y + TREE_GROUND_OFFSET, scale: 0.42 },
      { key: "treeOak", x: 1180, y: FLOOR_Y + TREE_GROUND_OFFSET, scale: 0.42 },
      {
        key: "treePine",
        x: 1720,
        y: FLOOR_Y + TREE_GROUND_OFFSET,
        scale: 0.42,
      },
      { key: "treeOak", x: 2260, y: FLOOR_Y + TREE_GROUND_OFFSET, scale: 0.42 },
      {
        key: "treePine",
        x: 2840,
        y: FLOOR_Y + TREE_GROUND_OFFSET,
        scale: 0.42,
      },
      { key: "treeOak", x: 3400, y: FLOOR_Y + TREE_GROUND_OFFSET, scale: 0.42 },
      {
        key: "treePine",
        x: 3920,
        y: FLOOR_Y + TREE_GROUND_OFFSET,
        scale: 0.42,
      },
      { key: "treeOak", x: 4520, y: FLOOR_Y + TREE_GROUND_OFFSET, scale: 0.42 },
      {
        key: "treePine",
        x: 5200,
        y: FLOOR_Y + TREE_GROUND_OFFSET,
        scale: 0.42,
      },
    ];

    trees.forEach((item) => {
      if (!this.textures.exists(item.key)) return;

      this.add
        .image(item.x, item.y, item.key)
        .setOrigin(0.5, 1)
        .setScale(item.scale)
        .setDepth(4)
        .setAlpha(0.9);
    });
  }

  private createPlatforms() {
    this.platformGroup = this.physics.add.staticGroup();

    this.createSolidPlatform(0, FLOOR_Y, WORLD_WIDTH, 112, "floor");

    const platforms = [
      { x: 900, y: 350, w: 340 },
      { x: 1960, y: 320, w: 370 },
      { x: 3100, y: 350, w: 380 },
      { x: 4200, y: 320, w: 420 },
      { x: 5500, y: 350, w: 430 },
    ];

    platforms.forEach((platform) => {
      this.createSolidPlatform(
        platform.x - platform.w / 2,
        platform.y,
        platform.w,
        54,
        "floating",
      );
    });
  }

  private createSolidPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    type: "floor" | "floating",
  ) {
    const hitbox = this.add.rectangle(
      x + width / 2,
      y + height / 2,
      width,
      height,
      0xffffff,
      0,
    );

    this.physics.add.existing(hitbox, true);
    this.platformGroup.add(hitbox);

    if (type === "floor") {
      const tileSize = 64;

      for (let px = x; px < x + width; px += tileSize) {
        if (this.textures.exists("grassBlock")) {
          this.add
            .image(px + tileSize / 2, y + 28, "grassBlock")
            .setDisplaySize(tileSize, tileSize)
            .setDepth(18);
        }

        if (this.textures.exists("dirtBlock")) {
          this.add
            .image(px + tileSize / 2, y + 88 - TILE_OVERLAP, "dirtBlock")
            .setDisplaySize(tileSize, tileSize)
            .setDepth(17);
        }
      }

      return;
    }

    const platformKey =
      width >= 350
        ? "platformLong"
        : width >= 280
          ? "platformMid"
          : "platformSmall";

    if (this.textures.exists(platformKey)) {
      this.add
        .image(x + width / 2, y + 18 + PLATFORM_ART_OFFSET, platformKey)
        .setDisplaySize(width, 72)
        .setDepth(22);
    }
  }

  private createForegroundDecorations() {
    const groundY = FLOOR_Y + FLOOR_ART_OFFSET;
    const p350 = 350 + PLATFORM_ART_OFFSET;
    const p320 = 320 + PLATFORM_ART_OFFSET;

    const items = [
      // start area
      { key: "flowerWhite", x: 250, y: groundY, scale: 0.34, depth: 24 },
      { key: "bushSmall", x: 500, y: groundY, scale: 0.38, depth: 24 },
      { key: "rockSmall", x: 585, y: groundY, scale: 0.28, depth: 24 },

      // around network
      { key: "treePine", x: 730, y: groundY, scale: 0.42, depth: 24 },
      { key: "flowerPurple", x: 1030, y: groundY, scale: 0.32, depth: 24 },

      // security+
      { key: "bushBig", x: 1280, y: groundY, scale: 0.34, depth: 24 },
      { key: "mushroomRed", x: 1620, y: groundY, scale: 0.3, depth: 24 },

      // security intern
      { key: "rockBig", x: 1770, y: groundY, scale: 0.28, depth: 24 },
      { key: "flowerWhite", x: 1845, y: groundY, scale: 0.3, depth: 24 },

      // amanak
      { key: "bushSmall", x: 2350, y: groundY, scale: 0.36, depth: 24 },
      { key: "mushroomPurple", x: 2635, y: groundY, scale: 0.28, depth: 24 },
      { key: "flowerPink", x: 2720, y: groundY, scale: 0.32, depth: 24 },

      // devops platform
      { key: "flowerWhite", x: 3025, y: p350, scale: 0.26, depth: 26 },
      { key: "rockSmall", x: 3190, y: p350, scale: 0.24, depth: 26 },

      // ccna
      { key: "rockBig", x: 3520, y: groundY, scale: 0.28, depth: 24 },
      { key: "flowerWhite", x: 3770, y: groundY, scale: 0.32, depth: 24 },

      // trio platform
      { key: "flowerPurple", x: 4080, y: p320, scale: 0.28, depth: 26 },
      { key: "rockSmall", x: 4238, y: p320, scale: 0.24, depth: 26 },
      { key: "bushSmall", x: 4340, y: p320, scale: 0.3, depth: 26 },

      // full stack ground area
      { key: "bridge", x: 4680, y: groundY, scale: 0.44, depth: 28 },
      { key: "mushroomRed", x: 4970, y: groundY, scale: 0.3, depth: 24 },
      { key: "rockSmall", x: 5110, y: groundY, scale: 0.28, depth: 24 },

      // final platform
      { key: "flowerPink", x: 5660, y: p350, scale: 0.28, depth: 26 },
      { key: "rockSmall", x: 5400, y: p350, scale: 0.24, depth: 26 },
    ];

    items.forEach((item) => {
      if (!this.textures.exists(item.key)) return;

      this.add
        .image(item.x, item.y, item.key)
        .setOrigin(0.5, 1)
        .setScale(item.scale)
        .setDepth(item.depth);
    });

    if (this.textures.exists("flag")) {
      this.add
        .image(5885, groundY, "flag")
        .setOrigin(0.5, 1)
        .setScale(0.56)
        .setDepth(34);
    }
  }

  private createMilestones() {
    gameMilestones.forEach((milestone) => {
      this.drawMilestoneSign(milestone);

      const zone = this.add.zone(milestone.x, milestone.y - 52, 170, 150);
      this.physics.add.existing(zone, true);

      this.milestoneZones.push({ milestone, zone });
    });
  }

  private drawMilestoneSign(milestone: GameMilestone) {
    const x = milestone.x;
    const surfaceY = milestone.y + 12;

    if (this.textures.exists("signpost")) {
      this.add
        .image(x, surfaceY, "signpost")
        .setOrigin(0.5, 1)
        .setScale(0.42)
        .setDepth(35);
    }

    this.add
      .text(x, surfaceY - 92, milestone.number, {
        fontFamily: "monospace",
        fontSize: "22px",
        fontStyle: "bold",
        color: "#fff7ea",
        stroke: "#3b2111",
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setDepth(38);

    this.add
      .text(x, surfaceY - 54, milestone.shortLabel, {
        fontFamily: "monospace",
        fontSize: "10px",
        fontStyle: "bold",
        color: "#fff7ea",
        stroke: "#3b2111",
        strokeThickness: 3,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(39);
  }

  private createHud() {
    this.hintText = this.add.text(
      20,
      18,
      "Move: A/D or Arrows · Jump: W/Space · Inspect: E",
      {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#fff7ea",
        backgroundColor: "rgba(12,16,28,0.74)",
        padding: { x: 12, y: 8 },
      },
    );

    this.hintText.setScrollFactor(0);
    this.hintText.setDepth(100);
    this.hintText.setVisible(false);
  }

  private updateNearbyMilestone() {
    const px = this.player.x;
    const py = this.player.y;

    let nearest: GameMilestone | null = null;
    let best = Infinity;

    for (const item of this.milestoneZones) {
      const distance = Phaser.Math.Distance.Between(
        px,
        py,
        item.milestone.x,
        item.milestone.y - 52,
      );

      if (distance < 150 && distance < best) {
        best = distance;
        nearest = item.milestone;
      }
    }

    if (nearest?.id !== this.nearbyMilestone?.id) {
      this.nearbyMilestone = nearest;
      this.eventsBridge.onMilestoneNearby(nearest);
    }
  }

  private openMilestone(milestone: GameMilestone) {
    this.stopPlayer();
    this.inspected.add(milestone.id);
    this.eventsBridge.onOpenMilestone(milestone);

    if (milestone.id === gameMilestones[gameMilestones.length - 1].id) {
      this.eventsBridge.onRouteComplete();
    }
  }

  private updateProgress() {
    const progress = Phaser.Math.Clamp(
      this.player.x / (WORLD_WIDTH - 420),
      0,
      1,
    );

    if (Math.abs(progress - this.lastProgress) > 0.005) {
      this.lastProgress = progress;
      this.eventsBridge.onProgressChange(progress);
    }
  }
}
