// script.js
async function generateSuggestion() {
    const prompt = document.getElementById("prompt").value;
    const formula = document.getElementById("formula").value;
    const output = document.getElementById("output");
  
    if (!prompt.trim()) {
      output.innerText = "Vui lòng nhập prompt.";
      return;
    }
  
    // Chuyển công thức thành tiếng Việt gợi ý nội dung
    let suggestion_prompt = "";
  
    switch (formula) {
      case "tag":
        suggestion_prompt = `Áp dụng công thức T-A-G để phân tích và cải thiện prompt sau:
  Task: Mô tả nhiệm vụ người dùng đang yêu cầu.
  Action: Nhập vai một chuyên gia phù hợp để thực hiện nhiệm vụ.
  Goal: Mục tiêu cụ thể người dùng muốn đạt được.
  
  Prompt: ${prompt}`;
        break;
  
      case "bab":
        suggestion_prompt = `Áp dụng công thức B-A-B để cải thiện prompt:
  Before: Trạng thái ban đầu hoặc vấn đề người dùng gặp phải.
  After: Kết quả mong muốn sau khi giải quyết vấn đề.
  Bridge: Gợi ý các bước hoặc ý tưởng giúp người dùng đạt được điều đó.
  
  Prompt: ${prompt}`;
        break;
  
      case "rtf":
        suggestion_prompt = `Áp dụng công thức R-T-F để cấu trúc lại prompt:
  Role: Nhập vai người có chuyên môn liên quan.
  Task: Nhiệm vụ cần thực hiện.
  Format: Định dạng đầu ra mong muốn.
  
  Prompt: ${prompt}`;
        break;
  
      case "care":
        suggestion_prompt = `Áp dụng công thức C-A-R-E để cải thiện prompt:
  Context: Bối cảnh hiện tại.
  Action: Hành động mong muốn.
  Result: Kết quả mong đợi.
  Example: Một ví dụ minh họa cho hành động.
  
  Prompt: ${prompt}`;
        break;
  
      case "rise":
        suggestion_prompt = `Áp dụng công thức R-I-S-E để định dạng lại prompt:
  Role: Vai trò người thực hiện.
  Input: Dữ liệu đầu vào.
  Step: Các bước tiến hành.
  Expectation: Kết quả kỳ vọng.
  
  Prompt: ${prompt}`;
        break;
  
      case "csir":
        suggestion_prompt = `Áp dụng công thức C-S-I-R để viết lại prompt hiệu quả:
  Context: Bối cảnh.
  Specific: Thông tin cụ thể về đối tượng.
  Intent: Mục đích mong muốn.
  Response: Cấu trúc đầu ra phù hợp.
  
  Prompt: ${prompt}`;
        break;
    }
  
    try {
      const res = await fetch("http://localhost:8000/tune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: suggestion_prompt, task_type: formula })
      });
  
      const result = await res.json();
      output.innerText = result.suggestion || JSON.stringify(result, null, 2);
    } catch (err) {
      output.innerText = "Lỗi khi gọi API hoặc không nhận được phản hồi.";
    }
  }
  