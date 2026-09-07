import type { Meta, StoryObj } from "@storybook/react-vite";

import BasketManager from "./BasketManager";
import "./BasketManagerStories.css";
import { withLRCContext } from "../../../.storybook/preview";

const meta = {
  title: "Components/BasketManager",
  component: BasketManager,
  decorators: [withLRCContext],
} satisfies Meta<typeof BasketManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
