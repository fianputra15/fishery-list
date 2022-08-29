// @ts-nocheck
import React, { useEffect, useState } from 'react';
import JsonToForm from 'json-reactform';
import jsonForm from '../configs/jsonForm';
import Swal from 'sweetalert2';
import { isEmpty, upperCase } from 'lodash';
import store from '../services/steinClient';
import makeid from '../libs/generateId';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
const AddFishery: React.FC = () => {
  const history = useHistory();
  const [stateListArea, setStateListArea] = useState([]);
  const [stateListSize, setStateListSize] = useState([]);
  const [stateForm, setStateForm] = useState(null);
  const [stateLoadingList, setStateLoadingList] = useState(false);
  const [stateLoadingSize, setStateLoadingSize] = useState(false);
  // const [selectedProvinsi, setSelectedProvinsi] = useState(false);
  useEffect(() => {
    setStateLoadingList(true);
    store.read('option_area').then((data: any) => {
      setStateListArea(data);
    });

    setStateForm(jsonForm);
  }, []);

  useEffect(() => {
    setStateLoadingSize(true);
    store.read('option_size').then((data: any) => {
      setStateListSize(data);
    });
  }, []);

  // useEffect(() => {
  //   console.log(stateForm);
  // }, [stateForm]);

  // useEffect(() => {
  //   if (isEmpty(selectedProvinsi)) return;

  //   async function handleChangeListCity() {
  //     await setStateLoadingList(true);
  //  setStateForm({
  //   ...stateForm,
  //   Kota: {
  //     type: 'select',
  //     required: true,
  //     options: stateListArea
  //       ?.filter(
  //         (val) => val?.province === selectedProvinsi?.Provinsi?.value,
  //       )
  //       ?.map((val) => ({
  //         label: val?.city,
  //         value: val?.city,
  //       })),
  //   },
  // });
  //     setStateLoadingList(false);
  //   }
  //   handleChangeListCity();
  // }, [selectedProvinsi]);

  useEffect(() => {
    if (!isEmpty(stateListArea)) {
      setStateForm({
        ...stateForm,
        Provinsi: {
          type: 'select',
          required: true,
          options: stateListArea?.map((val) => ({
            label: val?.province,
            value: val?.province,
          })),
        },
        Kota: {
          type: 'select',
          required: true,
          options: stateListArea?.map((val) => ({
            label: val?.city,
            value: val?.city,
          })),
        },
      });
      setStateLoadingList(false);
    }
  }, [stateListArea]);

  useEffect(() => {
    if (!isEmpty(stateListSize) && !stateLoadingList) {
      setStateForm({
        ...stateForm,
        Ukuran: {
          type: 'select',
          required: true,
          options: stateListSize?.map((val) => ({
            label: val?.size,
            value: val?.size,
          })),
        },
      });
      setStateLoadingSize(false);
    }
  }, [stateListSize, stateLoadingList]);

  const handleAddNewFishery = (params) => {
    Swal.fire({
      title: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    const payload = {
      komoditas: upperCase(params?.Komoditas),
      area_provinsi: params?.Provinsi?.value,
      area_kota: params?.Kota?.value,
      size: parseInt(params?.Ukuran?.value, 10),
      price: parseInt(params?.Harga, 10),
      tgl_parsed: moment().format('YYYY-MM-DD hh:mm:ss'),
      timestamp: `${Math.floor(Date.now() / 1000)}`,
      uuid: `${makeid(8)}-${makeid(4)}-${makeid(4)}-${makeid(4)}-${makeid(8)}`,
    };
    store
      .append('list', [payload])
      .then((res) => {
        if (!isEmpty(res?.updatedRange)) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            didClose: () => {
              history.push('/');
            },
            text: 'Berhasil menambahkan data baru',
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div className="main">
      <div className="content-wrapper">
        <h2>New Fishery</h2>
        {stateLoadingList && isEmpty(stateListArea) && stateLoadingSize && (
          <div className="wrapper-loader">
            <div className="loader"></div>
          </div>
        )}
        {!stateLoadingList && !isEmpty(stateListArea) && !stateLoadingSize && (
          <JsonToForm model={stateForm} onSubmit={handleAddNewFishery} />
        )}
      </div>
    </div>
  );
};

export default AddFishery;
