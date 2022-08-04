import React from "react";

interface LayoutType {
  simpleLayout: React.LazyExoticComponent<() => JSX.Element>;
}
export const AppLayouts: LayoutType = {
  simpleLayout: React.lazy(() => import("./layouts/SimpleLayout")),
};
