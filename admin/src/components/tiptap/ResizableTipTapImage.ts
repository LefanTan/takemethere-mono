import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/vue-3";

export const SIZES = ["small", "medium", "large"] as const;
export const ALIGNMENT = ["start", "center", "end"] as const;

export type SizeType = typeof SIZES[number];
export type AlignmentType = typeof ALIGNMENT[number];

const ResizableImage = Image.extend({
  name: "resizable-image",
  addOptions() {
    return {
      ...this.parent?.(),
      sizes: SIZES,
      align: ALIGNMENT,
    };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      size: {
        default: "large",
        rendered: false,
      },
      align: {
        default: "center",
        rendered: false,
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
          if (!this.options.sizes.includes(attributes.size)) {
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
        },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const size = node.attrs.size;
    HTMLAttributes.class = "resizable-image-" + size;

    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

export default ResizableImage;
