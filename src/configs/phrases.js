const phrases = {
  en: {
    // language widget
    language_settings_main_text: 'Application language',
    language_settings_title: 'Language',
    // -- end language widget

    // chronicle
    loading: 'LOADING...',
    please_wait: 'please wait',
    no_data: 'NO DATA',
    please_select_vehicle: 'please select vehicle',
    max_speed: 'Max speed',
    max_temp: 'Max temp',
    min_temp: 'Min temp',
    // -- end chronicle

    // appBar
    logout: 'logout',
    // -- end appBar

    // main menu
    reports: 'reports',
    vehicles_editor: 'vehicles editor',
    users: 'users manager',
    operational: 'operational',
    settings: 'settings',
    dashboard: 'dashboard',
    installer: 'installer',
    promos: 'promos',
    devices: 'devices manager',
    review: 'review',
    history: 'history',
    // -- end main menu

    // dashboard screen
    fleet_summary_title: 'fleet summary',
    // -- end dashboard screen

    // fleet summary
    vehicles_amount: 'vehicles in fleet',
    never_reported: 'vehicles never reported',
    // -- end fleet summary

    // installer
    vehicle_name: 'Vehicle Name',
    license: 'License Plate',
    imei: 'IMEI',
    odo_value: 'Current Odometer value',
    odo_in_miles: 'ODO value in miles',
    sending: 'sending',
    send: 'Send',
    send_success: 'Succesfully sended ✓',
    save_locally: 'Save Locally',
    saved_locally: 'Saved locally ✓',
    cannot_save_locally: 'Cannot save to your device store',
    reset: 'Reset',
    send_fail: 'Something went wrong. Try later',
    clean_success: 'Succesfully cleaned ✓',
    // -- end installer

    // operational
    vehicles: 'vehicles',
    locations: 'locations',
    vessels: 'vessels',
    // -- end operational

    // report available types
    date: 'date',
    name: 'vehicle name',
    mileage: 'driving distance (km.)',
    minTemp: 'min. temperature',
    maxTemp: 'max. temperature',
    avgTemp: 'avg. temperature',
    odometer: 'odometer',
    'vehicle-position': 'Position',
    'vehicle-fuel': 'Fuel (coming soon)',
    moving: 'Start/Stop Moving',
    ignition: 'Ignition On/Off',
    'vehicle-1wire-temperature': 'Temperature',
    geofences: 'Geofence crossing (coming soon)',
    // -- end report available types

    // report date selector with memory
    choose_date_format: 'Choose date format for the report',
    remember_choice: 'Remember my choice',
    forget_choice: 'Forget my choice',
    // -- report end date selector with memory

    // report raw buttons
    save_btn_label: 'Save raw data',
    toggle_warn: 'I need to choose more vehicles',
    hint_text: 'Pick up to 3 vehicles for getting events',
    // -- ned report raw buttons

    // report configurator
    customise_report: 'Customise Report',
    generate_report: 'generate report',
    save_report: 'Save generated',
    customise_raw_events: 'Customise Raw Events',
    // -- end report configurator

    // report warning dialog
    ok: 'Ok',
    cancel: 'Cancel',
    warn_title: 'Warning about time and traffic consuming',
    warn_text: `You chose many vehicles.\n
                Generating and downloading events for
                all that vehicles could take a lot of time and traffic.\n
                Are you sure?`,
    // -- end report warning dialog

    // vehicle details
    manufacturer: 'Manufacturer',
    model_name: 'Model Name',
    year: 'Year of Manufacture',
    odometer_value: 'Odometer (km.)',
    vehicle_kind_hint: 'Kind of the Vehicle',
    save: 'Save',
    // -- end vehicle details

    // vehicle kinds
    undefined: 'Undefined',
    boat: 'Vessel',
    farm: 'Farm implementation',
    forklift: 'Forklift',
    hgv: 'Heavy Goods Vehicle',
    hgv_chilled: 'Heavy Goods Vehicle Chilled',
    hgv_frozen: 'Heavy Goods Vehicle Frozen',
    mgv: 'Medium Goods Vehicle',
    mgv_chilled: 'Medium Goods Vehicle Chilled',
    mgv_frozen: 'Medium Goods Vehicle Frozen',
    mini_bus: 'Minibus',
    motorcycle: 'Motorcycle',
    passenger_car: 'Passenger Car',
    pick_up: 'Pickup',
    sgv: 'Small Goods Vehicle',
    sgv_chilled: 'Small Goods Vehicle Chilled',
    sgv_frozen: 'Small Goods Vehicle Frozen',
    suv: 'SUV',
    taxi: 'Taxi',
    tractor: 'Traktor',
    // -- end vehicle kinds

    // mapMarkerToggle
    hide_text: 'Hide',
    show_text: 'Show',
    // --end mapMarkerToggle

    // instancesList
    speed: 'speed',
    speed_km_h: 'km/h',
    temperature: 'temperature',
    device_never_reported: 'never reported - check device',
    remove_success: 'Succesfully removed',
    remove_fail: 'Remove failed',
    radius: 'Radius',
    address: 'Address',
    delete: 'Delete',
    no_history_data: 'no data...',
    // -- end instancesList

    // GFEditor
    home_depot: 'Is home depot',
    location_name: 'Location Name',
    // -- end GFEditor
  },

  th: {
    language_settings_main_text: 'ภาษาของแอพพลิเคชั่น',
    language_settings_title: 'ภาษา',

    loading: 'กำลังโหลด...',
    please_wait: 'โปรดรอ',
    no_data: 'ไม่มีข้อมูล',
    please_select_vehicle: 'โปรดเลือกยานพาหนะ',

    max_speed: 'ความเร็วสูงสุด',
    max_temp: 'อุณหภูมิสูงสุด',
    min_temp: 'อุณหภูมิต่ำสุด',

    logout: 'ลงชื่อออก',

    reports: 'รายงาน',
    vehicles_editor: 'จัดการยานพาหนะ',
    operational: 'ปฏิบัติการ',
    settings: 'ตั้งค่า',
    review: 'ภาพรวม',
    history: 'ประวัติ',

    fleet_summary_title: 'ภาพรวมกลุ่มยานพาหนะ',

    vehicles_amount: 'คัน ในฟลีท',
    never_reported: 'คัน ไม่ส่งข้อมูล',

    vehicle_name: 'ชื่อยานพาหนะ',
    license: 'เลขทะเบียน',
    odo_value: 'เลขมาตรระยะทางปัจจุบัน',
    odo_in_miles: 'มาตรวัดระยะทางในหน่วยไมล์',
    sending: 'กำลังส่ง',
    send: 'ส่ง',
    send_success: 'ส่งสำเร็จ ✓',
    save_locally: 'บันทึกบนหน่วยความจำ',
    saved_locally: 'บันทึกลงหน่วยความจำเครื่องแล้ว ✓',
    cannot_save_locally: 'ไม่สามารถบันทึกลงหน่วยความจำได้',
    reset: 'รีเซ็ต',
    send_fail: 'เกิดข้อผิดพลาดบางอย่าง ลองอีกครั้ง',
    clean_success: 'ล้างสำเร็จ ✓',

    vehicles: 'ยานพาหนะ',
    locations: 'สถานที่',
    vessels: 'เรือ',

    date: 'วันที่',
    name: 'ชื่อยานพาหนะ',
    mileage: 'ระยะทาง (กิโลเมตร)',
    minTemp: 'อุณหภูมิต่ำสุด',
    maxTemp: 'อุณหภูมิสูงสุด',
    avgTemp: 'อุณหภูมิเฉลี่ย',
    odometer: 'มาตรวัดระยะทาง',
    'vehicle-position': 'ตำแหน่ง',
    'vehicle-fuel': 'น้ำมัน (เร็วๆ นี้)',
    moving: 'เริ่ม/หยุด เคลื่อนที่',
    ignition: 'สถานะ เปิด/ปิด เครื่องยนต์',
    'vehicle-1wire-temperature': 'อุณหภูมิ',
    geofences: 'ผ่าน Geofence (เร็วๆ นี้)',

    choose_date_format: 'เลือกรูปแบบวันที่สำหรับรายงาน',
    remember_choice: 'จำการตั้งค่า',
    forget_choice: 'ล้างการตั้งค่า',

    save_btn_label: 'บันทึกข้อมูล',
    toggle_warn: 'ต้องการเลือกยานพาหนะเพิ่มเติม',
    hint_text: 'เลือกยานพาหนะสูงสุด 3 รายการ',

    customise_report: 'รายงานกำหนดเอง',
    generate_report: 'สร้างรายงาน',
    save_report: 'บันทึกรายงาน',
    customise_raw_events: 'ข้อมูลเหตุการณ์กำหนดเอง',

    ok: 'ตกลง',
    cancel: 'ยกเลิก',
    warn_text: `เลือก ยานพาหนะ\n
                รายงานจะใช้เวลาดำเนินการและดาวน์โหลดมากกว่าปกติ\n
                ต้องการดำเนินการต่อหรือไม่?`,

    manufacturer: 'ผู้ผลิต',
    model_name: 'รุ่น',
    year: 'ปีที่ผลิต',
    odometer_value: 'มาตรวัดระยะทาง (กิโลเมตร)',
    vehicle_kind_hint: 'ประเภทของยานพาหนะ',
    save: 'บันทึก',

    undefined: 'ไม่กำหนด',
    boat: 'เรือ',
    farm: 'รถฟาร์ม',
    forklift: 'โฟล์คลิฟท์',
    hgv: 'รถบรรทุกขนาดใหญ่',
    hgv_chilled: 'รถบรรทุกขนาดใหญ่แช่เย็น',
    hgv_frozen: 'รถบรรทุกขนาดใหญ่แช่แข็ง',
    mgv: 'รถบรรทุกขนาดกลาง',
    mgv_chilled: 'รถบรรทุกขนาดกลางแช่เย็น',
    mgv_frozen: 'รถบรรทุกขนาดกลางแช่แข็ง',
    mini_bus: 'มินิบัส',
    motorcycle: 'รถจักรยานยนต์',
    passenger_car: 'รถยนต์นั่ง',
    pick_up: 'รถกระบะ',
    sgv: 'รถบรรทุกขนาดเล็ก',
    sgv_chilled: 'รถบรรทุกขนาดเล็กแช่เย็น',
    sgv_frozen: 'รถบรรทุกขนาดเล็กแช่แข็ง',
    suv: 'รถตรวจการ',
    taxi: 'แท็กซี่',
    tractor: 'แทร็กเตอร์',

    hide_text: 'ซ่อน',
    show_text: 'แสดง',
    vehicles_text: 'ยานพาหนะ',
    locations_text: 'สถานที่',

    speed: 'ความเร็ว',
    speed_km_h: 'กม./ชม.',
    temperature: 'อุณหภูมิ',
    device_never_reported: 'ไม่ส่งข้อมูล - ตรวจสอบอุปกรณ์',
    remove_success: 'ลบสำเร็จ',
    remove_fail: 'ลบไม่สำเร็จ',
    radius: 'ขนาดรัศมี',
    address: 'ที่อยู่',
    delete: 'ลบ',
    no_history_data: 'ไม่มีข้อมูล...',

    location_name: 'ชื่อสถานที่',
  },
};

export default phrases;

export const locales = ['en', 'th'];
