import { searchRecord, getCalendar, getAllTableName, createRecords, getCalendarList, createEvent, createRecord, getListBusy } from "../function/apiFunction";
import {
  updateRecord,
  deleteRecord,
  deleteEvent,
} from "./function/apiFunction";
import { bodyUpdateEvent, bodyCreateTask } from "./detailForm";
import { sendRequest } from "../../utils/sendRequest";

const appVar = getApp();
const dayOptions = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
]
const aquantrong = [
  { "ce008135-ac89-4a5f-816f-89a45c18f2a4": "A" },
  { "32ff4764-4b4f-4f84-9a63-e06670248b07": "B" },
  { "b29440f9-135e-4caa-9650-55e51d6e7753": "C" }
]

const acapnach = [
  { "e680afeb-dc2d-49a6-9b8f-fc45dba00e5f": "1" },
  { "c9a8b540-fe36-4cd9-ad83-e9397456ca92": "2" },
  { "905d2a40-503e-4767-9579-2f9b968bf87f": "3" }
]

const atheloai = [
  { "ef1dc08b-fc93-4022-9fde-60a174a1835f": "Việc chính" },
  { "91fae74d-25e5-4a99-b11f-e4203f907d2a": "Việc phát sinh" },
  { "5acđ29b-1846-4611-a209-f6fd50224288": "Dự án" },
  { "809d2600-b7a3-4911-b117-ef489eac2f80": "Đọc & học" },
  { "c68dd56e-1535-4d0e-8ec8-eb4be58b769d": "Việc cần đôn đốc" }

]
Page({
  data: {
    stt: [],
    tableData: [],
    oldData: [],
    newData: [],
    vieccanlam: [],
    theloai: [],
    quantrong: [],
    capbach: [],
    thu: [],
    lichIndex:0,
    ghichu: [],
    ngaygiobatdau: [],
    ngaygioketthuc: [],
    eventid: [],
    calendarid: [],
    edit: {},
    ngaylam: [],
    sogiocanco: [],

    importantOptions: ["A", "B", "C"],
    categoryOptions: [
      "Việc chính",
      "Dự án",
      "Việc phát sinh",
      "Việc cần đôn đốc",
      "Đọc & học",
    ],
    urgentOptions: ["1", "2", "3"],
    selectedImportant: "",
    selectedIndexImportant: 0,
    turnMode: false,
    turnPopup: false,
    turnPopup2: false,
    calendarname: "",
    hours: ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6",
      "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5",
      "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5", "16", "16.5",
      "17", "17.5", "18", "18.5", "19", "19.5", "20", "20.5", "21", "21.5",
      "22", "22.5", "23", "23.5", "24", "24.5", "25", "25.5", "26", "26.5",
      "27", "27.5", "28", "28.5", "29", "29.5", "30", "30.5", "31", "31.5",
      "32", "32.5", "33", "33.5", "34", "34.5", "35", "35.5", "36"],
    selectedDayWork: "",
    mindate: new Date().toISOString().substring(0, 10),
    startDate: new Date().toISOString().substring(0, 10),
    endDate: "",
    selectedHours: "",
    selectedCategory: "",
    selectedIndexCategory: 0,
    selectedurgent: "",
    selectedIndexUrgent: 0,
    selectedImportant: "",
    recordId: [],
    dataRemoveAll: [],
    dataRemove: [],
    endTime: "",
    startTime: "",
    inputNote: "",
    inputValue: "",
    showFilterPicker: false,
    theloaiOptions: [
      "Tất cả",
      "Việc chính",
      "Dự án",
      "Việc phát sinh",
      "Việc cần đôn đốc",
      "Đọc & học"
    ],
    quantrongOptions: ["Tất cả", "A", "B", "C"],
    capbachOptions: ["Tất cả", "1", "2", "3"],
    thuOptions: [
      "Tất cả",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "Chủ Nhật"],// Các giá trị trong combobox
    selectedFilter: "Tất cả", // Giá trị mặc định khi combobox mở ra

    filterTheloai: [],
    filterQuantrong: ["A", "B", "C"],
    selFilterQuantrong: "A",
    tableName: [],
    calendarID: "",
    selectedQuanTrong: "Tất cả",
    selectedCapBach: "Tất cả",
    selectedThu: "Tất cả",
    filterData: [],
    lich: [],
    chonlich: "",
    dataLich: [],
    isLoop: false,
    dailyData: [
      {
        "Thứ 2": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
        "Thứ 3": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
        "Thứ 4": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
        "Thứ 5": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
        "Thứ 6": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
        "Thứ 7": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
        "Chủ nhật": { date: "", startTime: "", indexSTH: 0, indexSTM: 0, endTime: "", indexETH: 0, indexETM: 0, inputNote: "", isLoop: false, },
      },
    ],

    selectedDay: dayOptions[new Date().getDay()],

    dailyLoop: false,
    listBusy: [],
    checkBusy: [],

    disableDayWork: true,
    disaleET: true,

    customStartTimeHours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i), // Tạo danh sách giờ từ 00 đến 23
    customStartTimeMinutes: ['00', '15', '30', '45'], // Giới hạn giá trị phút
    customStartTimeHourIndex: 0, // Giá trị khởi tạo cho giờ
    customStartTimeMinuteIndex: 0, // Giá trị khởi tạo cho phút

    customEndTimeHours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i), // Tạo danh sách giờ từ 00 đến 23
    customEndTimeMinutes: ['00', '15', '30', '45'], // Giới hạn giá trị phút
    customEndTimeHourIndex: 0, // Giá trị khởi tạo cho giờ
    customEndTimeMinuteIndex: 0, // Giá trị khởi tạo cho phút
  },

  onCategoryChange: function (e) {
    this.setData({
      selectedCategory: this.data.categoryOptions[e.detail.value],
      selectedIndexCategory: e.detail.value,
    });
  },

  onImportantChange: function (e) {
    this.setData({
      selectedImportant: this.data.importantOptions[e.detail.value],
      selectedIndexImportant: e.detail.value,
    });
  },

  onUrgentChange: function (e) {
    this.setData({
      selectedurgent: this.data.urgentOptions[e.detail.value],
      selectedIndexUrgent: e.detail.value,
    });
  },
  getDayOfWeekFromTimestamp(timeStamp) {
    const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const date = new Date(Number(timeStamp));
    const day = date.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)

    return daysOfWeek[day];
  },

  // Function triggered when the calendar selection changes
  onCalendarChage: function (e) {
    // Update selected calendar data based on user selection
    this.setData({
      chonlich: this.data.lich[e.detail.value], // Selected calendar summary
      calendarID: this.data.dataLich.find( // Find calendar ID based on summary
        (item) => item.summary === this.data.lich[e.detail.value]
      ).calendar_id,
      calendarname: this.data.lich[e.detail.value], // Update calendar name state
      lichIndex: e.detail.value
    });
  },

  // Function to fetch and set calendar data
  setCalendarData() {
    const that = this; // Cache 'this' for callback access
    tt.getStorage({
      key: "user_access_token",
      success: (res) => {
        const access_token = res.data.access_token;
        // Fetch calendar list using access token
        getCalendarList(access_token).then((result) => {
          console.log(result.data); // Log fetched calendar data (for debugging)
          this.setData({
            dataLich: result.data.calendar_list, // Update calendar list data
            lich: result.data.calendar_list.map((item) => item.summary), // Extract calendar summaries
            // (Commented out section: Potentially unused logic)
            // calendarname: result.data.calendar_list.map((item) => item.summary)[0],
          });
        });
      },
    });
  },

  // Function to calculate total working hours (assuming dailyData structure)

  // Function to handle input note changes
  inputNote: function (e) {
    // Update input note state
    this.setData({
      inputNote: e.detail.value,
    });

    // Update note in dailyData (assuming structure)
    let data = this.data.dailyData;
    data[0][this.data.selectedDay].inputNote = this.data.inputNote;
    this.setData({
      dailyData: data,
    });
  },
  // Function to handle input title changes (potentially unused based on naming)
  inputTittle: function (e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  // Function to handle selected hours changes (potentially unused based on naming)
  onSelectedHours: function (e) {
    this.setData({
      selectedHours: this.data.hours[e.detail.value], // Update selected hours state (unclear purpose)
    });
  },


  // Function to handle changes in start time (onTimeChange1)
  onTimeChange1: function (e) {
    // Update start time state
    this.setData({
      startTime: e.detail.value,
    });

    // Ensure end time is not earlier than start time
    if (this.data.startTime > this.data.endTime) {
      this.setData({
        endTime: this.data.startTime,
      });
    }
  },

  // Function to handle changes in end time (onTimeChange2)
  onTimeChange2: function (e) {
    let that = this
    let checkBusy = this.data.checkBusy
    checkBusy = []
    // Update end time state
    this.setData({
      endTime: e.detail.value,
    });

    // Update dailyData with new time and note information
    let data = this.data.dailyData;
    data[0][this.data.selectedDay] = {
      date: this.data.selectedDayWork,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      inputNote: this.data.inputNote,
      isLoop: this.data.isLoop,
    };
    this.setData({
      dailyData: data,
    });

    // Ensure end time is not earlier than start time (redundant with onTimeChange1)
    if (this.data.startTime > this.data.endDate) {
      this.setData({
        endTime: this.data.startTime,
      });
    }
    checkBusy = {
      start: this.dateTimeToTimestamp(this.data.selectedDayWork, this.data.startTime),
      end: this.dateTimeToTimestamp(this.data.selectedDayWork, this.data.endTime)
    }
    if (this.isDuringAnyBusyPeriod(checkBusy, this.data.listBusy) === false) {
      tt.showModal({
        "title": "Cảnh báo",
        "content": "Đã có lịch trùng",
        "confirmText": "Tiếp",
        "cancelText": "Hủy",
        "showCancel": true,
        success(res) {
          console.log(JSON.stringify(res));
          if (res.confirm === false) {
            that.setData({
              endTime: "",
              startTime: "",
              totalHours: ""
            })
          }
        },
        fail(res) {
          console.log(`showModal fail: ${JSON.stringify(res)}`);
        }
      });
    }
    this.setData({
      checkBusy
    })

    // Calculate total working hours (assuming relevant function exists)
    this.calculateTime();
  },

  customStartTimeOnHourChange(e) {
    const customStartTimeHourIndex = e.detail.value;
    const customEndTimeHours = this.data.customStartTimeHours.slice(Number(customStartTimeHourIndex));
    this.setData({
      customStartTimeHourIndex: customStartTimeHourIndex,
      startTime: `${this.data.customStartTimeHours[customStartTimeHourIndex]}:${this.data.customStartTimeMinutes[this.data.customStartTimeMinuteIndex]}`,
      endTime: `${customEndTimeHours[0]}:${this.data.customEndTimeMinutes[this.data.customEndTimeMinuteIndex]}`,
      disaleET: false,
      customEndTimeHours: customEndTimeHours,
      customEndTimeHourIndex: 0 // Reset the end time index to the first available option
    });
    this.calculateTime();
  },

  customStartTimeOnMinuteChange(e) {
    const customStartTimeMinuteIndex = e.detail.value;
    this.setData({
      customStartTimeMinuteIndex: customStartTimeMinuteIndex,
      startTime: `${this.data.customStartTimeHours[this.data.customStartTimeHourIndex]}:${this.data.customStartTimeMinutes[customStartTimeMinuteIndex]}`,
      disaleET: false,
    });
    this.calculateTime();
  },

  customEndTimeOnHourChange(e) {
    const customEndTimeHourIndex = e.detail.value;
    this.setData({
      customEndTimeHourIndex: customEndTimeHourIndex,
      endTime: `${this.data.customEndTimeHours[customEndTimeHourIndex]}:${this.data.customEndTimeMinutes[this.data.customEndTimeMinuteIndex]}`
    });

    let data = this.data.dailyData;
    data[0][this.data.selectedDay].date = this.data.selectedDayWork;
    data[0][this.data.selectedDay].startTime = this.data.startTime;
    data[0][this.data.selectedDay].endTime = this.data.endTime;
    data[0][this.data.selectedDay].indexSTH = this.data.customStartTimeHourIndex;
    data[0][this.data.selectedDay].indexSTM = this.data.customStartTimeMinuteIndex;
    data[0][this.data.selectedDay].indexETH = this.data.customEndTimeHourIndex;
    data[0][this.data.selectedDay].indexETM = this.data.customEndTimeMinuteIndex;
    data[0][this.data.selectedDay].inputNote = this.data.inputNote;
    data[0][this.data.selectedDay].isLoop = this.data.isLoop;

    this.setData({
      dailyData: data,
    });
    this.calculateTime();
  },

  customEndTimeOnMinuteChange(e) {
    const customEndTimeMinuteIndex = e.detail.value;
    this.setData({
      customEndTimeMinuteIndex: customEndTimeMinuteIndex,
      endTime: `${this.data.customEndTimeHours[this.data.customEndTimeHourIndex]}:${this.data.customEndTimeMinutes[customEndTimeMinuteIndex]}`
    });

    let that = this
    let checkBusy = this.data.checkBusy
    checkBusy = []

    let data = this.data.dailyData;
    data[0][this.data.selectedDay].date = this.data.selectedDayWork;
    data[0][this.data.selectedDay].startTime = this.data.startTime;
    data[0][this.data.selectedDay].endTime = this.data.endTime;
    data[0][this.data.selectedDay].index1 = this.data.customEndTimeHourIndex;
    data[0][this.data.selectedDay].index2 = this.data.customEndTimeMinuteIndex;
    data[0][this.data.selectedDay].inputNote = this.data.inputNote;
    data[0][this.data.selectedDay].isLoop = this.data.isLoop;

    this.setData({
      dailyData: data,
    });

    // if (this.data.customStartTime > this.data.customEndTime) {
    //   this.setData({
    //     endTime: this.data.startTime,
    //   });
    // }

    checkBusy = {
      start: this.dateTimeToTimestamp(this.data.selectedDayWork, this.data.startTime),
      end: this.dateTimeToTimestamp(this.data.selectedDayWork, this.data.endTime)
    }
    if (this.isDuringAnyBusyPeriod(checkBusy, this.data.listBusy) === false) {
      tt.showModal({
        "title": "Cảnh báo",
        "content": "Đã có lịch trùng",
        "confirmText": "Tiếp",
        "cancelText": "Hủy",
        "showCancel": true,
        success(res) {
          console.log(JSON.stringify(res));
          if (res.confirm === false) {
            that.setData({
              endTime: "",
              startTime: "",
              totalHours: 0
            })
          }
        },
        fail(res) {
          console.log(`showModal fail: ${JSON.stringify(res)}`);
        }
      });
    }
    this.setData({
      checkBusy
    })
    this.calculateTime();
  },

  // Function to handle changes in start date (onDateChange1)
  onDateChange1: function (e) {
    // Update start date state
    this.setData({
      startDate: e.detail.value,
    });
    // Ensure end date is not earlier than start date
    if (this.data.startDate > this.data.endDate) {
      this.setData({
        endDate: this.data.startDate,
        selectedDayWork: this.data.startDate,
      });
    }
  },

  // Function to handle changes in end date (onDateChange2)
  onDateChange2: function (e) {
    // Update end date state
    this.setData({
      endDate: e.detail.value,
    });

    // Ensure end date is not earlier than start date
    if (this.data.startDate > this.data.endDate) {
      this.setData({
        endDate: this.data.startDate,
      });
    }
  },

  // Function to handle changes in selected date (onDateChange3)
  onDateChange3: function (e) {
    // Update selected date state and corresponding work date
    let index = new Date(e.detail.value).getDay();
    this.setData({
      selectedDayWork: e.detail.value,
      selectedDay: dayOptions[index],
    });
  },

  // Function to handle changes in daily loop checkbox (dailyLoopCheckBoxChange)
  dailyLoopCheckBoxChange: function (e) {
    if (!e.currentTarget.dataset.check) {
      this.setData({
        dailyLoop: !e.currentTarget.dataset.check,
        weekLoop: true,
        isLoop: false,
        disableDayWork: true,
      });
    } else {
      this.setData({
        dailyLoop: !e.currentTarget.dataset.check,
        weekLoop: false,
        isLoop: false,
        disableDayWork: false,
      });
    }
  },

  // Function to handle changes in checkbox (checkboxChange)
  checkboxChange: function (e) {
    const dailyData = this.data.dailyData;
    const isLoop = !e.currentTarget.dataset.checked;
    // Update loop and checkbox states based on checkbox state
    if (!e.currentTarget.dataset.checked) {
      this.setData({
        dailyLoop: false,
        dailyCheckBox: true,
        isLoop,
        dailyData,
      });
    } else {
      this.setData({
        dailyLoop: false,
        dailyCheckBox: false,
        isLoop,
        dailyData,
      });
    }
  },


  // Function to handle changes in the selected week (onWeekChange)
  onWeekChange: function (e) {
    // Update the selectedDay state with the corresponding day from dayOptions based on the selected index (e.detail.value)
    this.setData({
      selectedDay: this.data.dayOptions[e.detail.value],
    });
  },

  // Function called when the component is shown (onShow)
  onShow() {
    // Retrieve the access token from storage using tt.getStorageSync
    const accessToken = tt.getStorageSync("user_access_token").access_token;

    // Filter the table names to include only those containing "Bảng Phân Công" ("Task Assignment" in Vietnamese)
    const tableName = this.data.tableName.filter(({ name }) => name.includes("Bảng Phân Công"));

    // Extract the table ID from the first filtered table name object (assuming there's at least one)
    const tableId = tableName[0]?.table;

    // Function call (presumably defined elsewhere) to fetch all table names using the access token
    // getAllTableName(accessToken).then((response) => {
    //   console.log(response); // Log the response for debugging purposes

    //   // Filter the response data to include only tables with names containing "Bảng Phân Công"
    //   const filteredTableName = response.data.items
    //     .filter(({ name }) => name.includes("Bảng Phân Công"))
    //     // Map the filtered data to an array of objects with name and table ID properties
    //     .map(({ name, table_id }) => ({ name, table: table_id }));

    //   // Update the tableName state with the filtered table names
    //   this.setData({ tableName: filteredTableName });

    //   // Call the listTask function (presumably defined elsewhere) to fetch tasks for the specific table ID
    //   // this.listTask(this.data.tableName?.[0]?.table); // Assuming there's at least one table
    // });
    this.listTask(this.data.tableName?.[0]?.table)
  },
  onHide() {
    this.setData({
      inputValue: "",
      inputNote: "",
      edit: {},
      customStartTimeHourIndex: 0,
      totalHours: 0,
      customStartTimeMinuteIndex: 0,
      customEndTimeHourIndex: 0,
      customEndTimeMinuteIndex: 0,
      inputValue: "",
      calendarname: "",
      selectedImportant: "",
      selectedDayWork: "",
      selectedDay: "",
      selectedIndexImportant: 0,
      selectedIndexCategory: 0,
      selectedIndexUrgent: 0,
      selectedCategory: "Việc chính",
      selectedurgent: "1",
      selectedImportant: "A",
      selectedHours: "1",
      startDate: "Chọn ngày",
      endDate: "",
      startTime: "",
      endTime: "",
      turnMode: false,
      turnPopup2: false,
      turnPopup: false
    });
  },

  // Function to fetch and display task data (listTask)
  listTask() {
    // Reference to current component instance (often used within methods)
    let that = this;
    let vieccanlam = that.data.vieccanlam;
    let theloai = that.data.theloai;
    let quantrong = that.data.quantrong;
    let capbach = that.data.capbach;
    let thu = that.data.thu;
    let ghichu = that.data.ghichu;
    let ngaygiobatdau = that.data.ngaygiobatdau;
    let ngaygioketthuc = that.data.ngaygioketthuc;
    let eventid = that.data.eventid;
    let calendarid = that.data.calendarid;
    let tableData = that.data.tableData;
    let ngaylam = that.data.ngaylam;
    let sogiocanco = that.data.sogiocanco;
    let recordId = that.data.recordId;
    let newData = that.data.newData;
    let oldData = that.data.oldData;
    // Clear existing data in temporary arrays (presumably used for UI updates)

    dataRemove = [];
    dataRemoveAll = [];
    // Initialize empty arrays to store task data
    vieccanlam = [];
    theloai = [];
    capbach = [];
    quantrong = [];
    thu = [];
    ngaygiobatdau = [];
    ngaygioketthuc = [];
    ghichu = [];
    eventid = [];
    calendarid = [];
    ngaylam = [];
    tableData = [];
    newData = [];
    oldData = [];
    sogiocanco = [];
    recordId = [];
    // Show a loading toast notification
    tt.showToast({
      title: "Đang tải!",
      icon: "loading",
      duration: 5000,
    });
    // Retrieve access token from storage
    tt.getStorage({
      key: "user_access_token",
      success: (res) => {
        const access_token = res.data.access_token;
        // Define body object for fetching data from Lark tables with specific fields
        const body = {
          field_names: [
            "Việc cần làm",
            "Thể loại",
            "Quan trọng",
            "Cấp bách",
            "Số giờ cần có",
            "Thứ",
            "Ngày - Giờ bắt đầu",
            "Ngày - Giờ kết thúc",
            "Ngày làm",
            "Ghi chú",
            "EventID",
            "CalendarID",
            "id",
            "Loại",
            "json_due"
          ],
          sort: [
            {
              field_name: "Thể loại", // Sort by category (ascending)
              asc: true,
            },
            {
              field_name: "Việc cần làm", // Then sort by task name (ascending)
              asc: true,
            },
          ],
          filter: {
            conjunction: "and", // Combine filter conditions with "AND" operator
            conditions: [
              {
                field_name: "Person", // Filter by current user's open ID
                operator: "is",
                value: [res.data.open_id],
              },
            ],
          },
          automatic_fields: false,
        };

        const url = `https://open.larksuite.com/open-apis/task/v2/tasks`;
        const headers = {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        };
        setTimeout(() => {
          //Fetch data from Task
          try {
            sendRequest(url, "GET", headers, {}).then((rs) => {
              // parent_task_guid
              console.log(rs);
              const filteredTasks = rs.data.items.filter(task => task.members.some(member => member.role === "assignee" && member.id === res.data.open_id) && task.completed_at == "0");
              const mapValue = (singleSelectValue, options) => {
                const matchedOption = options.find(option => Object.keys(option)[0] === singleSelectValue);
                return matchedOption ? matchedOption[singleSelectValue] : null;
              };
              if (rs.data.items !== null) {
                that.setData({
                  newData: filteredTasks.map((item) => {
                    return {
                      vieccanlam: item.summary || "",
                      theloai: item.custom_fields && Array.isArray(item.custom_fields) ?
                        item.custom_fields.map(field => {
                          if (field.name === "Thể loại" && field.single_select_value) {
                            return mapValue(field.single_select_value, atheloai);
                          }
                          return null;
                        }).filter(value => value !== null)[0] || "" : "",
                      quantrong: item.custom_fields && Array.isArray(item.custom_fields) ?
                        item.custom_fields.map(field => {
                          if (field.name === "Độ quan trọng" && field.single_select_value) {
                            return mapValue(field.single_select_value, aquantrong);
                          }
                          return null;
                        }).filter(value => value !== null)[0] || "" : "", // Fallback to empty string if no match or if custom_fields is undefined

                      capbach: item.custom_fields && Array.isArray(item.custom_fields) ?
                        item.custom_fields.map(field => {
                          if (field.name === "Độ cấp bách" && field.single_select_value) {
                            return mapValue(field.single_select_value, acapnach);
                          }
                          return null;
                        }).filter(value => value !== null)[0] || "" : "",
                      thu: item.start && item.start.timestamp ? that.getDayOfWeekFromTimestamp(item.start.timestamp) : "",
                      ngaygiobatdau: item.start && item.start.timestamp ? that.convertTimestampToDate(Number(item.start.timestamp)) : "",
                      ngaygioketthuc: item.due && item.due.timestamp ? that.convertTimestampToDate(Number(item.due.timestamp)) : "",
                      ghichu: item.description || "",
                      eventid: "",
                      calendarid: "",
                      ngaylam: "",
                      sogiocanco: "",
                      recordId: item.guid || "",
                      type: 'new',
                      id: item.guid || "",
                      json_due: {}
                    };
                  })
                })
              } else {
                that.setData({
                  newData: []
                })
              }
              // Combine the processed newData with existing oldData (presumably containing previous tasks)
              tableData = [...that.data.newData, ...that.data.oldData]

              // Sort the combined tableData array by ID and then by date (for organized display)
              tableData.sort((a, b) => {
                // First sort by id
                if (a.id < b.id) {
                  return -1;
                }
                if (a.id >= b.id) {
                  return 1;
                }
                if (a.id == "") {
                  return 1;
                }
                // return new Date(a.ngaylam) - new Date(b.ngaylam);
              });

              // Update component state with the processed data
              that.setData({
                newData,
                tableData,
                filterData: tableData,
                capbach,
                quantrong,
                theloai,
                ngaygiobatdau,
                ngaygioketthuc,
                ghichu,
                vieccanlam,
                thu,
                eventid,
                calendarid,
                ngaylam,
                sogiocanco,
                recordId,
              });
            });
          } catch (error) {

          }
        }, 1500);
        try {
          searchRecord(tt.getStorageSync("app_access_token"), body, appVar.GlobalConfig.tableId).then((result) => {
            if (result.data?.items == null) {
              return that.setData({
                oldData: [],
              })
            }
            const oldData = result.data?.items?.map((item) => {
              return {
                vieccanlam: item.fields["Việc cần làm"]?.[0]?.text || "",
                theloai: item.fields["Thể loại"],
                quantrong: item.fields["Quan trọng"],
                capbach: item.fields["Cấp bách"],
                thu: item.fields["Thứ"].value[0].text,
                ngaygiobatdau: that.convertTimestampToDate(item.fields["Ngày - Giờ bắt đầu"]),
                ngaygioketthuc: that.convertTimestampToDate(item.fields["Ngày - Giờ kết thúc"]),
                ghichu: item.fields["Ghi chú"]?.[0].text || "",
                eventid: item.fields["EventID"][0].text, // Assuming single event ID
                calendarid: item.fields["CalendarID"][0].text, // Assuming single calendar ID
                ngaylam: that.convertTimestampToDate(item.fields["Ngày làm"]),
                sogiocanco: item.fields["Số giờ cần có"],
                recordId: item.record_id,
                id: item?.fields?.["id"]?.[0]?.text,
                loai: item.fields?.["Loại"],
                json_due: item.fields?.["json_due"][0].text
              };
            });
            console.log(result);
            console.log(oldData);

            that.setData({
              oldData,
              tableData: oldData,
              filterData: oldData,
              capbach,
              quantrong,
              theloai,
              ngaygiobatdau,
              ngaygioketthuc,
              ghichu,
              vieccanlam,
              thu,
              eventid,
              calendarid,
              ngaylam,
              sogiocanco,
              recordId,
            });
          });
        } catch (error) {

        }
      },
    });
  },

  // Converts a timestamp (in milliseconds) to a formatted date string (YYYY-MM-DD)
  convertTimestampToDate(timestamp) {
    if (!timestamp) {
      return "";
    }
    // Create a new Date object with the given timestamp
    const date = new Date(timestamp);
    // Get the day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    // Format the date as dd/mm/yyyy
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  },

  // Converts a date and time string to a timestamp (in seconds)
  dateTimeToTimestamp: function (date, time) {
    // Create a JavaScript Date object from the combined date and time string
    let datetime = new Date(`${date} ${time}`);
    // Get the timestamp in milliseconds and convert it to seconds
    let timestamp = datetime.getTime();
    return Math.floor(timestamp / 1000);
  },

  // Formats a date string as a UTC date string with time set to 00:00:00Z
  formatDateToUTC(dateString, days) {
    // Create a JavaScript Date object from the date string
    const date = new Date(dateString);
    // Add the specified number of days to the date
    date.setDate(date.getDate() + days);
    // Convert the date to ISO format and extract the date part
    const newDate = date.toISOString().split('T')[0]
    // Format the date as YYYYMMDD and append "T000000Z" for UTC time
    return newDate.replace(/-/g, "") + "T000000Z";
  },

  // Function to handle the edit action (presumably triggered by a button click)
  edit(e) {
    // Store a reference to 'this' for clarity and potential scoping issues
    let that = this;
    that.setData({
      turnPopup: true,
      turnMode: true
    })

    // Access the current edit state from component data
    let edit = that.data.edit;
    const currentTarget = e.currentTarget.id;

    // Find the specific task object from tableData based on the event ID
    edit = that.data.tableData.find((obj) => obj.eventid === currentTarget);

    // Fetch calendar details using the user's access token (stored asynchronously)
    tt.getStorage({
      key: "user_access_token",
      success: (res) => {
        getCalendar(res.data.access_token, edit.calendarid).then((rs) => {
          that.setData({ calendarname: rs.data.summary });
        });
      },
    });
    let jsonDue = JSON.parse(edit?.json_due);

    that.setData({
      edit,
      inputValue: edit.vieccanlam,
      selectedImportant: edit.quantrong,
      selectedCategory: edit.theloai,
      selectedurgent: edit.capbach,
      startDate: edit.ngaygiobatdau,
      endDate: edit.ngaygioketthuc,
      selectedHours: edit.sogiocanco,
      selectedDayWork: jsonDue?.date,
      customEndTimeHourIndex: that.data.customEndTimeHours.findIndex((item) => item === jsonDue?.endHourTime) || 0,
      customStartTimeHourIndex: that.data.customStartTimeHours.findIndex((item) => item === jsonDue?.startHourTime) || 0,
      customEndTimeMinuteIndex: that.data.customEndTimeMinutes.findIndex((item) => item === jsonDue?.endMinTime) || 0,
      customStartTimeMinuteIndex: that.data.customStartTimeMinutes.findIndex((item) => item === jsonDue?.startMinTime) || 0,
      endTime: `${jsonDue?.endHourTime}:${jsonDue?.endMinTime}`,
      startTime: `${jsonDue?.startHourTime}:${jsonDue?.startMinTime}`,
      inputNote: edit.ghichu,
      selectedDay: edit.thu,
      selectedIndexImportant: that.data.importantOptions.findIndex((item) => item === edit.quantrong),
      selectedIndexCategory: that.data.categoryOptions.findIndex((item) => item === edit.theloai),
      selectedIndexUrgent: that.data.urgentOptions.findIndex((item) => item === edit.capbach)
    })
    that.calculateTime();
  },

  // Function to handle the edit2 action (presumably triggered by a button click)
  edit2(e) {
    // Store a reference to 'this' for clarity and potential scoping issues
    let that = this;
    // Access the current edit state from component data (assuming it's already set)
    let edit = that.data.edit;
    let listBusy = that.data.listBusy;
    // Extract the event target ID (presumably the record ID of the task)
    const currentTarget = e.currentTarget.id;
    // Find the specific task object from tableData based on the record ID
    edit = that.data.tableData.find((obj) => obj.recordId === currentTarget);
    // Log the selected task object for debugging (optional)
    if (new Date(e.currentTarget.dataset.date) < that.data.mindate) {
      tt.showToast({
        title: "Task đã hết hạn",
        icon: "error",
        duration: 3000, // Show the success message for 3 seconds
      });
    } else {
      tt.getStorage({
        key: "user_access_token",
        success: (res) => {
          const access_token = res.data.access_token;
          const body = {
            "time_min": this.data.startDate + "T00:00:00Z",
            "time_max": this.data.endDate + "T23:59:59Z",
            "user_id": res.data.open_id,
          }

          getListBusy(access_token, body).then((rs) => {
            console.log(rs);
            rs.data?.freebusy_list?.map(i => listBusy.push({
              start: this.convertUTCtoGMT7Timestamp(i.start_time),
              end: this.convertUTCtoGMT7Timestamp(i.end_time)
            }))
            this.setData({
              listBusy
            })
          })
        }
      })
      // Call a function (presumably to set calendar data - unclear without context)
      that.setCalendarData();
      // Update component state to display the edit2 popup
      that.setData({
        turnPopup2: true,
        turnMode: true,
        edit,
        selectedurgent: edit.capbach,
        selectedCategory: edit.theloai,
        selectedImportant: edit.quantrong,
        startDate: edit.ngaygiobatdau,
        endDate: edit.ngaygioketthuc,
        inputValue: edit.vieccanlam,
        calendarID: that.data.dataLich[0].calendar_id,
        calendarname: that.data.lich[0],
        lichIndex: 0,
        inputNote: edit.ghichu,
        currentTarget
      });
    }
  },

  // Function to handle updating a task after editing
  update() {
    let that = this;
    // Reset edit state (presumably closes the edit popup and disables edit mode)
    that.setData({ turnPopup: false, turnMode: false, selectedFilter: "Tất cả" });
    // Retrieve the user's access token for Lark API calls
    tt.getStorage({
      key: "user_access_token",
      success: (res) => {
        const user_access_token = res.data.access_token;
        // Prepare data for calendar update
        let dataForCalendarUpdate = bodyUpdateEvent(
          that.data.inputValue,
          that.dateTimeToTimestamp(that.data.selectedDayWork, that.data.startTime),
          that.dateTimeToTimestamp(that.data.selectedDayWork, that.data.endTime),
          that.data.inputNote
        );
        // Construct the URL for updating the specific calendar event
        const url =
          "https://script.google.com/macros/s/AKfycbxhfDmKiziX7qCouyECEUH2djZnFU9HcybnpgXhT7NJ6f2hXr-mbjUZ6YDwuXdTa967/exec";
        // Set headers for the request

        const header = {
          "Content-Type": "application/json",
        };

        // Create the request body for updating the calendar event
        const body = {
          action: "updateCalendarOrEvent",
          url: `https://open.larksuite.com/open-apis/calendar/v4/calendars/${that.data.edit.calendarid}/events/${that.data.edit.eventid}`,
          user_access_token: user_access_token,
          body: {
            ...dataForCalendarUpdate,
          },
        };

        // Prepare data for record update in Lark
        let dataForRecordUpdate = {
          records: [
            {
              record_id: that.data.edit.recordId,
              fields: {
                "Việc cần làm": that.data.inputValue,
                "Ghi chú": that.data.inputNote,
                "Thể loại": that.data.selectedCategory,
                "Quan trọng": that.data.selectedImportant,
                "Cấp bách": that.data.selectedurgent,
                "Ngày làm": that.dateTimeToTimestamp(that.data.selectedDayWork, "") * 1000,
                "json_due": JSON.stringify({
                  startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                  endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                  startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                  endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                  date: that.data.selectedDayWork
                }),
                "Ngày - Giờ bắt đầu": that.dateTimeToTimestamp(that.data.startDate, "") * 1000,
                "Ngày - Giờ kết thúc": that.dateTimeToTimestamp(that.data.endDate, "") * 1000,
              },
            },
          ],
        };
        console.log(dataForRecordUpdate);
        // Show a loading toast message
        let toastId = tt.showToast({
          title: "Đang cập nhật",
          icon: "loading",
          duration: 10000, // Set duration to 0 to make the toast stay indefinitely
        });

        // Send a POST request to update the calendar event
        sendRequest(url, "POST", header, body)
          .then((rs) => {
            updateRecord(tt.getStorageSync("app_access_token"), dataForRecordUpdate, appVar.GlobalConfig.tableId)
              .then((rs) => {
                that.setData({
                  inputValue: "",
                  inputNote: "",
                  edit: {},
                  customStartTimeHourIndex: 0,
                  totalHours: 0,
                  customStartTimeMinuteIndex: 0,
                  customEndTimeHourIndex: 0,
                  customEndTimeMinuteIndex: 0,
                  inputValue: "",
                  calendarname: "",
                  selectedImportant: "",
                  selectedDayWork: "",
                  selectedDay: "",
                  selectedIndexImportant: 0,
                  selectedIndexCategory: 0,
                  selectedIndexUrgent: 0,
                  selectedCategory: "Việc chính",
                  selectedurgent: "1",
                  selectedImportant: "A",
                  selectedHours: "1",
                  startDate: "Chọn ngày",
                  endDate: "",
                  startTime: "",
                  endTime: "",
                  turnMode: false,
                  turnPopup2: false,
                  customEndTimeHours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i), // Tạo danh sách giờ từ 00 đến 23
                });
                that.listTask();
                tt.hideToast({
                  toastId: toastId, // Use the toastId from the initial showToast call to hide it
                });
                // After all operations are done, show the success toast
                tt.showToast({
                  title: "Cập nhật công việc thành công",
                  icon: "success",
                  duration: 3000, // Show the success message for 3 seconds
                });
              })
              .catch((error) => {
                console.error("Update failed:", error);
                tt.hideToast({
                  toastId: toastId, // Ensure the loading toast is hidden even if there's an error
                });
                // Optionally, show an error toast to the user
                tt.showToast({
                  title: "Cập nhật thất bại",
                  icon: "error",
                  duration: 3000,
                });
              });
          })
          .catch((error) => {
            console.error("Request failed:", error);
            tt.hideToast({
              toastId: toastId, // Ensure the loading toast is hidden even if the request fails
            });
            // Optionally, show an error toast to the user
            tt.showToast({
              title: "Gửi yêu cầu thất bại",
              icon: "error",
              duration: 3000,
            });
          });
      },
    });
  },

  confirmUpdate(e) {
    const that = this;
    // Check if both start time and end time are empty
    if (that.data.customEndTimeHourIndex == "" && that.data.customStartTimeHourIndex == "") {
      return tt.showToast({ title: "Trường thời gian đang trống !", icon: "warning", });
    }
    if (that.data.totalHours > that.data.selectedHours) {
      // Show a modal warning if the selected hours exceed the limit
      return tt.showModal({
        title: "Cảnh báo",
        content: `Thời gian 1 ngày là ${that.data.totalHours}h đã quá số giờ cần có. Vui lý thay đổi thời gian.`,
        confirmText: "Đóng",
        showCancel: false,
      })
    }

    // Show a confirmation modal to ask the user if they want to update the task
    tt.showModal({
      title: "Xác nhận cập nhật công việc",
      content: "Bạn có muốn cập nhật công việc này?",
      confirmText: "Ok",
      cancelText: "Hủy",
      showCancel: true,
      success(res) {
        if (res.confirm) {
          // If the user confirms, call the update function
          that.update();
        } else if (res.cancel) {
          // If the user cancels, log a message to the console
          console.log("User canceled update");
        }
      },
      fail(res) {
        // If there's an error showing the modal, log the error
        console.log(`showModal fail: ${JSON.stringify(res)}`);
      },
    });
  },

  deleteItem(e) {
    // Get references to "this" context and element ID
    let that = this;
    let index = e.id;
    let dataset = e.dataset.id;
    // Access existing data from component state
    let dataRemoveAll = that.data.dataRemoveAll;
    let dataRemove = that.data.dataRemove;
    // Reset dataRemove array (presumably for accumulating data to remove)
    dataRemove = [];
    // Create a copy of the table data to avoid modifying the original
    const newTabbleData = [...that.data.tableData];

    // Filter table data to exclude the item to be deleted (based on event ID)
    const dataAfterRemove = newTabbleData.filter(function (phanTu) {
      return phanTu.eventid !== index;
    });
    // Filter table data to get the specific item being deleted
    const tempRemove = newTabbleData.filter(function (phanTu) {
      return phanTu.eventid === index;
    });
    // Extract record ID and calendar ID from the deleted item(s) and push them to dataRemove
    tempRemove.map((i) =>
      dataRemove.push({ recordid: i.recordId, calendarid: i.calendarid })
    );
    // Similar logic, but accumulates record IDs for all items with the same "vieccanlam" value
    const tempRemoveAll = newTabbleData.filter(function (phanTu) {
      return phanTu.vieccanlam === dataset;
    });
    tempRemoveAll.map((i) => dataRemoveAll.push(i.recordId));

    // Update component state with filtered data and reset filters
    that.setData({
      tableData: dataAfterRemove,
      dataRemoveAll,
      dataRemove,
      selectedFilter: "Tất cả",
      filterData: dataAfterRemove,
    });

    // Asynchronous operations to delete data from server/database
    tt.getStorage({
      key: "user_access_token",
      success: (res) => {
        const body = {
          records: [e.dataset.record],
        };
        // Delete event from calendar using provided access token and IDs
        deleteEvent(
          res.data.access_token,
          that.data.dataRemove[0].calendarid,
          index
        ).then((result) => {
          console.log(result);
        });
        // Delete record(s) from Lark table using access token, body, and table ID
        deleteRecord(tt.getStorageSync("app_access_token"), body, appVar.GlobalConfig.tableId).then((rs) => {
          console.log(rs);
        });
      },
    });
  },

  confirmDelete(e) {
    // Get the current event object
    const eventId = e.currentTarget;
    console.log(e);
    const that = this;
    // Display a confirmation modal
    tt.showModal({
      title: "Xác nhận xóa công việc",
      content: "Bạn có muốn xóa công việc này ?",
      confirmText: "Xóa",
      cancelText: "Hủy",
      showCancel: true,
      success(res) {
        if (res.confirm) {
          // If the user confirms, call the deleteItem function
          return that.deleteItem(eventId);
        }
        if (res.cancel) {
          // If the user cancels, log a message to the console
          return console.log("User canceled deletion");
        }
      },
      fail(res) {
        // If there's an error showing the modal, log the error
        console.log(`showModal fail: ${JSON.stringify(res)}`);
      },
    });
  },

  exit() {
    this.setData({ turnPopup: false, turnPopup2: false, turnMode: false });
    this.setData({
      inputValue: "",
      inputNote: "",
      edit: {},
      customStartTimeHourIndex: 0,
      totalHours: 0,
      customStartTimeMinuteIndex: 0,
      customEndTimeHourIndex: 0,
      customEndTimeMinuteIndex: 0,
      inputValue: "",
      calendarname: "",
      selectedImportant: "",
      selectedDayWork: "",
      selectedDay: "",
      selectedIndexImportant: 0,
      selectedIndexCategory: 0,
      selectedIndexUrgent: 0,
      selectedCategory: "Việc chính",
      selectedurgent: "1",
      selectedImportant: "A",
      selectedHours: "1",
      startDate: "Chọn ngày",
      endDate: "",
      startTime: "",
      endTime: "",
      customEndTimeHours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i), // Tạo danh sách giờ từ 00 đến 23
    });
  },

  async createTask() {
    let that = this;
    that.setData({ turnPopup: false, selectedFilter: "Tất cả" });

    if (parseFloat(that.calculateTime()) > parseFloat(that.data.selectedHours)) {
      return tt.showModal({
        title: "Thông báo",
        content: "Đã vượt quá giờ cho phép. Vui lòng chọn lại.",
        confirmText: "Đóng",
        showCancel: false,
      })
    }

    tt.getStorage({
      key: "user_access_token",
      success: async (res) => {
        const access_token = res.data.access_token;
        if (
          that.data.calendarID != "" &&
          that.data.inputValue != "" &&
          that.data.startDate != "" &&
          that.data.endDate != "" &&
          that.data.startTime != "" &&
          that.data.endTime != ""
        ) {

          tt.showToast({
            title: "Đang tạo",
            icon: "loading",
            duration: 5000,
          })

          if (that.data.dailyLoop) {
            const runStartSec = Date.now();
            let listRecords = [];
            const promises = [];
            let currentDate = new Date(that.data.startDate);
            const endDateObj = new Date(that.data.endDate);
            while (currentDate <= endDateObj) {
              let dayWork = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
              let body = bodyCreateTask(
                that.data.inputValue,
                that.data.inputNote,
                that.dateTimeToTimestamp(
                  dayWork,
                  that.data.startTime,
                ).toString(),
                that.dateTimeToTimestamp(
                  dayWork,
                  that.data.endTime,
                ).toString(),
                that.formatDateToUTC(that.data.endDate, 1)
              );
              try {
                const eventPromise = createEvent(access_token, that.data.calendarID, body).then(rs => {
                  let record = {
                    fields: {
                      "Việc cần làm": that.data.inputValue,
                      "Thể loại": that.data.selectedCategory,
                      "Quan trọng": that.data.selectedImportant,
                      "Cấp bách": that.data.selectedurgent,
                      "Số giờ cần có": Number.parseInt(that.data.selectedHours),
                      Person: [
                        {
                          id: res.data.open_id,
                        },
                      ],
                      "Ngày - Giờ bắt đầu": that.dateTimeToTimestamp(that.data.startDate, "") * 1000,
                      "Ngày - Giờ kết thúc": that.dateTimeToTimestamp(that.data.endDate, "") * 1000,
                      "Ghi chú": that.data.inputNote,
                      "Ngày làm": currentDate.getTime(),
                      EventID: rs.data.event.event_id,
                      CalendarID: that.data.calendarID,
                      "Số giờ của 1 ngày": Math.abs(
                        (that.dateTimeToTimestamp(dayWork, that.data.endTime) -
                          this.dateTimeToTimestamp(dayWork, that.data.startTime)) /
                        (60 * 60 * 1000)
                      ) * 1000,
                      id: that.data.currentTarget,
                      "json_due": JSON.stringify({
                        startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                        endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                        startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                        endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                        date: dayWork
                      })
                    },
                  };
                  listRecords.push(record);
                }).catch(err => {
                  console.error(`Error creating event for ${dayWork}:`, err);
                });;
                promises.push(eventPromise);
                currentDate.setDate(currentDate.getDate() + 1);
              }
              catch (err) {
                console.error(err);
              }
            }
            try {
              await Promise.all(promises);
              currentDate = new Date(that.data.startDate);
              for (let i = 0; i < listRecords.length; i++) {
                let dayWork = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
                listRecords[i].fields["Ngày làm"] = currentDate.getTime();
                listRecords[i].fields["json_due"] = listRecords[i].fields["json_due"] = JSON.stringify({
                  startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                  endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                  startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                  endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                  date: dayWork
                });
                listRecords[i].fields["Số giờ của 1 ngày"] = Math.abs(
                  (that.dateTimeToTimestamp(dayWork, that.data.endTime) -
                    that.dateTimeToTimestamp(dayWork, that.data.startTime)) /
                  (60 * 60 * 1000)
                ) * 1000;
                currentDate.setDate(currentDate.getDate() + 1);
              }

              let body = {
                records: listRecords
              }
              await createRecords(tt.getStorageSync("app_access_token"), body, appVar.GlobalConfig.tableId);
              tt.showToast({
                title: "Tạo xong công việc",
                icon: "success",
                success: () => {
                  that.setData({
                    inputValue: "",
                    inputNote: "",
                    edit: {},
                    customStartTimeHourIndex: 0,
                    totalHours: 0,
                    customStartTimeMinuteIndex: 0,
                    customEndTimeHourIndex: 0,
                    customEndTimeMinuteIndex: 0,
                    inputValue: "",
                    calendarname: "",
                    selectedImportant: "",
                    selectedDayWork: "",
                    selectedDay: "",
                    selectedIndexImportant: 0,
                    selectedIndexCategory: 0,
                    selectedIndexUrgent: 0,
                    selectedCategory: "Việc chính",
                    selectedurgent: "1",
                    selectedImportant: "A",
                    selectedHours: "1",
                    startDate: "Chọn ngày",
                    endDate: "",
                    startTime: "",
                    endTime: "",
                    turnMode: false,
                    turnPopup2: false,
                    customEndTimeHours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i), // Tạo danh sách giờ từ 00 đến 23
                  });
                },
              });
              const runEndSec = Date.now();
              console.log(`Time to run: ${runEndSec - runStartSec} ms`);
              that.listTask();
            }
            catch (err) {
              console.error(err);
            }
            return;
          }
          else if (that.data.isLoop) {
            const runStartSec = Date.now();
            let listRecords = [];
            const promises = [];
            let currentDate = new Date(that.data.startDate);
            const endDateObj = new Date(that.data.endDate);
            while (currentDate <= endDateObj) {
              let dayWork = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
              let body = bodyCreateTask(
                that.data.inputValue,
                that.data.inputNote,
                that.dateTimeToTimestamp(
                  dayWork,
                  that.data.startTime,
                ).toString(),
                that.dateTimeToTimestamp(
                  dayWork,
                  that.data.endTime,
                ).toString(),
                that.formatDateToUTC(that.data.endDate, 1)
              );
              try {
                const eventPromise = createEvent(access_token, that.data.calendarID, body).then(rs => {
                  let record = {
                    fields: {
                      "Việc cần làm": that.data.inputValue,
                      "Thể loại": that.data.selectedCategory,
                      "Quan trọng": that.data.selectedImportant,
                      "Cấp bách": that.data.selectedurgent,
                      "Số giờ cần có": Number.parseInt(that.data.selectedHours),
                      Person: [
                        {
                          id: res.data.open_id,
                        },
                      ],
                      "Ngày - Giờ bắt đầu": that.dateTimeToTimestamp(that.data.startDate, "") * 1000,
                      "Ngày - Giờ kết thúc": that.dateTimeToTimestamp(that.data.endDate, "") * 1000,
                      "Ghi chú": that.data.inputNote,
                      "Ngày làm": currentDate.getTime(),
                      EventID: rs.data.event.event_id,
                      CalendarID: that.data.calendarID,
                      "Số giờ của 1 ngày": Math.abs(
                        (that.dateTimeToTimestamp(dayWork, that.data.endTime) -
                          this.dateTimeToTimestamp(dayWork, that.data.startTime)) /
                        (60 * 60 * 1000)
                      ) * 1000,
                      id: that.data.currentTarget,
                      "json_due": JSON.stringify({
                        startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                        endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                        startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                        endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                        date: dayWork
                      })
                    },
                  };
                  listRecords.push(record);
                }).catch(err => {
                  console.error(`Error creating event for ${dayWork}:`, err);
                });;
                promises.push(eventPromise);
                currentDate.setDate(currentDate.getDate() + 7);
              }
              catch (err) {
                console.error(err);
              }
            }
            try {
              await Promise.all(promises);
              currentDate = new Date(that.data.startDate);
              for (let i = 0; i < listRecords.length; i++) {
                let dayWork = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
                listRecords[i].fields["Ngày làm"] = currentDate.getTime();
                listRecords[i].fields["json_due"] = listRecords[i].fields["json_due"] = JSON.stringify({
                  startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                  endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                  startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                  endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                  date: dayWork
                });
                listRecords[i].fields["Số giờ của 1 ngày"] = Math.abs(
                  (that.dateTimeToTimestamp(dayWork, that.data.endTime) -
                    that.dateTimeToTimestamp(dayWork, that.data.startTime)) /
                  (60 * 60 * 1000)
                ) * 1000;
                currentDate.setDate(currentDate.getDate() + 7);
              }

              let body = {
                records: listRecords
              }
              await createRecords(tt.getStorageSync("app_access_token"), body, appVar.GlobalConfig.tableId);
              tt.showToast({
                title: "Tạo xong công việc",
                icon: "success",
                success: () => {
                  that.setData({
                    inputValue: "",
                    inputNote: "",
                    edit: {},
                    customStartTimeHourIndex: 0,
                    totalHours: 0,
                    customStartTimeMinuteIndex: 0,
                    customEndTimeHourIndex: 0,
                    customEndTimeMinuteIndex: 0,
                    inputValue: "",
                    calendarname: "",
                    selectedImportant: "",
                    selectedDayWork: "",
                    selectedDay: "",
                    selectedIndexImportant: 0,
                    selectedIndexCategory: 0,
                    selectedIndexUrgent: 0,
                    selectedCategory: "Việc chính",
                    selectedurgent: "1",
                    selectedImportant: "A",
                    selectedHours: "1",
                    startDate: "Chọn ngày",
                    endDate: "",
                    startTime: "",
                    endTime: "",
                    turnMode: false,
                    turnPopup2: false,
                    customEndTimeHours: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i), // Tạo danh sách giờ từ 00 đến 23
                  });
                },
              });
              const runEndSec = Date.now();
              console.log(`Time to run: ${runEndSec - runStartSec} ms`);
              that.listTask();
            }
            catch (err) {
              console.error(err);
            }
            return;
          }

          //phân công task từng ngày (week loop)
          const body = bodyCreateTask(
            that.data.inputValue,
            that.data.inputNote,
            this.dateTimeToTimestamp(
              that.data.selectedDayWork,
              that.data.startTime
            ).toString(),
            this.dateTimeToTimestamp(
              that.data.selectedDayWork,
              that.data.endTime
            ).toString(),
            that.formatDateToUTC(that.data.endDate, 1)
          );

          createEvent(access_token, that.data.calendarID, body).then(
            (rs) => {
              console.log(rs);
              const body2 = {
                fields: {
                  "Việc cần làm": that.data.inputValue,
                  "Thể loại": that.data.selectedCategory,
                  "Quan trọng": that.data.selectedImportant,
                  "Cấp bách": that.data.selectedurgent,
                  "Số giờ cần có": Number.parseInt(that.data.selectedHours),
                  Person: [
                    {
                      id: res.data.open_id,
                    },
                  ],
                  "Ngày - Giờ bắt đầu":
                    this.dateTimeToTimestamp(that.data.startDate, "") *
                    1000,
                  "Ngày - Giờ kết thúc":
                    this.dateTimeToTimestamp(that.data.endDate, "") * 1000,
                  "Ghi chú": that.data.inputNote,
                  "Ngày làm":
                    this.dateTimeToTimestamp(that.data.selectedDayWork, "") * 1000,
                  EventID: rs.data.event.event_id,
                  CalendarID: that.data.calendarID,
                  "Số giờ của 1 ngày":
                    Math.abs(
                      (this.dateTimeToTimestamp(
                        that.data.selectedDayWork,
                        that.data.endTime
                      ) -
                        this.dateTimeToTimestamp(
                          that.data.selectedDayWork,
                          that.data.startTime
                        )) /
                      (60 * 60 * 1000)
                    ) * 1000,
                  "id": that.data.currentTarget,
                  "json_due": JSON.stringify({
                    startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                    endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                    startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                    endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                    date: that.data.selectedDayWork
                  })
                },
              };
              createRecord(tt.getStorageSync("app_access_token"), body2, appVar.GlobalConfig.tableId).then((rs) => {
                console.log(rs);
                tt.showToast({
                  title: "Tạo xong công việc",
                  icon: "success",
                });
                this.setData({
                  inputValue: "",
                  inputNote: "",
                  edit: {},
                  customStartTimeHourIndex: 0,
                  totalHours: 0,
                  customStartTimeMinuteIndex: 0,
                  customEndTimeHourIndex: 0,
                  customEndTimeMinuteIndex: 0,
                  inputValue: "",
                  calendarname: "",
                  selectedImportant: "",
                  selectedDayWork: "",
                  selectedDay: "",
                  selectedIndexImportant: 0,
                  selectedIndexCategory: 0,
                  selectedIndexUrgent: 0,
                  selectedCategory: "Việc chính",
                  selectedurgent: "1",
                  selectedImportant: "A",
                  selectedHours: "1",
                  startDate: "Chọn ngày",
                  endDate: "",
                  startTime: "",
                  endTime: "",
                  turnMode: false,
                  turnPopup2: false,
                });
                that.listTask()
              });
            }
          );
        } else {
          tt.showToast({
            title: "Vui lòng nhập đầy đủ dữ liệu",
            icon: "error",
          });
        }
      }
    });

  },

  toggleFilter() {
    // Toggle the visibility of the filter picker component
    this.setData({
      showFilterPicker: !this.data.showFilterPicker,
    });
  },

  onFilterChange(e) {
    let that = this;
    let tableData = that.data.tableData;
    const index = e.detail.value;
    const selectedOption = that.data.theloaiOptions[index];
    // Update the selected filter in state
    that.setData({
      selectedFilter: selectedOption, // Update chosen
    });
    // Filter the table data based on selected options and existing filters
    that.setData({
      filterData: tableData.filter(item => {
        return (        // Filter by "The loai" (category)
          that.data.selectedFilter === "Tất cả" || item.theloai === that.data.selectedFilter) &&
          // Filter by "Quan trong" (importance)  
          (that.data.selectedQuanTrong === "Tất cả" || item.quantrong === that.data.selectedQuanTrong) &&
          // Filter by "Cap bach" (priority level)
          (that.data.selectedCapBach === "Tất cả" || item.capbach === that.data.selectedCapBach) &&
          // Filter by "Thu" (day of the week)  
          (that.data.selectedThu === "Tất cả" || item.thu === that.data.selectedThu)
        // ... similar conditions for other options
      })
    });
  },
  onQuanTrongChange(e) {
    let that = this;
    let tableData = that.data.tableData;
    const index = e.detail.value;
    const selectedOption = that.data.quantrongOptions[index];
    // this.listTask()
    that.setData({
      selectedQuanTrong: selectedOption, //  Update chosen
    });
    that.setData({
      filterData: tableData.filter(item => {
        return (that.data.selectedFilter === "Tất cả" || item.theloai === that.data.selectedFilter) &&
          (that.data.selectedQuanTrong === "Tất cả" || item.quantrong === that.data.selectedQuanTrong) &&
          (that.data.selectedCapBach === "Tất cả" || item.capbach === that.data.selectedCapBach) &&
          (that.data.selectedThu === "Tất cả" || item.thu === that.data.selectedThu)
        // ... similar conditions for other options
      })
    });
  },
  onCapBachChange(e) {
    let that = this;
    let tableData = that.data.tableData;
    const index = e.detail.value;
    const selectedOption = that.data.capbachOptions[index];
    that.setData({
      selectedCapBach: selectedOption, //  Update chosen
    });
    that.setData({
      filterData: tableData.filter(item => {
        return (that.data.selectedFilter === "Tất cả" || item.theloai === that.data.selectedFilter) &&
          (that.data.selectedQuanTrong === "Tất cả" || item.quantrong === that.data.selectedQuanTrong) &&
          (that.data.selectedCapBach === "Tất cả" || item.capbach === that.data.selectedCapBach) &&
          (that.data.selectedThu === "Tất cả" || item.thu === that.data.selectedThu)
        // ... similar conditions for other options
      })
    });
  },
  onThuChange(e) {
    let that = this;
    let tableData = that.data.tableData;
    const index = e.detail.value;
    const selectedOption = that.data.thuOptions[index];
    // this.listTask()
    that.setData({
      selectedThu: selectedOption, //  Update chosen
    });
    that.setData({
      filterData: tableData.filter(item => {
        return (that.data.selectedFilter === "Tất cả" || item.theloai === that.data.selectedFilter) &&
          (that.data.selectedQuanTrong === "Tất cả" || item.quantrong === that.data.selectedQuanTrong) &&
          (that.data.selectedCapBach === "Tất cả" || item.capbach === that.data.selectedCapBach) &&
          (that.data.selectedThu === "Tất cả" || item.thu === that.data.selectedThu)
        // ... similar conditions for other options
      })
    });
  },

  // calculateTime() {
  //   let totalHours = 0;
  //   this.data.dailyData.forEach((item) => {
  //     if (item[this.data.selectedDay]) {
  //       if (
  //         parseInt(item[this.data.selectedDay].endTime.split(":")[0]) <
  //         parseInt(item[this.data.selectedDay].startTime.split(":")[0])
  //       ) {
  //         tt.showModal({
  //           title: "Thông báo",
  //           content: "Đã vượt quá giờ cho phép. Vui lòng chọn lại.",
  //           confirmText: "Đóng",
  //           showCancel: false,
  //         });
  //         return this.setData({
  //           customStartTimeHourIndex: 0,
  //           customStartTimeMinuteIndex: 0,
  //           customEndTimeHourIndex: 0,
  //           customEndTimeMinuteIndex: 0,
  //         });
  //       }
  //       let startTime = new Date(
  //         `2000-01-01 ${item[this.data.selectedDay].startTime}`
  //       );
  //       let endTime = new Date(
  //         `2000-01-01 ${item[this.data.selectedDay].endTime}`
  //       );
  //       totalHours += (endTime - startTime) / (1000 * 60 * 60);
  //     }
  //   });
  //   this.setData({ totalHours });
  //   return totalHours;
  // },
  calculateTime() {
    function timeToMinutes(time) {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }
    const totalEnd = `${this.data.customEndTimeHours[this.data.customEndTimeHourIndex]}:${this.data.customEndTimeMinutes[this.data.customEndTimeMinuteIndex]}`;
    const totalStart = `${this.data.customStartTimeHours[this.data.customStartTimeHourIndex]}:${this.data.customStartTimeMinutes[this.data.customStartTimeMinuteIndex]}`;
    const minutes1 = timeToMinutes(totalStart);
    const minutes2 = timeToMinutes(totalEnd);
    const diffMinutes = Math.abs(minutes2 - minutes1);
    const diffHours = diffMinutes / 60;
    this.setData({ totalHours: diffHours });
    return diffHours;
  },
  convertUTCtoGMT7Timestamp: function (utcString) {
    // Create a Date object from the UTC string
    const utcDate = new Date(utcString);
    // Add the offset to the UTC date to get GMT+7 date
    const gmt7Date = new Date(utcDate.getTime() / 1000);
    // Return the timestamp of the GMT+7 date
    return gmt7Date.getTime();
  },

  isDuringAnyBusyPeriod: (check, list) => {
    for (const period of list) {
      if (
        (check.start >= period.start && check.start < period.end) || // check.start is within a busy period
        (check.end > period.start && check.end <= period.end) || // check.end is within a busy period
        (check.start <= period.start && check.end >= period.end) // check fully encompasses a busy period
      ) {
        return false; // Return false immediately if any condition is met
      }
    }
    return true; // Return true if no overlap is found
  },

});