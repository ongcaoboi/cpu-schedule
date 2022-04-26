# CPU - Schedule

## Một số giải thuật định thời cpu

 - FCFS: First Come First Served
 - SJF: Shortest Job First
 - SRTF: Shortest Remaining Time First
 - RR: Round Robin

## Cấu trúc

 - src/services/round_robin.js chứa các hàm giải thuật nhận vào chuỗi và trả về dữ liệu dạng json cho client xử lý để in kết quả ra màn hình
 - src/services/result.json chứa dữ liệu trả về mẫu có thể dùng đường dẫn /getRobin trên trang web đê xem 
 - src/public/js/index.js chứa code xử lý để gủi dữ liệu đầu vào và nhận json trả về để in ra màn hình

 - [link demo](https://cpuschedule.herokuapp.com)

## Created by Tuấn Anh
