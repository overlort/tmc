import {
  AlertTriangle,
  Archive,
  Battery,
  Box,
  Boxes,
  Car,
  ClipboardList,
  Folder,
  FolderEdit,
  FolderPlus,
  Hammer,
  Package,
  Search,
  Shirt,
  Tag,
  Truck,
  Warehouse,
  Wrench,
  Zap
} from "lucide-react";
import { JSX } from "react";

interface RenderIconProps {
  name?: string | null;
  className?: string;
}

export const RenderIcon = ({ name, className }: RenderIconProps): JSX.Element => {
  switch (name) {
    case "wrench":
      return <Wrench className={className} />;
    case "hammer":
      return <Hammer className={className} />;
    case "package":
      return <Package className={className} />;
    case "box":
      return <Box className={className} />;
    case "boxes":
      return <Boxes className={className} />;
    case "truck":
      return <Truck className={className} />;
    case "car":
      return <Car className={className} />;
    case "battery":
      return <Battery className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "shirt":
      return <Shirt className={className} />;
    case "clipboardList":
      return <ClipboardList className={className} />;
    case "warehouse":
      return <Warehouse className={className} />;
    case "folder":
      return <Folder className={className} />;
    case "folderPlus":
      return <FolderPlus className={className} />;
    case "folderEdit":
      return <FolderEdit className={className} />;
    case "archive":
      return <Archive className={className} />;
    case "tag":
      return <Tag className={className} />;
    case "search":
      return <Search className={className} />;
    case "alertTriangle":
      return <AlertTriangle className={className} />;
    default:
      return <Folder className={className} />;
  }
}

export const iconsList = [
  "wrench",
  "hammer",
  "package",
  "box",
  "boxes",
  "truck",
  "car",
  "battery",
  "zap",
  "shirt",
  "clipboardList",
  "warehouse",
  "folder",
  "folderPlus",
  "folderEdit",
  "archive",
  "tag",
  "search",
  "alertTriangle"
] as const;

// export type IconName = typeof iconNames[number];