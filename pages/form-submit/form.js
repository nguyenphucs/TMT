import { bodyCreateTask, bodyCreateRecord, } from "./detailForm";
import {
  createEvent,
  createRecord,
  getCalendarList,
  createRecords,
  getListBusy,
} from "../function/apiFunction";

const appVar = getApp();

(dayOptions2 = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
]),
  Page({
    data: {
      selectedDay: dayOptions2[new Date().getDay()],
      hours: [
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
        "4.5",
        "5",
        "5.5",
        "6",
        "6.5",
        "7",
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "10.5",
        "11",
        "11.5",
        "12",
        "12.5",
        "13",
        "13.5",
        "14",
        "14.5",
        "15",
        "15.5",
        "16",
        "16.5",
        "17",
        "17.5",
        "18",
        "18.5",
        "19",
        "19.5",
        "20",
        "20.5",
        "21",
        "21.5",
        "22",
        "22.5",
        "23",
        "23.5",
        "24",
        "24.5",
        "25",
        "25.5",
        "26",
        "26.5",
        "27",
        "27.5",
        "28",
        "28.5",
        "29",
        "29.5",
        "30",
        "30.5",
        "31",
        "31.5",
        "32",
        "32.5",
        "33",
        "33.5",
        "34",
        "34.5",
        "35",
        "35.5",
        "36",
      ],
      selectedHours: "1",
      importantOptions: ["A", "B", "C"],
      selectedImportant: "A",
      isLoop: false,
      categoryOptions: [
        "Việc chính",
        "Dự án",
        "Việc phát sinh",
        "Việc cần đôn đốc",
        "Đọc & học",
      ],

      dailyData: [
        {
          "Thứ 2": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
          "Thứ 3": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
          "Thứ 4": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
          "Thứ 5": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
          "Thứ 6": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
          "Thứ 7": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
          "Chủ nhật": {
            date: "",
            startTime: "",
            indexSTH: 0,
            indexSTM: 0,
            endTime: "",
            indexETH: 0,
            indexETM: 0,
            inputNote: "",
            isLoop: false,
          },
        },
      ],

      selectedCategory: "Việc chính",
      urgentOptions: ["1", "2", "3"],
      selectedurgent: "1",

      mindate: new Date().toISOString().substring(0, 10),
      startDate: new Date().toISOString().substring(0, 10), // Thêm selectedDate để lưu ngày và giờ được chọn
      endDate: "", // Thêm selectedDate để lưu ngày và giờ được chọn
      startTime: "", // Thêm selectedTime để lưu ngày và giờ được chọn
      endTime: "", // Thêm selectedTime để lưu ngày và giờ được chọn
      selectedDayWork: new Date().toISOString().substring(0, 10),

      calendarID: "",
      eventId: "",
      lich: [],
      chonlich: "",
      dataLich: [],

      inputValue: "",
      inputNote: "",

      listBusy: [],
      tableName: [],
      checkBusy: [],

      isSHow: false,
      iSo: true,
      diabledBtn: false,
      disableDayWork: true,
      dailyLoop: false,
      disaleET: true,

      customStartTimeHours: Array.from(
        { length: 24 },
        (_, i) => (i < 10 ? "0" : "") + i
      ), // Tạo danh sách giờ từ 00 đến 23
      customStartTimeMinutes: ["00", "15", "30", "45"], // Giới hạn giá trị phút
      customStartTimeHourIndex: 0, // Giá trị khởi tạo cho giờ
      customStartTimeMinuteIndex: 0, // Giá trị khởi tạo cho phút

      customEndTimeHours: Array.from(
        { length: 24 },
        (_, i) => (i < 10 ? "0" : "") + i
      ), // Tạo danh sách giờ từ 00 đến 23
      customEndTimeMinutes: ["00", "15", "30", "45"], // Giới hạn giá trị phút
      customEndTimeHourIndex: 0, // Giá trị khởi tạo cho giờ
      customEndTimeMinuteIndex: 0, // Giá trị khởi tạo cho phút
    },

    inputHours: function (e) {
      if (e.detail.value > 36 || e.detail.value < 0) {
        return tt.showModal({
          title: "Thông báo",
          content: "Tổng thời gian công việc phải ở khoảng 0.5h - 36h.",
          confirmText: "Đóng",
          showCancel: false,
        });
      }
      this.setData({
        selectedHours: e.detail.value,
      });
    },

    onSelectedHours: function (e) {
      if (this.data.hours[e.detail.value] == "Khác") {
        this.setData({
          isSHow: true,
          iSo: false,
        });
        return;
      }
      this.setData({
        selectedHours: this.data.hours[e.detail.value],
      });
    },
    inputTittle: function (e) {
      this.setData({
        inputValue: e.detail.value,
        Wvieccanlam: ""
      });
    },

    inputNote: function (e) {
      this.setData({
        inputNote: e.detail.value,
      });
      let data = this.data.dailyData;
      data[0][this.data.selectedDay].inputNote = this.data.inputNote;
      this.setData({
        dailyData: data,
      });
    },

    onCalendarChage: function (e) {
      this.setData({
        chonlich: this.data.lich[e.detail.value],
        calendarID: this.data.dataLich.find(
          (item) => item.summary === this.data.lich[e.detail.value]
        ).calendar_id,
        Wchonlich: ""
      });
    },

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
    checkboxChange: function (e) {
      const dailyData = this.data.dailyData;
      const isLoop = !e.currentTarget.dataset.checked;
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

    onWeekChange: function (e) {
      this.setData({
        selectedDay: this.data.dayOptions[e.detail.value],
      });
    },

    onCategoryChange: function (e) {
      this.setData({
        selectedCategory: this.data.categoryOptions[e.detail.value],
      });
    },

    onImportantChange: function (e) {
      this.setData({
        selectedImportant: this.data.importantOptions[e.detail.value],
      });
    },

    onCategoryChange: function (e) {
      this.setData({
        selectedCategory: this.data.categoryOptions[e.detail.value],
      });
    },

    onUrgentChange: function (e) {
      this.setData({
        selectedurgent: this.data.urgentOptions[e.detail.value],
      });
    },

    onDateChange1: function (e) {
      this.setData({
        startDate: e.detail.value,
        selectedDayWork: e.detail.value,
        disableEndDate: false,
        selectedDay: dayOptions2[new Date(e.detail.value).getDay()],
      });
      if (this.data.startDate > this.data.endDate) {
        this.setData({
          endDate: this.data.startDate,
          selectedDayWork: this.data.startDate,
          selectedDay: dayOptions2[new Date(e.detail.value).getDay()],
        });
      }
    },

    onDateChange3: function (e) {
      this.setData({
        selectedDayWork: e.detail.value,
        selectedDay: dayOptions2[new Date(e.detail.value).getDay()]
      });
    },

    onDateChange2: function (e) {
      let listBusy = this.data.listBusy;
      listBusy = [];
      this.setData({
        endDate: e.detail.value,
        disableDayWork: false,
        Wngayketthuc: ""
      });
      if (this.data.startDate > this.data.endDate) {
        this.setData({
          endDate: this.data.startDate,
        });
      }
      tt.getStorage({
        key: "user_access_token",
        success: (res) => {
          const access_token = res.data.access_token;
          const body = {
            time_min: this.data.startDate + "T00:00:00Z",
            time_max: this.data.endDate + "T23:59:59Z",
            user_id: res.data.open_id,
          };

          getListBusy(access_token, body).then((rs) => {
            console.log(rs);
            rs.data?.freebusy_list?.map((i) =>
              listBusy.push({
                start: this.convertUTCtoGMT7Timestamp(i.start_time),
                end: this.convertUTCtoGMT7Timestamp(i.end_time),
              })
            );
            this.setData({
              listBusy,
            });
          });
        },
      });
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
        customEndTimeHourIndex: 0,
        Wgiobatdau: ""
      });
      this.calculateTime();
    },

    customStartTimeOnMinuteChange(e) {
      const customStartTimeMinuteIndex = e.detail.value;
      this.setData({
        customStartTimeMinuteIndex: customStartTimeMinuteIndex,
        startTime: `${this.data.customStartTimeHours[this.data.customStartTimeHourIndex]
          }:${this.data.customStartTimeMinutes[customStartTimeMinuteIndex]}`,
        disaleET: false,
        Wgiobatdau: ""
      });
    },

    customEndTimeOnHourChange(e) {
      const customEndTimeHourIndex = e.detail.value;
      this.setData({
        customEndTimeHourIndex: customEndTimeHourIndex,
        endTime: `${this.data.customEndTimeHours[customEndTimeHourIndex]}:${this.data.customEndTimeMinutes[this.data.customEndTimeMinuteIndex]
          }`,
        Wgioketthuc: ""
      });

      let data = this.data.dailyData;
      data[0][this.data.selectedDay].date = this.data.selectedDayWork;
      data[0][this.data.selectedDay].startTime = this.data.startTime;
      data[0][this.data.selectedDay].endTime = this.data.endTime;
      data[0][this.data.selectedDay].indexSTH =
        this.data.customStartTimeHourIndex;
      data[0][this.data.selectedDay].indexSTM =
        this.data.customStartTimeMinuteIndex;
      data[0][this.data.selectedDay].indexETH =
        this.data.customEndTimeHourIndex;
      data[0][this.data.selectedDay].indexETM =
        this.data.customEndTimeMinuteIndex;
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
        endTime: `${this.data.customEndTimeHours[this.data.customEndTimeHourIndex]
          }:${this.data.customEndTimeMinutes[customEndTimeMinuteIndex]}`,
        Wgioketthuc: ""
      });

      let that = this;
      let checkBusy = this.data.checkBusy;
      checkBusy = [];

      let data = this.data.dailyData;
      data[0][this.data.selectedDay].date = this.data.selectedDayWork;
      data[0][this.data.selectedDay].startTime = this.data.startTime;
      data[0][this.data.selectedDay].endTime = this.data.endTime;
      data[0][this.data.selectedDay].index1 = this.data.customEndTimeHourIndex;
      data[0][this.data.selectedDay].index2 =
        this.data.customEndTimeMinuteIndex;
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
        start: this.dateTimeToTimestamp(
          this.data.selectedDayWork,
          this.data.startTime
        ),
        end: this.dateTimeToTimestamp(
          this.data.selectedDayWork,
          this.data.endTime
        ),
      };
      if (this.isDuringAnyBusyPeriod(checkBusy, this.data.listBusy) === false) {
        tt.showModal({
          title: "Cảnh báo",
          content: "Đã có lịch trùng",
          confirmText: "Tiếp",
          cancelText: "Hủy",
          showCancel: true,
          success(res) {
            console.log(JSON.stringify(res));
            if (res.confirm === false) {
              that.setData({
                endTime: "",
                startTime: "",
                totalHours: 0,
              });
            }
          },
          fail(res) {
            console.log(`showModal fail: ${JSON.stringify(res)}`);
          },
        });
      }
      this.setData({
        checkBusy,
      });

      this.calculateTime();
    },

    onShow() {
      let that = this;
      this.auth = setInterval(() => {
        let isComplete = tt.getStorageSync("isComplete");
        tt.showToast({
          title: "Đang lấy dữ liệu",
          icon: "loading",
          duration: 5000,
        });
        if (isComplete) {
          clearInterval(this.auth);
          setTimeout(() => that.setCalendarData(), 3000);
        }
      }, 1000);
      that.setData({
        Wchonlich: "",
        Wvieccanlam: "",
        Wngaybatdau: "",
        Wngayketthuc: "",
        Wgiobatdau: "",
        Wgioketthuc: "",
        startTime: "",
        inputValue: ""
      })
    },
    setCalendarData() {
      let that = this;
      tt.getStorage({
        key: "user_access_token",
        success: (res) => {
          const access_token = res.data.access_token;
          getCalendarList(access_token).then((result) => {
            console.log(result);
            that.setData({
              dataLich: result.data.calendar_list,
              lich: result.data.calendar_list.map((item) => item.summary),
              chonlich: result.data.calendar_list[0].summary,
              calendarID: result.data.calendar_list[0].calendar_id,
              // tableName: rs.data.items.filter(item => item.name.includes("Bảng Phân Công")).map(item => ({name: item.name, table: item.table_id})),
            });
          });
        },
      });
    },

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

    async createTask() {
      let that = this;
      that.setData({
        Wchonlich: "",
        Wvieccanlam: "",
        Wngaybatdau: "",
        Wngayketthuc: "",
        Wgiobatdau: "",
        Wgioketthuc: ""
      })
      if (parseFloat(that.calculateTime()) > parseFloat(that.data.selectedHours)) {
        return tt.showModal({
          title: "Thông báo",
          content: "Đã vượt quá giờ cho phép. Vui lòng chọn lại.",
          confirmText: "Đóng",
          showCancel: false,
        });
      }

      if (that.data.chonlich != tt.getStorageSync("user_info").name) {
        return tt.showModal({
          title: "Thông báo",
          content: "Vui lòng chọn lịch cá nhân!",
          confirmText: "Đóng",
          showCancel: false,
          success(res) {
            console.log(JSON.stringify(res));
            if (res.confirm === true) {
              that.setData({
                Wchonlich: "border: 2px solid red;"
              });
            }
          },
          fail(res) {
            console.log(`showModal fail: ${JSON.stringify(res)}`);
          },
        });
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
              success: () => {
                that.setData({
                  diabledBtn: true,
                });
              },
            });

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
                  });
                  promises.push(eventPromise);
                  currentDate.setDate(currentDate.getDate() + 1);
                }
                catch (err) {
                  console.error(err);
                }
              }
              try {
                await Promise.all(promises);
                let currentDate1 = new Date(that.data.startDate);
                for (let i = 0; i < listRecords.length; i++) {
                  let dayWork = `${currentDate1.getFullYear()}-${currentDate1.getMonth() + 1}-${currentDate1.getDate()}`
                  listRecords[i].fields["Ngày làm"] = currentDate1.getTime();
                  listRecords[i].fields["json_due"] = JSON.stringify({
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
                  currentDate1.setDate(currentDate1.getDate() + 1);
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
                      diabledBtn: false,
                    });
                    that.setData({
                      inputValue: "",
                      inputNote: "",
                      selectedCategory: "Việc chính",
                      selectedurgent: "1",
                      selectedImportant: "A",
                      selectedHours: "1",
                      startDate: that.data.mindate,
                      endDate: "",
                      startTime: "",
                      endTime: "",
                      customStartTimeHourIndex: 0,
                      customStartTimeMinuteIndex: 0,
                      customEndTimeHourIndex: 0,
                      customEndTimeMinuteIndex: 0,
                      customEndTimeHours: Array.from(
                        { length: 24 },
                        (_, i) => (i < 10 ? "0" : "") + i
                      ),
                      totalHours: 0,
                      isLoop: false,
                      Wchonlich: "",
                      Wvieccanlam: "",
                      Wngaybatdau: "",
                      Wngayketthuc: "",
                      Wgiobatdau: "",
                      Wgioketthuc: ""
                    });
                  },
                });
                const runEndSec = Date.now();
                console.log(`Time to run: ${runEndSec - runStartSec} ms`);
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
                  });
                  promises.push(eventPromise);
                  currentDate.setDate(currentDate.getDate() + 7);
                }
                catch (err) {
                  console.error(err);
                }
              }
              try {
                await Promise.all(promises);
                let currentDate1 = new Date(that.data.startDate);
                for (let i = 0; i < listRecords.length; i++) {
                  let dayWork = `${currentDate1.getFullYear()}-${currentDate1.getMonth() + 1}-${currentDate1.getDate()}`
                  listRecords[i].fields["Ngày làm"] = currentDate1.getTime();
                  listRecords[i].fields["json_due"] = JSON.stringify({
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
                  currentDate1.setDate(currentDate1.getDate() + 7);
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
                      diabledBtn: false,
                    });
                    that.setData({
                      inputValue: "",
                      inputNote: "",
                      selectedCategory: "Việc chính",
                      selectedurgent: "1",
                      selectedImportant: "A",
                      selectedHours: "1",
                      startDate: that.data.mindate,
                      endDate: "",
                      startTime: "",
                      endTime: "",
                      customStartTimeHourIndex: 0,
                      customStartTimeMinuteIndex: 0,
                      customEndTimeHourIndex: 0,
                      customEndTimeMinuteIndex: 0,
                      customEndTimeHours: Array.from(
                        { length: 24 },
                        (_, i) => (i < 10 ? "0" : "") + i
                      ),
                      totalHours: 0,
                      isLoop: false,
                      Wchonlich: "",
                      Wvieccanlam: "",
                      Wngaybatdau: "",
                      Wngayketthuc: "",
                      Wgiobatdau: "",
                      Wgioketthuc: ""
                    });
                  },
                });
                const runEndSec = Date.now();
                console.log(`Time to run: ${runEndSec - runStartSec} ms`);
              }
              catch (err) {
                console.error(err);
              }
              return;

            }
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
                    "json_due": JSON.stringify({
                      startHourTime: that.data.customStartTimeHours[that.data.customStartTimeHourIndex],
                      endHourTime: that.data.customEndTimeHours[that.data.customEndTimeHourIndex],
                      startMinTime: that.data.customStartTimeMinutes[that.data.customStartTimeMinuteIndex],
                      endMinTime: that.data.customEndTimeMinutes[that.data.customEndTimeMinuteIndex],
                      date: that.data.selectedDayWork
                    })
                  },
                };
                createRecord(
                  tt.getStorageSync("app_access_token"),
                  body2,
                  appVar.GlobalConfig.tableId
                ).then((rs) => {
                  console.log(rs);
                  tt.showToast({
                    title: "Tạo xong công việc",
                    icon: "success",
                    success: () => {
                      console.log("mở khóa");
                      that.setData({
                        diabledBtn: false,
                      });
                    },
                  });
                  this.setData({
                    inputValue: "",
                    inputNote: "",
                    selectedCategory: "Việc chính",
                    selectedurgent: "1",
                    selectedImportant: "A",
                    selectedHours: "1",
                    startDate: that.data.mindate,
                    endDate: "",
                    startTime: "",
                    endTime: "",
                    customStartTimeHourIndex: 0,
                    customStartTimeMinuteIndex: 0,
                    customEndTimeHourIndex: 0,
                    customEndTimeMinuteIndex: 0,
                    customEndTimeHours: Array.from(
                      { length: 24 },
                      (_, i) => (i < 10 ? "0" : "") + i
                    ),
                    totalHours: 0,
                    isLoop: false,
                    Wchonlich: "",
                    Wvieccanlam: "",
                    Wngaybatdau: "",
                    Wngayketthuc: "",
                    Wgiobatdau: "",
                    Wgioketthuc: ""
                  });
                });
              }
            );
          } else {
            tt.showToast({
              title: "Vui lòng nhập đầy đủ dữ liệu",
              icon: "error",
            });
            if (that.data.calendarID === "") {
              // Handle empty calendarID
              that.setData({
                Wchonlich: "border: 2px solid red;"
              })
              console.error('Missing calendar ID');
            }

            if (that.data.inputValue === "") {
              // Handle empty inputValue
              that.setData({
                Wvieccanlam: "border: 2px solid red;"
              })
              console.error('Missing input value');
            }

            if (that.data.startDate === "") {
              // Handle empty startDate
              that.setData({
                Wngaybatdau: "border: 2px solid red;"
              })
              console.error('Missing start date');
            }

            if (that.data.endDate === "") {
              // Handle empty endDate
              that.setData({
                Wngayketthuc: "border: 2px solid red;"
              })
              console.error('Missing end date');
            }

            if (that.data.startTime === "") {
              // Handle empty startTime
              that.setData({
                Wgiobatdau: "border: 2px solid red; border-radius: 6px"
              })
              console.error('Missing start time');
            }
            if (that.data.endTime === "") {
              // Handle empty endTime
              that.setData({
                Wgioketthuc: "border: 2px solid red; border-radius: 6px"
              })
              console.error('Missing end time');
            }
          }
        },
      });
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

    dateTimeToTimestamp: function (date, time) {
      let datetime = new Date(`${date} ${time}`);
      let timestamp = datetime.getTime();
      return Math.floor(timestamp / 1000);
    },

    formatDateToUTC(dateString, days) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + days);
      const newDate = date.toISOString().split("T")[0];
      return newDate.replace(/-/g, "") + "T000000Z";
    },

    convertUTCtoGMT7Timestamp: function (utcString) {
      // Create a Date object from the UTC string
      const utcDate = new Date(utcString);
      // Add the offset to the UTC date to get GMT+7 date
      const gmt7Date = new Date(utcDate.getTime() / 1000);
      // Return the timestamp of the GMT+7 date
      return gmt7Date.getTime();
    },
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
  });
