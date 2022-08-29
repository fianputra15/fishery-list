// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Table from '../components/common/Table/Table';
import store from '../services/steinClient';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home: React.FC = () => {
  const [stateListFishery, setStateListFishery] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const handleGetList = () => {
    setIsLoadingList(true);
    store.read('list').then((data: any) => {
      setStateListFishery(data);
      setIsLoadingList(false);
    });
  };
  useEffect(() => {
    handleGetList();
  }, []);

  const handleDeleteFishery = (params) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus fishery ${params?.komoditas}?`,
      text: 'Sekali fishery terhapus, data tidak akan bisa dikembalikan',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Please wait...',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
        store
          .delete('list', {
            search: { uuid: params?.uuid },
          })
          .then((res) => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: `Berhasil menghapus fishery ${params?.komoditas}`,
            });
            handleGetList();
          });
      }
    });
  };

  const tableHeader = [
    {
      Header: 'Kota',
      accessor: 'area_kota',
      filter: 'fuzzyText',
    },
    {
      Header: 'Provinsi',
      accessor: 'area_provinsi',
    },
    {
      Header: 'Komoditas',
      accessor: 'komoditas',
    },
    {
      Header: 'Harga',
      accessor: 'price',
    },
    {
      Header: 'Ukuran',
      accessor: 'size',
    },
    {
      Header: 'Tanggal',
      accessor: 'tgl_parsed',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
  ];

  return (
    <div className="main">
      <div className="content-wrapper">
        <div className="content-header">
          <h2>List Fishery</h2>

          <Link className="menu" to="/add-fishery">
            <div>
              <span className="material-icons">add</span>{' '}
              <span>Add New Fishery</span>
            </div>
          </Link>
        </div>
        {isLoadingList && (
          <div className="wrapper-loader">
            <div className="loader"></div>
          </div>
        )}
        <div>
          <Table
            loading={isLoadingList}
            tableData={stateListFishery}
            tableHeader={tableHeader}
            handleDeleteFishery={handleDeleteFishery}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
