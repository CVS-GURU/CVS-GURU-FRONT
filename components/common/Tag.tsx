import { useCallback } from "react";
import { Tag } from "antd";

type TagComponentProps = {
  type: "not_confirm" | "confirm" | "admission" | "new" | "custom";
  count?: number;
  customTitle?: string;
  customColor?: string;
};

const TagComponent = ({
  type,
  count,
  customTitle,
  customColor,
}: TagComponentProps) => {
  const getColor = useCallback(
    (type) => {
      if (type === "not_confirm") return { color: "#f50", title: "미확인" };
      if (type === "confirm") return { color: "#108ee9", title: "확인" };
      if (type === "admission") return { color: "#87d068", title: "승인" };
      if (type === "new") return { color: "#2db7f5", title: "신규" };
      return { color: customColor ? customColor : "grey", title: customTitle };
    },
    [type]
  );
  const { color, title } = getColor(type);

  if (customTitle) return <Tag color={color}>{customTitle}</Tag>;

  return <Tag color={color}>{`${title} ${count}건`}</Tag>;
};
export default TagComponent;
