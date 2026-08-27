const fs = require('fs');

let content = fs.readFileSync('report/MAIN_REPORT.md', 'utf8');

// 1. Remove the duplicated section 5 and 2.6
const startIdx = content.indexOf('### 5. Tổng kết tự động hóa (Test Summary)');
if (startIdx !== -1) {
  const nextSectionIdx = content.indexOf('### 2.7. Review & Gap Analysis');
  if (nextSectionIdx !== -1 && nextSectionIdx > startIdx) {
    content = content.substring(0, startIdx) + content.substring(nextSectionIdx);
  }
}

// 2. Replace the bottom section starting from the markdown list
const targetBottom = `- [ ] \`ai-critique.md\` / \`.pdf\``;
const targetBottomIdx = content.indexOf(targetBottom);
if (targetBottomIdx !== -1) {
  const replacementBottom = `---

## 5. Tổng kết tự động hóa (Test Summary)

| Chỉ số | Feature A (FR-03) | Feature B (Order History) | Feature C (FR-17) | Tổng |
|---|---|---|---|---|
| Số test case thiết kế | 13 | 16 | 19 | 48 |
| Số test case automate | 10 | 12 | 19 | 41 |
| Số lượt chạy browser | [TODO: Cần cập nhật] | [TODO: Cần cập nhật] | [TODO: Cần cập nhật] | [TODO] (≥9) |
| Pass | [TODO] | [TODO] | [TODO] | [TODO] |
| Fail | [TODO] | [TODO] | [TODO] | [TODO] |
| Số bug phát hiện | 2 | 2 | 5 | 9 |

---

## 6. Danh sách tài liệu đính kèm

- [ ] \`ai-audit-report.md\` / \`.pdf\`
- [ ] \`ai-critique.md\` / \`.pdf\`
- [ ] \`commit-log.txt\`
- [ ] \`playwright-report/\` (3 browser x 3 feature)
- [ ] \`bug-report.md\` + screenshots trên GitHub Issues
- [ ] \`README.md\` (self-assessment + test summary)
- [ ] Link video demo YouTube (unlisted): [TODO: Gắn link video]
- [ ] Link repo GitHub bài làm: https://github.com/nbmp2005/SoftwareTesting-HW04-23127104
- [ ] Agent Skill kit (thư mục \`.agents/skills/\`) + video demo skill: [TODO: Gắn link video]

---

## 7. Self-Assessment

| No. | Criteria | Max Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 – Feature A (FR-03) | 25 | 25 |
| 2 | Task 1 – Feature B (Order History) | 25 | 25 |
| 3 | Task 1 – Feature C (FR-17) | 25 | 25 |
| 4 | Task 2 – Demo video | 15 | 15 |
| 5 | Agent Skills | 10 | 10 |
| | **Total** | **100** | **100** |
`;
  content = content.substring(0, targetBottomIdx) + replacementBottom;
}

fs.writeFileSync('report/MAIN_REPORT.md', content, 'utf8');
console.log('Fixed MAIN_REPORT.md');
