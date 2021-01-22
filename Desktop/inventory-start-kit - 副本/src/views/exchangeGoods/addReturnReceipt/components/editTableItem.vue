<template>
  <div @click="onFieldClick" class="edit-cell">
    <div v-if="!editMode && !showInput">
      <div
        tabindex="0"
        class="cell-content"
        :class="{'edit-enabled-cell': canEdit}"
        @keyup.enter="onFieldClick"
      >
        <slot name="content"></slot>
      </div>
    </div>
    <component
      :is="editableComponent"
      v-if="editMode || showInput"
      ref="input"
      @focus="onFieldClick"
      @keyup.enter.native="onInputExit"
      v-on="listeners"
      v-bind="$attrs"
      v-model="model"
    >
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>
<script>
export default {
  name: "editable-cell",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    toolTipContent: {
      type: String,
      default: "Click to edit"
    },
    toolTipDelay: {
      type: Number,
      default: 500
    },
    toolTipPlacement: {
      type: String,
      default: "top-start"
    },
    showInput: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: "el-input"
    },
    closeEvent: {
      type: String,
      default: "blur"
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editMode: false
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    listeners() {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners
      };
    }
  },
  methods: {
    onFieldClick() {
      if (this.canEdit) {
        this.editMode = true;
        this.$nextTick(() => {
          let inputRef = this.$refs.input;
          if (inputRef && inputRef.focus) {
            inputRef.focus();
          }
        });
      }
    },
    onInputExit() {
      this.editMode = false;
    },
    onInputChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style>
/* .edit-cell {
  width: 100%;
  min-height: 40px;
} */
.edit-cell .el-input input {
  border: none;
  outline: none;
  background: white;
  border-radius: 10px;
}
.cell-content {
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  outline: none;
  border: 0px;
}
</style>
