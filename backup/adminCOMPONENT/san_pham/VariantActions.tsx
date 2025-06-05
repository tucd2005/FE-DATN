import { Dropdown, Menu, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

interface VariantActionsProps {
  variantId: number;
  onEdit: (id: number) => void;
  onStop: (id: number) => void;
}

const VariantActions: React.FC<VariantActionsProps> = ({ onEdit, onStop, variantId }) => {
  const menu = (
    <Menu>
      <Menu.Item key="stop" onClick={() => onStop(variantId)}>
        Dừng bán
      </Menu.Item>
      <Menu.Item key="edit" onClick={() => onEdit(variantId)}>
        Sửa
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default VariantActions;
