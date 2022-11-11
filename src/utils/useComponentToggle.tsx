import React from 'react'

/**
 * 根据开发判断是否显示Debug类的组件
 * @param ToggledComponent 需要切换的组件
 */
export const useComponentToggle = <P extends {}>(ToggledComponent: React.ComponentType<P>) => (props: React.PropsWithChildren<P>) => {
  return import.meta.env.DEV ? <ToggledComponent {...props} /> : props.children ? <>{props.children}</> : null
}
