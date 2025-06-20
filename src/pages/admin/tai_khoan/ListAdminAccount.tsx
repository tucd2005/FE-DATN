
import { Button } from 'antd';

import { useNavigate } from 'react-router-dom';
import AccountAdminTable from './components/account_table_admin';


const ListAccountAdminPage = () => {

  const navigate = useNavigate();
  return (
  
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">DANH SÁCH ADMIN</h1>
        <Button type="primary" className="mb-4" onClick={() => navigate('/admin/account_admin/add')}>
          Thêm mới tài khoản
        </Button>
      <AccountAdminTable />
      </div>
    
  );
};

export default ListAccountAdminPage;
