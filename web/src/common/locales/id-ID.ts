export default {
  // Umum
  common: {
    confirm: 'Konfirmasi',
    cancel: 'Batal',
    save: 'Simpan',
    delete: 'Hapus',
    // Additional keys for table fields
    state: 'Status',
    createdAt: 'Dibuat',
    updatedAt: 'Diperbarui',
    // Navigation
    edit: 'Edit',
    add: 'Tambah',
    create: 'Buat',
    confirmCreate: 'Konfirmasi Buat',
    submit: 'Kirim',
    reset: 'Reset',
    search: 'Cari',
    loading: 'Memuat...',
    noData: 'Tidak Ada Data',
    success: 'Berhasil',
    error: 'Error',
    warning: 'Peringatan',
    info: 'Info',
    close: 'Tutup',
    back: 'Kembali',
    surveyDeleted: 'Survei telah dihapus dan tidak dapat diakses.',
    backToList: 'Kembali ke Daftar Survei',
    next: 'Selanjutnya',
    previous: 'Sebelumnya',
    finish: 'Selesai',
    copy: 'Salin',
    download: 'Unduh',
    upload: 'Unggah',
    preview: 'Pratinjau',
    publish: 'Terbitkan',
    unpublish: 'Batalkan Terbit',
    view: 'Lihat',
    more: 'Lainnya',
    settings: 'Pengaturan',
    help: 'Bantuan',
    about: 'Tentang',
    logout: 'Keluar',
    language: 'Bahasa'
  },

  // Halaman Login
  login: {
    title: 'Halo, Silakan Login',
    account: 'Akun',
    password: 'Kata Sandi',
    captcha: 'Kode Verifikasi',
    loginBtn: 'Masuk',
    registerBtn: 'Daftar',
    accountPlaceholder: 'Masukkan akun Anda',
    passwordPlaceholder: 'Masukkan kata sandi',
    captchaPlaceholder: 'Masukkan kode verifikasi',
    accountRequired: 'Akun wajib diisi',
    passwordRequired: 'Kata sandi wajib diisi',
    captchaRequired: 'Kode verifikasi wajib diisi',
    accountLength: 'Panjang harus 3 hingga 10 karakter',
    passwordLength: 'Panjang harus 6 hingga 16 karakter',
    passwordFormat: 'Hanya diperbolehkan angka, huruf, dan karakter khusus',
    loginSuccess: 'Login berhasil',
    loginFailed: 'Login gagal',
    registerSuccess: 'Pendaftaran berhasil',
    registerFailed: 'Pendaftaran gagal',
    getCaptchaFailed: 'Gagal mendapatkan kode verifikasi',
    refreshCaptcha: 'Klik untuk menyegarkan kode verifikasi',
    knownText: 'Saya Mengerti'
  },

  // Navigasi
  nav: {
    home: 'Beranda',
    survey: 'Survei',
    template: 'Template',
    data: 'Data',
    analysis: 'Analisis',
    settings: 'Pengaturan',
    workspace: 'Ruang Kerja',
    profile: 'Profil',
    editSurvey: 'Edit Survei',
    publishSurvey: 'Terbitkan Survei',
    dataAnalysis: 'Analisis Data'
  },

  // Daftar Survei
  surveyList: {
    title: 'Daftar Survei',
    createSurvey: 'Buat Survei',
    createSpace: 'Buat Ruang Tim',
    createGroup: 'Buat Grup',
    spaceManagement: 'Manajemen Tim',
    mySpace: 'Ruang Saya',
    teamSpace: 'Ruang Tim',
    surveyListTitle: 'Daftar Survei',
    myGroup: 'Grup Saya',
    allSurveys: 'Semua Survei',
    publishedSurveys: 'Terbit',
    draftSurveys: 'Draft',
    completedSurveys: 'Selesai',
    searchPlaceholder: 'Cari nama survei',
    noSurveys: 'Tidak ada survei ditemukan',
    surveyName: 'Nama Survei',
    status: 'Status',
    createTime: 'Dibuat',
    updateTime: 'Diperbarui',
    responseCount: 'Jumlah Respons',
    actions: 'Aksi',
    draft: 'Draft',
    published: 'Terbit',
    completed: 'Selesai',
    paused: 'Dijeda',
    selectCreateMethod: 'Pilih Metode Pembuatan',
    pleaseImportQuestions: 'Silakan impor pertanyaan',
    // Table headers
    type: 'Tipe',
    surveyTitle: 'Judul',
    remark: 'Catatan',
    owner: 'Pemilik',
    // Actions
    edit: 'Edit',
    delete: 'Hapus',
    copy: 'Salin',
    move: 'Pindah',
    publish: 'Terbitkan',
    pause: 'Jeda',
    complete: 'Selesai',
    restore: 'Pulihkan',
    // Placeholders
    enterSurveyTitle: 'Masukkan judul survei',
    enterRemark: 'Masukkan catatan',
    // Recycle bin
    recycleBin: 'Tempat Sampah',
    // Workspace and Group
    workspace: 'Ruang Kerja',
    group: 'Grup',
    // Status filters
    all: 'Semua',
    draftStatus: 'Draft',
    publishedStatus: 'Diterbitkan',
    completedStatus: 'Selesai',
    pausedStatus: 'Dijeda',
    // Additional keys for table fields
    state: 'Status',
    createdAt: 'Dibuat',
    updatedAt: 'Diperbarui',
    // Space and Group management
    spaceDescriptionLabel: 'Deskripsi Ruang Tim',
    addMembers: 'Tambah Anggota',
    createSpaceTitle: 'Buat Ruang Tim',
    manageSpaceTitle: 'Kelola Ruang Tim',
    createGroupTitle: 'Buat Grup',
    manageGroupTitle: 'Kelola Grup',
    enterSpaceName: 'Silakan masukkan nama ruang tim',
    enterGroupName: 'Silakan masukkan nama grup',
    setAdmin: 'Silakan tetapkan setidaknya satu administrator ruang',
    // Confirm messages
    confirmDelete: 'Apakah Anda yakin ingin menghapus?',
    confirmDeleteSpace:
      'Menghapus akan secara sinkron menghapus survei di dalam tim, apakah Anda yakin ingin menghapus ini?',
    confirmDeleteGroup:
      'Menghapus grup akan secara otomatis memindahkan survei yang termasuk dalam grup ini ke "Tidak Dikelompokkan". Apakah Anda yakin ingin menghapus?',
    confirmPause:
      'Setelah "menjeda pengumpulan", survei tidak dapat diisi. Apakah Anda ingin melanjutkan?',
    confirmCompleteDelete:
      'Survei akan dihapus secara permanen dari tempat sampah. Apakah Anda yakin ingin menghapus?',
    deleteSuccess: 'Berhasil dihapus',
    deleteFailed: 'Gagal menghapus',
    recoverSuccess: 'Berhasil dipulihkan',
    recoverFailed: 'Gagal memulihkan',
    pauseSuccess: 'Berhasil dijeda',
    pauseFailed: 'Gagal menjeda',
    cancelPause: 'Batal jeda',
    // Text import
    inputArea: 'Area Input',
    inputExample: 'Contoh Input',
    editExample: 'Edit Contoh',
    example: 'Contoh',
    copyText: 'Salin Teks',
    copySuccess: 'Berhasil disalin!',
    // List config
    surveyTypes: {
      normal: 'Survei Dasar',
      vote: 'Pemilihan & Voting',
      nps: 'Skor NPS',
      register: 'Pendaftaran Online'
    },
    tableHeaders: {
      spaceName: 'Nama Ruang',
      surveyCount: 'Jumlah Survei',
      memberCount: 'Jumlah Anggota',
      groupName: 'Nama Grup',
      surveyType: 'Tipe',
      surveyTitle: 'Judul',
      remark: 'Catatan',
      status: 'Status',
      owner: 'Pemilik',
      updatedAt: 'Diperbarui',
      createdAt: 'Dibuat',
      deletedAt: 'Dihapus'
    },
    emptyStates: {
      noSurveys: 'Anda belum membuat survei apa pun',
      noSurveysDesc: 'Klik kanan atas untuk membuat survei sekarang!',
      noSpaces: 'Anda belum membuat ruang tim apa pun',
      noSpacesDesc: 'Klik kanan atas untuk membuat ruang tim sekarang!',
      noSpacesSearch: 'Tidak ada ruang tim yang cocok dengan kriteria pencarian',
      noSpacesSearchDesc: 'Coba ubah kondisi pencarian',
      noGroups: 'Anda belum membuat grup survei apa pun',
      noGroupsDesc: 'Klik kanan atas untuk membuat grup survei sekarang!',
      noGroupsSearch: 'Tidak ada grup survei yang cocok dengan kriteria pencarian',
      noGroupsSearchDesc: 'Coba ubah kondisi pencarian',
      noSurveysSearch: 'Tidak ada survei yang cocok dengan kriteria pencarian',
      noSurveysSearchDesc: 'Coba ubah kondisi pencarian',
      noDownloadTasks: 'Tidak ada tugas unduh',
      noDownloadTasksDesc: 'Anda dapat mengunduh dari analisis data'
    },
    surveyStatuses: {
      new: 'Belum Diterbitkan',
      published: 'Diterbitkan',
      editing: 'Sedang Diedit',
      pausing: 'Dijeda'
    },
    filters: {
      surveyType: 'Tipe Survei',
      status: 'Status Survei',
      allTypes: 'Semua Tipe',
      allStatuses: 'Semua Status'
    },
    sortOptions: {
      updatedAt: 'Waktu Diperbarui',
      createdAt: 'Waktu Dibuat'
    },
    // Additional keys
    name: 'Nama',
    surveyTotal: 'Jumlah Survei'
  },

  // Editor Survei
  editor: {
    title: 'Editor Survei',
    surveyTitle: 'Judul Survei',
    surveyDesc: 'Deskripsi Survei',
    addQuestion: 'Tambah Pertanyaan',
    deleteQuestion: 'Hapus Pertanyaan',
    copyQuestion: 'Salin Pertanyaan',
    moveUp: 'Pindah Ke Atas',
    moveDown: 'Pindah Ke Bawah',
    questionTitle: 'Judul Pertanyaan',
    questionType: 'Jenis Pertanyaan',
    required: 'Wajib',
    optional: 'Opsional',
    singleChoice: 'Pilihan Tunggal',
    multiChoice: 'Pilihan Ganda',
    textInput: 'Input Teks',
    textArea: 'Area Teks',
    number: 'Input Angka',
    date: 'Pemilih Tanggal',
    time: 'Pemilih Waktu',
    rating: 'Rating',
    nps: 'Skor NPS',
    matrix: 'Matriks',
    file: 'Unggah File',
    addOption: 'Tambah Opsi',
    optionText: 'Teks Opsi',
    otherOption: 'Opsi Lainnya',
    saveSuccess: 'Berhasil disimpan',
    saveFailed: 'Gagal menyimpan',
    preview: 'Pratinjau Survei',
    publish: 'Terbitkan Survei',
    settings: 'Pengaturan Survei',
    createBlank: 'Buat Kosong',
    textImport: 'Impor Teks',
    aiGenerate: 'Generate AI',
    aiGenerateSurvey: 'Generasi Survei AI Cerdas',
    excelImport: 'Impor Excel',
    selectCreateMethod: 'Pilih Metode Pembuatan',
    collaborate: 'Kolaborasi'
  },

  // Formulir Buat Survei
  createForm: {
    surveyTitleLabel: 'Nama Survei',
    surveyTitlePlaceholder: 'Masukkan nama survei',
    surveyTitleTip: 'Judul ini akan ditampilkan di bagian atas browser saat membuka survei',
    remarkLabel: 'Catatan Survei',
    remarkPlaceholder: 'Masukkan catatan',
    remarkTip: 'Catatan hanya terlihat oleh diri sendiri',
    groupLabel: 'Grup',
    groupPlaceholder: 'Tidak Dikelompokkan',
    createButton: 'Mulai Membuat'
  },

  // Pengaturan Survei
  surveySettings: {
    title: 'Pengaturan Survei',
    basic: 'Pengaturan Dasar',
    advanced: 'Pengaturan Lanjutan',
    theme: 'Pengaturan Tema',
    security: 'Pengaturan Keamanan',
    surveyTitle: 'Judul Survei',
    surveyDesc: 'Deskripsi Survei',
    startTime: 'Waktu Mulai',
    endTime: 'Waktu Berakhir',
    maxResponses: 'Maksimal Respons',
    allowAnonymous: 'Izinkan Anonim',
    requireLogin: 'Perlu Login',
    oneResponsePerUser: 'Satu Respons Per Pengguna',
    showProgress: 'Tampilkan Progress',
    allowEdit: 'Izinkan Edit Jawaban',
    showResult: 'Tampilkan Hasil',
    customTheme: 'Tema Kustom',
    backgroundColor: 'Warna Latar',
    textColor: 'Warna Teks',
    buttonColor: 'Warna Tombol'
  },

  // Analisis Data
  analysis: {
    title: 'Analisis Data',
    overview: 'Ringkasan',
    responses: 'Respons',
    statistics: 'Statistik',
    export: 'Ekspor Data',
    totalResponses: 'Total Respons',
    validResponses: 'Respons Valid',
    invalidResponses: 'Respons Tidak Valid',
    responseRate: 'Tingkat Respons',
    averageTime: 'Waktu Rata-rata',
    exportExcel: 'Ekspor Excel',
    exportCSV: 'Ekspor CSV',
    exportPDF: 'Ekspor PDF',
    timeRange: 'Rentang Waktu',
    today: 'Hari Ini',
    yesterday: 'Kemarin',
    thisWeek: 'Minggu Ini',
    lastWeek: 'Minggu Lalu',
    thisMonth: 'Bulan Ini',
    lastMonth: 'Bulan Lalu',
    custom: 'Kustom'
  },

  // Pesan Error
  error: {
    networkError: 'Koneksi jaringan gagal',
    serverError: 'Error server',
    permissionDenied: 'Izin ditolak',
    notFound: 'Halaman tidak ditemukan',
    timeout: 'Request timeout',
    unknown: 'Error tidak dikenal',
    validationFailed: 'Validasi gagal',
    uploadFailed: 'Unggah gagal',
    downloadFailed: 'Unduh gagal',
    saveFailed: 'Simpan gagal',
    deleteFailed: 'Hapus gagal',
    sessionInvalid: 'ID sesi tidak valid',
    surveyIdNotFound: 'ID survei tidak ditemukan',
    createFailed: 'Pembuatan Gagal',
    createSurveyFailed: 'Gagal Membuat Survei:',
    createFailedRetry: 'Pembuatan gagal, silakan coba lagi nanti'
  },

  // Pesan Sukses
  success: {
    saved: 'Berhasil disimpan',
    deleted: 'Berhasil dihapus',
    created: 'Berhasil dibuat',
    updated: 'Berhasil diperbarui',
    published: 'Berhasil diterbitkan',
    unpublished: 'Berhasil dibatalkan terbit',
    copied: 'Berhasil disalin',
    uploaded: 'Berhasil diunggah',
    downloaded: 'Berhasil diunduh',
    imported: 'Berhasil diimpor',
    exported: 'Berhasil diekspor'
  },

  // Pesan Konfirmasi
  confirm: {
    delete: 'Anda yakin ingin menghapus?',
    publish: 'Anda yakin ingin menerbitkan?',
    unpublish: 'Anda yakin ingin membatalkan terbit?',
    save: 'Anda yakin ingin menyimpan?',
    reset: 'Anda yakin ingin mereset?',
    discard: 'Anda yakin ingin membuang perubahan?',
    leave: 'Anda yakin ingin meninggalkan halaman? Perubahan yang belum disimpan akan hilang.'
  },

  // Format Waktu
  time: {
    justNow: 'Baru saja',
    minutesAgo: '{n} menit yang lalu',
    hoursAgo: '{n} jam yang lalu',
    daysAgo: '{n} hari yang lalu',
    monthsAgo: '{n} bulan yang lalu',
    yearsAgo: '{n} tahun yang lalu'
  },

  // Validasi Form
  validation: {
    required: 'Field ini wajib diisi',
    minLength: 'Minimal {min} karakter diperlukan',
    maxLength: 'Maksimal {max} karakter diperbolehkan',
    email: 'Silakan masukkan alamat email yang valid',
    phone: 'Silakan masukkan nomor telepon yang valid',
    url: 'Silakan masukkan URL yang valid',
    number: 'Silakan masukkan angka yang valid',
    integer: 'Silakan masukkan bilangan bulat',
    positive: 'Silakan masukkan angka positif',
    min: 'Nilai tidak boleh kurang dari {min}',
    max: 'Nilai tidak boleh lebih dari {max}',
    between: 'Nilai harus antara {min} dan {max}'
  },

  // Survey submission
  submission: {
    submitSuccess: 'Berhasil dikirim',
    resetForm: 'Isi ulang formulir',
    submitFailed: 'Gagal mengirim',
    pleaseSelectOption: 'Silakan pilih opsi',
    pleaseInputText: 'Silakan masukkan teks',
    getSurveyFailed: 'Gagal mengambil survei',
    verifyFailed: 'Verifikasi gagal',
    verify: 'Verifikasi'
  },

  // Form placeholders
  form: {
    enterPassword: 'Masukkan kata sandi akses',
    enterUsername: 'Masukkan nama pengguna',
    enterPhone: 'Masukkan nomor telepon',
    enterEmail: 'Masukkan email',
    enterVerificationCode: 'Masukkan kata sandi akses 6 karakter',
    continueFillContent: 'Lanjutkan dengan konten sebelumnya?',
    continueSubmitContent: 'Lanjutkan dengan pengiriman sebelumnya?'
  }
}
