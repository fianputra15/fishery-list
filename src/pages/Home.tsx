// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Table from '../components/common/Table/Table';
import store from '../services/steinClient';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [stateListFishery, setStateListFishery] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  useEffect(() => {
    console.log('hei');
    setIsLoadingList(true);
    store.read('list').then((data: any) => {
      setStateListFishery(data);
      setIsLoadingList(false);
    });
  }, []);

  // const handleAddNewFishery = () => {
  //   const payload = {
  //     uuid: null,
  //     komoditas: null,
  //     area_provinsi: null,
  //     area_kota: null,
  //     size: null,
  //     price: null,
  //     tgl_parsed: null,
  //     timestamp: null,
  //   };
  // };

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
        <div>
          <Table
            loading={isLoadingList}
            tableData={stateListFishery}
            tableHeader={tableHeader}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
