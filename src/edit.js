import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { PanelBody, RadioControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */

const decide = (allowedBlocksCount, innerBlocks) => {
  const innerBlocksCount = innerBlocks.length;
  if (innerBlocksCount > allowedBlocksCount) {
    const blocksToBeDeleted = innerBlocks.slice(allowedBlocksCount);
    const clientIds = blocksToBeDeleted.map((block) => block.clientId);
    wp.data.dispatch("core/editor").removeBlocks(clientIds);
    return <InnerBlocks renderAppender={() => false} />;
  } else if (innerBlocksCount < allowedBlocksCount) {
    return (
      <InnerBlocks renderAppender={() => <InnerBlocks.ButtonBlockAppender />} />
    );
  } else {
    return <InnerBlocks renderAppender={() => false} />;
  }
};

export default function Edit({ attributes, setAttributes, clientId }) {
  try {
    const blockProps = useBlockProps();
    const innerBlocks = useSelect(
      (select) => select("core/block-editor").getBlock(clientId).innerBlocks
    );
    return (
      <>
        <InspectorControls>
          <PanelBody title="Allowed Blocks Number">
            <RadioControl
              label="Select allowed blocks number"
              selected={
                attributes.allowedBlocksNumber ||
                setAttributes({ allowedBlocksNumber: Number(1) })
              }
              options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
              ]}
              onChange={(value) =>
                setAttributes({ allowedBlocksNumber: Number(value) })
              }
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {decide(attributes.allowedBlocksNumber, innerBlocks)}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
