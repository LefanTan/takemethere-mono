import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/vue-3";

export const SIZES = ["small", "medium", "large"] as const;
export const ALIGNMENT = ["start", "center", "end"] as const;

export type SizeType = typeof SIZES[number];
export type AlignmentType = typeof ALIGNMENT[number];

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      setSize: ({ size }: { size: SizeType }) => ReturnType;
      setAlignment: ({ alignment }: { alignment: AlignmentType }) => ReturnType;
    };
  }
}

const ResizableImage = Image.extend({
  name: "resizable-image",
  addOptions() {
    return {
      ...this.parent?.(),
      sizes: SIZES,
      alignment: ALIGNMENT,
    };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      size: {
        default: null,
        parseHTML: (element) => {
          return element.getAttribute("data-size") || "large";
        },
        renderHTML(attributes) {
          return {
            "data-size": attributes.size,
            class: "resizable-image-" + attributes.size,
          };
        },
      },
      alignment: {
        default: null,
        parseHTML: (element) => {
          return element.getAttribute("data-alignment") || "center";
        },
        renderHTML(attributes) {
          return {
            "data-alignment": attributes.alignment,
            class: "resizable-image-" + attributes.alignment,
          };
        },
      },
    };
  },
  addCommands() {
    return {
      ...this.parent?.(),
      setSize:
        (attributes: { size: SizeType }) =>
        ({ tr, dispatch }: any) => {
          // Check it's a valid size option
          if (!(this.options as any).sizes.includes(attributes.size)) {
            return false;
          }

          const { selection } = tr;
          const options = {
            ...selection.node.attrs,
            ...attributes,
          };
          const node = this.type.create(options);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }
          return true;
        },
      setAlignment:
        (attributes: { alignment: AlignmentType }) =>
        ({ tr, dispatch }: any) => {
          // Check it's a valid size option
          if (!(this.options as any).alignment.includes(attributes.alignment)) {
            return false;
          }

          const { selection } = tr;
          const options = {
            ...selection.node.attrs,
            ...attributes,
          };
          const node = this.type.create(options);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const size = node.attrs.size;
    HTMLAttributes.class = "resizable-image-" + size;

    const aligment = node.attrs.alignment;
    HTMLAttributes.class += " resizable-image-" + aligment;

    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

export default ResizableImage;
