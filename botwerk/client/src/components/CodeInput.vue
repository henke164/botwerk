<script>
export default {
  props: ["onSave", "initialText"],
  data() {
    return {
      text: "",
      commandColors: [
        {
          regex: /var/g,
          className: "blue",
        },
        {
          regex: /function/g,
          className: "blue",
        },
        {
          regex: /return/g,
          className: "pink",
        },
        {
          regex: /\((.*?)\)/g,
          className: "yellow",
        },
        {
          regex: /"(.*?)"/g,
          className: "beige",
        },
        {
          regex: /'(.*?)'/g,
          className: "beige",
        },
        {
          regex: /\d+/g,
          className: "lightgreen",
        },
        {
          regex: /\/\*(.*[\s\S]*?)\*\//g,
          className: "comment-green",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.text = this.initialText;
      this.$nextTick(() => {
        this.updateBackdrop();
      });
    });
  },
  methods: {
    handleKeyPress(ev) {
      this.updateBackdrop();
      if (ev.key === "Tab") {
        if (ev.shiftKey) {
          ev.preventDefault();
          return false;
        } else {
          document.execCommand("insertText", false, "  ");
          ev.preventDefault();
          return false;
        }
      }
    },
    handleKeyUp() {
      this.updateMarkerPosition();
      this.updateBackdrop();
    },
    updateBackdrop() {
      let backdrop = this.$refs.textarea.value;
      for (let i = 0; i < this.commandColors.length; i++) {
        const { regex, className } = this.commandColors[i];
        let match = backdrop.matchAll(regex);

        let offset = 0;
        let m;
        do {
          m = match.next();
          if (!m.value) {
            continue;
          }
          const text = m.value[0];
          const replaced = `<span class=𖡄${className}𖡄>${text}</span>`;
          backdrop = [
            backdrop.slice(0, m.value.index + offset),
            replaced,
            backdrop.slice(m.value.index + text.length + offset),
          ].join("");
          offset += replaced.length - text.length;
        } while (!m.done);
      }

      this.$refs.backdrop.innerHTML = backdrop.replace(/𖡄/g, '"');
    },
    updateMarkerPosition() {
      const { selectionStart } = this.$refs.textarea;
      const str = this.$refs.textarea.value.substr(0, selectionStart);
      this.$refs.measure.textContent = str + "x";
      var y = this.$refs.measure.clientHeight;
      const parts = str.split("\n");
      const lastRow = parts[parts.length - 1];
      this.$refs.measure.textContent = lastRow;
      var x = this.$refs.measure.clientWidth;
      var scrollTop = this.$refs.textarea.scrollTop;
      this.$refs.marker.style.top = `${y - 30 - scrollTop}px`;
      this.$refs.marker.style.left = `${x - 12}px`;
      this.updateBackdrop();
    },
    handleScroll() {
      this.$refs.backdrop.scrollTop = this.$refs.textarea.scrollTop;
    },
  },
};
</script>

<template>
  <div class="text-area-wrapper">
    <div ref="measure" class="measure"></div>
    <textarea
      spellcheck="false"
      ref="textarea"
      v-on:keydown="handleKeyPress"
      v-on:keyup="handleKeyUp"
      v-on:mouseup="updateMarkerPosition"
      v-on:dragstart="(e) => e.preventDefault()"
      v-on:scroll="handleScroll"
      v-model="text"
    ></textarea>
    <div ref="backdrop" class="backdrop"></div>
    <div ref="marker" class="marker">|</div>
  </div>
</template>

<style scoped>
.text-area-wrapper {
  display: flex;
  flex: 1;
  position: relative;
}

.marker {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 5px;
}

.measure {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  font-family: "Consolas";
  font-size: 12px;
  white-space: pre;
  font-weight: bold;
}

textarea {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  z-index: 1;
  padding: 10px;
  background: transparent;
  color: transparent;
  font-family: "Consolas";
  font-size: 12px;
  font-weight: bold;
}

.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 10px;
  color: white;
  font-family: "Consolas";
  font-size: 12px;
  white-space: pre;
  font-weight: bold;
  overflow-y: scroll;
}
</style>

<style>
.blue {
  color: #007aa6;
}

.lightgreen {
  color: #b5ce9b;
}

.beige {
  color: #ce9178;
}

.pink {
  color: #c586c0;
}

.yellow {
  color: #cfc350;
}

.comment-green {
  color: #6a9955 !important;
}

.comment-green .yellow {
  color: #6a9955 !important;
}

.comment-green .pink {
  color: #6a9955 !important;
}

.comment-green .blue {
  color: #6a9955 !important;
}

.comment-green .lightgreen {
  color: #6a9955 !important;
}

.comment-green .beige {
  color: #6a9955 !important;
}
</style>
