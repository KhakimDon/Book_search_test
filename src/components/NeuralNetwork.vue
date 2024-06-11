<template>
  <canvas id="network" ref="networkCanvas" @click="handleCanvasClick"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const networkCanvas = ref(null);
let ctx;
const dots = ref([]);
const numDots = 100;
const maxDistance = 100;

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
  }

  update(canvas) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
}

function createDots(canvas) {
  for (let i = 0; i < numDots; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    dots.value.push(new Dot(x, y));
  }
}

function drawLines(ctx, dots, maxDistance) {
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      let dx = dots[i].x - dots[j].x;
      let dy = dots[i].y - dots[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, networkCanvas.value.width, networkCanvas.value.height);

  for (let dot of dots.value) {
    dot.update(networkCanvas.value);
    dot.draw(ctx);
  }

  drawLines(ctx, dots.value, maxDistance);
  requestAnimationFrame(animate);
}

function handleCanvasClick(event) {
  const rect = networkCanvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  dots.value.push(new Dot(x, y));
}

onMounted(() => {
  networkCanvas.value.width = window.innerWidth;
  networkCanvas.value.height = window.innerHeight;
  ctx = networkCanvas.value.getContext('2d');

  createDots(networkCanvas.value);
  animate();
});
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #188d3f  !important;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
