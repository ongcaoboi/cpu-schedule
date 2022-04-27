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

 - [link demo](https://dinhthoi.herokuapp.com)

Ví dụ bài toán định thời cpu sau với giải thuật RR q = 4
Tiến trình     Thời điểm vào     Thời gian xử lý
       P1                      0                            24
       P2                      1                              3
       P3                      2                              3

Thì input data sẽ như sau:
3 4
1 0 24
2 1 3
3 2 3

