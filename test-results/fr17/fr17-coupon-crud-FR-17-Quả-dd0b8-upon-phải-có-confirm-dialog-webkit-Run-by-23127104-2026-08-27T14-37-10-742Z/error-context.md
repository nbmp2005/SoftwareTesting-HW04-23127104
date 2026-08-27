# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr17-coupon-crud.spec.ts >> FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Run by: 23127104 >> TC19 - [Mục 6 xác nhận] Xóa coupon phải có confirm dialog
- Location: automation\tests\fr17-coupon-crud.spec.ts:117:9

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "EShop Admin" [level=1] [ref=e5]
    - list [ref=e6]:
      - listitem [ref=e7] [cursor=pointer]: Dashboard
      - listitem [ref=e8] [cursor=pointer]: Danh mục
      - listitem [ref=e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=e12] [cursor=pointer]: Người dùng
      - listitem [ref=e13] [cursor=pointer]: Đăng xuất
  - generic [ref=e15]:
    - heading "Quản lý Mã Giảm Giá" [level=2] [ref=e16]
    - generic [ref=e17]:
      - heading "Tạo mã giảm giá mới" [level=3] [ref=e18]
      - generic [ref=e19]:
        - 'textbox "Mã coupon (VD: SAVE10)" [ref=e20]'
        - combobox [ref=e21]:
          - option "Phần trăm (%)" [selected]
          - option "Số tiền cố định (₫)"
        - 'spinbutton "Giá trị % (VD: 10)" [ref=e22]'
        - spinbutton "Đơn tối thiểu (₫)" [ref=e23]: "0"
        - textbox "Ngày hết hạn" [ref=e24]
        - spinbutton "Số lần dùng tối đa/người" [ref=e25]: "1"
      - button "Tạo mã" [ref=e26] [cursor=pointer]
    - table [ref=e27]:
      - rowgroup [ref=e28]:
        - row [ref=e29]:
          - columnheader "Mã" [ref=e30]
          - columnheader "Loại" [ref=e31]
          - columnheader "Giá trị" [ref=e32]
          - columnheader "Đơn tối thiểu" [ref=e33]
          - columnheader "Hết hạn" [ref=e34]
          - columnheader "Giới hạn/người" [ref=e35]
          - columnheader "Hành động" [ref=e36]
      - rowgroup [ref=e37]:
        - row [ref=e38]:
          - cell "SAVE10" [ref=e39]
          - cell "Phần trăm" [ref=e40]
          - cell "10%" [ref=e41]
          - cell "300,000 ₫" [ref=e42]
          - cell "2099-12-31" [ref=e43]
          - cell "1 lần" [ref=e44]
          - cell [ref=e45]:
            - button "Xóa" [ref=e46] [cursor=pointer]
        - row [ref=e47]:
          - cell "BIGBUY" [ref=e48]
          - cell "Cố định" [ref=e49]
          - cell "50,000 ₫" [ref=e50]
          - cell "500,000 ₫" [ref=e51]
          - cell "2099-12-31" [ref=e52]
          - cell "1 lần" [ref=e53]
          - cell [ref=e54]:
            - button "Xóa" [ref=e55] [cursor=pointer]
        - row [ref=e56]:
          - cell "VIP100" [ref=e57]
          - cell "Cố định" [ref=e58]
          - cell "100,000 ₫" [ref=e59]
          - cell "300,000 ₫" [ref=e60]
          - cell "2099-12-31" [ref=e61]
          - cell "2 lần" [ref=e62]
          - cell [ref=e63]:
            - button "Xóa" [ref=e64] [cursor=pointer]
        - row [ref=e65]:
          - cell "EXPIRED" [ref=e66]
          - cell "Phần trăm" [ref=e67]
          - cell "20%" [ref=e68]
          - cell "100,000 ₫" [ref=e69]
          - cell "Hết hạn" [ref=e70]
          - cell "1 lần" [ref=e71]
          - cell [ref=e72]:
            - button "Xóa" [ref=e73] [cursor=pointer]
        - row [ref=e74]:
          - cell "SAVE10" [ref=e75]
          - cell "Phần trăm" [ref=e76]
          - cell "10%" [ref=e77]
          - cell "0 ₫" [ref=e78]
          - cell "2099-12-30" [ref=e79]
          - cell "1 lần" [ref=e80]
          - cell [ref=e81]:
            - button "Xóa" [ref=e82] [cursor=pointer]
        - row [ref=e83]:
          - cell "FR17ZERO" [ref=e84]
          - cell "Phần trăm" [ref=e85]
          - cell "0%" [ref=e86]
          - cell "0 ₫" [ref=e87]
          - cell "2099-12-30" [ref=e88]
          - cell "1 lần" [ref=e89]
          - cell [ref=e90]:
            - button "Xóa" [ref=e91] [cursor=pointer]
        - row [ref=e92]:
          - cell "FR17NEGDISC" [ref=e93]
          - cell "Phần trăm" [ref=e94]
          - cell "-10%" [ref=e95]
          - cell "0 ₫" [ref=e96]
          - cell "2099-12-30" [ref=e97]
          - cell "1 lần" [ref=e98]
          - cell [ref=e99]:
            - button "Xóa" [ref=e100] [cursor=pointer]
        - row [ref=e101]:
          - cell "FR17NEGMIN" [ref=e102]
          - cell "Phần trăm" [ref=e103]
          - cell "10%" [ref=e104]
          - cell "-1 ₫" [ref=e105]
          - cell "2099-12-30" [ref=e106]
          - cell "1 lần" [ref=e107]
          - cell [ref=e108]:
            - button "Xóa" [ref=e109] [cursor=pointer]
        - row [ref=e110]:
          - cell "FR17P101" [ref=e111]
          - cell "Phần trăm" [ref=e112]
          - cell "101%" [ref=e113]
          - cell "0 ₫" [ref=e114]
          - cell "2099-12-30" [ref=e115]
          - cell "1 lần" [ref=e116]
          - cell [ref=e117]:
            - button "Xóa" [ref=e118] [cursor=pointer]
        - row [ref=e119]:
          - cell "FR17PAST" [ref=e120]
          - cell "Phần trăm" [ref=e121]
          - cell "10%" [ref=e122]
          - cell "0 ₫" [ref=e123]
          - cell "Hết hạn" [ref=e124]
          - cell "1 lần" [ref=e125]
          - cell [ref=e126]:
            - button "Xóa" [ref=e127] [cursor=pointer]
```