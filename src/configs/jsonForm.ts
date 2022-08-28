export default {
  Komoditas: {
    type: 'text',
    placeholder: 'Harap mengisi nama komoditas...',
    required: true,
  },
  Provinsi: {
    type: 'select',
    required: true,

    options: [
      // use static json arry to get options
      {
        value: '-',
        label: '-',
      },
    ],
  },
  Kota: {
    type: 'select',
    required: true,
    options: [
      // use static json arry to get options
      {
        value: '-',
        label: '-',
      },
    ],
  },
  Ukuran: {
    type: 'number',
    required: true,
  },
  Harga: {
    type: 'currency',
    required: true,
    placeholder: 'Harap mengisi harga...',
  },
  Simpan: {
    // button submit
    type: 'submit',
  },
};
