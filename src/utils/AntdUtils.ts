import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

/**
 * 封装 antd ui 框架中的 MenuItem 对象
 */
export function getMenuItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem
}
