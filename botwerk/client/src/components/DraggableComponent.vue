<script>
export default {
  props: ["parent", "side", "min", "max"],
  data() {
    return {
      mouseDown: null,
    };
  },
  methods: {
    onMouseDown(ev) {
      this.mouseDown = true;
      ev.preventDefault();
    },
  },
  mounted() {
    document.addEventListener("mouseleave", () => {
      this.mouseDown = false;
    });

    document.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });

    document.addEventListener("mousemove", (ev) => {
      if (!this.mouseDown) {
        return;
      }
      const parent = this.$refs.dragResize.parentElement;
      if (this.side === "right") {
        const halfBarWidth = this.$refs.dragResize.clientWidth / 2;
        const width = ev.clientX - parent.offsetLeft + halfBarWidth - 60;
        if (width < this.min || width > this.max) {
          return;
        }
        parent.style.minWidth = width + "px";
        parent.style.maxWidth = width + "px";
      } else if (this.side === "top") {
        const halfBarHeight = this.$refs.dragResize.clientHeight / 2;
        const height = document.body.clientHeight - ev.clientY - halfBarHeight;
        if (height < this.min || height > this.max) {
          return;
        }
        parent.style.minHeight = height + "px";
        parent.style.maxHeight = height + "px";
      }
    });
  }
};
</script>

<template>
  <div
    ref="dragResize"
    class="drag-resize"
    :class="[side]"
    @mousedown="onMouseDown"
  ></div>
</template>

<style scoped>
.drag-resize {
  z-index: 1;
  position: absolute;
  background: #3f4455;
}

.drag-resize:hover {
  box-shadow: 1px 1px 1px #eee;
}

.drag-resize.left {
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  cursor: col-resize;
}

.drag-resize.right {
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  cursor: col-resize;
}

.drag-resize.top {
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
  cursor: row-resize;
}

.drag-resize.bottom {
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
  cursor: row-resize;
}
</style>
