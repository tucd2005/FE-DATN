import React, { useEffect, useMemo, useState } from "react";

const NhanVien: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [data, setData] = useState([
    { name: "Võ Trường", gender: "Nam", dob: "15/03/2000", address: "Thông Tin Bảo Mật", role: "Admin" },
    // Bạn có thể thêm nhiều dữ liệu nhân viên ở đây
  ]);

  const totalPages = useMemo(() => data.length / itemsPerPage, [data.length, itemsPerPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <i className="fas fa-bars"></i>
            </button>
            <a className="navbar-brand" href="#">
              <i className="fa fa-user-circle"></i> QUẢN LÝ NHÂN VIÊN
            </a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><a href="#">NHÂN VIÊN</a></li>
              <li><a href="#">ĐIỂM DANH</a></li>
              <li><a href="#">TIỀN LƯƠNG</a></li>
              <li><a href="#">LỊCH CÔNG TÁC</a></li>
              <li><a href="#">BÁO CÁO</a></li>
              <li><a href="#">SỰ KIỆN</a></li>
              <li><a href="#"><b>Tài Khoản</b><span className="caret"></span></a>
                <ul className="dropdown">
                  <li><a href="/index.html"><b>Đăng xuất <i className="fas fa-sign-out-alt"></i></b></a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid al">
        <div id="clock"></div><br />
        <p className="timkiemnhanvien"><b>TÌM KIẾM NHÂN VIÊN:</b></p><br />
        <input type="text" placeholder="Nhập tên nhân viên cần tìm..." />
        <i className="fa fa-search"></i><br /><br />
        <b>CHỨC NĂNG CHÍNH:</b><br />
        <button className="nv btn add-new" type="button" title="Thêm Nhân Viên"><i className="fas fa-user-plus"></i></button>
        <button className="nv" type="button" title="Lọc Dữ Liệu"><i className="fa fa-filter"></i></button>
        <button className="nv xuat" title="Xuất File"><i className="fas fa-file-import"></i></button>
        <button className="nv cog" title="Cài Đặt"><i className="fas fa-cogs"></i></button>

        <table className="table table-bordered" id="myTable">
          <thead>
            <tr>
              <th>Tên Nhân Viên</th>
              <th>Giới Tính</th>
              <th>Ngày Sinh</th>
              <th>Địa Chỉ</th>
              <th>Chức Vụ</th>
              <th>Tính Năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.gender}</td>
                <td>{row.dob}</td>
                <td>{row.address}</td>
                <td>{row.role}</td>
                <td>
                  <a className="add" title="Lưu Lại"><i className="fa fa-floppy-o"></i></a>
                  <a className="edit" title="Sửa"><i className="fa fa-pencil"></i></a>
                  <a className="delete" title="Xóa"><i className="fa fa-trash-o"></i></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="pageNavPosition" className="text-right">
          <span onClick={handlePrev} className="pg-normal">&#171;</span> |
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? "pg-selected" : "pg-normal"}
            >
              {index + 1}
            </span>
          ))} |
          <span onClick={handleNext} className="pg-normal">&#187;</span>
        </div>
      </div>

      <div className="container-fluid end">
        <div className="row text-center">
          <div className="col-lg-12 link">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-google"></i>
          </div>
          <div className="col-lg-12">
            2019 CopyRight Phần mềm quản lý | Design by <a href="#">TruongBinIT</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhanVien;
