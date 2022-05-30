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
    onMouseUp() {
      this.mouseDown = false;
    },
    loadStoredSize() {
      this.$nextTick(() => {
        const parent = this.$refs.dragResize.parentElement;
        const id = parent.getAttribute('id');
        if (!id) {
          return;
        }

        const width = localStorage.getItem(`draggable_width_${id}`);
        if (width) {
          parent.style.minWidth = width + "px";
          parent.style.maxWidth = width + "px";
        }

        const height = localStorage.getItem(`draggable_height_${id}`);
        if (height) {
          parent.style.minHeight = height + "px";
          parent.style.maxHeight = height + "px";
        }
      });
    },
    onMouseMove(ev) {
      if (!this.mouseDown) {
        return;
      }
      const parent = this.$refs.dragResize.parentElement;
      const style = parent.currentStyle || window.getComputedStyle(parent);
      const id = parent.getAttribute("id");
      if (this.side === "right") {
        const halfBarWidth = this.$refs.dragResize.clientWidth / 2;
        const width =
          ev.clientX -
          parent.offsetLeft +
          halfBarWidth +
          window.scrollX -
          parseInt(style.paddingLeft) -
          parseInt(style.paddingRight);
        if (width < this.min || width > this.max) {
          return;
        }

        parent.style.minWidth = width + "px";
        parent.style.maxWidth = width + "px";
        if (id) {
          localStorage.setItem(`draggable_width_${id}`, width);
        }
      } else if (this.side === "top") {
        const halfBarHeight = this.$refs.dragResize.clientHeight / 2;
        const height =
          document.body.clientHeight -
          ev.clientY -
          halfBarHeight +
          window.scrollY -
          parseInt(style.paddingTop) -
          parseInt(style.paddingBottom);

        if (height < this.min || height > this.max) {
          return;
        }
        parent.style.minHeight = height + "px";
        parent.style.maxHeight = height + "px";
        if (id) {
          localStorage.setItem(`draggable_height_${id}`, height);
        }
      }
    }
  },
  mounted() {
    document.addEventListener("mouseleave", this.onMouseUp);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    this.loadStoredSize();
  },
  beforeUnmount() {
    document.removeEventListener("mouseleave", this.onMouseUp);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
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
  box-shadow: 1px 1px 1px #3f4455;
}

.drag-resize:hover {
  box-shadow: 0px 2px 4px #eee;
}

.drag-resize.left {
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  cursor: col-resize;
}

.drag-resize.right {
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  cursor: col-resize;
}

.drag-resize.top {
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  cursor: row-resize;
}

.drag-resize.bottom {
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  cursor: row-resize;
}
</style>
