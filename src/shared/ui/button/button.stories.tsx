import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,

  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "outline", "link"],
    },

    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },

    rounded: {
      control: "radio",
      options: ["sm", "full"],
    },
  },

  args: {
    children: "دکمه اصلی",
    variant: "primary",
    size: "md",
    rounded: "sm",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "دکمه خطی",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "لینک",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "کوچک",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "بزرگ",
  },
};

export const Rounded: Story = {
  args: {
    rounded: "full",
    children: "گرد",
  },
};